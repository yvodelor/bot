import { pool } from '../config/db';
import { createBaseService } from './baseService';
import { reloadFuseGlobal } from '../chatbot/entityService';

type Produit = {
    id: number;
    name: string;
    business_id: string;
    description: string;
    image: string;
    is_active: boolean;
};

const baseService = createBaseService<Produit>(
    pool,
    'produit',
    ['id', 'name'],
    {
        joins: [
            `
            JOIN business
            ON produit.business_id = business.id
            `
        ],
        field: "business.user_id"
    }
);

export const produitService = {
    ...baseService,

    async create(data: any, context?: any) {
        const produit = await baseService.create(data, context);

        await reloadFuseGlobal();

        return produit;
    },

    async update(id: number, data: any, context?: any) {
        const produit = await baseService.update(id, data, context);

        await reloadFuseGlobal();

        return produit;
    },

    async delete(id: number, context?: any) {
        await baseService.delete(id, context);

        await reloadFuseGlobal();
    }
};