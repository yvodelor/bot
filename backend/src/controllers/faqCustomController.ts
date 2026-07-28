import type { Request, Response } from "express";
import pool from "../config/db";
import { createEmbedding } from "../utils/embedding";



export const FaqCustomController = {
  
  //GetAll
  async  getAll( req: Request, res: Response ) {
        
    try {
      const result = await pool.query(
        "SELECT * FROM faq_custom order by id desc"
      );
    
      return res.status(200).json({
        success: true,
        data: result.rows,
      });

    } catch (error) {
      
      console.log("erreur")
      return res.status(401).json({
        success: false,
        data: "Impossible de charger les questions par défaut"
      });
    }
  },


   //GET ONE Faq
  async getOne( req: Request, res: Response )  {
    try {
      const { id } = req.params;

      const result = await pool.query(
        "SELECT * FROM faq_custom WHERE id = $1",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "FaqDefault not found",
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

   /************ Creation **************/
  async create( req: Request, res: Response ) {
    console.log("CREATE FAQ CALLED");
    console.log(req.body);
    
    try {
      const {
        business_id,
        question, 
        keywords,
        response,
      } = req.body;

      const embedding = await createEmbedding(question);

  
      /***** Validation ******/
      const result = await pool.query(
        `INSERT INTO faq_custom (
        business_id, question, keywords,  response,  embedding ) VALUES ($1,$2,$3, $4, $5)
        RETURNING * `, [business_id, question, keywords,  response,  embedding ] 
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
        keywords,
        question,
        response,
     
      } = req.body;

      console.log(req.body);
      const embedding = await createEmbedding(question);
      
      const result = await pool.query(
        `UPDATE faq_custom
        SET  keywords= $1,
            question = $2,
            response = $3,
           
            embedding = $4
        WHERE id = $5
        RETURNING *`,
        [
          keywords,
          question,
          response,
       
          embedding,
          id,
        ]
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
      console.error("UPDATE FAQ ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "Impossible de modifier la FAQ",
      });
    }
  }

};