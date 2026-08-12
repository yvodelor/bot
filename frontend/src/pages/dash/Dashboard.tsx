import { useEffect, useState } from "react";
import DashLayout from "../../layouts/DashLayout";
import { getDashboard } from "../../api/dashboard.api";

import PageMeta from "../../components/common/PageMeta";


import { Dropdown } from "../../components/dropdown/Dropdown";
import { DropdownItem } from "../../components//dropdown/DropdownItem";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const chartData = [
  { jour: "Lun", conversations: 12 },
  { jour: "Mar", conversations: 19 },
  { jour: "Mer", conversations: 8 },
  { jour: "Jeu", conversations: 15 },
  { jour: "Ven", conversations: 24 },
  { jour: "Sam", conversations: 18 },
  { jour: "Dim", conversations: 10 },
];

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#dc2626",
];

const channelData = [
  {
    name: "WhatsApp",
    value: 45,
  },
  {
    name: "Messenger",
    value: 30,
  },
  {
    name: "Site Web",
    value: 20,
  },
  {
    name: "Telegram",
    value: 5,
  },
];


const intentData = [
  {
    intent: "Prix",
    total: 120,
  },
  {
    intent: "Livraison",
    total: 90,
  },
  {
    intent: "Support",
    total: 70,
  },
  {
    intent: "Commande",
    total: 50,
  },
];





interface DashboardData {

  overview: {
    users: number;
    bots: number;
    conversations: number;
    messages: number;
  };

  performance: {
    responseRate: number;
    fallbackRate: number;
  };

  periods: {
    today: number;
    last7days: number;
    last30days: number;
  };

  topIntents: {
    intent: string;
    total: number;
  }[];

  channels: {
    channel: string;
    total: number;
  }[];

  activity: {
    date: string;
    total: number;
  }[];

  tokens: {
    total: number;
    thisMonth: number;
  };

}



export default function Dashboard() {


  const [data, setData] = useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getDashboard()
      .then((response) => {
        console.log("DASHBOARD API :", response);
        setData(response);
      })

      .catch((error) => {

        console.error(
          "Erreur dashboard :",
          error
        );

      })

      .finally(() => {

        setLoading(false);

      });


  }, []);




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
        title="Tableau de bord"
        description=""
      />

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="relative">

          {/* Bouton du dropdown */}
          <button
            className="dropdown-toggle flex items-center gap-2 px-4 py-2 rounded-lg border bg-white"
            onClick={() => setIsOpen(!isOpen)}
          >
          Constant
            <span>⌄</span>
          </button>



          {/* Contenu du dropdown */}
          <Dropdown
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >

            <div className="w-52 py-2">


              <DropdownItem
                tag="a"
                to="/profile"
                onItemClick={() => setIsOpen(false)}
              >
                Mon profil
              </DropdownItem>



              <DropdownItem
                tag="a"
                to="/settings"
                onItemClick={() => setIsOpen(false)}
              >
                Paramètres
              </DropdownItem>



              <DropdownItem
                onClick={() => {
                  console.log("Déconnexion");
                  setIsOpen(false);
                }}
              >
                Déconnexion
              </DropdownItem>


            </div>

          </Dropdown>

        </div>
      </div>

      <div className="min-h-screen bg-gray-100 p-6">
          <h1 className="text-3xl font-bold mb-8">
            Tableau de bord
          </h1>



          {/* KPI */}

          <div className="grid md:grid-cols-4 gap-6 mb-8">



            <div className="bg-white p-6 rounded-xl shadow">

              <h3 className="text-gray-500">
                Conversations
              </h3>

              <p className="text-3xl font-bold">

                {data?.overview?.conversations ?? 0}

              </p>

            </div>




            <div className="bg-white p-6 rounded-xl shadow">

              <h3 className="text-gray-500">
                Utilisateurs
              </h3>

              <p className="text-3xl font-bold">

                {data?.overview?.users ?? 0}

              </p>

            </div>





            <div className="bg-white p-6 rounded-xl shadow">

              <h3 className="text-gray-500">
                Taux réponse
              </h3>

              <p className="text-3xl font-bold">

                {data?.performance?.responseRate ?? 0} %

              </p>

            </div>





            <div className="bg-white p-6 rounded-xl shadow">

              <h3 className="text-gray-500">
                Messages
              </h3>

              <p className="text-3xl font-bold">

                {data?.overview?.messages ?? 0}

              </p>

            </div>



          </div>





          {/* Périodes */}

          <div className="grid md:grid-cols-3 gap-6 mb-8">



            <div className="bg-white p-5 rounded-xl shadow">

              <p>Aujourd'hui</p>

              <strong className="text-2xl">

                {data?.periods?.today ?? 0}

              </strong>

            </div>




            <div className="bg-white p-5 rounded-xl shadow">

              <p>7 derniers jours</p>

              <strong className="text-2xl">

                {data?.periods?.last7days ?? 0}

              </strong>

            </div>




            <div className="bg-white p-5 rounded-xl shadow">

              <p>30 derniers jours</p>

              <strong className="text-2xl">

                {data?.periods?.last30days ?? 0}

              </strong>

            </div>



          </div>






          {/* Tokens */}

          <div className="bg-white rounded-xl shadow p-6 mb-8">


            <h2 className="text-xl font-bold mb-4">
              Consommation IA
            </h2>


            <p>
              Tokens utilisés :
              <strong className="ml-2">

                {data?.tokens?.total ?? 0}

              </strong>
            </p>


            <p>
              Ce mois :
              <strong className="ml-2">

                {data?.tokens?.thisMonth ?? 0}

              </strong>
            </p>


          </div>






          {/* Graphique */}

          <div className="bg-white rounded-xl shadow p-6 mb-8">


            <h2 className="text-xl font-bold mb-4">

              Activité des conversations

            </h2>



            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">

              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="jour" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="conversations"
                    stroke="#2563eb"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>

            </div>

          </div>  

          
          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">
              Répartition des canaux
            </h2>


            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={channelData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >

                  {
                    channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} />
                    ))
                  }

                </Pie>


                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>
          
          <div className="bg-white rounded-xl shadow p-6 mb-8">

            <h2 className="text-xl font-bold mb-4">
              Intentions les plus demandées
            </h2>


            <div className="h-72">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={intentData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="intent" />

                  <YAxis />

                  <Tooltip />


                  <Bar
                    dataKey="total"
                    fill="#2563eb"
                    radius={[8, 8, 0, 0]}
                  />


                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>  






          {/* Channels */}

          <div className="bg-white rounded-xl shadow p-6">


            <h2 className="text-xl font-bold mb-4">

              Canaux utilisés

            </h2>



            <div className="grid md:grid-cols-4 gap-4">


              {data?.channels?.map((item) => (

                <div
                  key={item.channel}
                  className="bg-gray-50 p-4 rounded"
                >

                  <p className="text-gray-500">
                    {item.channel}
                  </p>


                  <strong className="text-2xl">

                    {item.total}

                  </strong>


                </div>

              ))}


            </div>


          </div>



      </div>  


    </DashLayout>

  );

}