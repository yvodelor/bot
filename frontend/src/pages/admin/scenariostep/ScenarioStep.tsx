import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {type ScenarioStep, scenarioStepApi} from "../../../api/scenarioStep.api.ts"
import {type Scenario, scenarioApi} from "../../../api/scenario.api.ts"

import DashLayout from "../../../layouts/DashLayout.tsx";



import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";

import ComponentCard from "../../../components/common/ComponentCard.tsx";
import Label from "../../../components/form/Label.tsx";
import Inputfield from "../../../components/form/input/InputField.tsx";
import TextArea from "../../../components/form/input/TextArea.tsx";
import Select from "../../../components/form/Select";


export default function ScenarioStepCreate() {
  const {id} = useParams()

  const [loading, setLoading] = useState(false);

  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const navigate = useNavigate();

  const isEdit =!!id;

  const[form, setForm] = useState<Omit<ScenarioStep, 'id'>> ({

    scenario_id: '',
    type_champ: '',
    variable: '',
    question: '',
    step_order: '',
    config: '{}'
     
  });


  

  useEffect(() => {
    if(isEdit){
      scenarioStepApi.getById(Number(id)).then(data => {
       if(data !== null) setForm( data)
      })
    }
  }, [id, isEdit]);

  //Select intent
  const handleSelect = (value: string) => {
    console.log("Selected value:", value);
    setForm((prev) => ({
      ...prev,
      scenario_id: value
    })); 
  };

   //Chargement des scenarios
    useEffect(() => {
      const fetchScenarios = async () => {
        try{
          const res = await scenarioApi.getAll();
          console.log("🔥 RESPONSE scenarios:", res);
          const data = res;
          setScenarios(data);
  
        } catch (err) {
          console.error("❌ FETCH ERROR:", err);
     
        }
      };
      fetchScenarios ();
    }, []);
    
    const optionScenarios = scenarios.map(a => ({ value: a.id, label:a.name}));





 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    
    try {
      const payload = {
          ...form,
          config: JSON.parse(form.config)
      };


      if(isEdit){
          await scenarioStepApi.update(Number(id), payload);
      }else{
          await scenarioStepApi.create(payload);
      }

      navigate('/admin/scenario_steps')

    } catch(err){
      console.log(err)

    }finally{
      setLoading(false)
    }
  };

  return (
    <DashLayout>
      <PageMeta
        title="Modifier un agent Créer un agent" 
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Agent IA" />

      <ComponentCard  
        title="Modifier Créer"
        desc = "Ajouter une Question"
      >                 
        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-12 md:col-span-4">
                  <Label>Type de scenario</Label>
                  <Select
                    name="activite_id"
                    options = {optionScenarios}
                    placeholder = "Select un scenario"
                    onChange={handleSelect}
                    defaultValue= { isEdit ? String(form.scenario_id)  : ""}
                  />
                </div>

                <div className="col-span-12 md:col-span-2">
                  <Label>Ordre</Label>
                  <Inputfield
                    name="step_order"
                    placeholder="Ordre"
                    value={form.step_order}
                    onChange={(e) => setForm({ ...form, step_order: e.target.value })}
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <Label>Type Champ</Label>
                  <Inputfield
                    name="type_champ"
                    placeholder="Champ"
                    value={form.type_champ}
                    onChange={(e) => setForm({ ...form, type_champ: e.target.value })}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Label>Config</Label>
                  <Inputfield
                    name="config"
                    placeholder="{}"
                    value={form.config}
                    onChange={(e) => setForm({ ...form, config: e.target.value })}
                  />
                </div>

                <div className="col-span-12">
                  <Label>Variable</Label>
                  <Inputfield
                    name="variable"
                    placeholder="Variables"
                    value={form.variable}
                    onChange={(e) => setForm({ ...form, variable: e.target.value })}
                  />
                </div>

                

                <div className="col-span-12 md:col-span-12">
                    <Label>Question</Label>
                    <TextArea
                        name="keywords"
                        placeholder="Question etape scenario"
                        value={form.question}
                        onChange={(value) => setForm({ ...form, question: value })}
                        rows={3}
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
     
 

