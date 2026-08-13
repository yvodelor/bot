import { useState, useEffect } from "react";

import { useNavigate,  useParams } from "react-router-dom";
import {type Ad, adApi} from "../../../api/ad.api"

import DashLayout from "../../../layouts/DashLayout";



import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import ComponentCard from "../../../components/common/ComponentCard";
import Label from "../../../components/form/Label";
import Inputfield from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import FichierInput from "../../../components/form/input/fichierInput";
import Select from "../../../components/form/Select";



export default function AdCreate() {
  const {id} = useParams()

  const [loading, setLoading] = useState(false);


  const [files, setFiles] = useState<File[]>([]);

  const navigate = useNavigate();

  

  const isEdit =!!id;


  const formData = new FormData();
  files.forEach(file => formData.append('files', file));

  // Select activite
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);  
    setForm((prev) => ({
      ...prev,
      placement: value
    })); 
  };



  const[form, setForm] = useState<Omit<Ad, 'id'>> ({
    title : '',
    description: '',
    placement: '',
    target_url: '',
    image_url: '',
    start_date: '',
    end_date: '',
    is_active: true,
    image: '',  
    action: '' 
  });



  

 



 
  const placements = [
    {value: 'top_banner', label: 'Top banner'},
    {value: 'sidebar', label: 'Sidebar'},
    {value: 'bottom_sheet', label: 'Bottom_sheet'},
    {value: 'inline_chat', label: 'inline_chat'},
    {value: 'orverlay', label: 'Orverlay'},
  ]


 
  const optionPlacements = [
    {value: 'null', label: 'Toutes les places'}, 
    ...placements.map(a => ({ value: a.value, label: a.label}))
  ];


  useEffect(() => {
    if(isEdit){
      adApi.getById(id).then(data => {
       if(data !== null) setForm( data)
      })
    }
  }, [id, isEdit]);

  
    

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)


    try {

      const data = new FormData();

      data.append("title", form.title);
      data.append("action", form.action ?? '');
      data.append("placement", form.placement);
      data.append("description", String(form.description));
      data.append("target_url", form.target_url);
      data.append("image_url", String(form.image_url));
      data.append("end_date", String(form.end_date));
      data.append("start_date", String(form.start_date));

      // ajout de l'image
      files.forEach((file) => {
        data.append("image", file);
      });


      if(isEdit){
        await adApi.update(id!, data)
      } else {
        await adApi.create(data)
      }

      navigate('/admin/ads')

    } catch(err){
      console.log(err)

    }finally{
      setLoading(false)
    }
  };

  return (
    <DashLayout>
      <PageMeta
        title="Add ad" 
        description=""
      />
      <PageBreadcrumb pageTitle="Ad" />

      <ComponentCard  
        title="Advertisments"
        desc = "Add ad"
      >                 
        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-12 md:col-span-4">
                  <Label>Titre</Label>
                  <Inputfield
                    name="title"
                    placeholder="Le titre"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>

                <div className="col-span-12 md:col-span-4">
                    <Label>Type  de placement</Label>
                    <Select
                      name="placement"
                      options = {optionPlacements}
                      placeholder = "Select l'emplacement"
                      onChange={handleSelectChange}
                      defaultValue= { isEdit ? String(form.placement)  : ""}
                    />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Action</Label>
                  <Inputfield
                    name="action"
                    placeholder="Action"
                    value={form.action}
                    onChange={(e) => setForm({ ...form, action: e.target.value })}
                  />
                </div>

                <div className="col-span-12 md:col-span-12">
                  <Label>Lien</Label>
                  <Inputfield
                    name="target_url"
                    placeholder="Le lien"
                    value={form.target_url}
                    onChange={(e) => setForm({ ...form, target_url: e.target.value })}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Label>start date</Label>
                  <Inputfield
                    type = "date"
                    name="start_data"
                    placeholder="Date de commencement"
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Label>End date</Label>
                  <Inputfield
                    type = "date"
                    name="end_data"
                    placeholder="Date de fin"
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                  />
                </div>

              
               
              
                <div className="col-span-12 md:col-span-12">
                    <Label>Description</Label>
                    <TextArea
                        name="dscription"
                        placeholder="Description de la pub"
                        value={form.description}
                        onChange={(value) => setForm({ ...form, description: value })}
                        rows={3}
                    />
                </div>

                <div className="col-span-12 md:col-span-6">
                    <Label>Lien de l'image</Label>
                    <TextArea
                        name="image_url"
                        placeholder="Url de ve l'image"
                        value={form.image_url}
                        onChange={(value) => setForm({ ...form, image_url: value })}
                        rows={3}
                    />
                </div>

                <div className=" col-span-12 md:col-span-6">
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
     
 

