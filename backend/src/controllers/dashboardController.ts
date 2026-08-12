import { Request, Response } from "express";
import { DashboardService } from "../services/dashboardService";


export class DashboardController {


static async getDashboard(
    req:Request,
    res:Response
){

try {

    //const businessId = req.user.businessId;
    const businessId = 6;

    const data = await DashboardService.getDashboard(
    businessId
);



res.json(data);



}catch(error){

console.error(error);

res.status(500).json({
message:"Erreur récupération dashboard"
});


}


}


}