
import { extraireData, type FieldSchema } from "../utils/extraireData";



export interface ExtractionResult {
    data: Record<string, any>;
    success:boolean;
    missing?: string[];

}





export class ExtractionService {


    /**
     * Extraction générique
     */
    static async extract(
        message:string,
        schema:FieldSchema[],
        tenantData:any,
        tenantId: number
    ):Promise<ExtractionResult>{



        const data =  extraireData(
            message,
            schema,
            tenantData,
            tenantId
        );

        return {
            data,
            success: Object.keys(data).length > 0
        };

    }




    /**
     * Schéma commande produit
     */
    static getOrderSchema(): FieldSchema[] {

        return [

            {
                champ:"produit",
                type:"entity",
                config:{
                    source:"produits",
                    keys:["name"]
                }
            },

            {
                champ:"quantite",
                type:"number"
            },

            {
                champ:"date",
                type:"date"
            }

        ];
    }





    /**
     * Extraction spécifique commande
     */
    static async extractOrder(
        message:string,
        tenantData:any,
        tenantId: number
    ){


        return this.extract(

            message,
            this.getOrderSchema(),
            tenantData,
            tenantId
        );

    }





    /**
     * Extraction contact client
     */
    static getContactSchema()  :FieldSchema[]{


        return [

            {
                champ:"nom",
                type:"entity"
            },


            {
                champ:"email",
                type:"email"
            },


            {
                champ:"telephone",
                type:"phone"
            }

        ] as FieldSchema[];

    }




    static async extractContact(
        message:string,
        tenantData:any={},
        tenantId: number
    ){


        return this.extract(
            message,
            this.getContactSchema(),
            tenantData,
            tenantId

        );

    }


}