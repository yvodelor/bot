import { useState, useEffect } from "react";

import { useNavigate, Link, useParams } from "react-router-dom";

import DashLayout from "../../../layouts/DashLayout";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Inputfield from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";

import { type Faq, faqApi } from "../../../api/faq.api";



export default function Faq() {
  const {id, businessId } = useParams()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
 
  const isEdit =!!id;

  useEffect(() => {
    if(isEdit){
      faqApi.getById(id).then(data => {
        setForm( data.data)
      })
    }
  }, [id, isEdit]);

  const[form, setForm] = useState<Omit<Faq, 'id'>> ({
    question : '',
    reponse: '',
    business_id: businessId, 
  });


 
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    
    try {
      if(isEdit){
        await faqApi.update((id), form)
      } else {
        await faqApi.create(form)
      }

      navigate('/faqs')

    } catch(err){
      console.log(err)

    }finally{
      setLoading(false)
    }
  };

  return (
    <DashLayout>
      <PageMeta
        title="Modifier un agent Créer une question" 
        description="Foire aux questions"
      />
      <PageBreadcrumb pageTitle="Agent IA" />

      <ComponentCard  
        title="Modifier Créer"
        desc = "Ajouter une Question"
      >                 
        <form onSubmit={handleSubmit} className="space-y-4">
            <Inputfield
              name = "business_id"
              type = "hidden"
              value = {String(businessId) ?? form.business_id}
              onChange={(e) => setForm({ ...form, business_id: Number(e.target.value) })}
            />

            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-12">
                  <Label>Question</Label>
                  <Inputfield
                    name="question"
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
              {loading ? "En cours..."  : "Créer"}
            </button>
        </form>        
      </ComponentCard>
      
    </DashLayout>
  );
}
     
 

