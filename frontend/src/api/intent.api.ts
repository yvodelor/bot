import { createCrudApi  } from "../api/crud.api";

export type Intent = {
  id: string;
  nom: string;
  lang: string;
  keywords: string,
  keywords_en: string,
  activite_id: string | null,
  scenario_id: string | null,
  groupe_id: string | null,
  priority: string
};


export const intentApi = createCrudApi<Intent>('/intent');