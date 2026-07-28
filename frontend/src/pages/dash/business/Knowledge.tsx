import { useState, useEffect, useMemo } from "react";

import { useNavigate, Link, useParams } from "react-router-dom";

import { getBusinessById } from "../../../api/business.api.ts";
import DashLayout from "../../../layouts/DashLayout.tsx";

import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";


import ComponentCard from "../../../components/common/ComponentCard.tsx";

import Label from "../../../components/form/Label.tsx";
import TextArea from "../../../components/form/input/TextArea.tsx";
import Inputfield from "../../../components/form/input/InputField.tsx";
import Radio from "../../../components/form/input/Radio2.tsx";

import { getFaqDefault } from "../../../api/faqDefault.api.ts";
import { getFaqClient, getFaqClientById,  getFaqClientByBusinessId, createFaqClient, updateFaqClient } from "../../../api/faqClient.api.ts";
import Button from "../../../components/button/Button.tsx";


type FaqClient = {
  id: string;
  business_id: string;
  faq_default_id: string;
  response: string;
  
};

type FaqDefault = {
  id: string;
  category:string;
  question: string;
  keywords: string;
  response_default: string;
  activite_id: number; 
};



export default function Knowledge() {


  const { businessId = "" } = useParams();

  const [faqClient, setFaqClient] = useState<FaqClient[]>([]);
  const [faqDefault, setFaqDefault] = useState<FaqDefault[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activiteId, setActiviteId] = useState(0);
  const [faqDefaultId, setFaqDefaultId] = useState("");
  const [faqClientId, setFaqClientId] = useState("");   
  const [isEdit, setIsEdit] = useState(false); 

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

  const handleSwitchChange = (checked: boolean) => {
    console.log("Switch is now:", checked ? "ON" : "OFF");
  };




  const[form, setForm] = useState<FaqClient>({ 
    id:'',  
    business_id:'',  
    faq_default_id: '',
    response: ''    
  });

const navigate = useNavigate();


useEffect(() => {
  const fetchFaqDefault = async () => {
    try{
      const res = await getFaqDefault();
      console.log("🔥 RESPONSE Activite:", res);
      const data = res?.data || res.faqDefault;
      setFaqDefault(data);

      } catch (err) {
      console.error("❌ FETCH ERROR:", err);
      setError("Erreur lors du chargement des les activite");
    }
  };
  fetchFaqDefault();
}, []);


useEffect(() =>{
  
  getBusinessById(businessId)
    .then(data => { console.log('Business', data); setActiviteId(data.data.activite_id)})
}, [businessId]);

useEffect(() => {
  getFaqClientByBusinessId(businessId)
  .then(data => { setFaqClient(data.data) }) 
}, [businessId]);


const groupedFaqs = useMemo(() => {
  return faqDefault
    .filter((faq) => faq.activite_id === activiteId)
    .reduce<Record<string, FaqDefault[]>>((acc, faq) => {
      (acc[faq.category] ??= []).push(faq);
      return acc;
    }, {});
}, [faqDefault, activiteId]);


const categories = Object.keys(groupedFaqs);

const [selectedCategory, setSelectedCategory] = useState(
  categories[0] ?? ""
);
const [selectedQuestionId, setSelectedQuestionId] = useState("");

const handleCategoryChange = (category: string) => {
  setSelectedCategory(category);

  const firstQuestion = groupedFaqs[category]?.[0];

  if (firstQuestion) {
    setSelectedQuestionId(firstQuestion.id);

    const selectedFaqClient = faqClient.find(
      (item) => item.faq_default_id === firstQuestion.id
    );

    if (selectedFaqClient) {
      setFaqClientId(selectedFaqClient.id || "");

      setForm({
        id: selectedFaqClient.id || "",
        business_id: selectedFaqClient.business_id,
        faq_default_id: selectedFaqClient.faq_default_id,
        response: selectedFaqClient.response,
      });

      setIsEdit(true);
    } else {
      setFaqClientId("");

      setForm({
        id: "",
        business_id: businessId,
        faq_default_id: firstQuestion.id,
        response: "",
      });

      setIsEdit(false);
    }
  }
};

const currentFaqs = groupedFaqs[selectedCategory] ?? [];

const selectedFaq =
  currentFaqs.find((faq) => faq.id === selectedQuestionId) ??
  currentFaqs[0];




useEffect(() => {
  const categories = Object.keys(groupedFaqs);

  if (
    categories.length > 0 &&
    !selectedCategory &&
    faqClient.length >= 0
  ) {
    handleCategoryChange(categories[0]);
  }
}, [groupedFaqs, faqClient]);





  
  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault()
    setLoading(true)

    try {
      if(isEdit){

        await updateFaqClient((form.id), form)

      } else {
        
        await createFaqClient(form)
      }

      navigate('/businesses')

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
        title="Base de connaisance"
        desc = "Ajouter une Question"
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Radio
                    key={category}
                    id={category}
                    name="faq-category"
                    value={category}
                    label={category}
                    checked={selectedCategory === category}
                    onChange={handleCategoryChange}
                    variant="button"
                  />
                ))}
              </div>
            </div>
          </div>
        
          <div className="col-span-12 md:col-span-9">
            <div className="mt-4 flex flex-wrap gap-2 justify-end">
              <div className=" flex flex-wrap gap-2">
                {currentFaqs.map((faq, index) => (
                  <button
                    key={faq.id}
                    onClick={() => {
                      setSelectedQuestionId(faq.id);

                      const selectedFaqClient = faqClient.find(
                        (faqC) => faqC.faq_default_id === faq.id
                      );

                      console.log("FaqClient trouvé: ", selectedFaqClient);

                      if (selectedFaqClient) {
                        setFaqClientId(selectedFaqClient.id || "");

                        setForm({
                          id: selectedFaqClient.id || "",
                          business_id: selectedFaqClient.business_id,
                          faq_default_id: selectedFaqClient.faq_default_id,
                          response: selectedFaqClient.response,
                        });

                        setIsEdit(true);
                      } else {
                        setFaqClientId("");

                        setForm({
                          id: "",
                          business_id: businessId,
                          faq_default_id: faq.id,
                          response: "",
                        });

                        setIsEdit(false);
                        

                      }
                    }}
                    className={`rounded-md px-3 py-1 text-sm border ${
                      selectedQuestionId === faq.id
                        ? "bg-brand-500 text-red border-brand-500"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    Question {index + 1}
                  </button> 
                ))}
              </div>
              <div>
                <button 
                  className="rounded-md px-3 py-1 text-sm border bg-white border-gray-300"
                  
                  
                >
                  <Link to = {`/faq_custom/business/${businessId}`}>
                  + Ajouter une Faq
                  </Link>
                </button>
              </div>
              
            </div>
            
            <div className="mt-4">
              {selectedFaq && (
                <div>
                  <div>
                    <h3>{selectedFaq.question}</h3>
                    <p>{selectedFaq.response_default}</p>
                    <p>{selectedFaq.keywords}</p>
                  </div>


                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Inputfield
                      type = "hidden"
                      name = "business_id"
                      value = {businessId}
                      onChange={(e) => setForm({ ...form, business_id: e.target.value })}
                    />
                    <Inputfield
                      type = "hidden"
                      name = "faq_default_id"
                      value = {selectedQuestionId}
                      onChange={(e) => setForm({ ...form, faq_default_id: e.target.value })}
                    />
                    <Inputfield
                      type = "hidden"
                      name = "id"
                      value = {faqClientId}
                      onChange={(e) => setForm({ ...form, id: e.target.value })}
                    />


                    <div>
                      <Label>Réponse</Label>
                      <TextArea
                        name="response"
                        value={form.response}
                        onChange={(value) => setForm({ ...form, response: value })}
                        rows={6}
                      />
                    </div>


                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      {loading ? "En cours..." : isEdit ? "Mettre à jour" : "Ajouter"}
                    </button>
                  </form>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </ComponentCard>
    </DashLayout>
  );
}
     
 

