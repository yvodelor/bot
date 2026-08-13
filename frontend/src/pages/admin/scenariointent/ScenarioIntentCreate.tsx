import { useState, useEffect } from "react";

import { useNavigate,  useParams } from "react-router-dom";
import DashLayout from "../../../layouts/DashLayout";

import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";


import Select, {type Option} from "../../../components/form/Select";

import {type Intent, intentApi} from "../../../api/intent.api"
import {type Scenario, scenarioApi} from "../../../api/scenario.api"
import { type ScenarioIntent, scenarioIntentApi } from "../../../api/scenarioIntent.api"


export default function ScenarioIntentCreate() {
  const {id} = useParams()

  const [loading, setLoading] = useState(false);

  const [intents, setIntents] = useState<Intent[]>([]);

  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const navigate = useNavigate();

  

  const isEdit =!!id;


  // Select activite
  const handleSelectIntent = (value: string) => {
    console.log("Selected value:", value);  
    setForm((prev) => ({
      ...prev,
      intent_id: value === 'null' ? '' : value
    })); 
  };

   // Select activite
  const handleSelectAction = (value: string) => {
    console.log("Selected value:", value);  
    setForm((prev) => ({
      ...prev,
      action: value === 'null' ? '' : value
    })); 
  };

    // Select activite
  const handleSelectScenario = (value: string) => {
    console.log("Selected value:", value);  
    setForm((prev) => ({
      ...prev,
      scenario_id: value === 'null' ? '' : value
    })); 
  };

  const[form, setForm] = useState<Omit<ScenarioIntent, 'id'>> ({

    intent_id: '',
    scenario_id: '',
    action: '',  
     
  });




  // Chargement desintents
  useEffect(() => {
    const fetchIntents = async () => {
      try{
        const res = await intentApi.getAll();
        console.log("🔥 RESPONSE Activite:", res);
        const data = res ;
        setIntents(data);

       } catch (err) {
        console.error("❌ FETCH ERROR:", err);
   
      }
    };
    fetchIntents();
  }, []);

 
 

  // Chargement des scenario
  useEffect(() => {
    const load = async () => {
      try{
        const res = await scenarioApi.getAll();
        console.log("🔥 RESPONSE scenario:", res);
        const data = res;
        setScenarios(data);

       } catch (err) {
        console.error("❌ FETCH ERROR:", err);
    
      }
    };
    load();
  }, []);

 
  const optionIntents =  intents.map(a => ({ value: a.id, label:a.nom})) ;
  const optionScenarios =  scenarios.map(a => ({ value: a.id, label: a.name })) ;

  const optionActions:  Option[]  = [
    {value: "continue", label: "Continue"},
    {value: "cancel", label: "Annuler"},
    {value: "ignored", label: "Ignorer"},
    
  ]

  useEffect(() => {
    if(isEdit){
      scenarioIntentApi.getById(id).then(data => {
        if( data !== null)  setForm( data)
      })
    }
  }, [id, isEdit]);

  
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)


    try {
      if(isEdit){
        await scenarioIntentApi.update((id), form)
      } else {
        await scenarioIntentApi.create(form)
      }

      navigate('/admin/scenario_intents')

    } catch(err){
      console.log(err)

    }finally{
      setLoading(false)
    }
  };

  return (
    <DashLayout>
      <PageMeta
        title="Modifier un agent Créer Scenario intent" 
        description=""
      />
      <PageBreadcrumb pageTitle=" Scenario intent" />

      <ComponentCard  
        title="Modifier Créer"
        desc = "Ajouter une Question"
      >                 
        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-12 gap-4">
               
                <div className="col-span-12 md:col-span-3">
                    <Label>Type de Scenario</Label>
                    <Select
                      name="scenario_id"
                      options = {optionScenarios}
                      placeholder = "Select un scenario"
                      onChange={handleSelectScenario}
                      defaultValue= { isEdit ? String(form.scenario_id)  : ""}
                    />
                </div> 

                <div className="col-span-12 md:col-span-3">
                    <Label>Type d'intents</Label>
                    <Select
                      name="intent_id"
                      options = {optionIntents}
                      placeholder = "Select un intent"
                      onChange={handleSelectIntent}
                      defaultValue= { isEdit ? String(form.intent_id)  : ""}
                    />
                </div> 

                 <div className="col-span-12 md:col-span-3">
                    <Label>Actions</Label>
                    <Select
                      name="action"
                      options = {optionActions}
                      placeholder = "Select une action"
                      onChange={handleSelectAction}
                      defaultValue= { isEdit ? String(form.action)  : ""}
                    />
                </div>     

            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {loading ? "En cours..." : isEdit ? "Mettre à jour" : "Créer"}
            </button>
        </form>        
      </ComponentCard>
      
    </DashLayout>
  );
}
     
 

