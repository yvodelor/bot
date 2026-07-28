
import { createCrudApi  } from "../api/crud.api";

export type FaqDefault = {
  id: string;
  intent_id: string;
  activite_id: string;
  question: string
  keywords: string;
  reponse: string;
  priority: string;

};

export const faqDefaultApi = createCrudApi<FaqDefault>('/faq_default')