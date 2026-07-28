import { createCrudRoutes } from "./baseRoute";
import { intentController } from "../controllers/intentController";


export default createCrudRoutes( intentController, {
    protectedRoutes: ['delete']
})


