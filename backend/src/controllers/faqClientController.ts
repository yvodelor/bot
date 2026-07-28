import type { Request, Response } from "express";
import pool from "../config/db";


export const FaqClientController = {
  
  //GetAll
    async  getAll( req: Request, res: Response ) {    
        try {
        const result = await pool.query(
            "SELECT * FROM faq_Client"
        );
        
        return res.status(200).json({
            success: true,
            data: result.rows,
        });

        } catch (error) {
        
        console.log("erreur")
        return res.status(401).json({
            success: false,
            data: "Impossible de charger les questions "
        });
        }
    },

  //GET ONE Faq
  async getOne( req: Request, res: Response )  {
    try {
      const { id } = req.params;

      const result = await pool.query(
        "SELECT * FROM faq_client WHERE id = $1",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "FaqClient not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      return console.log(res, error);
    }
  },

  //GET ONE FaqClient
  async getByBusinessId( req: Request, res: Response )  {
    try {
      const { businessId } = req.params;
      console.log('back-businessId', businessId)
      const result = await pool.query(
        "SELECT * FROM faq_client WHERE business_id = $1",
        [businessId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "FaqClient not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: result.rows,
      });
      
    } catch (error) {
      return console.log(res, error);
    }
  },


  /************ Creation **************/
  async create( req: Request, res: Response ) {
    console.log("CREATE FAQ CALLED");
    console.log(req.body);
    
    try {
      const {
        business_id,
        faq_default_id,
        response,       
      } = req.body;

      /***** Validation ******/
      const result = await pool.query(`INSERT INTO faq_client (
        business_id, faq_default_id, response ) VALUES ($1,$2,$3)
        RETURNING * `, [business_id, faq_default_id, response]
      );

      return res.status(201).json({
        success: true,
        message: "Faq créée avec succès",
        data: result.rows[0],
      });
  
    } catch (error) {
      console.error("CREATE FAQ ERROR:", error);

      return res.status(500).json({
        success: false,
        data: "Impossible d'ajouter"
      });
    }
  },


  /**************** Update *************/
  async update(req: Request, res: Response) {
  try {
    const {
      id,
      business_id,
      faq_default_id,
      response,
    } = req.body;

    const result = await pool.query(
      `UPDATE faq_client
       SET business_id = $1,
           faq_default_id = $2,
           response = $3
       WHERE id = $4
       RETURNING *`,
      [business_id, faq_default_id, response, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Faq introuvable",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Faq modifiée avec succès",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    console.error("CREATE FAQ ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Impossible de modifier la FAQ",
    });
  }
},



  /******* delete ******/

};