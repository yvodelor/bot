import { pool } from "../config/db";

export class ChatSessionService {

    

    /**
     * Crée une nouvelle session de conversation
     */
    static async create(
        businessId: number,
        channelId: number
    ) {

        const result = await pool.query(
            `
            INSERT INTO chat_session (
                business_id,
                channel_id,
                variables
            )
            VALUES (
                $1,
                $2,
                '{}'
            )
            RETURNING *
            `,
            [
                businessId,
                channelId
            ]
        );

        return result.rows[0];
    }


    static async getOrCreate(
        sessionId: string | null,
        businessId: number,
        channelId: number
    ) {

        let session = null;


        // 1. Chercher une session existante
        if (
            sessionId &&
            sessionId !== "undefined" &&
            sessionId !== "null"
        ) {

            const result = await pool.query(
                `
                SELECT *
                FROM chat_session
                WHERE id = $1
                AND business_id = $2
                `,
                [
                    sessionId,
                    businessId
                ]
            );

            session = result.rows[0] ?? null;
        }


        // 2. Créer une nouvelle session si inexistante
        if (!session) {

            session = await this.create(
                businessId,
                channelId
            );

        }


        return session;
    }




    /**
     * Récupère une session à partir de son id
     */
    static async getById(
        sessionId: string
    ) {

        const result = await pool.query(
            `
            SELECT *
            FROM chat_session
            WHERE id = $1
            `,
            [sessionId]
        );

        return result.rows[0] ?? null;
    }


    /**
     * Vérifie qu'une session appartient bien à un business
     */
    static async getByIdAndBusiness(
        sessionId: string,
        businessId: number
    ) {

        const result = await pool.query(
            `
            SELECT *
            FROM chat_session
            WHERE id = $1
            AND business_id = $2
            `,
            [
                sessionId,
                businessId
            ]
        );

        return result.rows[0] ?? null;
    }


    /**
     * Met à jour l'intent courant
     */
    static async updateIntent(
        sessionId: string,
        intentId: number | null
    ) {

        await pool.query(
            `
            UPDATE chat_session
            SET
                intent_id = $1,
                updated_at = NOW()
            WHERE id = $2
            `,
            [
                intentId,
                sessionId
            ]
        );
    }


    /**
     * Met à jour le scénario courant
     */
    static async updateScenario(
        sessionId: string,
        scenarioId: number | null
    ) {

        await pool.query(
            `
            UPDATE chat_session
            SET
                scenario_id = $1,
                updated_at = NOW()
            WHERE id = $2
            `,
            [
                scenarioId,
                sessionId
            ]
        );
    }


    /**
     * Met à jour l'étape courante du scénario
     */
    static async updateScenarioStep(
        sessionId: string,
        step: number
    ) {

        await pool.query(
            `
            UPDATE chat_session
            SET
                scenario_step = $1,
                updated_at = NOW()
            WHERE id = $2
            `,
            [
                step,
                sessionId
            ]
        );
    }


    /**
     * Remplace complètement les variables
     */
    static async updateVariables(
        sessionId: string,
        variables: Record<string, any>
    ) {

        await pool.query(
            `
            UPDATE chat_session
            SET
                variables = $1,
                updated_at = NOW()
            WHERE id = $2
            `,
            [
                JSON.stringify(variables),
                sessionId
            ]
        );
    }


    /**
     * Ajoute ou modifie une variable
     *
     * Exemple :
     * setVariable(sessionId, "produit", "chaise")
     */
    static async setVariable(
        sessionId: string,
        key: string,
        value: any
    ) {

        const session =
            await this.getById(sessionId);

        if (!session) {
            return;
        }

        const variables =
            session.variables || {};

        variables[key] = value;

        await this.updateVariables(
            sessionId,
            variables
        );
    }


    /**
     * Récupère une variable particulière
     *
     * Exemple :
     * getVariable(sessionId, "produit")
     */
    static async getVariable(
        sessionId: string,
        key: string
    ) {

        const session = await this.getById(sessionId);
        if (!session) {
            return null;
        }

        return session.variables?.[key] ?? null;
    }


    /**
     * Retourne uniquement le contexte métier
     *
     * Utilisé par le moteur conversationnel
     */
    static async getContext(
        sessionId: string
    ) {

        const session =
            await this.getById(sessionId);

        if (!session) {
            return null;
        }

        return {
            sessionId: session.id,
            intentId: session.intent_id,
            scenarioId: session.scenario_id,
            scenarioStep: session.scenario_step,
            variables: session.variables || {}
        };
    }


    /**
     * Réinitialise le contexte
     *
     * Utilisé lorsqu'un scénario est terminé
     */
    static async clearContext(
        sessionId: string
    ) {

        await pool.query(
            `
            UPDATE chat_session
            SET
                intent_id = NULL,
                scenario_id = NULL,
                ordre_step = 0,
                variables = '{}',
                updated_at = NOW()
            WHERE id = $1
            `,
            [sessionId]
        );
    }


    /**
     * Met à jour la date de dernière activité
     */
    static async touch(
        sessionId: string
    ) {

        await pool.query(
            `
            UPDATE chat_session
            SET updated_at = NOW()
            WHERE id = $1
            `,
            [sessionId]
        );
    }


    /**
     * Supprime les sessions expirées
     *
     * À lancer via cron
     */
    static async cleanupExpired(
        days = 30
    ) {

        await pool.query(
            `
            DELETE
            FROM chat_session
            WHERE updated_at <
            NOW() - ($1 || ' days')::interval
            `,
            [days]
        );
    }
}