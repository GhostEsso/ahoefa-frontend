"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const carouselItems = [
  {
    title: "Trouvez votre maison de rêve",
    description: "Des milliers de propriétés vous attendent"
  },
  {
    title: "Les meilleures offres immobilières",
    description: "Des prix compétitifs pour tous les budgets"
  },
  {
    title: "Service professionnel",
    description: "Des agents qualifiés à votre service"
  }
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {carouselItems[0].title}
        </h1>
        <div className="text-xl md:text-2xl">
          {carouselItems[0].description}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {carouselItems[currentIndex].title}
          </h1>
          <div className="text-xl md:text-2xl">
            {carouselItems[currentIndex].description}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 