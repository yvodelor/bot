// src/pages/business/index.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {type Intent, intentApi} from "../../../api/intent.api"
import {type Activite, activiteApi} from "../../../api/activite.api"

import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import DashLayout from "../../../layouts/DashLayout";
import { DynamicTable} from "../../../components/tables/DynamicTable";
import type{ Column } from "../../../components/tables/DynamicTable";
import  Button  from "../../../components/button/Button";
import ComponentCard from "../../../components/common/ComponentCard";



import {Edit, Trash2} from 'lucide-react'
/* =========================
   TYPE (sans ORM)
========================= */






const Intents = () => {

  const [intents, setIntents] = useState<Intent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [activites, setActivites] = useState<Activite[]>([]);

 
  

  useEffect(() => {
    async function load(){
      try{
        const rep = await intentApi.getAll()
        console.log(rep);
        setIntents(rep.data)
      }catch(error){
        console.log('Erreur');
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

const  IntentCols:  Column<Intent>[] = [ 
  {
    key: 'id',
    header: 'Id',
    sortable: true,
  },
  {
    key: 'nom',
    header: 'Nom',
    sortable: true,
  },

  {
    key: 'groupe_id',
    header: 'Groupe',
    sortable: true,
  },

  {
    key: 'activite_id',
    header: 'Activite',
    sortable: true,
  
    render:(_value, row) => {
      if (!row.activite_id) return "-";
      const activite = activites.find( b => b.id === row.activite_id) 
      return activite?.nom || '-'
    }
  },

  {
    key: 'keywords',
    header: 'Keywords FR',
  },
  {
    key: 'keywords_en',
    header: 'Keywords EN',
  },

  {
    key: 'priority',
    header: 'Priority',
  },

];





  /* =========================
     DELETE BUSINESS
  ========================= 
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Voulez-vous supprimer cette reponse?"
    );

    if (!confirmDelete) return;

    try {
      await deleteResponseBase(id);

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
                <Link to = "/admin/intent">Ajouter intent</Link>
              </Button>
            </div>
          </div>
          <DynamicTable 
            data={intents} 
            columns={ IntentCols }
            actions={(intent) => (
              
              <div className="flex gap-1 justify-end">
                <Button  size="sm" variant="primary" className="bg-green-600 px-0 py-0">
                  <Link to = {`/admin/intent/${intent.id}`}><Edit  size="15"/></Link>
                </Button> 
                {/* 
                <Button  size ="sm" variant="primary" onClick={() =>handleDelete(intent.id)} className="bg-red-600 px-2">
                  <Trash2  size="15"/>
                </Button>
                */}
              </div>
            )}
              
          >

          </DynamicTable>
        </div>
      </ComponentCard>
    </DashLayout>
  );
};

export default Intents;