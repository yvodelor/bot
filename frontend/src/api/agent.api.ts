import { createCrudApi  } from "../api/crud.api";

export type Bots = {
  id: string;
  nom: string;
};


export const botsApi = createCrudApi<Bots>('/agent');