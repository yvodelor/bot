import { createCrudRoutes } from "./baseRoute";
import { activiteController } from "../controllers/activiteController";

export default createCrudRoutes( activiteController, {
    protectedRoutes: ['delete']
})