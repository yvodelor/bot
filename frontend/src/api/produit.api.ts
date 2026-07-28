import { createCrudApi  } from "../api/crud.api";

export type Produit = {
  id: string;
  name: string;
  business_id: string,
  description: string,
  prix: string,
  image: string,
 
};


export const produitApi = createCrudApi<Produit>('/produit');