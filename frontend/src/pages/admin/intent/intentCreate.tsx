import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {type Intent, intentApi} from "../../../api/intent.api"

import DashLayout from "../../../layouts/DashLayout.tsx";



import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";

import ComponentCard from "../../../components/common/ComponentCard.tsx";
import Label from "../../../components/form/Label.tsx";
import Inputfield from "../../../components/form/input/InputField.tsx";
import TextArea from "../../../components/form/input/TextArea.tsx";

import Select from "../../../components/form/Select";

import {type Activite, activiteApi} from "../../../api/activite.api"
import {type Scenario, scenarioApi} from "../../../api/scenario.api"
import { type Groupe, groupeApi } from "../../../api/groupe.api"


export default function IntentCreate() {
  const {id} = useParams()

  const [loading, setLoading] = useState(false);

  const [activites, setActivites] = useState<Activite[]>([]);
  const [groupes, setGroupes] = useState<Groupe[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const navigate = useNavigate();

  

  const isEdit =!!id;


  // Select activite
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);  
    setForm((prev) => ({
      ...prev,
      activite_id: value === 'null' ? null : value
    })); 
  };

   // Select activite
  const handleSelectGroupe = (value: string) => {
    console.log("Selected value:", value);  
    setForm((prev) => ({
      ...prev,
      groupe_id: value === 'null' ? null : value
    })); 
  };

    // Select activite
  const handleSelectScenario = (value: string) => {
    console.log("Selected value:", value);  
    setForm((prev) => ({
      ...prev,
      scenario_id: value === 'null' ? null : value
    })); 
  };

  const[form, setForm] = useState<Omit<Intent, 'id'>> ({
    nom : '',
    keywords: '',
    lang: '',
    keywords_en: '',
    activite_id: null,
    scenario_id: null,
    groupe_id: null,
    priority: ''
     
  });



  

 

  // Chargement des activités
  useEffect(() => {
    const fetchActivites = async () => {
      try{
        const res = await activiteApi.getAll();
        console.log("🔥 RESPONSE Activite:", res);
        const data = res;
        setActivites(data);

       } catch (err) {
        console.error("❌ FETCH ERROR:", err);
      
      }
    };
    fetchActivites();
  }, []);

 
 

  // Chargement des scenario
  useEffect(() => {
    const load = async () => {
      try{
        const res = await scenarioApi.getAll();
        console.log("🔥 RESPONSE scenario:", res);
        const data = res ;
        setScenarios(data);

       } catch (err) {
        console.error("❌ FETCH ERROR:", err);
       
      }
    };
    load();
  }, []);

  //Chargement des groupes
  // Chargement des scenario
  useEffect(() => {
    const load = async () => {
      try{
        const res = await groupeApi.getAll();
        console.log("🔥 RESPONSE groupe:", res);
        const data = res;
        setGroupes(data);

       } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        
      }
    };
    load();
  }, []);

 
  const optionActives = [
    {value: 'null', label: 'Toutes les activites'}, 
    ...activites.map(a => ({ value: a.id, label:a.nom}))
  ];

  const optionGroupes = [
    {value: 'null', label: 'Toutes les groupes'}, 
    ...groupes.map(a => ({ value: a.id, label:a.name}))
  ];


  console.log('scenario', scenarios);
  const optionScenarios = [
    {value: 'null', label: 'Pas de scenario'}, 
    ...scenarios.map(a => ({ value: a.id, label: a.name }))
  ];

  useEffect(() => {
    if(isEdit){
      intentApi.getById(id).then(data => {
        if(data !== null) setForm( data)
      })
    }
  }, [id, isEdit]);

  
    





 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)


    try {
      if(isEdit){
        await intentApi.update((id), form)
      } else {
        await intentApi.create(form)
      }

      navigate('/admin/intents')

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
                  <Label>Nom</Label>
                  <Inputfield
                    name="nom"
                    placeholder="Nom de l'intent"
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  />
                </div>

                <div className="col-span-12 md:col-span-3">
                    <Label>Type d'activité</Label>
                    <Select
                      name="activite_id"
                      options = {optionActives}
                      placeholder = "Select une activité"
                      onChange={handleSelectChange}
                      defaultValue= { isEdit ? String(form.activite_id)  : ""}
                    />
                </div>
                <div className="col-span-12 md:col-span-3">
                    <Label>Groupe</Label>
                    <Select
                      name="goupe_id"
                      options = {optionGroupes}
                      placeholder = "Select un groupe"
                      onChange={handleSelectGroupe}
                      defaultValue= { isEdit ? String(form.groupe_id)  : ""}
                    />
                </div>
                <div className="col-span-12 md:col-span-3">
                    <Label>Type de Scenario</Label>
                    <Select
                      name="activite_id"
                      options = {optionScenarios}
                      placeholder = "Select un scenario"
                      onChange={handleSelectScenario}
                      defaultValue= { isEdit ? String(form.scenario_id)  : ""}
                    />
                </div>
                <div className="col-span-12 md:col-span-2">
                    <Label>Priority</Label>
                    <Inputfield
                      name="priority"
                      placeholder=""
                      value={form.priority}
                      onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    />
                </div>

                <div className="col-span-12 md:col-span-12">
                    <Label>Keywords FR</Label>
                    <TextArea
                        name="keywords"
                        placeholder="keyword1, keyword2, keyword3..."
                        value={form.keywords}
                        onChange={(value) => setForm({ ...form, keywords: value })}
                        rows={3}
                    />
                </div>

                <div className="col-span-12 md:col-span-12">
                    <Label>Keywords EN</Label>
                    <TextArea
                        name="keywords_en"
                        placeholder="keyword1, keyword2, keyword3..."
                        value={form.keywords_en}
                        onChange={(value) => setForm({ ...form, keywords_en: value })}
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
     
 

