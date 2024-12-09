"use client";

import Image from "next/image";
import { HeroCarousel } from "@/components/hero-carousel";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-[600px] flex items-center justify-center" aria-label="Hero">
      <div className="absolute inset-0 z-0">
        {isLoaded && (
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover brightness-50"
            priority={true}
            sizes="100vw"
            quality={75}
            loading="eager"
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center">
          <HeroCarousel />
          <div className="mt-8">
            <Link href="/properties">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Découvrir nos propriétés
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 