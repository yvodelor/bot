// src/pages/business/index.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {type Ad, adApi} from "../../../api/ad.api"


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






const Ads = () => {

  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


 
  

  useEffect(() => {
    async function load(){
      try{
        const rep = await adApi.getAll()
        console.log(rep);
        setAds(rep)
      }catch(error){
        console.log('Erreur');
      } finally{
        setLoading(false)
      }
    }
    load()
  }, [])
  



const  AdsCols:  Column<Ad>[] = [ 
  {
    key: 'id',
    header: 'Id',
    sortable: true,
  },
  {
    key: 'placement',
    header: 'Placement',
    sortable: true,
  },

  {
    key: 'start_date',
    header: 'Groupe',
    sortable: true,
  },

  {
    key: 'end_date',
    header: 'Activite',
    sortable: true,
  
  },

];





  /* =========================
     DELETE BUSINESS
  =========================  */

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Voulez-vous supprimer cette reponse?"
    );

    if (!confirmDelete) return;

    try {
      await adApi.delete(id);

      setAds((prev) =>
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
                <Link to = "/admin/ad">Ajouter ad</Link>
              </Button>
            </div>
          </div>
          <DynamicTable 
            data={ads} 
            columns={ AdsCols }
            actions={(ad) => (
              
              <div className="flex gap-1 justify-end">
                <Button  size="sm" variant="primary" className="bg-green-600 px-0 py-0">
                  <Link to = {`/admin/ad/${ad.id}`}><Edit  size="15"/></Link>
                </Button> 
               
                <Button  size ="sm" variant="primary" onClick={() =>handleDelete(ad.id)} className="bg-red-600 px-2">
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

export default Ads;