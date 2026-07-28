import {pool} from '../config/db'

import { createBaseService } from './baseService'

type Scenario = {
    id: number,
    activite_id: string,
    intent_id: string,
    name: string,
    description: string
} 

export const scenarioService = {
    ...createBaseService<Scenario>(pool, 'scenario', ['id']),
    
}