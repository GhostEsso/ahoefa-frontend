"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, ListPlus, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function UserMenu() {
  const { data: session } = useSession();
  const isAgent = session?.user?.role === 'AGENT' || session?.user?.role === 'AGENT_PREMIUM';

  const displayName = session?.user?.name ? 
    session.user.name.split(' ').map((part, index, array) => 
      index === array.length - 1 ? `${part.charAt(0)}.` : part
    ).join(' ') : '';

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium hidden md:block">
        {displayName}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="w-full flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </Link>
          </DropdownMenuItem>

          {isAgent && (
            <DropdownMenuItem asChild>
              <Link href="/agent/listings" className="w-full flex items-center">
                <ListPlus className="mr-2 h-4 w-4" />
                Mes Annonces
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem asChild>
            <Link href="/profile/edit" className="w-full flex items-center">
              <User className="mr-2 h-4 w-4" />
              Mes Informations
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-600"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 