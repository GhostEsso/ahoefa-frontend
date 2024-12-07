"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, User, LogOut, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const navigationLinks = [
  { href: "/properties", label: "Propriétés" },
  { href: "/agents", label: "Agents" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="w-full border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Ahoefa
        </Link>
        
        {/* Navigation desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/pricing">
            <Button variant="outline" className="text-sm">
              Devenir Agent
            </Button>
          </Link>
        </div>

        {/* Boutons de connexion desktop */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link href="/register">
                <Button>S'inscrire</Button>
              </Link>
            </>
          )}
        </div>

        {/* Menu mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-blue-600 py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-gray-200 my-2" />
              <Link href="/pricing" className="py-2">
                <Button variant="outline" className="w-full">
                  Devenir Agent
                </Button>
              </Link>
              
              {/* Boutons de connexion mobile */}
              <div className="h-px bg-gray-200 my-2" />
              {isAuthenticated ? (
                <>
                  <Link href="/profile">
                    <Button variant="outline" className="w-full">
                      Profil
                    </Button>
                  </Link>
                  <Button 
                    className="w-full text-red-600" 
                    variant="outline"
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full">
                      S'inscrire
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
} 