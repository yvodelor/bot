import { createCrudRoutes } from "./baseRoute";
import { produitController } from "../controllers/produitController";
import { upload } from "../config/multer";


export default createCrudRoutes(
  produitController,
  {
    protectedRoutes:['delete'],
    upload: upload.single("image")
  }
);