// src/pages/business/index.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {type Intent, intentApi} from "../../../api/intent.api"
import {type IntentEx, intentExApi} from "../../../api/intentEx.api"
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import DashLayout from "../../../layouts/DashLayout";
import { DynamicTable} from "../../../components/tables/DynamicTable";
import type{ Column } from "../../../components/tables/DynamicTable";
import  Button  from "../../../components/button/Button";
import ComponentCard from "../../../components/common/ComponentCard";
import {Edit, Trash2} from 'lucide-react'


const IntentExPage = () => {
  const [exemples, setExemples] = useState<IntentEx[]>([]);
  const [intents, setIntents] = useState<Intent[]>([]);
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
  
  //colone Intent exemples
  const  IntentExCols:  Column<IntentEx>[] = [ 
    {
      key: 'intent_id',
      header: 'IntentId',
      sortable: true,
   
    },
    {
      key: 'intent_id',
      header: 'Intent',
      sortable: true,
      render:(_value, row) => {
        if (!row.intent_id) return "-";
        const intent = intents.find( b => b.id === row.intent_id) 
        return intent?.nom || '-'
      }
    },

    {
      key: 'lang',
      header: 'Lang',
      sortable: true,
    },

    {
      key: 'phrase',
      header: 'Questions',
    },
    

    {
      key: 'embedding',
      header: 'Embedding',
      render: (_value, row) => {
        if (!row.embedding) return "-";

        const emb = typeof row.embedding === "string"
          ? JSON.parse(row.embedding)
          : row.embedding;

        return `${emb.length} dimensions`;
      }
    
    },
  ];





  //Liste intent Exemples
  useEffect(() => {
    async function load(){
      try{
        const rep = await intentExApi.getAll()
        console.log(rep);
        setExemples(rep.data)
      }catch(error){
        console.log('Erreur');
      } finally{
        setLoading(false)
      }
    }
    load()
  }, [])
  

  // Supprimer
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Voulez-vous supprimer cette reponse?"
    );

    if (!confirmDelete) return;

    try {
      await intentExApi.delete(id);

      setExemples((prev) =>
        prev.filter((b) => b.id !== id)
      );

      console.log("🗑️ Deleted:", id);
    } catch (err) {
      console.error("❌ DELETE ERROR:", err);
      alert("Erreur lors de la suppression");
    }
  };


  //Chargement
  if (loading) {
    return <p>⏳ Chargement...</p>;
  }

  //Erreur
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
                <Link to = "/admin/intent/exemple">Ajouter intent</Link>
              </Button>
            </div>
          </div>
          <DynamicTable 
            data={exemples} 
            columns={ IntentExCols }
            actions={(exemple) => (
              
              <div className="flex gap-1 justify-end">
                <Button  size="sm" variant="primary" className="bg-green-600 px-0 py-0">
                  <Link to = {`/admin/intent/exemple/${exemple.id}`}><Edit  size="15"/></Link>
                </Button> 
                
                <Button  size ="sm" variant="primary" onClick={() =>handleDelete(exemple.id)} className="bg-red-600 px-1 py-0">
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

export default IntentExPage;