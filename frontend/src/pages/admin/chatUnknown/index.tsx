// src/pages/business/index.tsx

import { useEffect, useState } from "react";

import {type ChatNo, chatNoApi} from "../../../api/chatNo.api"

import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import DashLayout from "../../../layouts/DashLayout";
import { DynamicTable} from "../../../components/tables/DynamicTable";
import type{ Column } from "../../../components/tables/DynamicTable";
import  Button  from "../../../components/button/Button";
import ComponentCard from "../../../components/common/ComponentCard";



import {Trash2} from 'lucide-react'
/* =========================
   TYPE (sans ORM)
========================= */


const  ChatNoCols:  Column<ChatNo>[] = [ 
  {
    key: 'message',
    header: 'Mesaage',
    sortable: true,
  },
  {
    key: 'business_id',
    header: 'business_id',
    sortable: true,
  },
  {
    key: 'intent_id',
    header: 'intent_id',
    sortable: true,
  },



];



const chatUnknown = () => {
  const [chatNos, setChatNos] = useState<ChatNo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


 
  

  useEffect(() => {
    async function load(){
      try{
        const rep = await chatNoApi.getAll()
        console.log(rep);
        setChatNos(rep)
      }catch(error){
        console.log('Erreur');
      } finally{
        setLoading(false)
      }
    }
    load()
  }, [])
  

  /* =========================
     DELETE BUSINESS
  ========================= */
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Voulez-vous supprimer cette reponse?"
    );

    if (!confirmDelete) return;

    try {
      await chatNoApi.delete(id);

      setChatNos((prev) =>
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
          
          <DynamicTable 
            data={chatNos} 
            columns={ ChatNoCols }
            actions={(chatNo) => (
              
              <div className="flex gap-1 justify-end">
               
                <Button  size ="sm" variant="primary" onClick={() =>handleDelete(chatNo.id)} className="bg-red-600 px-2">
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

export default chatUnknown;