import { useState, useEffect } from "react";

import { useNavigate, Link, useParams } from "react-router-dom";

import DashLayout from "../../../layouts/DashLayout";



import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";


import ComponentCard from "../../../components/common/ComponentCard";

import Label from "../../../components/form/Label.tsx";
import Inputfield from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import TextArea from "../../../components/form/input/TextArea.tsx";

import {type ResponseBase, responseBaseApi} from "../../../api/responseBase.api"
import {type Activite, activiteApi} from "../../../api/activite.api"
import {type Intent, intentApi} from "../../../api/intent.api"

export default function ResponseBaseCreate() {
  const { id } = useParams()
  
  const [responseBases, setResponseBases] = useState<ResponseBase[]>([]);
  const [activites, setActivites] = useState<Activite[]>([]);
  const [intents, setIntents] = useState<Intent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  // Select activite
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
   
    setForm((prev) => ({
      ...prev,
      activite_id: value === 'null'? null : value
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

  //Select Lang
  const handleSelectLang = (value: string) => {
    console.log("Selected value:", value);
    setForm((prev) => ({
      ...prev,
      lang: value
    })); 
  };



  const isEdit =!!id;

  const[form, setForm] = useState<Omit<ResponseBase, 'id'>>({ 
    activite_id: '' ,
    intent_id: '',
    variant: '',
    response: '',
    params: JSON.stringify({}),
    priority: '',
    lang: '',
    is_active:true
  });
   


  const navigate = useNavigate();

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
  



  useEffect(() => {
    if(isEdit){
      responseBaseApi.getById(id).then(data => {
        setForm( data.data)
      })
    }
  }, [id, isEdit]);

  const optionActives = [
    {value: 'null', label: 'Toutes les activites'}, 
    ...activites.map(a => ({ value: a.id, label:a.nom}))
  ];

  const optionIntents = intents.map(a => ({ value: a.id, label:a.nom}));
  const optionLang = [{value: 'fr', label:'Fancais'}, {value: 'en', label:'Englais'}];

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    
    try {
      if(isEdit){
       
        await responseBaseApi.update((id), form)
      } else {
        
        await responseBaseApi.create(form)
      }

      navigate('/admin/response_bases')

    } catch(err){
      console.log(err)

    }finally{
      setLoading(false)
    }
  };

  return (
    <DashLayout>
      <PageMeta
        title={isEdit ? "Modifier un agent" : "Créer un agent"} 
       
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Agent IA" />

      <ComponentCard  
        title={isEdit ? "Modifier" : "Créer"}
        desc = "Ajouter une Question"
      >                 
        <form onSubmit={handleSubmit} className="space-y-4">
          
            
            <div className="grid grid-cols-12 gap-6">

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
                
                <div className="col-span-12 md:col-span-4">
                  <Label>Choisir une langue</Label>
                  <Select
                    name="land"
                    options = {optionLang}
                    placeholder = "Select une activité"
                    onChange={handleSelectLang}
                    defaultValue= { isEdit ? String(form.lang)  : ""}
                  />
                </div>

                

                <div className="col-span-4">
                  <Label>Priority</Label>
                  <Inputfield
                    name="priority"
                    placeholder="Priority"
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  />
                </div>
                <div className="col-span-4">
                  <Label>Variant</Label>
                  <Inputfield
                    name="variant"
                    placeholder="Variant"
                    value={form.variant}
                    onChange={(e) => setForm({ ...form, variant: e.target.value })}
                  />
                </div>

                <div className="col-span-12">
                  <Label>Pametres</Label>
                  <Inputfield
                    name="params"
                    placeholder="Les parametres"
                    value={form.params}
                    onChange={(e) => setForm({ ...form, params: e.target.value })}
                  />
                </div>
            
                <div className=" col-span-12">
                  <Label>Réponse</Label>
                  <TextArea
                    name="response_default"
                    value={form.response}
                    onChange={(value) => setForm({ ...form, response: value })}
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
     
 

