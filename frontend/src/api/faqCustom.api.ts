
import axiosClient from "./axiosClient";

/* =========================
   READ (GET ALL)
========================= */
export const getFaqCustom = async () => {
  const response = await axiosClient.get("/faq_custom");
  return response.data;
};



/* Get by id */
export const getFaqCustomById = async (id: string) => {
  const response = await axiosClient.get(`/faq_custom/${id}`);
  return response.data;
};

/* Creer */
export const createFaqCustom = async (data: any) => {
  const response = await axiosClient.post("/faq_custom", data);
  return response.data;
};

export const updateFaqCustom = async (id: string, data: any) => {
 
  const response = await axiosClient.put(`/faq_custom/${id}`, data );
  
  return response.data;
};

/* =========================
   DELETE
========================= */
export const deleteFaqCustom = async (id: string) => {
  const response = await axiosClient.delete(
    `/faq_custom/${id}`
  );

  return response.data;
};