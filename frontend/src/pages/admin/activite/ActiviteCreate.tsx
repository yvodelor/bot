import { useState, useEffect } from "react";

import { useNavigate, Link, useParams } from "react-router-dom";
import {type Activite, activiteApi} from "../../../api/activite.api.ts"

import DashLayout from "../../../layouts/DashLayout.tsx";



import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";

import ComponentCard from "../../../components/common/ComponentCard.tsx";
import Label from "../../../components/form/Label.tsx";
import Inputfield from "../../../components/form/input/InputField.tsx";
import TextArea from "../../../components/form/input/TextArea.tsx";



export default function IntentCreate() {
  const {id} = useParams()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isEdit =!!id;

  const[form, setForm] = useState<Omit<Activite, 'id'>> ({
    nom : '',
    is_active: true   
  });


  

  useEffect(() => {
    if(isEdit){
      activiteApi.getById(id).then(data => {
        setForm( data.data)
      })
    }
  }, [id, isEdit]);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    
    try {
      if(isEdit){
        await activiteApi.update((id), form)
      } else {
        await activiteApi.create(form)
      }

      navigate('/admin/activites')

    } catch(err){
      console.log(err)

    }finally{
      setLoading(false)
    }
  };

  return (
    <DashLayout>
      <PageMeta
        title="Ajouter ou Modifier d'une activité" 
        />
      <PageBreadcrumb pageTitle="Agent IA" />

      <ComponentCard  
        title="Modifier Créer"
        desc = "Ajouter une Question"
      >                 
        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-12">
                  <Label>Nom</Label>
                  <Inputfield
                    name="code"
                    placeholder="Nom de le l'activité"
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
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
     
 

