import { createCrudRoutes } from "./baseRoute";
import { agentController } from "../controllers/agentController";


export default createCrudRoutes( agentController, {
    protectedRoutes: ['create', 'update', 'delete']
})
