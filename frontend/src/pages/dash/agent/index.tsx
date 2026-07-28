// src/pages/business/index.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {type  Bots, botsApi } from "../../../api/agent.api";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import DashLayout from "../../../layouts/DashLayout";
import { DynamicTable} from "../../../components/tables/DynamicTable";
import type{ Column } from "../../../components/tables/DynamicTable";
import  Button  from "../../../components/button/Button";
import ComponentCard from "../../../components/common/ComponentCard";



import {Edit, Trash2, BookOpen} from 'lucide-react'


const  BotsCols:  Column<Bots>[] = [
 
  {
    key: 'name',
    header: 'Nom',
    sortable: true,
  },

  {
    key: 'slug',
    header: 'Slug',
    sortable: true,
  },
 
];



const AgentPage = () => {
  const [bots, setBots] = useState<Bots[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    const fetchBots = async () => {
      try {
        const res = await botsApi.getAll();

        console.log("🔥 RESPONSE Faqdefault:", res);
        const data = res.data;

        setBots(data);
      } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError("Erreur lors du chargement des Bots");
      } finally {
        setLoading(false);
      }
    };

    fetchBots();
  }, []);


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
                <a href = "/agent">Créer un agent</a>
              </Button>
            </div>
          </div>
          <DynamicTable 
            data={bots} 
            columns={ BotsCols }
            actions={(bot) => (
              
              <div className="flex gap-1 justify-end">
                <Button  size="sm" variant="primary" className="bg-green-600 px-0 py-0">
                  <Link to = {`/agent/${bot.id}`}><Edit  size="15"/></Link>
                </Button> 
                
                <Button  size ="sm" variant="primary"  className="bg-blue-600 px-2">
                  <Link to = {`/business/bot/${bot.id}`}><BookOpen  size="15"/></Link>
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

export default AgentPage;