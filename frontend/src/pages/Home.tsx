
import PageMeta from "../components/common/PageMeta";
import AppLayout from "../layouts/AppLayout"
import { Link } from "react-router-dom";

export default function HomePage() {

  return (
 
    <AppLayout>
      <PageMeta
        title= "Automatisez vos échanges clients avec l'intelligence artificielle" 
        description="Répondez automatiquement à vos clients sur votre site web, WhatsApp, Messenger et d'autres canaux grâce à un agent IA disponible 24h/24"
      />
      
        {/* Hero */}
        <section
          id="accueil"
          className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12"
        >
          <div className="flex-1">
            <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
              Agent IA pour entreprises
            </span>

            <h2 className="text-5xl font-bold mt-6 leading-tight">
              Automatisez vos échanges clients avec l'intelligence artificielle
            </h2>

            <p className="text-gray-600 text-lg mt-6">
              Répondez automatiquement à vos clients sur votre site web,
              WhatsApp, Messenger et d'autres canaux grâce à un agent IA
              disponible 24h/24.
            </p>

            <div className="mt-8 flex gap-4">
              <button  
               className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700">
                Essayer gratuitement
              </button>

              <button className="border border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50">
                Voir une démo
              </button>
            </div>
          </div>

          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
              alt="Agent IA"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </section>

        {/* Fonctionnalités */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-4xl font-bold text-center mb-14">
              
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow">
                <h4 className="font-bold text-xl mb-3">
                  Disponible 24h/24
                </h4>
                <p className="text-gray-600">
                  Répondez à vos clients à tout moment.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h4 className="font-bold text-xl mb-3">
                  Réponses intelligentes
                </h4>
                <p className="text-gray-600">
                  Comprend les demandes en langage naturel.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h4 className="font-bold text-xl mb-3">
                  Multi-canaux
                </h4>
                <p className="text-gray-600">
                  Site web, WhatsApp, Messenger et plus.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h4 className="font-bold text-xl mb-3">
                  Tableau de bord
                </h4>
                <p className="text-gray-600">
                  Analysez toutes les conversations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prix */}
        {/* Prix */}
<section id="prix" className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">
    <h3 className="text-4xl font-bold text-center mb-12">
      Choisissez votre forfait
    </h3>

    <div className="grid md:grid-cols-3 gap-8">

      {/* Starter */}
      <div className="border rounded-xl p-8 bg-white">
        <h4 className="text-2xl font-bold">Starter</h4>

        <p className="text-5xl font-bold my-4">
          Free
          <span className="text-lg font-normal text-gray-500">/mois</span>
        </p>

        <ul className="space-y-3 mt-8 text-gray-700">
          <li>✅ 2 000 messages/mois</li>
          <li>✅ 3 produits</li>
          <li>✅ Réponse standard</li>
          <li>✅ FAQ limitée</li>
        
          <li>✅ Widget Web</li>
          <li>❌ WhatsApp</li>
          <li>❌ Telegram</li>
          <li>❌ API</li>
          <li>Support par email</li>
        </ul>

        <button className="w-full mt-8 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
          Commencer
        </button>
      </div>

      {/* Pro */}
      <div className="rounded-xl p-8 bg-indigo-600 text-white shadow-2xl scale-105">
        <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full">
          Le plus populaire
        </span>

        <h4 className="text-2xl font-bold mt-4">Pro</h4>

        <p className="text-5xl font-bold my-4">
          2500F
          <span className="text-lg font-normal">/mois</span>
        </p>

        <ul className="space-y-3 mt-8">
          <li>✅ 20 000 messages/mois</li>
          <li>✅ 20 Produits</li>
          <li>✅ Réponse rapide</li>
          <li>✅ FAQ illimitée</li>
          <li>✅ réponse intelligente</li>
          <li>✅ Widget Web</li>
          <li>✅ Telegram</li>
          <li>❌ WhatsApp</li>
          
          <li>❌ API REST</li>
          <li>Support prioritaire</li>
        </ul>

        <button className="w-full mt-8 bg-white text-indigo-600 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Choisir Pro
        </button>
      </div>

      {/* Entreprise */}
      <div className="border rounded-xl p-8 bg-white">
        <h4 className="text-2xl font-bold">Entreprise</h4>

        <p className="text-5xl font-bold my-4">
          7000F
          <span className="text-lg font-normal text-gray-500">/mois</span>
        </p>

        <ul className="space-y-3 mt-8 text-gray-700">
          <li>✅ Messages illimités</li>
          <li>✅ Produits illimités</li>
          <li>✅ Réponse ultra rapide</li>
          <li>✅ IA avancée</li>
        
          <li>✅ Toutes les intégrations</li>
          <li>✅ API complète</li>
          <li>✅ Hébergement dédié</li>
          <li>✅ Tableau de bord avancé</li>
          <li>✅ Documents intégés</li>
          <li>✅ Support 24/7</li>
        </ul>

        <button className="w-full mt-8 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
          Nous contacter
        </button>
      </div>

    </div>
  </div>
</section>

{/* About */}
<section id="about" className="relative bg-gray-50 py-20 sm:py-24 lg:py-28 overflow-hidden">
  {/* Background decoration */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

 

    {/* Introduction */}
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">

      {/* Text */}
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">
          Simplifiez votre relation client
        </h3>

        <div className="space-y-5 text-gray-600 leading-relaxed">
          <p>
            Aujourd'hui, les clients souhaitent obtenir des réponses rapides,
            précises et accessibles à tout moment. Pourtant, répondre
            constamment aux mêmes questions peut représenter une charge
            importante pour les équipes.
          </p>

          <p>
            <strong className="text-gray-900">Sickabot</strong> permet aux
            entreprises de mettre en place un assistant conversationnel
            intelligent capable de comprendre les demandes des utilisateurs,
            de fournir des réponses adaptées et de les orienter vers les
            informations ou services dont ils ont besoin.
          </p>

          <p>
            Notre solution s'appuie sur les informations propres à chaque
            entreprise afin de proposer des réponses cohérentes avec ses
            produits, services, horaires, tarifs et procédures.
          </p>
        </div>
      </div>

      {/* Visual card */}
      <div className="relative">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">

          {/* Chat header */}
          <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h8M8 14h5m7-2a8 8 0 11-16 0c0 1.3.31 2.53.86 3.62L4 20l4.38-1.86A8 8 0 0020 12z"
                />
              </svg>
            </div>

            <div>
              <h4 className="font-bold text-gray-900">
                Assistant Sickabot
              </h4>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Disponible
              </div>
            </div>
          </div>

          {/* Chat messages */}
          <div className="space-y-4 py-6">

            <div className="flex justify-end">
              <div className="max-w-[80%] bg-indigo-600 text-white rounded-2xl rounded-br-md px-4 py-3 text-sm">
                Bonjour, quels sont vos horaires d'ouverture ?
              </div>
            </div>

            <div className="flex justify-start">
              <div className="max-w-[85%] bg-gray-100 text-gray-700 rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-relaxed">
                Bonjour 👋 Nous sommes ouverts du lundi au vendredi de 8h à
                18h. Comment puis-je vous aider ?
              </div>
            </div>

          </div>

          {/* Bottom */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-sm text-gray-400 flex-1">
              Posez votre question...
            </span>

            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Values */}
    <div className="mb-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Pourquoi choisir Sickabot ?
        </h3>

        <p className="mt-4 text-gray-600">
          Une solution pensée pour répondre aux besoins réels des entreprises.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition duration-300">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-5">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          <h4 className="text-lg font-bold text-gray-900 mb-3">
            Simple et rapide
          </h4>

          <p className="text-gray-600 leading-relaxed">
            Déployez votre assistant conversationnel sans mettre en place une
            infrastructure complexe.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition duration-300">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-5">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-10a4 4 0 110 8 4 4 0 010-8z"
              />
            </svg>
          </div>

          <h4 className="text-lg font-bold text-gray-900 mb-3">
            Pensé pour vos clients
          </h4>

          <p className="text-gray-600 leading-relaxed">
            Offrez des réponses rapides et pertinentes pour améliorer
            l'expérience de vos utilisateurs.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition duration-300">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-5">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h4 className="text-lg font-bold text-gray-900 mb-3">
            Disponible 24h/24
          </h4>

          <p className="text-gray-600 leading-relaxed">
            Votre assistant peut répondre aux demandes de vos clients à tout
            moment, même lorsque vos équipes ne sont pas disponibles.
          </p>
        </div>

      </div>
    </div>

    {/* Benefits */}
    <div className="grid lg:grid-cols-2 gap-10 items-center mb-20">

      <div className="bg-indigo-600 rounded-3xl p-8 sm:p-10 text-white">
        <span className="text-indigo-200 text-sm font-semibold uppercase tracking-wider">
          Votre entreprise
        </span>

        <h3 className="text-2xl sm:text-3xl font-bold mt-3 mb-5">
          Gagnez du temps. Répondez mieux.
        </h3>

        <p className="text-indigo-100 leading-relaxed mb-7">
          Sickabot prend en charge les demandes fréquentes afin que vos
          équipes puissent se concentrer sur les tâches qui nécessitent leur
          expertise.
        </p>

        <Link
          to="/register"
          className="inline-flex items-center justify-center bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition"
        >
          Commencer avec Sickabot
        </Link>
      </div>

      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Une expérience client améliorée
        </h3>

        <ul className="space-y-5">
          {[
            "Répondre rapidement aux questions fréquentes",
            "Réduire les tâches répétitives de vos équipes",
            "Améliorer la disponibilité de votre service client",
            "Centraliser les informations utiles à vos clients",
            "Proposer une expérience plus fluide et personnalisée",
            "Accompagner votre transformation numérique",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mt-0.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l4 4L19 8"
                  />
                </svg>
              </span>

              <span className="text-gray-600">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="max-w-4xl mx-auto text-center bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12">
      <span className="text-indigo-600 font-semibold">
        Notre vision
      </span>

      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3 mb-5">
        Des échanges plus simples, des entreprises plus efficaces
      </h3>

      <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
        Nous imaginons un monde où chaque entreprise peut échanger avec ses
        clients de manière simple, rapide et efficace. Notre vision est de
        faciliter les échanges, de réduire les délais de réponse et de permettre
        aux équipes de consacrer davantage de temps aux missions qui créent
        réellement de la valeur.
      </p>

      <p className="mt-5 text-gray-700 font-medium text-base sm:text-lg">
        Avec Sickabot, nous voulons faire de chaque échange une opportunité
        d'améliorer la satisfaction client et la performance de l'entreprise.
      </p>
    </div>

  </div>
</section>

        {/* Contact */}
        <section id="contact" className="py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h3 className="text-4xl font-bold text-center mb-10">
              Contactez-nous
            </h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nom"
                className="w-full border rounded-lg p-4"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded-lg p-4"
              />

              <textarea
                
                placeholder="Votre message"
                className="w-full border rounded-lg p-4"
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700"
              >
                Envoyer
              </button>
            </form>
          </div>
        </section>
    </AppLayout>
  );
}