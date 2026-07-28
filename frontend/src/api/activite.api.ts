// src/api/axiosBusinesses.ts

import { createCrudApi  } from "../api/crud.api";

export type Activite = {
  id: string;
  nom: string
  is_active: boolean
};


export const activiteApi = createCrudApi<Activite>('/activite');