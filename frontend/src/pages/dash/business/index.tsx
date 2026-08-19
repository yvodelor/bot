// src/pages/business/index.tsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  BookOpen,
  Edit,
  MoreVertical,
  Package,
 
  Plus,
  Radio,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";

import { type Business, businessApi } from "../../../api/business.api";

import { Dropdown } from "../../../components/dropdown/Dropdown";
import { DropdownItem } from "../../../components/dropdown/DropdownItem";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import DashLayout from "../../../layouts/DashLayout";
import { DynamicTable } from "../../../components/tables/DynamicTable";
import type { Column } from "../../../components/tables/DynamicTable";
import Button from "../../../components/button/Button";


// ============================================================
// TYPES
// ============================================================

type BusinessId = string | number;


// ============================================================
// COLONNES DU TABLEAU DESKTOP
// ============================================================

const BusinessCols: Column<Business>[] = [
  {
    key: "name",
    header: "Structure",
    sortable: true,
  },
  {
    key: "agent_name",
    header: "Agent IA",
    sortable: true,
  },
  {
    key: "phone",
    header: "Contact",
  },
];


// ============================================================
// PAGE
// ============================================================

const BusinessPage = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [openDropdownId, setOpenDropdownId] =
    useState<BusinessId | null>(null);

  // ==========================================================
  // FETCH BUSINESSES
  // ==========================================================

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await businessApi.getAll();

        console.log("🔥 RESPONSE BUSINESSES:", res);

        setBusinesses(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError("Impossible de charger les assistants.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  // ==========================================================
  // RECHERCHE
  // ==========================================================

  const filteredBusinesses = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return businesses;
    }

    return businesses.filter((business) => {
      const name = String(business.name ?? "").toLowerCase();
      const agentName = String(
        business.agent_name ?? ""
      ).toLowerCase();
      const phone = String(business.phone ?? "").toLowerCase();

      return (
        name.includes(query) ||
        agentName.includes(query) ||
        phone.includes(query)
      );
    });
  }, [businesses, search]);

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = async (id: BusinessId) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cet assistant ? Cette action est irréversible."
    );

    if (!confirmDelete) return;

    try {
      await businessApi.delete(String(id));

      setBusinesses((prev) =>
        prev.filter((business) => business.id !== id)
      );

      setOpenDropdownId(null);
    } catch (err) {
      console.error("❌ DELETE ERROR:", err);
      window.alert("Erreur lors de la suppression de l'assistant.");
    }
  };

  // ==========================================================
  // TOGGLE MENU
  // ==========================================================

  const toggleDropdown = (id: BusinessId) => {
    setOpenDropdownId((current) =>
      current === id ? null : id
    );
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <DashLayout>
        <PageMeta
          title="Agents IA"
          description="Gestion de vos assistants virtuels"
        />

        <PageBreadcrumb pageTitle="Agents IA" />

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="animate-pulse space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="h-7 w-40 rounded-lg bg-gray-200 dark:bg-gray-800" />
                  <div className="h-4 w-64 rounded-lg bg-gray-200 dark:bg-gray-800" />
                </div>

                <div className="h-10 w-36 rounded-lg bg-gray-200 dark:bg-gray-800" />
              </div>

              <div className="h-12 w-full rounded-xl bg-gray-100 dark:bg-gray-800" />

              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-16 w-full rounded-xl bg-gray-100 dark:bg-gray-800"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashLayout>
    );
  }

  // ==========================================================
  // ERROR
  // ==========================================================

  if (error) {
    return (
      <DashLayout>
        <PageMeta
          title="Agents IA"
          description="Gestion de vos assistants virtuels"
        />

        <PageBreadcrumb pageTitle="Agents IA" />

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/40 dark:bg-red-900/10">
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <X size={26} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Une erreur est survenue
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Réessayer
            </button>
          </div>
        </div>
      </DashLayout>
    );
  }

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <DashLayout>
      <PageMeta
        title="Agents IA"
        description="Gestion de vos assistants virtuels"
      />

      <PageBreadcrumb pageTitle="Agents IA" />

      <div className="space-y-6">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Bot size={23} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Agents IA
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Gérez vos assistants virtuels et leurs configurations.
                </p>
              </div>
            </div>
          </div>

          <Link to="/business" className="w-full sm:wauto">
            <Button
              size="sm"
              variant="primary"
              className="flex w-full items-center justify-center gap-2 !bg-blue-600 !px-5 !py-2.5 sm:w-auto"
            >
              <Plus size={18} />
              Créer un agent
            </Button>
          </Link>
        </div>

        {/* =====================================================
            STATISTIQUE
        ====================================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total des agents
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {businesses.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Users size={21} />
              </div>
            </div>
          </div>

          {/* Résultat recherche */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Résultats affichés
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {filteredBusinesses.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                <Search size={21} />
              </div>
            </div>
          </div>

          {/* Etat */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  État
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Système actif
                  </span>
                </div>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Radio size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            MAIN CARD
        ====================================================== */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">

          {/* Card Header */}
          <div className="border-b border-gray-100 px-4 py-5 dark:border-gray-800 sm:px-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Mes assistants
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Retrouvez et gérez tous vos assistants IA.
                </p>
              </div>

              {/* Recherche */}
              <div className="relative w-full lg:max-w-sm">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher un agent..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-10 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500 dark:focus:bg-gray-800"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ===================================================
              LISTE VIDE
          ==================================================== */}

          {filteredBusinesses.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                {search ? (
                  <Search size={28} />
                ) : (
                  <Bot size={28} />
                )}
              </div>

              <h3 className="mt-5 text-base font-semibold text-gray-900 dark:text-white">
                {search
                  ? "Aucun agent trouvé"
                  : "Aucun assistant pour le moment"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
                {search
                  ? "Essayez une autre recherche ou effacez le filtre actuel."
                  : "Créez votre premier assistant IA pour commencer."}
              </p>

              {!search && (
                <Link to="/business" className="mt-5 inline-block">
                  <Button
                    size="sm"
                    variant="primary"
                    className="flex items-center gap-2"
                  >
                    <Plus size={17} />
                    Créer un agent
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* =================================================
                  DESKTOP
              ================================================== */}

              <div className="relative">
                <DynamicTable
                  data={filteredBusinesses}
                  columns={BusinessCols}
                  actions={(business) => (
                    <div className="flex justify-end">
                      <div className="relative">

                      <button
                        id={`business-dropdown-${business.id}`}
                        className="dropdown-toggle"
                        onClick={() => toggleDropdown(business.id)}
                      >
                        <MoreVertical size={18} />
                      </button>

                        <Dropdown
                          isOpen={openDropdownId === business.id}
                          onClose={() => setOpenDropdownId(null)}
                          triggerId={`business-dropdown-${business.id}`}
                        >
                          <div className="relative w-56 py-2">
                            <DropdownItem
                              tag="a"
                              to={`/business/${business.id}`}
                              onItemClick={() => setOpenDropdownId(null)}
                            >
                              <div className="flex items-center gap-3">
                                <Edit size={16} />
                                <span>Modifier</span>
                              </div>
                            </DropdownItem>

                            <DropdownItem
                              tag="a"
                              to={`/faqs/business/${business.id}`}
                              onItemClick={() => setOpenDropdownId(null)}
                            >
                              <div className="flex items-center gap-3">
                                <BookOpen size={16} />
                                <span>FAQ</span>
                              </div>
                            </DropdownItem>

                            <DropdownItem
                              tag="a"
                              to={`/produits/business/${business.id}`}
                              onItemClick={() => setOpenDropdownId(null)}
                            >
                              <div className="flex items-center gap-3">
                                <Package size={16} />
                                <span>Produits / Services</span>
                              </div>
                            </DropdownItem>

                            <DropdownItem
                              tag="a"
                              to={`/channel/business/${business.id}`}
                              onItemClick={() => setOpenDropdownId(null)}
                            >
                              <div className="flex items-center gap-3">
                                <Radio size={16} />
                                <span>Canaux</span>
                              </div>
                            </DropdownItem>

                            <div className="my-1 border-t border-gray-100 dark:border-gray-700" />

                            <DropdownItem
                              tag="button"
                              onClick={() => handleDelete(business.id)}
                              onItemClick={() => setOpenDropdownId(null)}
                            >
                              <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                                <Trash2 size={16} />
                                <span>Supprimer</span>
                              </div>
                            </DropdownItem>
                          </div>
                        </Dropdown>
                      </div>
                    </div>
                  )}
                />
              </div>

              {/* =================================================
                  MOBILE
              ==================================================  */}

            
                 
            </>
          )}

          {/* =====================================================
              FOOTER
          ====================================================== */}

          {filteredBusinesses.length > 0 && (
            <div className="border-t border-gray-100 px-4 py-4 dark:border-gray-800 sm:px-6">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {filteredBusinesses.length}{" "}
                {filteredBusinesses.length > 1
                  ? "assistants affichés"
                  : "assistant affiché"}
                {search && (
                  <>
                    {" "}
                    sur {businesses.length}
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashLayout>
  );
};

export default BusinessPage;