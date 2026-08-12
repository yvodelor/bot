// src/pages/business/index.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type FaqDefault, faqDefaultApi } from "../../../api/faq.api";

import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import DashLayout from "../../../layouts/DashLayout";
import { DynamicTable} from "../../../components/tables/DynamicTable";
import type{ Column } from "../../../components/tables/DynamicTable";
import  Button  from "../../../components/button/Button";
import ComponentCard from "../../../components/common/ComponentCard";



import {Edit, Trash2, BookOpen} from 'lucide-react'


/* =========================
   TYPE (sans ORM)
========================= */


const  FaqCols:  Column<FaqDefault>[] = [
 
  {
    key: 'intent_id',
    header: 'Intent',
    sortable: true,
  },

   {
    key: 'activite_id',
    header: 'Activité',
    sortable: true,

  },
  
  {
    key: 'keywords',
    header: 'Keywords',

  },

  {
    key: 'question',
    header: 'Question',
  },

  {
    key: 'reponse',
    header: 'Réponse',
  },

  {
    key: 'priority',
    header: 'Priority',
  },

  {
    key: 'embedding',
    header: 'Embedding',
    render: (_value, row) =>{
      const emb = row.embedding;
      if(!emb) return '-';
      return `${emb.length} dimensions`
    }
   
  }, 
];



const FaqDefaultPage = () => {
  
  const [faqs, setFaqs] = useState<FaqDefault[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  /* =========================
    FETCH DATA
  ========================= */
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await faqDefaultApi.getAll()

        console.log("🔥 RESPONSE Faqdefault:", res);

        // compatible API (data wrapper ou direct array)
        const data = res.data;

        setFaqs(data);
      } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError("Erreur lors du chargement des faq");
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
      "Voulez-vous supprimer ce Faq?"
    );

    if (!confirmDelete) return;

    try {
      await faqDefaultApi.delete(id);

      setFaqs((prev) =>
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
      <PageBreadcrumb pageTitle="Agent IA" />

      <ComponentCard  
        title="Base de connaisance"
        desc = "Ajouter une Question"
      >
        <div>
          <div>
            <div className="flex justify-end">
              <Button size="sm" variant="primary" className="bg-gray-600">
                <Link to = "/admin/faq_default">Ajouter un Faq</Link>
              </Button>
            </div>
          </div>
          <DynamicTable 
            data={faqs} 
            columns={ FaqCols }
            actions={(faqDefault) => (
              
              <div className="flex gap-1 justify-end">
                <Button  size="sm" variant="primary" className="bg-green-600 px-0 py-0">
                  <Link to  = {`/admin/faq_default/${faqDefault.id}`}><Edit  size="15"/></Link>
                </Button> 
                <Button  size ="sm" variant="primary" onClick={() =>handleDelete(faqDefault.id)} className="bg-red-600 px-2">
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

export default FaqDefaultPage;