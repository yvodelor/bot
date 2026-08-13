import { useState, useEffect } from "react";

import { useNavigate,  useParams } from "react-router-dom";
import {type Groupe, groupeApi} from "../../../api/groupe.api"

import DashLayout from "../../../layouts/DashLayout";



import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label.tsx";
import Inputfield from "../../../components/form/input/InputField";




export default function GroupeCreate() {
  const {id} = useParams()

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isEdit =!!id;

  const[form, setForm] = useState<Omit<Groupe, 'id'>> ({
    name : '',
    description: ''  
  });


  

  useEffect(() => {
    if(isEdit){
      groupeApi.getById(id).then(data => {
       if (data !== null) setForm( data)
      })
    }
  }, [id, isEdit]);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    
    try {
      if(isEdit){
        await groupeApi.update((id), form)
      } else {
        await groupeApi.create(form)
      }

      navigate('/admin/groupes')

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
        description= ""
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
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
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
     
 

