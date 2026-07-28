import { useState, useEffect } from "react";

import { useNavigate, Link, useParams } from "react-router-dom";
import {type Topic, topicApi} from "../../../api/topic.api"
import {type Activite, activiteApi} from "../../../api/activite.api"

import DashLayout from "../../../layouts/DashLayout.tsx";



import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";


import ComponentCard from "../../../components/common/ComponentCard.tsx";

import Label from "../../../components/form/Label.tsx";
import Inputfield from "../../../components/form/input/InputField.tsx";
import Select from "../../../components/form/Select.tsx";


import TextArea from "../../../components/form/input/TextArea.tsx";



export default function TopicCreate() {
  const {id} = useParams()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activites, setActivites] = useState<Activite[]>([]);


  const isEdit =!!id;

  const[form, setForm] = useState<Omit<Topic, 'id'>> ({
    code : '',
    activite_id: '',
    keywords: '',
    embedding: '' 
  });

  // Select activite
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
   
    setForm((prev) => ({
      ...prev,
      activite_id: value === 'null'? null : value
    })); 
  };



  useEffect(() => {
      if(isEdit){
        topicApi.getById(id).then(data => {
          setForm( data.data)
        })
      }
    }, [id, isEdit]);

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
    
    const optionActives = [
      {value: 'null', label: 'Toutes les activites'}, 
      ...activites.map(a => ({ value: a.id, label:a.nom}))
    ];
  


  const navigate = useNavigate();
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    
    try {
      if(isEdit){
        await topicApi.update((id), form)
      } else {
        await topicApi.create(form)
      }

      navigate('/admin/topics')

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
                  <Label>Code du Topic</Label>
                  <Inputfield
                    name="code"
                    placeholder="Nom du topic"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
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

                <div className="col-span-12 md:col-span-12">
                    <Label>Keywords</Label>
                    <Inputfield
                        name="keywords"
                        placeholder=""
                        value={form.keywords}
                        onChange={(e) => setForm({ ...form, keywords: e.target.value })}
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
     
 

