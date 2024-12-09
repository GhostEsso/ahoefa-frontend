"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";

const navigationLinks = [
  { href: "/properties", label: "Propriétés" },
  { href: "/agents", label: "Agents" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="w-full border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Ahoefa
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link href="/properties" className="text-sm hover:text-blue-600">
            Propriétés
          </Link>
          <Link href="/agents" className="text-sm hover:text-blue-600">
            Agents
          </Link>
          <Link href="/about" className="text-sm hover:text-blue-600">
            À propos
          </Link>
          <Link href="/contact" className="text-sm hover:text-blue-600">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              <Link href="/agent/listings">
                <Button variant="default">Mes Annonces</Button>
              </Link>
              <Button variant="outline" onClick={() => signOut()}>
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Connexion</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">Inscription</Button>
              </Link>
            </>
          )}
        </div>

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
              <div className="flex flex-col gap-3">
                {session ? (
                  <>
                    <Link href="/agent/listings">
                      <Button variant="default" className="w-full">
                        Mes Annonces
                      </Button>
                    </Link>
                    <Button 
                      className="w-full text-red-600" 
                      variant="outline"
                      onClick={() => signOut()}
                    >
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" className="w-full">
                        Connexion
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full">
                        S&apos;inscrire
                      </Button>
                    </Link>
                  </>
                )}
                <Link href="/pricing" className="py-2">
                  <Button variant="outline" className="w-full">
                    Devenir Agent
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
} 