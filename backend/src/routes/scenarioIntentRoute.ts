import { createCrudRoutes } from "./baseRoute";
import { scenarioIntentController } from "../controllers/scenarioIntentController";


export default createCrudRoutes( scenarioIntentController, {
    protectedRoutes: ['delete']
})


