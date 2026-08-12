import { createCrudApi  } from "../api/crud.api";

export type ScenarioIntent = {
  id: string;
  action: string,
  scenario_id: string,
  intent_id: string
};


export const scenarioIntentApi = createCrudApi<ScenarioIntent>('/scenario_intent');