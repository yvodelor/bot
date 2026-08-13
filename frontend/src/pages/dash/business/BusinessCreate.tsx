import { useState, useEffect, useRef } from "react";

import { useNavigate,  useParams } from "react-router-dom";

import { type Business, businessApi } from "../../../api/business.api";
import { type Activite, activiteApi } from "../../../api/activite.api";

import DashLayout from "../../../layouts/DashLayout";

import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";


import ComponentCard from "../../../components/common/ComponentCard";

import Label from "../../../components/form/Label";
import Inputfield from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import TextArea from "../../../components/form/input/TextArea";




export default function BusinessCreate() {

  const { id} = useParams()
  const isEdit =!!id;


  const [activites, setActivites] = useState<Activite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});


  const agentNameRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const activiteRef = useRef<HTMLDivElement>(null);


  const[form, setForm] = useState<Omit<Business, 'id'>>({
    agent_name: '',
    agent_role: '',   
    name:'',
    activite_id:'',
    slug: '',
    phone: '',
    whatsapp: '',
    email: '',
    logo_url: '',
    address: '',
    horaire:'',
    website: '',
    description: '', 
    infos: ''
   
  });

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);

    setForm((prev) => ({
      ...prev,
      activite_id: value
    }));   
  };
  
  const navigate = useNavigate();


  useEffect(() => {
    const fetchActivites = async () => {
      try{
        const res = await activiteApi.getAll();
        console.log("🔥 RESPONSE Activite:", res);
        const data = res ;
        setActivites(data);

       } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError("Erreur lors du chargement des les activite");
      }
    };
    fetchActivites();
  }, []);
  

  useEffect(() => {
    if(isEdit){
      businessApi.getById(id).then(data => { console.log(data)
        if(data !== null) setForm( data)
      })
    }
  }, [id, isEdit]);

  const optionActives = activites.map(a => ({ value: a.id, label: a.nom }));

  const clearFieldError = (field: string) => {
    setFieldErrors(prev => ({
      ...prev,
      [field]: ""
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
   
    const errors: Record<string, string> = {};

    if (!form.agent_name.trim()) {
      errors.agent_name = "Le nom de l'agent est obligatoire";
    }

    if (!form.name.trim()) {
      errors.name = "Le nom de la structure est obligatoire";
    }

    if (!form.email.trim()) {
      errors.email = "L'email est obligatoire";
    }

    if (!form.activite_id) {
      errors.activite_id = "Veuillez sélectionner une activité";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);

      setTimeout(() => {
        if (errors.agent_name) {
          agentNameRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } else if (errors.name) {
          nameRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } else if (errors.email) {
          emailRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } else if (errors.activite_id) {
          activiteRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);

      return;
    }

    setFieldErrors({});

    
    try {
      if(isEdit){
        await businessApi.update((id), form)
      } else {
        await businessApi.create(form)
        
      }

      navigate('/businesses')
    }
    catch (err: any) {
      console.error(err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Une erreur est survenue";

      setError(message);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      
    }finally{
      
      setLoading(false)
    }
  };

  return (
    <DashLayout>
      <PageMeta
        title={isEdit ? "Modifier l'assistant" : "Créer votre assistant IA en moins 2 mn"} 
        description="Votre assistant IA qui répond 24/7 à votre place, votre agent marketing"
      />
      <PageBreadcrumb pageTitle="Agent IA" />

      <ComponentCard  
        title={isEdit ? "Modifier" : "Créer"}
        desc = "Ajouter une Question"
      >  

        {error && (
          <div className="p-3 mb-4 rounded bg-red-100 border border-red-300">
            <span className="text-red-600">{error}</span>
          </div>
        )}

        {Object.keys(fieldErrors).length > 0 && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 p-4">
            <h3 className="mb-2 font-semibold text-red-700">
              Veuillez corriger les erreurs suivantes :
            </h3>

            <ul className="list-disc pl-5 text-red-600">
              {Object.entries(fieldErrors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-12 gap-4">
              <div ref={agentNameRef} className="col-span-12 md:col-span-4">
                <Label>Nom de l'agent</Label>
                <Inputfield
                  name="agent_name"
                  placeholder="Nom Agent"
                  value={form.agent_name}
                  onChange={(e) => setForm({ ...form, agent_name: e.target.value })}
                />
                {fieldErrors.agent_name && (
                  <p className="mt-1 text-sm text-red-500">
                    {fieldErrors.agent_name}
                  </p>
                )}
              </div>

              <div className="col-span-12 md:col-span-8">
                <Label>Role de l'agent</Label>
                <Inputfield
                  name="agent_role"
                  placeholder="Assistant virtuel"
                  value={form.agent_role}
                  onChange={(e) => setForm({ ...form, agent_role: e.target.value })}
                />
              </div>
           
              <div className="col-span-12 md:col-span-4">
                <Label>Nom de la structure</Label>
                <Inputfield
                  name="name"
                  placeholder="Nom de la structure"
                  value={form.name}
                  
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div className="col-span-12 md:col-span-4">
                <Label>Slug</Label>
                <Inputfield
                  name="slug"
                  placeholder="slug"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
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
                {fieldErrors.activite_id && (
                  <p className="mt-1 text-sm text-red-500">
                    {fieldErrors.activite_id}
                  </p>
                )}
              </div>

              <div className="col-span-12 md:col-span-4">
                <Label>Téléphone</Label>
                <Inputfield
                  name="phone"
                  placeholder="+33 6 12 34 56 78"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="col-span-12 md:col-span-4">
                <Label>Whatsapp</Label>
                <Inputfield
                  name="whatsapp"
                  placeholder="+33 6 12 34 56 78"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                />
              </div>
              
              <div className="col-span-12 md:col-span-4">
                <Label>Horaires</Label>
                <Inputfield
                  name="horaire"
                  placeholder="Lun-Ven 9h-18h"
                  value={form.horaire}
                  onChange={(e) => setForm({ ...form, horaire: e.target.value })}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <Label>Email</Label>
                <Inputfield
                  name="email"
                  placeholder="contact@entreprise.com"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    clearFieldError("email");
                  }}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {fieldErrors.email}
                  </p>
                )}

              </div>
              <div className="col-span-6">
                <Label>Site web</Label>
                <Inputfield
                  name="website"
                  placeholder="https://www.entreprise.com"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </div>
              
              <div className="col-span-6">
                <Label>Adresse</Label>
                <TextArea
                  name="address"
                  value={form.address}
                  onChange={(value) => setForm({ ...form, address: value })}
                  rows={3}
                />
              </div>
              <div className=" col-span-6">
                <Label>Description</Label>
                <TextArea
                  name="description"
                  value={form.description}
                  onChange={(value) => setForm({ ...form, description: value })}
                  rows={3}
                />
              </div>

              <div className=" col-span-12">
                <Label>Information Générale</Label>
                <TextArea
                  name="infos"
                  value={form.infos}
                  onChange={(value) => setForm({ ...form, infos: value })}
                  rows={15}
                />
              </div>
            </div>
       

          <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {loading ? "En cours..." : isEdit ? "Mettre à jour" : "Ajouter"}
            </button>
        </form>        
      </ComponentCard>
      
    </DashLayout>
  );
}
     
 

