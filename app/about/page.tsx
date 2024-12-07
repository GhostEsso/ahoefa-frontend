import Image from "next/image";
import { Shield, Home, Users, Target, Star, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Section Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Bienvenue sur Ahoefa
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                La première plateforme immobilière au Togo qui connecte les agents professionnels avec les acheteurs et locataires potentiels.
              </p>
              <div className="flex items-center gap-4 text-gray-600">
                <Shield className="w-6 h-6 text-blue-500" />
                <span>Agents vérifiés et certifiés</span>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/about-hero.jpg"
                  alt="Ahoefa Immobilier"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Notre Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-blue-50">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Simplicité</h3>
              <p className="text-gray-600">
                Simplifier la recherche immobilière au Togo grâce à une plateforme intuitive et moderne.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-green-50">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fiabilité</h3>
              <p className="text-gray-600">
                Garantir des transactions sûres avec des agents immobiliers vérifiés et professionnels.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-purple-50">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Connexion</h3>
              <p className="text-gray-600">
                Mettre en relation les meilleurs agents avec les clients potentiels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Pourquoi nous choisir ?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Star,
                title: "Agents Premium",
                description: "Accédez à des agents certifiés et expérimentés"
              },
              {
                icon: Home,
                title: "Large Sélection",
                description: "Des milliers de propriétés disponibles"
              },
              {
                icon: Clock,
                title: "Mise à jour en temps réel",
                description: "Des annonces toujours à jour"
              },
              {
                icon: Shield,
                title: "Sécurité garantie",
                description: "Transactions sécurisées et vérifiées"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Vous avez des questions ?</h2>
          <p className="text-xl mb-8">
            Notre équipe est là pour vous aider à trouver la propriété de vos rêves
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="tel:+22890000000"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Nous appeler
            </a>
            <a
              href="mailto:contact@ahoefa.com"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Nous écrire
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 