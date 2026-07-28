import { createCrudApi  } from "../api/crud.api";

export type ResponseBase = {
    id: string,
    activite_id: string | null,
    intent_id: string,
    variant: string,
    response: string,
    params: string,
    lang: string,
    priority: string,
    is_active:boolean
    
};


export const responseBaseApi = createCrudApi<ResponseBase>('/response_base');