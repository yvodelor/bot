import { pool } from "../config/db";

export class ChatMessageService {

    /**
     * Ajoute un message dans l'historique
     */
    static async create(
        sessionId: string,
        role: "user" | "bot" | "system",
        message: string
    ) {
        const result = await pool.query(
            `
            INSERT INTO chat_message (
                session_id,
                role,
                message
            )
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [
                sessionId,
                role,
                message
            ]
        );

        return result.rows[0];
    }

    /**
     * Récupère le dernier message
     */
    static async getLastMessage(
        sessionId: string, roleMsg: string = 'bot'
    ) {
        const result = await pool.query(
            `
            SELECT *
            FROM chat_message
            WHERE session_id = $1 and role = $2
            ORDER BY created_at DESC
            LIMIT 1
            `,
            [sessionId, roleMsg]
        );

        return result.rows[0] ?? null;
    }

    /**
     * Récupère les N derniers messages
     * dans l'ordre chronologique
     */
    static async getRecentMessages(
        sessionId: string,
        limit = 10
    ) {
        const result = await pool.query(
            `
            SELECT id, role, message, created_at
            FROM chat_message
            WHERE session_id = $1
            ORDER BY created_at DESC
            LIMIT $2
            `,
            [
                sessionId,
                limit
            ]
        );

        return result.rows.reverse();
    }

    /**
     * Retourne un contexte conversationnel
     * prêt à être utilisé par le moteur
     */
    static async getContext(
        sessionId: string,
        limit = 10
    ) {

        const history =
            await this.getRecentMessages(
                sessionId,
                limit
            );

        const lastMessage =
            history.length > 0
                ? history[history.length - 1]
                : null;

        return {
            lastMessage,
            history
        };
    }

    /**
     * Garde seulement les N derniers messages
     */
    static async cleanup(
        sessionId: string,
        keep = 10
    ) {

        await pool.query(
            `
            DELETE
            FROM chat_message
            WHERE session_id = $1
            AND id NOT IN (
                SELECT id
                FROM chat_message
                WHERE session_id = $1
                ORDER BY created_at DESC
                LIMIT $2
            )
            `,
            [
                sessionId,
                keep
            ]
        );
    }

    /**
     * Supprime les messages trop anciens
     * Exemple : 30 jours
     */
    static async cleanupExpired(
        days = 30
    ) {

        await pool.query(
            `
            DELETE
            FROM chat_message
            WHERE created_at <
            NOW() - ($1 || ' days')::interval
            `,
            [days]
        );
    }
}