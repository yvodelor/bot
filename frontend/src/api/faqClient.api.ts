
import axiosClient from "./axiosClient";

/* =========================
   READ (GET ALL)
========================= */
export const getFaqClient = async () => {
  const response = await axiosClient.get("/faq");
  return response.data;
};


/* Get by BusinessId */
export const getFaqClientByBusinessId = async (businessId: string) => {
  const response = await axiosClient.get(`/faq/business/${businessId}`);
  return response.data;
};


/* Get by id */
export const getFaqClientById = async (id: string) => {
  const response = await axiosClient.get(`/faq/${id}`);
  return response.data;
};

/* Creer */
export const createFaqClient = async (data: any) => {
  const response = await axiosClient.post("/faq", data);
  return response.data;
};

export const updateFaqClient = async (id: string, data: any) => {
 
  const response = await axiosClient.put(`/faq/${id}`, data );
  
  return response.data;
};

/* =========================
   DELETE
========================= */
export const deleteFaqClient = async (id: string) => {
  const response = await axiosClient.delete(
    `/faq/${id}`
  );

  return response.data;
};