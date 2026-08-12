import { pool } from "../config/db";
import { extractProduit } from "../chatbot/entityService";

import { ChatSessionService }  from "./chatSessionService";

import { ChatMessageService } from "./chatMessageService";

import { ChatChannelService } from "./chatChannelService";

import { intentService } from "./intentService";
import { ChatFaqService } from "./chatFaqService";

import { responseService } from "./responseService";

import { ScenarioManager } from "./scenarioManager";

import { businessService } from "./businessService";

import { normalizeText } from "../utils/normalizeText";

import { detectIntent } from "../utils/detectIntent";

import { createEmbedding } from "../utils/embedding";


import { IntentResponseService } from "./intentResponseService";

import {  wordCount, replacePlaceholders, formatListeProduits, formatTableauProduits
} from "../utils/fonctions";

import { ChatUnknownService }  from "./chatUnknownService";







export class ChatEngine {



static async process(data:{
    tenantId:number;
    sessionId:string;
    message:string;
}){


const {
    tenantId,
    sessionId,
    message

}=data;



// =================================================
// 1 - BUSINESS
// =================================================


const business = await businessService.getById(
    tenantId
);

console.log(business)

if(!business){

    throw new Error(
        "Business introuvable"
    );

}

if(  business.admin_status !== "approved" ||   business.user_status !== "active" ){

    return {
        text:"Agent IA inactif"
    };

}



if(business.agent_msg <=0){

    return {
        text: "Je ne peux pas répondre pour le moment."
    };

}


// =================================================
// 2 - PRODUITS
// =================================================


const resultProd = await pool.query(
`
SELECT *
FROM produit
WHERE business_id=$1
AND is_active=true
`,
[
tenantId
]
);


const produits = resultProd.rows;
const listeProduits = formatListeProduits( produits);
const tableauProduits = formatListeProduits(produits);




// =================================================
// 3 - CHANNEL
// =================================================

const channel = await ChatChannelService.getByCode( "web");
if(!channel){
    throw new Error(
        "Canal introuvable"
    );
}



//======================= Debut =================================

let responseText = "Veuillez reformuler votre demande";
let responseImage = "";
let intentId:number|null=null;
let scenarioId:number|null=null;
let intentGroupeId:number|null=null;
let produitDetecte = null;
let intentNom: string | null = null;


const intents = await intentService.getAll();

// =================================================
// 9 - DETECTION INTENT
// =================================================

if(wordCount(message)<=2){

    const intent = detectIntent( 
        normalizeText(message),
        intents
    );

    intentId = intent?.id ?? null;
    intentNom = intent?.nom ?? null;
    scenarioId = Number(intent?.scenario_id) ?? null;
    intentGroupeId = Number(intent?.groupe_id) ?? null

}

// =================================================
// 10 - EMBEDDING INTENT
// =================================================

if(!intentId){

    const embedding =
    await createEmbedding(
        message
    );



    const result =await pool.query(
    `
    SELECT
        ie.intent_id,
        i.scenario_id, i.nom,
        i.groupe_id,
        1-(ie.embedding <=> $1::vector) AS similarity
    FROM intent_exemple ie
    JOIN intent i
    ON i.id = ie.intent_id
    WHERE 1-(ie.embedding <=> $1::vector) >= 0.70
    ORDER BY ie.embedding <=> $1::vector
    LIMIT 1

    `,
    [
    JSON.stringify(embedding)
    ]
    );

    const intentResult = result.rows[0];

    intentId = intentResult?.intent_id ?? null;
    intentNom = intentResult?.nom ?? null;
    scenarioId = intentResult?.scenario_id ?? null;
    intentGroupeId = intentResult?.groupe_id ?? null;

}


console.log('intent', intentId)
console.log('intentGroupeId', intentGroupeId)

//=================================================
// PRODUIT
// =================================================

if (intentId) {

    const intent = intents.find(
        (i: any) => i.id === intentId
    );

    if (
        intent?.nom === "search_produit" ||
        intent?.nom === "price_produit" ||
        intent?.nom === "availability_produit"
    ) {

        produitDetecte = extractProduit(
            message,
            tenantId
        );

        console.log(
            "[ChatEngine] Produit détecté :",
            produitDetecte
        );
    }
}
console.log(produitDetecte)




const produitContext = produitDetecte
    ? {
        id: produitDetecte.id ?? null,
        nom: produitDetecte.nom ?? null,
        source: produitDetecte.source,
        score: produitDetecte.score
    }
    : null;

const tenantData = {
    produit: produitContext  
};

// =================================================
// 4 - SESSION
// =================================================
const session = await ChatSessionService.getOrCreate(
    sessionId,
    tenantId,
    channel.id
);


// current session
const currentSessionId = session.id;

console.log('session', session)


// =================================================
// 5 - HISTORIQUE
// =================================================

const lastBot = await ChatMessageService.getLastMessage( currentSessionId );

// =================================================
// 6 - MESSAGE USER
// =================================================
await ChatMessageService.create( currentSessionId,
    "user",
    message
);


// =================================================
// 7 - VARIABLES SESSION
// =================================================
const variables = session.variables ?? {};


// =================================================
// 8 - SCENARIO ACTIF
// =================================================
if(ScenarioManager.hasScenario(session)){
 
    if(intentId !== null ){
        const scenarioIntent = await ScenarioManager.getScenarioIntent(
            session.scenario_id,
            intentId
        );   

        console.log(scenarioIntent)
        if(scenarioIntent){

            switch(scenarioIntent.action){
                case "continue":
                    const scenarioResult =  await ScenarioManager.handle(
                        session,
                        message,
                        tenantData
                    );

                    return {
                        text: scenarioResult.text,
                        sessionId: currentSessionId,
                        scenario:true
                    };                   

                case "ignored":
                    break;


                case "cancel":
                    await ScenarioManager.annuler(  currentSessionId );
                    break;
            }

        }
    }
    else{

        // Intent non prévu dans ce scénario
        const scenarioGroupeId =
            await ScenarioManager.getGroupeScenario(
                session.scenario_id
            );
        
        if(
            intentGroupeId &&
            intentGroupeId !== scenarioGroupeId
        ){

            await ScenarioManager.annuler(
                currentSessionId
            );

        }
        

        const scenarioResult = await ScenarioManager.handle(
            session,
            message,
            tenantData
        );

        return {
            text: scenarioResult.text,
            sessionId: currentSessionId,
            scenario:true
        };
    }
    /*
    return {
        text: scenarioResult.text,
        sessionId: currentSessionId,
        scenario:true
    };
    */
}


// =================================================
// 11 - VARIABLES BUSINESS
// =================================================


const businessVariables={
    business_name: business.name,
    business_phone: business.phone,
    business_email: business.email,
    business_address: business.address,
    business_horaire: business.horaire,
    bot_name: business.agent_name,
    business_description: business.description,
    listeProduits,
    tableauProduits,
    ...variables

};







// =================================================
// 12 - TRAITEMENT INTENT
// =================================================

let faq = null;


if(!scenarioId){

    faq = await ChatFaqService.search(
        tenantId,
        message
    );

}


// =================================================
// 13 - SCENARIO DEMARRAGE
// =================================================


if (scenarioId) {

    const scenarioResult =
        await ScenarioManager.start(
            currentSessionId,
            scenarioId
        );

    const text =
        scenarioResult?.text
        ?? "Démarrage du scénario";

    await ChatMessageService.create(
        currentSessionId,
        "bot",
        text
    );

    return {
        text,
        sessionId: currentSessionId,
        scenario: true
    };
}



if(faq){
    responseText = faq.answer;
}
else  if (intentId !== null && intentNom !== null) {
    console.log('intentnom', intentNom)
    const intentResponse = await IntentResponseService.getResponse({

        tenantId,
        activiteId: business.activite_id ?? null,
        intentId,
        sessionId:currentSessionId,
        variables,
        intentNom,
        businessVariables

    });


    responseText = intentResponse.text;
}



console.log('unknown', faq, intentId)
if (
    !faq &&
    intentId === null
) {

    await ChatUnknownService.create(
        tenantId,
        currentSessionId,
        message,
        channel.id
    );

    responseText =
        "Veuillez reformuler votre demande";
}


// =================================================
// 14 - REMPLACEMENT VARIABLES
// =================================================


responseText = replacePlaceholders(
    responseText,
    variables,
    businessVariables
);







// =================================================
// 15 - UPDATE SESSION
// =================================================


await ChatSessionService.updateIntent(
    currentSessionId,
    intentId
);







// =================================================
// 16 - MESSAGE BOT
// =================================================


await ChatMessageService.create(
    currentSessionId,
    "bot",
    responseText
);







// =================================================
// 17 - CLEAN HISTORIQUE
// =================================================


await ChatMessageService.cleanup(
currentSessionId,
10
);







// =================================================
// 18 - CREDIT
// =================================================


await pool.query(
`
UPDATE business

SET agent_msg =
GREATEST(agent_msg-1,0)

WHERE id=$1
`,
[
tenantId
]
);







    return {

        text:responseText,
        image: responseImage,

        sessionId:currentSessionId,

        intentId

    };



}


}