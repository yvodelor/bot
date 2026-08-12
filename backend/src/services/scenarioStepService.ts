import {pool}  from '../config/db'

import { createBaseService } from './baseService'


type ScenarioConfig = {
    source?: string;
    keys?: string[];

    min?: number;
    max?: number;

    required?: boolean;
};

type ScenarioStep = {
    id: number;
    scenario_id: number;
    step_order: number;
    question: string;
    type_champ: 
        | "string"
        | "number"
        | "entity"
        | "email"
        | "date"
        | "boulean"
        
    variable: string;
    config?: string
};
   

export const scenarioStepService = {
    ...createBaseService<ScenarioStep>(pool, 'scenario_step', ['id']),
    
}