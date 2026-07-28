import { pool } from "../config/db";

import { ChatSessionService } 
from "./chatSessionService";

import { ChatMessageService } 
from "./chatMessageService";

import { ChatChannelService } 
from "./chatChannelService";

import { intentService } 
from "./intentService";

import { responseService } 
from "./responseService";

import { ScenarioManager } 
from "./scenarioManager";

import { businessService } 
from "./businessService";


import { normalizeText } 
from "../utils/normalizeText";

import { detectIntent } 
from "../utils/detectIntent";

import { createEmbedding } 
from "../utils/embedding";

import { extraireData, extraireTopic, type FieldSchema }
from "../utils/extraireData";


import {
    wordCount,
    pickRandom,
    replacePlaceholders,
    formatListeProduits,
    formatTableauProduits

} from "../utils/fonctions";



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


const business =
await businessService.getById(
    tenantId
);



if(!business){

    throw new Error(
        "Business introuvable"
    );

}



if(
    business.admin_status !== "approved"
    ||
    business.user_status !== "active"
){

    return {
        text:"Agent IA inactif"
    };

}



if(business.agent_msg <=0){

    return {
        text:
        "Je ne peux pas répondre pour le moment."
    };

}




// =================================================
// 2 - PRODUITS
// =================================================


const resultProd =
await pool.query(
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


const produits =
resultProd.rows;



const listeProduits =
formatListeProduits(
    produits
);



const tableauProduits =
formatTableauProduits(
    produits
);





const tenantData = {

    produits

};





// =================================================
// 3 - CHANNEL
// =================================================


const channel =
await ChatChannelService.getByCode(
    "web"
);



if(!channel){

    throw new Error(
        "Canal introuvable"
    );

}





// =================================================
// 4 - SESSION
// =================================================


const session =
await ChatSessionService.getOrCreate(
    sessionId,
    tenantId,
    channel.id
);



const currentSessionId =
session.id;




// =================================================
// 5 - HISTORIQUE
// =================================================


const lastBot =
await ChatMessageService.getLastMessage(
    currentSessionId
);




// =================================================
// 6 - MESSAGE USER
// =================================================


await ChatMessageService.create(
    currentSessionId,
    "user",
    message
);





// =================================================
// 7 - VARIABLES SESSION
// =================================================


const variables =
session.variables ?? {};





let responseText =
"Veuillez reformuler votre demande";



let intentId:number|null=null;

let scenarioId:number|null=null;





// =================================================
// 8 - SCENARIO ACTIF
// =================================================


if(
    ScenarioManager.hasScenario(session)
){


    const scenarioResult =
    await ScenarioManager.handle(
        session,
        message
    );



    return {

        text:
        scenarioResult.text,

        sessionId:
        currentSessionId,

        scenario:true

    };


}





// =================================================
// 9 - DETECTION INTENT
// =================================================


const intents =
await intentService.getAll();



if(wordCount(message)<=2){


    const intent =
    detectIntent(
        normalizeText(message),
        intents
    );



    intentId =
    intent?.id ?? null;


    scenarioId =
    intent?.scenario_id ?? null;


}





// =================================================
// 10 - EMBEDDING INTENT
// =================================================


if(!intentId){


const embedding =
await createEmbedding(
    message
);



const result =
await pool.query(
`
SELECT 
scenario_id,
intent_id,
1-(embedding <=> $1::vector)
AS similarity

FROM intent_exemple

WHERE 
1-(embedding <=> $1::vector)>=0.80

ORDER BY 
embedding <=> $1::vector

LIMIT 1

`,
[
JSON.stringify(embedding)
]
);



const intentResult =
result.rows[0];



intentId =
intentResult?.intent_id ?? null;


scenarioId =
intentResult?.scenario_id ?? null;


}







// =================================================
// 11 - VARIABLES BUSINESS
// =================================================


const businessVariables={


business_name:
business.name,


business_phone:
business.phone,


business_email:
business.email,


business_address:
business.address,


business_horaire:
business.horaire,


bot_name:
business.agent_name,


listeProduits,


tableauProduits,


...variables

};







// =================================================
// 12 - TRAITEMENT INTENT
// =================================================


const responseBases =
await responseService.getAll();




if(intentId){


switch(intentId){



case 8:
{

const schema:FieldSchema[]=[

{
champ:"produit",
type:"entity",
source:"produits",
keys:["name"]
},

{
champ:"quantite",
type:"number"
},

{
champ:"date",
type:"date"
}

];



const extracted =
extraireData(
message,
schema,
tenantData
);



variables.quantite =
extracted.quantite;



await ChatSessionService.setVariable(
currentSessionId,
"quantite",
extracted.quantite
);



const topic =
extraireTopic(
message,
[
"je veux",
"je cherche",
"commander",
"acheter"
]
);



console.log(
"topic",
topic
);



responseText =
"Quel produit souhaitez-vous ?";



break;

}




case 11:

{

responseText =
lastBot?.message
??
"Je n'ai pas de message précédent";


break;

}




default:
{

const responses =
responseBases.filter(
r=>r.intent_id==String(intentId)
);



const response =
pickRandom(
responses
);



responseText =
response?.response
??
responseText;


}


}



}





// =================================================
// 13 - SCENARIO DEMARRAGE
// =================================================


if(scenarioId){


await ScenarioManager.start(
    currentSessionId,
    scenarioId
);


}






// =================================================
// 14 - REMPLACEMENT VARIABLES
// =================================================


responseText =
replacePlaceholders(
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

sessionId:currentSessionId,

intentId

};



}



}