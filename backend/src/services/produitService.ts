import {pool} from '../config/db'

import { createBaseService } from './baseService'

type Produit = {
    id: number,
    name: string,
    business_id: string,
    description:string,
    image: string, 
    is_active: boolean
} 

export const produitService = {
    ...createBaseService<Produit>(
        pool, 
        'produit', 
        ['id', 'name'],     
        {
            joins:[
                `
                JOIN business 
                ON produit.business_id = business.id
                `
            ],
            field:"business.user_id"
        }


    ),
    
}