import { createCrudApi  } from "../api/crud.api";

export type Business = {
  id: string;
  slug:string;
  agent_name: string;
  agent_role: string;
  activite_id: string
  logo_url: string
  name: string;
  phone:string;
  address: string;
  whatsapp:string;
  horaire:string;
  description:string;
  email:string;
  website: string;
  infos: string

};


export const businessApi = createCrudApi<Business>('/business');