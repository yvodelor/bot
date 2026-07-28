
import DashLayout from "../../layouts/DashLayout";

export default function Dashboard() {

  SELECT COUNT(*) AS conversations FROM chat_message;



  return (
    <DashLayout>
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">
        Tableau de bord
      </h1>

      {/* Statistiques */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Conversations</h3>
          <p className="text-3xl font-bold">1 245</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Utilisateurs</h3>
          <p className="text-3xl font-bold">856</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Taux de réponse</h3>
          <p className="text-3xl font-bold">98%</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Satisfaction</h3>
          <p className="text-3xl font-bold">4.8★</p>
        </div>
      </div>

      {/* Graphique */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">
          Activité des conversations
        </h2>

        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          Graphique ici (Recharts)
        </div>
      </div>

      {/* Conversations */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Conversations récentes
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Client</th>
              <th className="text-left py-3">Canal</th>
              <th className="text-left py-3">Statut</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-3">Jean K.</td>
              <td>WhatsApp</td>
              <td>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Résolu
                </span>
              </td>
            </tr>

            <tr className="border-b">
              <td className="py-3">Marie A.</td>
              <td>Site Web</td>
              <td>
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  En cours
                </span>
              </td>
            </tr>

            <tr>
              <td className="py-3">Paul D.</td>
              <td>Messenger</td>
              <td>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                  En attente
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DashLayout>
  );
}