import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

type LayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
  const { userId } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header>
        <nav className="sticky top-0 bg-white shadow-sm z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

            {/* Navbar principale */}
            <div className="flex items-center justify-between">

              {/* Logo */}
              <Link
                to="/"
                onClick={closeMenu}
                className="flex items-center"
              >
                <img
                  src="/logo.png"
                  alt="Sickabot AI"
                  className="h-9 sm:h-10 w-auto"
                />
              </Link>

              {/* Navigation Desktop */}
              <ul className="hidden md:flex items-center gap-7 font-medium text-gray-700">
                <li>
                  <Link
                    to="/"
                    className="hover:text-indigo-600 transition"
                  >
                    Accueil
                  </Link>
                </li>

                <li>
                  <Link
                    to="/chatbot"
                    className="hover:text-indigo-600 transition"
                  >
                    Chatbot
                  </Link>
                </li>

                <li>
                  <a
                    href="/#prix"
                    className="hover:text-indigo-600 transition"
                  >
                    Prix
                  </a>
                </li>

                <li>
                  <a
                    href="/#about"
                    className="hover:text-indigo-600 transition"
                  >
                    À propos
                  </a>
                </li>

                <li>
                  <a
                    href="/#contact"
                    className="hover:text-indigo-600 transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>

              {/* Actions Desktop */}
              <div className="hidden md:flex items-center gap-3">
                {userId ? (
                  <Link
                    to="/Dashboard"
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2.5 text-gray-700 hover:text-indigo-600 transition font-medium"
                    >
                      Se connecter
                    </Link>

                    <Link
                      to="/register"
                      className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium"
                    >
                      S'inscrire
                    </Link>
                  </>
                )}
              </div>

              {/* Bouton Hamburger Mobile */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                aria-label="Ouvrir le menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  /* X */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  /* Hamburger */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Menu Mobile */}
            {isMenuOpen && (
              <div className="md:hidden border-t border-gray-100 mt-4 pt-4 pb-2">

                <div className="flex flex-col gap-1">

                  <Link
                    to="/"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition font-medium"
                  >
                    Accueil
                  </Link>

                  <Link
                    to="/chatbot"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition font-medium"
                  >
                    Chatbot
                  </Link>

                  <a
                    href="/#prix"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition font-medium"
                  >
                    Prix
                  </a>

                  <a
                    href="/#about"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition font-medium"
                  >
                    À propos
                  </a>

                  <a
                    href="/#contact"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition font-medium"
                  >
                    Contact
                  </a>
                </div>

                {/* Actions Mobile */}
                <div className="border-t border-gray-100 mt-3 pt-4 flex flex-col gap-3">

                  {userId ? (
                    <Link
                      to="/Dashboard"
                      onClick={closeMenu}
                      className="w-full text-center bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={closeMenu}
                        className="w-full text-center border border-gray-200 text-gray-700 px-5 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
                      >
                        Se connecter
                      </Link>

                      <Link
                        to="/register"
                        onClick={closeMenu}
                        className="w-full text-center bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
                      >
                        S'inscrire
                      </Link>
                    </>
                  )}

                </div>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="min-h-14 bg-white border-t flex items-center justify-center text-sm text-gray-500 px-4 py-4 text-center">
        © 2026 Sickabot. Tous droits réservés.
      </footer>
    </div>
  );
}