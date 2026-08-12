import { responseService } from "./responseService";

import { ChatSessionService }
from "./chatSessionService";

import { ExtractionService }
from "./ExtractionService";

import { pickRandom, replacePlaceholders }
from "../utils/fonctions";



export interface ResponseContext {

    message:string;

    intentId:number | null;

    business:any;

    session:any;

    variables:any;

    tenantData:any;

    produits:any[];

    listeProduits:string;

    tableauProduits:string;

    lastBot:any;

}





export class ResponseGenerator {



static async generate(
    ctx:ResponseContext
):Promise<string>{



const {

    message,

    intentId,

    business,

    session,

    variables,

    tenantData,

    listeProduits,

    tableauProduits,

    lastBot

}=ctx;




let responseText = "Veuillez reformuler votre demande";





// ==============================
// Aucun intent
// ==============================
if(!intentId){
    return responseText;
}


// ==============================
// Réponses configurées
// ==============================

const responses = await responseService.getAll();
switch(intentId){

// =================================
// Recherche / commande produit
// =================================

case 8:
{

    const extraction = await ExtractionService.extractOrder(
        message,
        tenantData
    );



    console.log(
    "Extraction:",
    extraction.data
    );



    if(extraction.data.quantite){
        await ChatSessionService.setVariable(
            session.id,
            "quantite",
            extraction.data.quantite
        );

    }



    if(extraction.data.produit){

        await ChatSessionService.setVariable(
            session.id,
            "produit",
            extraction.data.produit
        );

    }

    responseText = "Quel produit souhaitez-vous ?";

    break;


}






// =================================
// Répéter dernière réponse
// =================================

case 11:
{


responseText =
lastBot?.message
??
"Je n'ai pas encore de réponse précédente.";


break;


}







// =================================
// Catalogue produit
// =================================

case 61:
{

    if(ctx.produits.length===0){
        responseText = "Aucun produit disponible pour {business_name}";
        break;
    }

    responseText = tableauProduits;
    break;
}








// =================================
// Réponse classique
// =================================

default:
{
    const intentResponses = responses.filter( r => r.intent_id === String(intentId) );

        const response = pickRandom(
            intentResponses
        );

        responseText = response?.response ?? responseText;

        break;

    }

}







// Remplacement variables dynamiques

responseText =
replacePlaceholders(
    responseText,
    variables,
{

business_name: business.name,
business_phone: business.phone,
business_email: business.email,
business_address: business.address,

listeProduits: listeProduits,
tableauProduits: tableauProduits

}

);






return responseText;



}



}