import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {type Intent, intentApi} from "../../../api/intent.api"

import {type IntentEx, intentExApi} from "../../../api/intentEx.api"
import DashLayout from "../../../layouts/DashLayout.tsx";



import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";

import ComponentCard from "../../../components/common/ComponentCard.tsx";
import Label from "../../../components/form/Label.tsx";

import TextArea from "../../../components/form/input/TextArea.tsx";
import Select from "../../../components/form/Select";


export default function IntentCreate() {
  const {id} = useParams()

  const [loading, setLoading] = useState(false);

  const [intents, setIntents] = useState<Intent[]>([]);

  const navigate = useNavigate();

  const isEdit =!!id;

  const[form, setForm] = useState<Omit<IntentEx, 'id'>> ({
    intent_id : '',
    lang: '',
    phrase: '',
    
  
  });

  //Select intent
  const handleSelectIntent = (value: string) => {
    console.log("Selected value:", value);
    setForm((prev) => ({
      ...prev,
      intent_id: value
    })); 
  };

  //Select intent
  const handleSelectLang = (value: string) => {
    console.log("Selected Lang:", value);
    setForm((prev) => ({
      ...prev,
      lang: value
    })); 
  };

  useEffect(() => {
    if(isEdit){
      intentExApi.getById(id).then(data => {
        if(data !== null) setForm( data)
      })
    }
  }, [id, isEdit]);

    //Chargement des intents
    useEffect(() => {
      const fetchIntents = async () => {
        try{
          const res = await intentApi.getAll();
          console.log("🔥 RESPONSE intents:", res);
          const data = res;
          setIntents(data);
  
         } catch (err) {
          console.error("❌ FETCH ERROR:", err);
         
        }
      };
      fetchIntents();
    }, []);
    
    const optionIntents = intents.map(a => ({ value: a.id, label:a.nom}));
    const optionLang = [{value: 'fr', label:'Fancais'}, {value: 'en', label:'Englais'}];

    
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    
    try {
      if(isEdit){
        await intentExApi.update((id), form)
      } else {
        await intentExApi.create(form)
      }

      navigate('/admin/intent/exemples')

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
                  <Label>Type Intent</Label>
                  <Select
                    name="intent_id"
                    options = {optionIntents}
                    placeholder = "Select un intent"
                    onChange={handleSelectIntent}
                    defaultValue= { isEdit ? String(form.intent_id)  : ""}
                  />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <Label>Langue</Label>
                  <Select
                    name="intent_id"
                    options = {optionLang}
                    placeholder = "Select une langue"
                    onChange={handleSelectLang}
                    defaultValue= { isEdit ? String(form.lang)  : ""}
                  />
                </div>


                <div className=" col-span-12">
                  <Label>Phrase d'exemple</Label>
                  <TextArea
                    name="phrase"
                    value={form.phrase}
                    onChange={(value) => setForm({ ...form, phrase: value })}
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
     
 

