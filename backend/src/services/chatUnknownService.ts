import { pool } from "../config/db";

export class ChatUnknownService {

    static async create(
        businessId: number,
        sessionId: string,
        message: string,
        channelId?: number
    ) {

        await pool.query(
            `
            INSERT INTO chat_unknown
            (
                business_id,
                session_id,
                channel_id,
                message
            )
            VALUES ($1, $2, $3, $4)
            `,
            [
                businessId,
                sessionId,
                channelId ?? null,
                message
            ]
        );
    }
}