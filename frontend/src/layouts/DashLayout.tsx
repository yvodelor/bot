import type { ReactNode } from "react"

import  Header  from "../components/header/Header";
import { ThemeProvider } from "../context/ThemeContext";
import { useAuth } from "../context/authContext";
import  { useState } from "react";

import {
  LayoutDashboard,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  FileText,
  BarChart3, Bell
} from "lucide-react";


type MenuItem = {
  title: string;
  icon: React.ElementType;
  link?: string;
  minRole?: number;
  submenu?: {
    title: string;
    link: string;
    icon?: React.ElementType;
  }[];
};



const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    link: "/dashboard",
  },

  {
    title: "Businesses",
    icon: LayoutDashboard,
    link: "/businesses",
  },

  {
    title: "Cannaux",
    icon: Users,
    submenu: [
      { title: "Pages Facebook", link: "#", icon:LayoutDashboard},
      { title: "Wathsapp Business", link: "#", icon:LayoutDashboard},
      { title: "Instangram", link: "#", icon:LayoutDashboard},
      { title: "telegram", link: "#", icon:LayoutDashboard},
    ],
  },

  {
    title: "Utilisateurs",
    icon: Users,
    submenu: [
      { title: "Liste des utilisateurs", link: "#" },
      { title: "Ajouter un utilisateur", link: "#" },
    ],
  },

  {
    title: "Rapports",
    icon: BarChart3,
    submenu: [
      { title: "Statistiques", link: "#" },
      { title: "Activité", link: "#" },
    ],
  },

  {
    title: "Documents",
    icon: FileText,
    link: "#",
  },
 
  {
    title: "Admin",
    minRole: 4, // 👈 accès si role > 3
    icon: Users,
    submenu: [
      { title: "Activites", link: "/admin/activites" },
      { title: "Intents", link: "/admin/intents" },
      { title: "Variants d'intents", link: "/admin/intent/exemples" },
      
      { title: "Response base", link: "/admin/response_bases" },
      { title: "Scenario", link: "/admin/scenarios" },
      { title: "Scenario_step", link: "/admin/scenario_steps" },
      
    ],
  },

  {
    title: "Paramètres",
    icon: Settings,
    link: "#",
  },
];



type LayoutProps = {
  children: ReactNode
}

export default function DashLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({}) 
  const { userId, email, name, role} = useAuth(); 



  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <ThemeProvider>
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72
          bg-gray-900 text-white
          transform transition-transform duration-300
          lg:static lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">

          <div className="text-lg text-center font-bold">
            <a  href= "/">Mon Admin</a>
          </div>

          {/* Close mobile */}
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>

        </div>

        {/* Navigation */}
        <nav className="h-[calc(100%-64px)] overflow-y-auto p-4 space-y-2">

          {menuItems
            .filter(item => !item.minRole || role < item.minRole)
            .map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index}>

                {/* Main menu */}
                <a
                  onClick={() =>
                    item.submenu
                      ? toggleMenu(item.title)
                      : setSidebarOpen(false)
                  }
                  href={item.link}
                  className="
                    w-full flex items-center justify-between
                    px-4 py-2 rounded-xl
                    hover:bg-gray-800
                    transition
                  "
                >

                  <div className="flex items-center gap-3">

                    <Icon size={20} />

                    <span>{item.title}</span>

                  </div>

                  {/* Arrow */}
                  {item.submenu && (
                    openMenus[item.title] ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )
                  )}

                </a>

                {/* Submenu */}
                {item.submenu && openMenus[item.title] && (

                  <div className="mt-2 ml-10 space-y-2">

                    {item.submenu.map((subItem, subIndex) => (

                      <a
                        key={subIndex}
                        href={subItem.link}
                        className="
                          block px-3 py-2 rounded-lg
                          text-sm text-gray-300
                          hover:bg-gray-800
                          hover:text-white
                          transition
                        "
                      >
                        {subItem.title}
                      </a>

                    ))}

                  </div>

                )}

              </div>
            );
          })}

        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
           
        {/* Header */}
        <Header onToggle={() => setSidebarOpen(prev => !prev)} />
       
        {/* Main */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">

          {children}
          
        </main>

        {/* Footer */}
        <footer className="
          h-14 bg-white border-t
          flex items-center justify-center
          text-sm text-gray-500
        ">
          © 2026 Mon Assistant virtuel
        </footer>

      </div>
    </div>
    </ThemeProvider>
  );
}