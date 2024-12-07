"use client";

import Image from "next/image";
import { HeroCarousel } from "@/components/hero-carousel";
import { SearchBar } from "@/components/search-bar";
import { useState, useEffect } from "react";

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
          <SearchBar />
        </div>
      </div>
    </section>
  );
} 