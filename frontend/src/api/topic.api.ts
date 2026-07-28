import { createCrudApi  } from "../api/crud.api";

export type Topic = {
  id: string;
  code: string;
  activite_id: string;
  keywords:string;
  embedding?: string;
};


export const topicApi = createCrudApi<Topic>('/topic');