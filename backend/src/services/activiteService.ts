import {pool} from '../config/db'

import { createBaseService } from './baseService'

type Activite = {
    id: number,
    nom: string,
    is_active: boolean
} 

export const activiteService = {
    ...createBaseService<Activite>(pool, 'activite', ['id']),
    
}