import {pool}  from '../config/db'

import { createBaseService } from './baseService'

type Response = {
    id: number,
    activite_id: string,
    intent_id: string,
    variant: string,
    response: string,
    params: string,
    priority: string,
    is_active: boolean
    
} 

export const responseService = {
    ...createBaseService<Response>(pool, 'response_base', ['id']),
    
}