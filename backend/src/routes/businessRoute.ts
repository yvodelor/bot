import { createCrudRoutes } from "./baseRoute";
import { businessController } from "../controllers/businessController";


export default createCrudRoutes( businessController, {
    protectedRoutes: ['create', 'update', 'delete']
})
