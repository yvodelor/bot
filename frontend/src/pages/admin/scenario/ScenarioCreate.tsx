import { useState, useEffect } from "react";

import { useNavigate, Link, useParams } from "react-router-dom";

import {type Scenario, scenarioApi} from "../../../api/scenario.api"
import {type Activite, activiteApi} from "../../../api/activite.api"
import {type Intent, intentApi} from "../../../api/intent.api"

import DashLayout from "../../../layouts/DashLayout.tsx";



import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label.tsx";
import Inputfield from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import Select from "../../../components/form/Select";


export default function IntentCreate() {
  const {id} = useParams()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activites, setActivites] = useState<Activite[]>([]);
  const [intents, setIntents] = useState<Intent[]>([]);
  const navigate = useNavigate();

  const isEdit =!!id;

    // Select activite
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
    setForm((prev) => ({
      ...prev,
      activite_id: value
    })); 
  };

  //Select intent
  const handleSelectIntent = (value: string) => {
    console.log("Selected value:", value);
    setForm((prev) => ({
      ...prev,
      intent_id: value
    })); 
  };

  const[form, setForm] = useState<Omit<Scenario, 'id'>> ({
    activite_id: '',
    intent_id: '',
    name: '',
    description: '',
    is_active: true
     
  });

 // Chargement des activités
  useEffect(() => {
    const fetchActivites = async () => {
      try{
        const res = await activiteApi.getAll();
        console.log("🔥 RESPONSE Activite:", res);
        const data = res.data ;
        setActivites(data);

       } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError("Erreur lors du chargement des les activite");
      }
    };
    fetchActivites();
  }, []);

  //Chargement des intents
  useEffect(() => {
    const fetchIntents = async () => {
      try{
        const res = await intentApi.getAll();
        console.log("🔥 RESPONSE intents:", res);
        const data = res.data;
        setIntents(data);

       } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError("Erreur lors du chargement des les activite");
      }
    };
    fetchIntents();
  }, []);
  
  const optionActives = activites.map(a => ({ value: a.id, label:a.nom}));
  const optionIntents = intents.map(a => ({ value: a.id, label:a.nom}));
  

  useEffect(() => {
    if(isEdit){
        scenarioApi.getById(id).then(data => {
        setForm( data.data)
      })
    }
  }, [id, isEdit]);



 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    
    try {
      if(isEdit){
        await scenarioApi.update((id), form)
      } else {
        await scenarioApi.create(form)
      }

      navigate('/admin/scenarios')

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

                <div className="col-span-12 md:col-span-6">
                  <Label>Type d'activité</Label>
                  <Select
                    name="activite_id"
                    options = {optionActives}
                    placeholder = "Select une activité"
                    onChange={handleSelectChange}
                    defaultValue= { isEdit ? String(form.activite_id)  : ""}
                  />
                </div>
                
                <div className="col-span-12 md:col-span-6">
                  <Label>Type Intent</Label>
                  <Select
                    name="intent_id"
                    options = {optionIntents}
                    placeholder = "Select une activité"
                    onChange={handleSelectIntent}
                    defaultValue= { isEdit ? String(form.intent_id)  : ""}
                  />
                </div>

                <div className="col-span-12">
                  <Label>Nom</Label>
                  <Inputfield
                    name="code"
                    placeholder="Nom de l'intent"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="col-span-12 md:col-span-12">
                    <Label>Keywords</Label>
                    <TextArea
                        name="description"
                        placeholder="keyword1, keyword2, keyword3..."
                        value={form.description}
                        onChange={(value) => setForm({ ...form, description: value })}
                        rows={6}
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
     
 

