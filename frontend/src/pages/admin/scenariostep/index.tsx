// src/pages/business/index.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {type ScenarioStep, scenarioStepApi} from "../../../api/scenarioStep.api"
import {type Scenario, scenarioApi} from "../../../api/scenario.api"

import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import DashLayout from "../../../layouts/DashLayout";
import { DynamicTable} from "../../../components/tables/DynamicTable";
import type{ Column } from "../../../components/tables/DynamicTable";
import  Button  from "../../../components/button/Button";
import ComponentCard from "../../../components/common/ComponentCard";

import {Edit, Trash2} from 'lucide-react'






const ScenarioStep = () => {
  const [scenarioSteps, setScenarioSteps] = useState<ScenarioStep[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function load(){
      try{
        const rep = await scenarioApi.getAll()
        console.log(rep);
        setScenarios(rep.data)
      }catch(error){
        console.log('Erreur', error);
      } finally{
        setLoading(false)
      }
    }
    load()
  }, [])
 
  
  const  ScenarioStepCols:  Column<ScenarioStep>[] = [ 
  {
    key: 'scenario_id',
    header: 'Scenario',
    sortable: true,
  },

  {
    key: 'step_order',
    header: 'Ordre',
    sortable: true,
  },

  {
    key: 'question',
    header: 'Questions',
  },

  {
    key: 'type_champ',
    header: 'Champ',
  },

  {
    key: 'variable',
    header: 'Variable',
  },
  {
    key: 'config',
    header: 'Config.',
  },

];


  useEffect(() => {
    async function load(){
      try{
        const rep = await scenarioStepApi.getAll()
        console.log(rep);
        setScenarioSteps(rep.data)
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
      await scenarioStepApi.delete(id);

      setScenarioSteps((prev) =>
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
                <Link to = "/admin/scenario_step">Ajouter scenario step</Link>
              </Button>
            </div>
          </div>
          <DynamicTable 
            data={scenarioSteps} 
            columns={ ScenarioStepCols }
            actions={(scenarioStep) => (
              
              <div className="flex gap-1 justify-end">
                <Button  size="sm" variant="primary" className="bg-green-600 px-0 py-0">
                  <Link to = {`/admin/scenario_step/${scenarioStep.id}`}><Edit  size="15"/></Link>
                </Button> 
               
                <Button  size ="sm" variant="primary" onClick={() => handleDelete(scenarioStep.id)} className="bg-red-600 px-2">
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

export default ScenarioStep;