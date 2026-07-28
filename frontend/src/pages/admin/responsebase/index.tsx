// src/pages/business/index.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import DashLayout from "../../../layouts/DashLayout";
import { DynamicTable} from "../../../components/tables/DynamicTable";
import type{ Column } from "../../../components/tables/DynamicTable";
import  Button  from "../../../components/button/Button";
import ComponentCard from "../../../components/common/ComponentCard";
import {Edit, Trash2, BookOpen} from 'lucide-react'
import {type ResponseBase, responseBaseApi} from "../../../api/responseBase.api"
import {type Intent, intentApi} from "../../../api/intent.api"
import {type Activite, activiteApi} from "../../../api/activite.api"




const ResponseBase = () => {
  const [responseBases, setResponseBases] = useState<ResponseBase[]>([]);
  const [intents, setIntents] = useState<Intent[]>([]);
  const [activites, setActivites] = useState<Activite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");


  //Liste intent 
  useEffect(() => {
    async function load(){
      try{
        const rep = await intentApi.getAll()
        setIntents(rep.data)
      }catch(error){
      } finally{
        setLoading(false)
      }
    }
    load()
  }, [])


   //Liste activité 
  useEffect(() => {
    async function load(){
      try{
        const rep = await activiteApi.getAll()
        setActivites(rep.data)
      }catch(error){
      } finally{
        setLoading(false)
      }
    }
    load()
  }, [])


  const  FaqCols:  Column<ResponseBase>[] = [
  
  {
    key: 'intent_id',
    header: 'IdIntent',
    sortable: true,
    
  },
  {
    key: 'intent_id',
    header: 'Intents',
    sortable: true,
    render:(_value, row) => {
      if (!row.intent_id) return "-";
      const intent = intents.find( b => b.id === row.intent_id) 
      return intent?.nom|| '-'
    }
  },

  

  {
    key: 'activite_id',
    header: 'Activités',
    sortable: true,
    render:(_value, row) => {
      if (!row.intent_id) return "-";
      const activite = activites.find( b => b.id === row.activite_id) 
      return activite?.nom || '-'
    }
  },

  {
    key: 'lang',
    header: 'Lang',
    sortable: true,
  },

  {
    key: 'response',
    header: 'Réponse',

  },

  {
    key: 'params',
    header: 'Paramètre',
  },

  {
    key: 'variant',
    header: 'Variant',
  },
 
];






  /* =========================
    FETCH DATA
  ========================= */
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await responseBaseApi.getAll();

        console.log("🔥 RESPONSE Faqdefault:", res);
        const data = res?.data;

        setResponseBases(data);
      } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError("Erreur lors du chargement des Reponse de base");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  /* =========================
     DELETE BUSINESS
  ========================= */
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Voulez-vous supprimer cette reponse?"
    );

    if (!confirmDelete) return;

    try {
      await responseBaseApi.delete(id);

      setResponseBases((prev) =>
        prev.filter((b) => b.id !== id)
      );

      console.log("🗑️ Deleted:", id);
    } catch (err) {
      console.error("❌ DELETE ERROR:", err);
      alert("Erreur lors de la suppression");
    }
  };

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return <p>⏳ Chargement...</p>;
  }

  /* =========================
     ERROR
  ========================= */
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }






  /* =========================
     UI
  ========================= */
  return (
    <DashLayout>
      
      <PageMeta
        title="Liste des Agents IA"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Response" />

      <ComponentCard  
        title="Base de connaisance"
        desc = "Ajouter une Question"
      >
        <div>
          <div>
            <div className="flex justify-end">
              <Button size="sm" variant="primary" className="bg-gray-600">
                <a href = "/admin/response_base">Ajouter Response</a>
              </Button>
            </div>
          </div>
          <DynamicTable 
            data={responseBases} 
            columns={ FaqCols }
            actions={(responseBase) => (
              
              <div className="flex gap-1 justify-end">
                <Button  size="sm" variant="primary" className="bg-green-600 px-0 py-0">
                  <Link to = {`/admin/response_base/${responseBase.id}`}><Edit  size="15"/></Link>
                </Button> 
                <Button  size ="sm" variant="primary" onClick={() =>handleDelete(responseBase.id)} className="bg-red-600 px-2">
                  <Trash2  size="15"/>
                </Button>
               
              </div>
            )}
              
          >

          </DynamicTable>
        </div>
      </ComponentCard>
    </DashLayout>
  );
};

export default ResponseBase;