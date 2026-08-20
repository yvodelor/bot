import {pool} from '../config/db'

import { createBaseService } from './baseService'

type ChatNo = {
    id: number;
    business_id: string
    session_id: string
    intent_id: string
    message: string
} 

export const chatNoService = {
    ...createBaseService<ChatNo>(pool, 'chat_unknown', ['id']),
    
}