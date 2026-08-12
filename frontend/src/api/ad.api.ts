import { createCrudApi  } from "../api/crud.api";
import axiosClient from "./axiosClient";

export type Ad = {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  target_url: string;
  placement: string;
  start_date:  string ;
  end_date: string;
  is_active?: boolean,
  image?: string;
  action?: string
};


const crud = createCrudApi<Ad>(
    "/ad"
);


export type ActiveAds = {
  [key: string]: Ad[];
};

export const adApi = {

    ...crud,
    
    getActiveAds: async (): Promise<ActiveAds> => {

        const res = await axiosClient.get(
            "/ad/active"
        );

        return res.data;
    }



};