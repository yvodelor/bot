// src/pages/business/index.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type Produit, produitApi } from "../../../api/produit.api";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import DashLayout from "../../../layouts/DashLayout";
import { DynamicTable} from "../../../components/tables/DynamicTable";
import type{ Column } from "../../../components/tables/DynamicTable";
import  Button  from "../../../components/button/Button";
import ComponentCard from "../../../components/common/ComponentCard";


import {Edit, Trash2} from 'lucide-react'


const  ProduitCols:  Column<Produit>[] = [
 
  {
    key: 'name',
    header: 'Produit/Service',
    sortable: true,
  },

 
  {
    key: 'is_active',
    header: 'Statut',
    sortable: true,
  },

   {
    key: 'image',
    header: 'Image',
    render:(_value, row) => (
      <img src={row.image} />
   )
  },
];



const ProduitPage = () => {
  
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await produitApi.getAll();

        console.log("🔥 RESPONSE BUSINESSES:", res);

        // compatible API (data wrapper ou direct array)
        const data = res?.data;

        setProduits(data);
      } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError("Erreur lors du chargement des businesses");
      } finally {
        setLoading(false);
      }
    };

    loadData();
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
      await produitApi.getById(id);

      setProduits((prev) =>
        prev.filter((b) => b.id !== id)
      );

      console.log("🗑️ Deleted:", id);
    } catch (err) {
      console.error("❌ DELETE ERROR:", err);
      alert("Erreur lors de la suppression");
    }
  };

  // Chargement
  if (loading) {
    return <p>⏳ Chargement...</p>;
  }

  // Erreur
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }



  // UI -----------
  return (
    <DashLayout>
      
      <PageMeta
        title="Produit et Services"
        description="Tous vos produits et services"
      />
      <PageBreadcrumb pageTitle="Produit et services" />

      <ComponentCard  
        title="Produits/Services"
        desc = "Ajouter un produit ou un service"
      >
        <div>
          <div>
            <div className="flex justify-end">
              <Button size="sm" variant="primary" className="bg-gray-600">
                <a href = "/produit">Ajouter un produit</a>
              </Button>
            </div>
          </div>
          <DynamicTable 
            data={produits} 
            columns={ ProduitCols }
            actions={(produit) => (
              
              <div className="flex gap-1 justify-end">
                {/* Editer */}
                <Button  size="sm" variant="primary" className="bg-green-600 px-0 py-0">
                  <Link to = {`/produit/${produit.id}`}> <div className="flex gap-1 justify-end"><Edit  size="15"/> Editer</div></Link>
                </Button> 

                {/* Suppression */}
                <Button  size ="sm" variant="primary" onClick={() =>handleDelete(produit.id)} className="bg-red-600 px-2">
                  <Trash2  size="15"/>
                </Button>
              </div>
            )}
              
          >

          </DynamicTable>
        </div>
      </ComponentCard>
    </DashLayout>
  );
};

export default ProduitPage;