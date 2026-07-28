import { createCrudRoutes } from "./baseRoute";
import { intentExController } from "../controllers/intentExController";


export default createCrudRoutes( intentExController, {
    protectedRoutes: [ 'update', 'delete']
})
