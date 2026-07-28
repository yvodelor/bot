import Fuse from "fuse.js";
import {normalizeText} from "./normalizeText"
import stringSimilarity from "string-similarity"


export function extraireTopic(text: string, motsEntraines: string[]){
    function texteFree(texte: string){
        let msg = texte .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\d+/g, "")
        .replace(/\b\w{1, 2}\b/g, '')
        .trim()

        return msg;
    }
    
    let msg = texteFree(text)
    console.log(msg)
    const mots = msg.split(' ')

    /*
    motsEntraines.forEach( motEntraine => {
        msg = msg.replace(new RegExp(normalizeText(motEntraine), 'g'), '')
   
    })
*/
    if(motsEntraines.length == 0 || mots.length == 0) return '';

    for(const motEntraine of motsEntraines) {
        const motEns = motEntraine.split(' ')
        for( const motEn of motEns){
            for(const mot of mots){  
                const score = stringSimilarity.compareTwoStrings(mot, motEn)
                if(score > 0.5){
                    msg = msg.replace(new RegExp(texteFree(mot), 'g'), '')
                }
            }
        }
       
    }
    

    
    return msg
}













function prepareText(text: string): string {
    const motsInutiles = [
    'je veux', 'je cherche', 'je pends', 'donne moi', 'il me faut', 'commander', 
    'achter', 'je voudrais',
    'kg', 'pieces', 'pieces', 'paquets', 'carton']

    const regexQuantite = /\d+(\.\d+)?/g;

    let msg =  text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\d+/g, "")
        .trim()
    
    motsInutiles.forEach( mot => {
        msg = msg.replace(new RegExp(mot, 'g'), '')
    })

    msg.replace(regexQuantite, '')
    console.log('msgData', msg);
    return msg
    
}


export type FieldSchema = {
    champ: string;
    type: "entity" | "number" | "email" | "date";
    source?: string;
    keys?: string[];
};


  
export function extraireData(
    userMessage: string,
    schema: FieldSchema[],
    tenantData: any
): any {

    const result: any = {};

    /* type: "phone" "currency" "time" "url" "address" "boolean"*/


    for (const field of schema) {

        // Extraction des nombres
        if (field.type === "number") {

            const match = userMessage.match(/\d+/);

            if (match) {
                result[field.champ] = Number(match[0]);
            }
        }


         // Extraction email
        if(field.type === "email") {

            const match = userMessage.match(
                /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
            );

            if(match) {
                result[field.champ] = match[0];
            }

        }


        // Extraction date
        if(field.type === "date") {

            const match = userMessage.match(
                /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/
            );

            if(match) {
                result[field.champ] = match[0];
            }

        }

    




        // Extraction des entités avec Fuse
        if (
            field.type === "entity" &&
            field.source
        ) {
            
            const data = field.source ? tenantData[field.source] : undefined;

            console.log('donnee', data)
            if (!data || !Array.isArray(data)) {
                continue;
            }


            const fuse = new Fuse(
                data,
                {
                    threshold: 0.45,
                    ignoreLocation: true,

                    ...(field.keys && {
                        keys: field.keys
                    })
                }
            );

            const search = fuse.search(
                prepareText(userMessage)
            );
            //console.log('recherche', search);

            if (search.length) {
                 const best = search[0];
                if (best) {
                    result[field.champ] = best.item;
                }

            }
        }
    }


    return result;
}

