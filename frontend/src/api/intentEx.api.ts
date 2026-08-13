import { createCrudApi  } from "../api/crud.api";

export type IntentEx = {
  id: string;
  intent_id: string | null;
  phrase: string;
  lang:string;
  embedding?: string
  
};


export const intentExApi = createCrudApi<IntentEx>('/intent_exemple');