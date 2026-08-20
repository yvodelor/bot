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
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <p>⏳ Chargement des chatbots...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-6">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Chatbots disponibles"
        description="Découvrez les chatbots disponibles sur Sickabot"
      />

      {/* =========================================
          ENTÊTE
      ========================================= */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-xl
                 
                  text-xl
                  shadow-sm
                "
              >
                <img
                    src="/logo.png"
                    alt="Sickabot ai"
                    className="h-10 w-auto"
                />
              </div>

             
            </Link>

            {/* ACTION */}
            <div>
              <Link
                to="/chatbot"
                className="
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-gray-700
                  transition
                  hover:bg-gray-50
                "
              >
                Chatbots
              </Link>
            </div>

          </div>

        </div>
      </header>

      {/* =========================================
          CONTENU
      ========================================= */}
      <main className="min-h-screen bg-gray-50">

        <PageBreadcrumb pageTitle="Chatbots disponibles" />

        {/* =========================================
            HERO / ENTÊTE DE PAGE
        ========================================= */}
        <section className="px-4 pb-8 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">

            <div
              className="
                overflow-hidden
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                px-6
                py-10
                text-white
                shadow-lg
                sm:px-10
                lg:px-12
              "
            >
              <div className="max-w-3xl">

                <div
                  className="
                    mb-4
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-white/10
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    backdrop-blur-sm
                  "
                >
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Assistants disponibles
                </div>

                <h2
                  className="
                    text-3xl
                    font-bold
                    tracking-tight
                    sm:text-4xl
                    lg:text-5xl
                  "
                >
                  Trouvez le chatbot
                  <br className="hidden sm:block" />
                  dont vous avez besoin
                </h2>

                <p
                  className="
                    mt-4
                    max-w-2xl
                    text-sm
                    leading-6
                    text-blue-100
                    sm:text-base
                  "
                >
                  Découvrez nos assistants intelligents et échangez
                  directement avec eux pour obtenir des informations,
                  des conseils ou de l'aide.
                </p>

                
              </div>
            </div>

          </div>
        </section>

        {/* =========================================
            LISTE DES CHATBOTS
        ========================================= */}
        <section className="px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">

         

            {chatbots.length === 0 ? (
              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-10
                  text-center
                  shadow-sm
                "
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
                  🤖
                </div>

                <h3 className="font-semibold text-gray-900">
                  Aucun chatbot disponible
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Aucun assistant n'est actuellement disponible.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

                {chatbots.map((chatbot) => (
                  <div
                    key={chatbot.id}
                    className="
                      group
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white
                      p-5
                      shadow-sm
                      transition
                      duration-200
                      hover:-translate-y-1
                      hover:shadow-lg
                    "
                  >

                    {/* CHATBOT HEADER */}
                    <div className="mb-4 flex items-center gap-4">

                      <div
                        className="
                          flex
                          h-14
                          w-14
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-blue-50
                          text-2xl
                          transition
                          group-hover:bg-blue-100
                        "
                      >
                        🤖
                      </div>

                      <div className="min-w-0">

                        <h4 className="truncate font-semibold text-gray-900">
                          {chatbot.name}
                        </h4>

                        {chatbot.agent_name && (
                          <p className="truncate text-sm text-gray-500">
                            {chatbot.agent_name}
                          </p>
                        )}

                      </div>

                    </div>

                    {/* DESCRIPTION */}
                    <div className="min-h-[72px]">

                      {chatbot.description ? (
                        <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                          {chatbot.description}
                        </p>
                      ) : (
                        <p className="text-sm italic text-gray-400">
                          Assistant intelligent disponible pour répondre
                          à vos questions.
                        </p>
                      )}

                    </div>

                    {/* BUTTON */}
                    <div className="mt-5">

                      <Link
                        to={`/chatbot/${chatbot.slug}`}
                        className="
                          block
                          w-full
                          rounded-xl
                          bg-blue-600
                          px-4
                          py-2.5
                          text-center
                          text-sm
                          font-medium
                          text-white
                          transition
                          hover:bg-blue-700
                          focus:outline-none
                          focus:ring-2
                          focus:ring-blue-500
                          focus:ring-offset-2
                        "
                      >
                        💬 Discuter avec ce chatbot
                      </Link>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>
        </section>

      </main>
    </>
  );
};

export default ChatbotsPage;