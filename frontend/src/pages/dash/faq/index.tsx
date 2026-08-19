// src/pages/business/index.tsx

import { useEffect, useState } from "react";
import { Link,  useParams } from "react-router-dom"; 
import { type Faq, faqApi } from "../../../api/faq.api";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import DashLayout from "../../../layouts/DashLayout";
import { DynamicTable} from "../../../components/tables/DynamicTable";
import type{ Column } from "../../../components/tables/DynamicTable";
import  Button  from "../../../components/button/Button";
import ComponentCard from "../../../components/common/ComponentCard";



import {Edit, Trash2, BookOpen } from 'lucide-react'
/* =========================
   TYPE (sans ORM)
========================= */

const  FaqCols:  Column<Faq>[] = [

  {
    key: 'question',
    header: 'Question',
    sortable: true,
  },

  {
    key: 'reponse',
    header: 'Réponse',
    sortable: true,
  },




 
];



const FaqPage = () => {
const [faqs, setFaqs] = useState<Faq[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string>("");

const { businessId } = useParams()
   

  /* =========================
    FETCH DATA
  ========================= */
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await faqApi.getByField('business_id', Number(businessId));

        console.log("🔥 RESPONSE Faqdefault:", res);

        // compatible API (data wrapper ou direct array)
        const data = res 

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
      await faqApi.delete(id);

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
        title="Liste des Faq"
        description="Tous vos faq"
      />
      <PageBreadcrumb pageTitle="Faq" />
        <div className="flex justify-end m-2">
          <Button size="sm" variant="primary" className="bg-gray-600">
            <Link to = {`/faq/business/${businessId}`}>Ajouter un faq</Link>
          </Button>
        </div>
          
      <ComponentCard  
        title="Foire aux questions"
        desc = "Vous pouvez ajouter des questions reponses pour permettre à vos agent de mieux repondre"
      >
        <div>
          
          <DynamicTable 
            data={faqs} 
            columns={ FaqCols }
            actions={(faq) => (
              
              <div className="flex gap-1 justify-end">
                <Button  size="sm" variant="primary" className="bg-green-600 px-0 py-0">
                  <a href = {`/faq/${faq.id}/business/${businessId}`}><Edit  size="15"/></a>
                </Button> 
                <Button  size ="sm" variant="primary" onClick={() =>handleDelete(faq.id)} className="bg-red-600 px-2">
                  <Trash2  size="15"/>
                </Button>
                <Button  size ="sm" variant="primary"  className="bg-blue-600 px-2">
                  <Link to = {`/faq/${faq.id}`}><BookOpen  size="15"/></Link>
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

export default FaqPage;