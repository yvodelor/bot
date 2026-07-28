import { createCrudRoutes } from "./baseRoute";
import { scenarioStepController } from "../controllers/scenarioStepController";



export default createCrudRoutes( scenarioStepController, {
    protectedRoutes: ['create', 'update', 'delete'],
})