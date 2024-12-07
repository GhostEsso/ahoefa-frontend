"use client";

import { Button } from "@/components/ui/button";
import { SearchIcon, MapPinIcon } from "lucide-react";

export function SearchBar() {
  return (
    <div className="bg-white rounded-lg p-4 max-w-3xl mx-auto shadow-lg mt-8">
      <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex-1">
          <div className="relative">
            <label htmlFor="search" className="sr-only">Recherche</label>
            <SearchIcon className="absolute left-3 top-3 text-gray-400" aria-hidden="true" />
            <input
              id="search"
              type="text"
              placeholder="Que recherchez-vous ?"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="relative">
            <label htmlFor="location" className="sr-only">Localisation</label>
            <MapPinIcon className="absolute left-3 top-3 text-gray-400" aria-hidden="true" />
            <input
              id="location"
              type="text"
              placeholder="Localisation"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full md:w-auto">
          Rechercher
        </Button>
      </form>
    </div>
  );
} 