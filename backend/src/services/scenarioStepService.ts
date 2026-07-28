import {pool}  from '../config/db'

import { createBaseService } from './baseService'

type ScenarioStep = {
    id: number,
    scenario_id: string,
    ordre: string,
    question: string;
    type_champ: string;
    variable: string;
}    

export const scenarioStepService = {
    ...createBaseService<ScenarioStep>(pool, 'scenario_step', ['id']),
    
}