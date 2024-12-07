"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Users, 
  Home,
  ClipboardList,
  LogOut,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Tableau de bord",
    href: "/superadmin/dashboard",
    icon: Home
  },
  {
    title: "Agents",
    href: "/superadmin/dashboard/agents",
    icon: Users
  },
  {
    title: "Publications",
    href: "/superadmin/dashboard/listings",
    icon: ClipboardList
  },
  {
    title: "Paramètres",
    href: "/superadmin/dashboard/settings",
    icon: Settings
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r h-screen">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors",
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={() => {
              // Gérer la déconnexion
              localStorage.removeItem("token");
              window.location.href = "/superadmin/login";
            }}
            className="flex items-center space-x-3 px-4 py-2.5 w-full rounded-lg hover:bg-red-50 text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </div>
  );
} 