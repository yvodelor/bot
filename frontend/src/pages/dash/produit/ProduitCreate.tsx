import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { type Business, businessApi } from "../../../api/business.api";
import { type Produit, produitApi } from "../../../api/produit.api";

import DashLayout from "../../../layouts/DashLayout";

import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label.tsx";
import Inputfield from "../../../components/form/input/InputField";

import FichierInput from "../../../components/form/input/fichierInput";
import Select from "../../../components/form/Select";
import TextArea from "../../../components/form/input/TextArea";




export default function BusinessCreate() {
  const { id } = useParams()
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [files, setFiles] = useState<File[]>([]);
 
  const [loading, setLoading] = useState(false);


  




    const handleSelectChange = (value: string) => {
      console.log("Selected value:", value);

      setForm((prev) => ({
        ...prev,
        business_id: value
      }));   
    };

  const isEdit =!!id;

  const[form, setForm] = useState<Omit<Produit, 'id'>>({   
    name: '',
    business_id: '',
    description: '',
    image: '',
    prix: ''  
   
  });

  const navigate = useNavigate();


  useEffect(() => {
    const load = async () => {
      try{
        const res = await businessApi.getAll();
        console.log("RESPONSE Activite:", res);
        const data = res ;
        setBusinesses(data);

       } catch (err) {
        console.error("❌ FETCH ERROR:", err);
       
      }
    };
    load();
  }, []);
  

  useEffect(() => {
    if(isEdit){
      produitApi.getById(id).then(data => {
        if(data !== null) setForm( data)
      })
    }
  }, [id, isEdit]);

  const optionBusiness = businesses.map(a => ({ value: a.id, label:a.name}));

  const formData = new FormData();
  files.forEach(file => formData.append('files', file));




  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {

    const data = new FormData();

    data.append("name", form.name);
    data.append("business_id", String(form.business_id));
    data.append("description", form.description);
    data.append("prix", String(form.prix));

    // ajout de l'image
    files.forEach((file) => {
      data.append("image", file);
    });


    if(isEdit){
      await produitApi.update(id!, data);
    } 
    else {
      await produitApi.create(data);
    }

    navigate('/produits');

  } catch(error: any){
    console.log(error.response?.data);
  } finally {
    setLoading(false);
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
              <Label>Nom</Label>
              <Inputfield
                name="name"
                placeholder="Nom du produit/service"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="col-span-12 md:col-span-4">
              <Label>Prix</Label>
              <Inputfield
                name="prix"
                placeholder="200"
                value={form.prix}
                onChange={(e) => setForm({ ...form, prix: e.target.value })}
              />
            </div>

            <div className="col-span-12 md:col-span-4">
              <Label>Type de structure</Label>
              <Select
                name="activite_id"
                
                options = {optionBusiness}
                placeholder = "Select une structure"
                onChange={handleSelectChange}
                defaultValue= { isEdit ? String(form.business_id)  : ""}
              />
            </div>

            <div className=" col-span-12">
              <Label>Description</Label>
              <TextArea
                name="description"
                value={form.description}
                onChange={(value) => setForm({ ...form, description: value })}
                rows={3}
              />
            </div>

            <div className=" col-span-12">
              <FichierInput
                label = "Image"
                accept = "image/*"
                multiple = {true}
                maxSizeMB={1}
                onFileSelect={setFiles}
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
     
 

