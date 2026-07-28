import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {type  Bots, botsApi } from "../../../api/agent.api";

import DashLayout from "../../../layouts/DashLayout";

import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import ComponentCard from "../../../components/common/ComponentCard";

import Label from "../../../components/form/Label.tsx";
import Inputfield from "../../../components/form/input/InputField";




export default function BusinessCreate() {
  const { id } = useParams()

  const [loading, setLoading] = useState(false);
  const [bot, setBots] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const isEdit =!!id;

  const[form, setForm] = useState<Omit<Bots, 'id'>>({
    nom: '',   
    
  });

  const navigate = useNavigate();


  useEffect(() => {
    if(isEdit){
        botsApi.getById(id).then(data => {
        setForm( data.data)
      })
    }
  }, [id, isEdit]);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    
    try {
      if(isEdit){
       
        await botsApi.update((id), form)
      } else {
        
        await botsApi.create(form)
      }

      navigate('/agents')
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
          
          <ComponentCard    title="Agent IA" className ="">
            <div className="grid grid-cols-12 gap-4">
             
              <div className="col-span-12 md:col-span-6">
                <Label>Nom</Label>
                <Inputfield
                  name="name"
                  placeholder="Titre de l'Agent ai"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                />
              </div>
            
            </div>
          </ComponentCard>

        

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
     
 

