import { Router } from "express";
import type { RequestHandler } from "express";

import { authMiddleware } from "../middleware/authMiddleware";

type RouteName =
  | 'create'
  | 'update'
  | 'delete'
  | 'getAll'
  | 'getBy'
  | 'search'
  | 'by';


type Options = {
  protectedRoutes?: RouteName[];
  disabledRoutes?: RouteName[];
  upload?: RequestHandler;
};


type Controller = {
    getAll?:RequestHandler
    getById?:RequestHandler
    getByField?:RequestHandler
    search?:RequestHandler
    create?:RequestHandler
    update?:RequestHandler
    delete?:RequestHandler
}

const noAuth: RequestHandler = (req, res, next) =>  next()

export const createCrudRoutes = <T extends { id: number}>(
    controller: Controller,
    options: Options = {}
) =>{
    const router = Router()
    const {protectedRoutes = [], disabledRoutes = []} = options
    
    const guard = (route: string): RequestHandler => {
        const isProtected = protectedRoutes?.includes(route as any) ?? false;
        return isProtected ? authMiddleware : noAuth;
    };

    const isEnabled = (route: string) => !disabledRoutes.includes(route as any)


    // Routes de lecture - publiques par default
    if(isEnabled('search') && controller.search){
        router.get('/search', guard('search'), controller.search)
    }

    if(isEnabled('by') && controller.getByField){
        router.get('/by', guard('by'), controller.getByField)
    }


    if(isEnabled('getAll') && controller.getAll){
        router.get('/', guard('getAll'), controller.getAll)
    }

    if (isEnabled('getById') && controller.getById) {
    router.get('/:id', guard('getById'), controller.getById)
}

    if (isEnabled('create') && controller.create) {
    router.post(
        '/',
        guard('create'),
        options.upload ?? ((req,res,next)=>next()),
        controller.create
    )
}

    if(isEnabled('update') && controller.update){
    router.put(
        '/:id',
        guard('update'),
        options.upload ?? ((req,res,next)=>next()),
        controller.update
    )
}

    if(isEnabled('delete') && controller.delete){
        router.delete('/:id', guard('delete'), controller.delete)
    }


    return router
}




