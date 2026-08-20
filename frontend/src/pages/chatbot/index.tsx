// src/pages/business/index.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type Business, businessApi } from "../../api/business.api";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const ChatbotsPage = () => {
  const [chatbots, setChatbots] = useState<Business[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await businessApi.getPublicChatbot();

        console.log("🔥 Chatbots:", data);

        setChatbots(data.data);
      } catch (err) {
        console.error("❌ FETCH ERROR:", err);
        setError("Erreur lors du chargement des chatbots");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p>⏳ Chargement des chatbots...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Liste des chatbots"
        description="Découvrez les chatbots disponibles"
      />

      <PageBreadcrumb pageTitle="Chatbots disponibles" />

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            Chatbots disponibles
          </h1>

          <p className="mt-1 text-gray-500">
            Choisissez un chatbot pour commencer une conversation.
          </p>
        </div>

        {chatbots.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-500">
              Aucun chatbot disponible pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {chatbots.map((chatbot) => (
              <div
                key={chatbot.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl">
                    🤖
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {chatbot.name}
                    </h2>

                    {chatbot.agent_name && (
                      <p className="text-sm text-gray-500">
                        {chatbot.agent_name}
                      </p>
                    )}
                  </div>
                </div>

                {chatbot.description && (
                  <p className="mb-5 line-clamp-3 text-sm text-gray-600">
                    {chatbot.description}
                  </p>
                )}

                <Link
                  to={`/chatbot/${chatbot.slug}`}
                  className="block w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  💬 Discuter avec ce chatbot
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatbotsPage;