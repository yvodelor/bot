import {  Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import PageMeta from "../components/common/PageMeta";



export default function HomePage() {

  const { userId } = useAuth();

 const apiUrl = import.meta.env.VITE_API_URL;

console.log('api-pl', apiUrl);

  return (

   
    <>
      <PageMeta
        title= "Automatisez vos échanges clients avec l'intelligence artificielle" 
        description="Répondez automatiquement à vos clients sur votre site web, WhatsApp, Messenger et d'autres canaux grâce à un agent IA disponible 24h/24"
      />
      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <nav className="sticky top-0 bg-white shadow-sm z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Sickabot ai"
                className="h-10 w-auto"
              />
              
            </div>

            <ul className="hidden md:flex items-center gap-8 font-medium">
              <li>
                <a href="#accueil" className="hover:text-indigo-600">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#prix" className="hover:text-indigo-600">
                  Prix
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-indigo-600">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-indigo-600">
                  Contact
                </a>
              </li>
            </ul>

            { userId ?(
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
              <Link to = {`/Dashboard`} >Dashboard</Link>
            </button>
            ):(
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
                <Link to = {`/login`} >Se connecter</Link>
              </button>
              
            )}
          </div>
        </nav>

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
              Pourquoi choisir notre Agent IA ?
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
        <section id="about" className="bg-gray-50 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-4xl font-bold mb-8">
              À propos
            </h3>

            <p className="text-lg text-gray-600 leading-relaxed">
              Notre mission est d'aider les entreprises à automatiser
              leurs échanges avec les clients grâce à une intelligence
              artificielle performante, simple à déployer et capable
              d'améliorer l'expérience utilisateur.
            </p>
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

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 text-center">
          <p>© 2026 ConversaAI. Tous droits réservés.</p>
        </footer>
      </div>
    </>
  );
}