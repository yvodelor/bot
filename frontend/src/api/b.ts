import { createCrudApi } from "./crud.api";



export type Business = {
  id: string;
  user_id: string;

  name: string;
  activity_type?: string;
  tone?: string;
  language?: string;

  phone?: string;
  email?: string;
  address?: string;
  horaire?: string;

  website?: string;
  description?: string;

  created_at?: string;
  updated_at?: string;
};
//export const businessApi = createCrudApi<Business>(
 // "/businesses"
//);

import axiosClient from "./axiosClient";

const BASE_URL = "/businesses";

export const businessApi = {
  getAll: () => axiosClient.get(BASE_URL).then(r => r.data),

  getById: (id: string) =>
    axiosClient.get(`${BASE_URL}/${id}`).then(r => r.data),

  create: (data: any) =>
    axiosClient.post(BASE_URL, data).then(r => r.data),

  update: (id: string, data: any) =>
    axiosClient.put(`${BASE_URL}/${id}`, data).then(r => r.data),

  remove: (id: string) =>
    axiosClient.delete(`${BASE_URL}/${id}`).then(r => r.data),
};


businessApi.getById('/business');