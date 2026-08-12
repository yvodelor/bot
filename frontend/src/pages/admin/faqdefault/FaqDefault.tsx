import { useState, useEffect } from "react";

import { useNavigate, Link, useParams } from "react-router-dom";

import { type FaqDefault, faqDefaultApi } from "../../../api/faq.api.ts";
import { type Activite, activiteApi } from "../../../api/activite.api";
import { type Intent, intentApi } from "../../../api/intent.api";

import DashLayout from "../../../layouts/DashLayout.tsx";



import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";


import ComponentCard from "../../../components/common/ComponentCard";

import Label from "../../../components/form/Label";
import Inputfield from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";

import TextArea from "../../../components/form/input/TextArea";




export default function FaqDefault() {
  const { id } = useParams()
  
  const [faqs, setFaqs] = useState<FaqDefault[]>([]);
  const [activites, setActivites] = useState<Activite[]>([]);
  const [intents, setIntents] = useState<Intent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const[form, setForm] = useState<Omit<FaqDefault, 'id'>>({ 

    intent_id :'null',
    question : '',
    keywords: '',
    reponse: '',
    activite_id: 'null',
   
    priority: ''
   
  });
  

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);

    setForm((prev) => ({
      ...prev,
      intent_id: value === 'null'? null : value
    }));   
  };

  const handleSelectChangeIntent = (value: string) => {
    console.log("Selected value:", value);
    setForm((prev) => ({
      ...prev,
      activite_id: value === 'null'? null : value
    }));   
  };

 



  const isEdit =!!id;
  const navigate = useNavigate();

  // Chargement des activite
  useEffect(() => {
    const fetchActivites = async () => {
      try{
        const res = await activiteApi.getAll();
        console.log("🔥 RESPONSE Activite:", res);
        const data = res.data;
        setActivites(data);

       } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError("Erreur lors du chargement des activite");
      }
    };
    fetchActivites();
  }, []);
  
  const optionActivites = [
    {value: 'null', label: 'Toutes les activites'}, 
    ...activites.map(a => ({ value: a.id, label:a.nom}))
  ]; 


  // Chargement des Intents
  useEffect(() => {
    const fetchIntents = async () => {
      try{
        const res = await intentApi.getAll();
        console.log("RESPONSE Intents", res);
        const data = res.data;
        setIntents(data);

       } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError("Erreur lors du chargement Intents");
      }
    };
    fetchIntents();
  }, []);
  
  const optionIntents = [
     {value: 'null', label: 'Toutes les intents'},
    ...intents.map(a => ({ value: String(a.id), label:a.nom}))
  ];

  useEffect(() => {
    if(isEdit){
      faqDefaultApi.getById(id).then(data => {
        setForm( data.data)
      })
    }
  }, [id, isEdit]);



  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    
    try {
      if(isEdit){
      
        await faqDefaultApi.update((id), form)
      } else {
        
        await faqDefaultApi.create(form)
      }

      navigate('/admin/faq_defaults')

    } catch(err){
      console.log('erreur: ', err)

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
          
       
            <div className="grid grid-cols-12 gap-4">
             
                <div className="col-span-12 md:col-span-4">
                  <Label>Type d'intents'</Label>
                  <Select
                    name="intent_id"
                    options = {optionIntents}
                    placeholder = "Select un intent"
                    onChange={handleSelectChangeIntent}
                    defaultValue= { isEdit ? String(form.intent_id)  : ""}
                  />
                </div>

                <div className="col-span-12 md:col-span-4">
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
                    <Label>Priority</Label>
                    <Inputfield
                      name="priority"
                      placeholder=""
                      value={form.priority}
                      onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    />
                </div>

                <div className="col-span-12">
                  <Label>Keyword</Label>
                  <Inputfield
                    name="keywords"
                    placeholder="Nom de l'entreprise"
                    value={form.keywords}
                    onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                  />
                </div>

                <div className="col-span-12">
                  <Label>Question</Label>
                  <Inputfield
                    name="name"
                    placeholder="Nom de l'entreprise"
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                  />
                </div>


                <div className=" col-span-12">
                  <Label>Réponse</Label>
                  <TextArea
                    name="reponse"
                    value={form.reponse}
                    onChange={(value) => setForm({ ...form, reponse: value })}
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
     
 

