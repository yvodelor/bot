import { useState, useEffect } from "react";

import { useNavigate, Link, useParams } from "react-router-dom";

import DashLayout from "../../../layouts/DashLayout.tsx";



import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";


import ComponentCard from "../../../components/common/ComponentCard.tsx";

import Label from "../../../components/form/Label.tsx";
import Inputfield from "../../../components/form/input/InputField.tsx";
import Select from "../../../components/form/Select.tsx";

import Input from "../../../components/form/input/InputField.tsx";
import TextArea from "../../../components/form/input/TextArea.tsx";
import Radio from "../../../components/form/input/Radio.tsx";
import Switch from "../../../components/form/switch/Switch.tsx";
import { getActivites } from "../../../api/activite.api.ts";
import { createFaqCustom, updateFaqCustom, getFaqCustomById } from "../../../api/faqCustom.api.ts";




type FaqCustom = {
  question: string
  keywords?: string;
  response: string;
  business_id: string;
  embedding?: string;
};


export default function FaqCustom() {
  const {id, businessId } = useParams()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLImageElement | HTMLSelectElement>) => {
    setForm(prev => ({...prev, [e.target.name]: e.target.value}))
  }
 const [selectedValue, setSelectedValue] = useState<string>("option2");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const isEdit =!!id;

  useEffect(() => {
    if(isEdit){
      getFaqCustomById(id).then(data => {
        setForm( data.data)
      })
    }
  }, [id, isEdit]);

  const[form, setForm] = useState<Omit<FaqCustom, 'id'>> ({
    question : '',
    keywords: '',
    response: '',
    business_id: businessId ?? "", 
  });


  const navigate = useNavigate();
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    
    try {
      if(isEdit){
        await updateFaqCustom((id), form)
      } else {
        await createFaqCustom(form)
      }

      navigate('/faq_customs')

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

            <Inputfield
              name = "id"
              value = {id}
              onChange={() => {}}
            />

            <Inputfield
              name = "business_id"
              value = {businessId ?? form.business_id}
              onChange={(e) => setForm({ ...form, business_id: e.target.value })}
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

                <div className="col-span-12 md:col-span-12">
                    <Label>Keywords</Label>
                    <Inputfield
                        name="keywords"
                        placeholder=""
                        value={form.keywords}
                        onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                    />
                </div>

                <div className=" col-span-12">
                  <Label>Réponse</Label>
                  <TextArea
                    name="response"
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
              {loading ? "En cours..."  : "Créer"}
            </button>
        </form>        
      </ComponentCard>
      
    </DashLayout>
  );
}
     
 

