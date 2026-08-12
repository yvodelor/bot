import { pool } from "../config/db";


export class DashboardService {


    static async getDashboard(
        businessId: number
    ) {


        /**
         * Vue générale
         */
const overview = await pool.query(
    `
    SELECT

    (
        SELECT COUNT(*)
        FROM chat_session
        WHERE business_id = $1
    ) AS conversations,


    (
        SELECT COUNT(DISTINCT id)
        FROM chat_session
        WHERE business_id = $1
    ) AS users,


    (
        SELECT COUNT(*)
        FROM chat_message cm
        JOIN chat_session cs
        ON cs.id = cm.session_id
        WHERE cs.business_id = $1
    ) AS messages

    `,
    [businessId]
);



        /**
         * Statistiques périodes
         */
        const periods = await pool.query(
            `
            SELECT

            COUNT(*) FILTER(
                WHERE created_at >= CURRENT_DATE
            ) AS today,


            COUNT(*) FILTER(
                WHERE created_at >= NOW() - INTERVAL '7 days'
            ) AS last7days,


            COUNT(*) FILTER(
                WHERE created_at >= NOW() - INTERVAL '30 days'
            ) AS last30days


            FROM chat_analytics

            WHERE business_id = $1

            `,
            [businessId]
        );



        /**
         * Performance IA
         */
        const performance = await pool.query(
            `
            SELECT


            COALESCE(
                ROUND(
                    (
                        COUNT(*) FILTER(
                            WHERE response_found = true
                        )::numeric
                        /
                        NULLIF(COUNT(*),0)
                    ) * 100,
                    2
                ),
                0
            ) AS response_rate,


            COALESCE(
                ROUND(
                    (
                        COUNT(*) FILTER(
                            WHERE response_found = false
                        )::numeric
                        /
                        NULLIF(COUNT(*),0)
                    ) * 100,
                    2
                ),
                0
            ) AS fallback_rate


            FROM chat_analytics

            WHERE business_id = $1

            `,
            [businessId]
        );



        /**
         * Intentions populaires
         */
        const topIntents = await pool.query(
            `
            SELECT

            i.nom AS intent,

            COUNT(*) AS total


            FROM chat_analytics ca


            LEFT JOIN intent i
            ON i.id = ca.intent_id


            WHERE ca.business_id = $1


            GROUP BY i.nom


            ORDER BY total DESC


            LIMIT 10

            `,
            [businessId]
        );



        /**
         * Canaux utilisés
         */
        const channels = await pool.query(
            `
            SELECT

            c.name AS channel,

            COUNT(*) AS total


            FROM chat_analytics ca


            LEFT JOIN channel c
            ON c.id = ca.channel_id


            WHERE ca.business_id = $1


            GROUP BY c.name


            ORDER BY total DESC

            `,
            [businessId]
        );



        /**
         * Activité 30 jours
         */
        const activity = await pool.query(
            `
            SELECT

            DATE(created_at) AS date,

            COUNT(*) AS total


            FROM chat_analytics


            WHERE business_id = $1

            AND created_at >= NOW() - INTERVAL '30 days'


            GROUP BY DATE(created_at)


            ORDER BY date

            `,
            [businessId]
        );



        /**
         * Tokens IA
         */
        const tokens = await pool.query(
            `
            SELECT


            COALESCE(
                SUM(tokens_used),
                0
            ) AS total_tokens,


            COALESCE(
                SUM(tokens_used)
                FILTER(
                    WHERE created_at >= NOW() - INTERVAL '30 days'
                ),
                0
            ) AS tokens_month



            FROM chat_analytics


            WHERE business_id = $1

            `,
            [businessId]
        );




        return {

            overview: {

                users: Number(
                    overview.rows[0]?.users ?? 0
                ),

                conversations: Number(
                    overview.rows[0]?.conversations ?? 0
                ),

                messages: Number(
                    overview.rows[0]?.messages ?? 0
                )

            },


            periods: {

                today: Number(
                    periods.rows[0]?.today ?? 0
                ),

                last7days: Number(
                    periods.rows[0]?.last7days ?? 0
                ),

                last30days: Number(
                    periods.rows[0]?.last30days ?? 0
                )

            },


            performance: {

                responseRate: Number(
                    performance.rows[0]?.response_rate ?? 0
                ),

                fallbackRate: Number(
                    performance.rows[0]?.fallback_rate ?? 0
                )

            },


            topIntents:
                topIntents.rows.map(item => ({
                    intent: item.intent ?? "Inconnu",
                    total: Number(item.total)
                })),



            channels:
                channels.rows.map(item => ({
                    channel: item.channel ?? "Inconnu",
                    total:Number(item.total)
                })),



            activity:
                activity.rows.map(item => ({
                    date:item.date,
                    total:Number(item.total)
                })),



            tokens:{

                total:Number(
                    tokens.rows[0]?.total_tokens ?? 0
                ),

                thisMonth:Number(
                    tokens.rows[0]?.tokens_month ?? 0
                )

            }

        };

    }

}