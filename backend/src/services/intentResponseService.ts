import { pool } from "../config/db";
import { ChatMessageService } from "./chatMessageService";

import {replacePlaceholders } from "../utils/fonctions";

export interface IntentResponseContext {

    tenantId:number;

    intentId:number;
    intentNom:string;
    activiteId: number | null;

    sessionId:string;

    variables:any;

    businessVariables:any;

}

export interface ResponseBase {

    id:number;

    intent_id:number;

    activite_id:number|null;

    response:string;

    image_url?:string|null;

}

export interface IntentResponseResult {

    text:string;

    image_url:string|null;

}


export class IntentResponseService {


static async getResponse(
    context: IntentResponseContext
): Promise<IntentResponseResult> {

    const {
        intentId,
        intentNom,
        activiteId,
        sessionId,
        variables,
        businessVariables
    } = context;

    let responseText = "Veuillez reformuler votre demande";
    let image_url: string | null = null;

    // ==========================================
    // INTENTS AVEC COMPORTEMENT PARTICULIER
    // ==========================================

    if (intentNom === "repeat") {

        const lastBot =
            await ChatMessageService.getLastMessage(
                sessionId
            );

        responseText =
            lastBot?.message ??
            "Je n'ai pas de message précédent";

    } else {

        // ==========================================
        // RÉPONSE DEPUIS response_base
        // ==========================================

        const response = await this.getByIntent(
            intentId,
            activiteId
        );

        responseText =
            response?.response ??
            responseText;

        image_url =
            response?.image_url ??
            null;
    }

    // ==========================================
    // VARIABLES
    // ==========================================

    responseText = replacePlaceholders(
        responseText,
        variables,
        businessVariables
    );

    return {
        text: responseText,
        image_url
    };
}



    static async getByIntent(
    intentId:number,
    activiteId:number|null
    ): Promise<ResponseBase|null>{

        if (activiteId !== null) {

            const result = await pool.query<ResponseBase>(
            `
            SELECT *
            FROM response_base
            WHERE intent_id=$1
            AND (
                activite_id=$2
                OR (
                    activite_id IS NULL
                    AND NOT EXISTS (
                        SELECT 1
                        FROM response_base rb
                        WHERE rb.intent_id=$1
                        AND rb.activite_id=$2
                    )
                )
            )
            ORDER BY RANDOM()
            LIMIT 1
            `,
            [intentId, activiteId]
            );

            return result.rows[0] ?? null;
        }

        const result = await pool.query<ResponseBase>(
        `
        SELECT *
        FROM response_base
        WHERE intent_id=$1
        AND activite_id IS NULL
        ORDER BY RANDOM()
        LIMIT 1
        `,
        [intentId]
        );


        const rlt = result.rows[0] ?? null;

      
        return rlt
    }


}