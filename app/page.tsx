"use client";

import React, { useState, useEffect } from "react";

import { HomeIcon, MapPinIcon, SearchIcon } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { PropertiesSection } from "@/components/properties-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PropertiesSection />

      {/* Features Section */}
      <section className="py-16" aria-label="Caractéristiques">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Pourquoi nous choisir ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: HomeIcon,
                title: "Large sélection",
                description: "Des milliers de propriétés disponibles",
              },
              {
                icon: MapPinIcon,
                title: "Localisation précise",
                description: "Trouvez exactement où vous voulez vivre",
              },
              {
                icon: SearchIcon,
                title: "Recherche facile",
                description: "Interface intuitive et recherche avancée",
              },
            ].map((feature, index) => (
              <article key={index} className="text-center">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-100 mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <div className="text-gray-600">{feature.description}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
