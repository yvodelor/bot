
import { createCrudRoutes } from "./baseRoute";
import { groupeController } from "../controllers/groupeController";

export default createCrudRoutes( groupeController, {
    protectedRoutes: ['delete']
})