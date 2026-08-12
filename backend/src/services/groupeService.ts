import {pool} from '../config/db'

import { createBaseService } from './baseService'

type Groupe = {
    id: number,
    name: string,
  
} 

export const groupeService = {
    ...createBaseService<Groupe>(pool, 'groupe', ['id']),
    
}