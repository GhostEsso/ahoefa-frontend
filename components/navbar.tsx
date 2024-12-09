"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import { UserMenu } from "@/components/user-menu";

const navigationLinks  = [
  { href: "/properties", label: "Propriétés" },
  { href: "/agents", label: "Agents" },
  { href: "/about", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const isAnyAgent = userRole === 'AGENT' || userRole === 'AGENT_PREMIUM';

  const showUpgradeButton = () => {
    if (!session) return true; // Non connecté
    if (isAnyAgent) return false; // Déjà agent
    return true; // Utilisateur normal
  };

  return (
    <header className="w-full border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Ahoefa
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <>
              {showUpgradeButton() && (
                <Link href="/pricing">
                  <Button variant="outline" className="mr-4">
                    Devenir Agent
                  </Button>
                </Link>
              )}
              <UserMenu />
            </>
          ) : (
            <>
              <Link href="/pricing">
                <Button variant="outline">Devenir Agent</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost">Connexion</Button>
              </Link>
              <Link href="/register">
                <Button>S&apos;inscrire</Button>
              </Link>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
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
                    {showUpgradeButton() && (
                      <Link href="/pricing">
                        <Button variant="outline" className="w-full">Devenir Agent</Button>
                      </Link>
                    )}
                    <UserMenu />
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