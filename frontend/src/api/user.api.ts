import axiosClient from "./axiosClient"

// profil utilisateur
export const getProfileApi = () => {
  return axiosClient.get("/users/profile")
}

// update profil
export const updateProfileApi = (data: any) => {
  return axiosClient.put("/users/profile", data)
}