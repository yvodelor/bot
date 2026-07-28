import {pool}  from '../config/db'

import { createBaseService } from './baseService'

type Agent = {
    id: number,
    nom: string,
} 


export const agentService = {
    ...createBaseService<Agent>(
        pool, 
        'bot', 
        ['id', 'nom'], 
        {
            field:"user_id"
        }
    ),
    
}