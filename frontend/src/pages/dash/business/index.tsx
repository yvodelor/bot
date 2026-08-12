// src/pages/business/index.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type Business, businessApi } from "../../../api/business.api";
import { Dropdown } from "../../../components/dropdown/Dropdown";
import { DropdownItem } from "../../../components/dropdown/DropdownItem";
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
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);


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
 

  /* =========================
     ERROR
  ========================= */
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }


  /* =========================
     UI
  ========================= */


  if (loading) {

    return (

      <DashLayout>
        <div className="p-6">
          Chargement du dashboard...
        </div>
      </DashLayout>

    );

  }

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
              <div className="flex gap-1 justify-end">

                <div className="relative">

                  {/* Bouton du dropdown */}
                  <button
                    className="dropdown-toggle flex items-center gap-2 px-4 py-2 rounded-lg border bg-white"
                    onClick={() =>
                      setOpenDropdownId(
                        openDropdownId === business.id ? null : business.id
                      )
                    }
                  >
                    ...
                  </button>



                  {/* Contenu du dropdown */}
                  <Dropdown
                    isOpen={openDropdownId === business.id}
                    onClose={() => setOpenDropdownId(null)}
                  >

                    <div className="w-52 py-2">

                      <DropdownItem
                        tag="a"
                        to= {`/business/${business.id}`}
                        onItemClick={() => setOpenDropdownId(null)}
                      >
                        <div className="flex items-center gap-2">
                         <Edit  size="15"/> Editer
                        </div>
                      </DropdownItem>

                      <DropdownItem
                        tag="a"
                        to={`/faq/business/${business.id}`}
                        onItemClick={() => setOpenDropdownId(null)}
                      >
                        <div className="flex items-center gap-2">
                         <BookOpen  size="15"/> FAQ
                        </div>
                      </DropdownItem>

                      <DropdownItem
                        tag="a"
                        to={`/faq/business/${business.id}`}
                        onItemClick={() => setOpenDropdownId(null)}
                      >
                        <div className="flex items-center gap-2">
                          Produits/Services
                        </div>
                      </DropdownItem>
                      <DropdownItem
                        tag="a"
                        to={`/faq/business/${business.id}`}
                        onItemClick={() => setOpenDropdownId(null)}
                      >
                        <div className="flex items-center gap-2">
                          Canaux
                        </div>
                      </DropdownItem>
                      



                      <DropdownItem
                        tag="button"
                        onClick={() => handleDelete(business.id)}
                        onItemClick={() => setOpenDropdownId(null)}
                      >
                        <div className="flex items-center gap-2">
                          <Trash2 size={15} />
                          Supprimer
                        </div>
                      </DropdownItem>


                    </div>

                  </Dropdown>

                </div>
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