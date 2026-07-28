import { createCrudApi  } from "../api/crud.api";

export type Scenario = {
  id: string;
  activite_id: string
  intent_id: string;
  name:string;
  description: string;
  is_active: boolean;
};


export const scenarioApi = createCrudApi<Scenario>('/scenario');