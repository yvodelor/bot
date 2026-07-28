// src/api/createCrudApi.ts

import type { AxiosInstance } from "axios";
import axiosClient from "./axiosClient";

/**
 * Factory CRUD générique
 */

type CrudApi<T extends {id:string | number}> = {
  getAll: () => Promise<T[]>
  getById: (id: T['id'])  => Promise<T | null>
  create: (data: Omit<T, 'id'> | FormData) => Promise<T>
  update: (id: T['id'], data: Partial<Omit<T, 'id'>> | FormData )  => Promise<T>
  delete: (id: T['id']) => Promise<boolean>
}

export const createCrudApi = <T extends {id: string | number}>(
  baseUrl: string,
  client: AxiosInstance = axiosClient

): CrudApi<T> =>{
  return {

    getAll: async(): Promise<T[]> => {
      const res = await client.get<T[]>(baseUrl)
      return res.data 
    
    },

    getById: async (id): Promise<T | null> => {
      try{
        const res = await client.get<T>(`${baseUrl}/${id}`);
        return res.data;
      }catch(e:any){
        console.log(e);
        throw e
      }  
    },

    create: async(data): Promise<T> => {

        const res = await client.post<T>(
            baseUrl,
            data,
            data instanceof FormData
            ? {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
              }
            : undefined
        );

        return res.data;
    },

    update: async (id, data): Promise<T> => {

      const res = await client.put<T>(
        `${baseUrl}/${id}`,
        data,
        data instanceof FormData
          ? {
              headers:{
                "Content-Type":"multipart/form-data"
              }
            }
          : undefined
      );

      return res.data;
    },

    delete: async (id): Promise<boolean> => {
       await client.delete( `${baseUrl}/${id}` );
      return true;
    },

  };
}


/*
export const createCrudApi = <T>(baseUrl: string) => {
  return {
    /* =========================
       GET ALL
    ========================= 
    getAll: async (): Promise<T[]> => {
      const res = await axiosClient.get(baseUrl);
      return res.data;
    },

    /* =========================
       GET BY ID
    ========================= 
    getById: async (id: string): Promise<T> => {
      const res = await axiosClient.get(`${baseUrl}/${id}`);
      return res.data;
    },

    /* =========================
       CREATE
    ========================= 
    create: async (data: Partial<T>): Promise<T> => {
      const res = await axiosClient.post(baseUrl, data);
      return res.data;
    },

    /* =========================
       UPDATE
    ========================= 
    update: async (
      id: string,
      data: Partial<T>
    ): Promise<T> => {
      const res = await axiosClient.put(
        `${baseUrl}/${id}`,
        data
      );
      return res.data;
    },

    /* =========================
       DELETE
    ========================= 
    delete: async (id: string): Promise<{ message: string }> => {
      const res = await axiosClient.delete(
        `${baseUrl}/${id}`
      );
      return res.data;
    },
  };


};

  */