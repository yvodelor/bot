import { pool } from "../config/db";

import { intentService } 
from "./intentService";

import { createEmbedding } 
from "../utils/embedding";

import { normalizeText } 
from "../utils/normalizeText";

import { detectIntent } 
from "../utils/detectIntent";

import { wordCount } 
from "../utils/fonctions";



export interface IntentResult {

    intentId:number | null;

    scenarioId:number | null;

    confidence:number;

    source:
        | "keyword"
        | "embedding"
        | "none";
}




export class IntentResolver {



    /**
     * Détecte l'intention utilisateur
     */
    static async resolve(
        message:string
    ):Promise<IntentResult>{



        /*
        =================================
        1 - INTENT PAR MOTS CLES
        =================================
        */


        const intents =
        await intentService.getAll();



        if(wordCount(message)<=3){


            const intent =
            detectIntent(
                normalizeText(message),
                intents
            );



            if(intent){


                return {

                    intentId:intent.id,

                    scenarioId:
                    Number(intent.scenario_id)
                    ??
                    null,

                    confidence:1,

                    source:"keyword"

                };

            }


        }





        /*
        =================================
        2 - INTENT PAR EMBEDDING
        =================================
        */


        const embedding =
        await createEmbedding(
            message
        );



        const result =
        await pool.query(
        `
        SELECT
            intent_id,
            scenario_id,

            1 - (
                embedding <=> $1::vector
            )
            AS similarity


        FROM intent_exemple


        WHERE
        1 - (
            embedding <=> $1::vector
        ) >= 0.80


        ORDER BY
            embedding <=> $1::vector


        LIMIT 1

        `,
        [
            JSON.stringify(embedding)
        ]
        );




        const row =
        result.rows[0];




        if(row){


            return {


                intentId:
                row.intent_id,


                scenarioId:
                row.scenario_id
                ??
                null,


                confidence:
                Number(
                    row.similarity
                ),


                source:
                "embedding"


            };


        }






        /*
        =================================
        3 - AUCUN INTENT
        =================================
        */


        return {

            intentId:null,

            scenarioId:null,

            confidence:0,

            source:"none"

        };


    }



}