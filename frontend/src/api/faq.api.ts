
import { createCrudApi  } from "./crud.api";

export type Faq = {
  id: string;
  business_id: number;
  question: string
  reponse: string;
};

export const faqApi = createCrudApi<Faq>('/faq')