import {pool} from '../config/db'

import { createBaseService } from './baseService'

type Ad = {
    id: number,
    title: string,
    description: string,
    image_url: string;
    target_url: string;
    placement: string,
    start_date: Date,
    end_date: Date,
    image: string,
    is_active: boolean,
    action: string
} 

const base = createBaseService<Ad>(
    pool,
    "ad",
    [
        "id",
        "placement",
        "is_active"
    ]
);




export const adService = {

    ...base,

    getActiveAds: async () => {

        const query = `
            SELECT *
            FROM ad
            WHERE is_active = true

            AND (
                start_date IS NULL
                OR start_date <= NOW()
            )

            AND (
                end_date IS NULL
                OR end_date >= NOW()
            )

            ORDER BY RANDOM()
        `;


        const result = await pool.query(query);


        return result.rows.reduce(
            (acc, ad) => {

                if (!acc[ad.placement]) {
                    acc[ad.placement] = [];
                }

                acc[ad.placement].push(ad);

                return acc;

            },
            {} as Record<string, any[]>
        );
    }

};