import { createCrudApi  } from "../api/crud.api";
import axiosClient from "./axiosClient";

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


const crud = createCrudApi<Business>('/business');

export const businessApi = {
   
  
        ...crud,   

        getPulic:  (id: string) =>
             axiosClient.get<Business>( `/public/business/${id}`)
             .then (res => res.data)
            
    
    }
    
    
