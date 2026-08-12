
import { createCrudApi  } from "../api/crud.api";

export type Groupe = {
  id: string;
  name: string;
  description: string

};


export const groupeApi = createCrudApi<Groupe>('/groupe');