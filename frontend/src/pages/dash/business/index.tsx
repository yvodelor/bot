// src/pages/business/index.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type Business, businessApi } from "../../../api/business.api";
import { Dropdown } from "../../../components/ui/dropdown/Dropdown";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import DashLayout from "../../../layouts/DashLayout";
import { DynamicTable} from "../../../components/tables/DynamicTable";
import type{ Column } from "../../../components/tables/DynamicTable";
import  Button  from "../../../components/button/Button";
import ComponentCard from "../../../components/common/ComponentCard";



import {Edit, Trash2, BookOpen} from 'lucide-react'


const  BusinessCols:  Column<Business>[] = [
 
  {
    key: 'name',
    header: 'Structure',
    sortable: true,
  },
  {
    key: 'name',
    header: 'Agent',
    sortable: true,
  },

  {
    key: 'id',
    header: 'Canaux',
    sortable: true,
  },
  {
    key: 'activite_id',
    header: 'Type',
    sortable: true,
  },

  {
    key: 'phone',
    header: 'Contact',
  },



];



const BusinessPage = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await businessApi.getAll();

        console.log("🔥 RESPONSE BUSINESSES:", res);

        // compatible API (data wrapper ou direct array)
        const data = res.data 

        setBusinesses(data);
      } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError("Erreur lors du chargement des businesses");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  /* =========================
     DELETE BUSINESS
  ========================= */
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Voulez-vous supprimer ce business ?"
    );

    if (!confirmDelete) return;

    try {
      await businessApi.delete(id);

      setBusinesses((prev) =>
        prev.filter((b) => b.id !== id)
      );

      console.log("🗑️ Deleted:", id);
    } catch (err) {
      console.error("❌ DELETE ERROR:", err);
      alert("Erreur lors de la suppression");
    }
  };

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return <p>⏳ Chargement...</p>;
  }

  /* =========================
     ERROR
  ========================= */
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }


  /* =========================
     UI
  ========================= */
  return (
    <DashLayout>
      
      <PageMeta
        title="Liste des assistants IA"
        description="Vos Agents virtuel et vos structure"
      />
      <PageBreadcrumb pageTitle="Agent IA" />

      <ComponentCard  
        title="Liste des assistants"
        desc = "Vous pouvez les mettre en jour"
      >
        <div>
          <div>
            <div className="flex justify-end">
              <Button size="sm" variant="primary" className="bg-gray-600">
                <a href = "/business">Créer un agent</a>
              </Button>
            </div>
          </div>
          <DynamicTable 
            data={businesses} 
            columns={ BusinessCols }
            actions={(business) => (
              <>
              <Dropdown>
                sddd
              </Dropdown>
              
              <div className="flex gap-1 justify-end">
                {/* Editer */}
                <Button  size="sm" variant="primary" className="bg-green-600 px-0 py-0">
                  <Link to = {`/business/${business.id}`}> <div className="flex gap-1 justify-end"><Edit  size="15"/> Editer</div></Link>
                </Button> 
                
                {/* Faq */}
                <Button  size ="sm" variant="primary"  className="bg-blue-600 px-2">
                  <Link to = {`/faq/business/${business.id}`}><BookOpen  size="15"/></Link>
                </Button>

                {/* Produit */}
                <Button  size ="sm" variant="primary"  className="bg-blue-600 px-2">
                  <Link to = {`/product/business/${business.id}`}>Prod.</Link>
                </Button>

                {/* Canaux */}
                <Button  size ="sm" variant="primary"  className="bg-blue-600 px-2">
                  <Link to = {`/faq/business/${business.id}`}>Cannaux</Link>
                </Button>

                {/* Parametre */}
                <Button  size ="sm" variant="primary"  className="bg-blue-600 px-2">
                  <Link to = {`/faq/business/${business.id}`}>Para.</Link>
                </Button>

                {/* Suppression */}
                <Button  size ="sm" variant="primary" onClick={() =>handleDelete(business.id)} className="bg-red-600 px-2">
                  <Trash2  size="15"/>
                </Button>
              </div>
              </>
            )}
              
          >

          </DynamicTable>
        </div>
      </ComponentCard>
    </DashLayout>
  );
};

export default BusinessPage;