import { createCrudRoutes } from "./baseRoute";
import { produitController } from "../controllers/produitController";
import { uploadProduct } from "../config/multer";


export default createCrudRoutes(
  produitController,
  {
    protectedRoutes:['delete'],
    upload: uploadProduct.single("image")
  }
);