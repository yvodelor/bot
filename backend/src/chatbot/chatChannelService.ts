import { pool } from "../config/db";


export class ChatChannelService {


    static async getByCode(
        code:string
    ){

        const result = await pool.query(
            `
            SELECT *
            FROM channel
            WHERE code=$1
            LIMIT 1
            `,
            [ code ]
        );


        return result.rows[0] ?? null;
    }

}