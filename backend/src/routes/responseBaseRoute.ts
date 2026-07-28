import { createCrudRoutes } from "./baseRoute";
import { responseController } from "../controllers/responseBaseController";


export default createCrudRoutes( responseController, {
    protectedRoutes: ['create', 'update', 'delete']
})

