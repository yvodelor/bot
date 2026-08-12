import { createCrudApi  } from "../api/crud.api";

export type ScenarioStep = {
  id: number;
  scenario_id: string
  step_order: string;
  question:string;
  type_champ: string;
  variable: string;
  config: string
 
  
};


export const scenarioStepApi = createCrudApi<ScenarioStep>('/scenario_step');