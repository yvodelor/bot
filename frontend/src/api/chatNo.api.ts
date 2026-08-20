
import { createCrudApi  } from "../api/crud.api";

export type ChatNo = {
  id: string;
  business_id: string
  session_id: string
  intent_id: string
  message: string

};


export const chatNoApi = createCrudApi<ChatNo>('/chat_unknown');