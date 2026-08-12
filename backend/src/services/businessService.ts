import {pool}  from '../config/db'

import { createBaseService } from './baseService'

type Business = {
    id: number,
    agent_name: string,
    agent_role: string,
    user_id: number,
    admin_status:string;
    agent_msg: number;
    user_status:string;
    activite_id: number;
    name: string,
    phone: string,
    wathsapp: string,
    email: string,
    website:string,
    address: string,
    horaire: string,
    description: string,
    slug:string,
    
    infos: string
    
} 

export const businessService = {
    ...createBaseService<Business>(pool, 
        'business', 
        ['id', 'name', 'slug'],
        { field: "user_id"}
    ),
    
}