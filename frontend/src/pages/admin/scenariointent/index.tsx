// src/pages/business/index.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {type Intent, intentApi} from "../../../api/intent.api"
import {type Scenario, scenarioApi} from "../../../api/scenario.api"
import {type ScenarioIntent, scenarioIntentApi} from "../../../api/scenarioIntent.api"
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

  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [scenarioInts, setScenarioInts] = useState<ScenarioIntent[]>([]);
 
  

  useEffect(() => {
    async function load(){
      try{
        const rep = await intentApi.getAll()
        console.log(rep);
        setIntents(rep)
      }catch(error){
        console.log('Erreur');
      } finally{
        setLoading(false)
      }
    }
    load()
  }, [])

  
  useEffect(() => {
    async function load(){
      try{
        const rep = await scenarioIntentApi.getAll()
        console.log(rep);
        setScenarioInts(rep)
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
        const rep = await scenarioApi.getAll()
        setScenarios(rep)
      }catch(error){
      } finally{
        setLoading(false)
      }
    }
    load()
  }, [])

const  ScenarioIntentCols:  Column<ScenarioIntent>[] = [ 
  {
    key: 'id',
    header: 'Id',
    sortable: true,
  },



  {
    key: 'intent_id',
    header: 'Activite',
    sortable: true,
  
    render:(_value, row) => {
      if (!row.intent_id) return "-";
      const intent = intents.find( b => b.id === row.intent_id) 
      return intent?.nom || '-'
    }
  },

    {
    key: 'scenario_id',
    header: 'Scenario',
    sortable: true,
  
    render:(_value, row) => {
      if (!row.scenario_id) return "-";
      const scenario = scenarios.find( b => b.id === row.scenario_id) 
      return scenario?.name || '-'
    }
  },

  {
    key: 'action',
    header: 'Actions',
    sortable: true,
  },


];





  /* =========================
     DELETE BUSINESS
  ========================= */
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Voulez-vous supprimer cette reponse?"
    );

    if (!confirmDelete) return;

    try {
      await scenarioIntentApi.delete(id);

      setScenarioInts((prev) =>
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
        title="Liste des Scenario Intents"
        description=""
      />
      <PageBreadcrumb pageTitle="Scenario Intents" />

      <ComponentCard  
        title="Base de connaisance"
        desc = "Ajouter une Question"
      >
        <div>
          <div>
            <div className="flex justify-end">
              <Button size="sm" variant="primary" className="bg-gray-600">
                <Link to = "/admin/scenario_intent">Ajouter ScenarioIntent</Link>
              </Button>
            </div>
          </div>
          <DynamicTable 
            data={scenarioInts} 
            columns={ ScenarioIntentCols }
            actions={(scenarioInt) => (
              
              <div className="flex gap-1 justify-end">
                <Button  size="sm" variant="primary" className="bg-green-600 px-0 py-0">
                  <Link to = {`/admin/scenario_intent/${scenarioInt.id}`}><Edit  size="15"/></Link>
                </Button> 
                
                <Button  size ="sm" variant="primary" onClick={() =>handleDelete(scenarioInt.id)} className="bg-red-600 px-2">
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

export default Intents;