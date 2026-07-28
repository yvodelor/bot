import { createCrudRoutes } from "./baseRoute";
import { scenarioController } from "../controllers/scenarioController";



export default createCrudRoutes( scenarioController, {
    protectedRoutes: ['create', 'update', 'delete'],
})




