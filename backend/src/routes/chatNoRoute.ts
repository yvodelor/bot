import { createCrudRoutes } from "./baseRoute";
import { chatNoController } from "../controllers/chatNoController";

export default createCrudRoutes( chatNoController, {
    protectedRoutes: ['delete']
})