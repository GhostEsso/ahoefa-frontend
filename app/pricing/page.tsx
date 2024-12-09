import { Check, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Basic",
    price: "Gratuit",
    description: "Pour commencer dans l'immobilier",
    features: [
      "3 publications par mois",
      "2 images par annonce",
      "Messagerie de base",
      "Profil agent simple",
      "Support email"
    ],
    limitations: [
      "Publications limitées",
      "Images limitées",
      "Pas de mise en avant",
      "Pas de statistiques"
    ],
    href: "/register?plan=basic",
    popular: false
  },
  {
    name: "Standard",
    price: "2,500",
    currency: "FCFA",
    period: "/mois",
    description: "Pour les agents en développement",
    features: [
      "10 publications par mois",
      "5 images par annonce",
      "Messagerie avancée",
      "Profil agent vérifié",
      "Support prioritaire",
      "Statistiques de base",
      "Badge Standard"
    ],
    href: "/register?plan=standard",
    popular: false
  },
  {
    name: "Premium",
    price: "5,000",
    currency: "FCFA",
    period: "/mois",
    description: "Pour les agents professionnels",
    features: [
      "Publications illimitées",
      "Jusqu'à 15 images par annonce",
      "Messagerie avancée",
      "Profil agent vérifié",
      "Support prioritaire",
      "Statistiques détaillées",
      "Mise en avant des annonces",
      "Badge Premium",
      "Apparition en tête des résultats"
    ],
    href: "/register?plan=premium",
    popular: true
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Choisissez votre formule d'agent immobilier
          </h1>
          <p className="text-lg text-gray-600">
            Des options flexibles pour répondre à vos besoins, que vous débutiez ou que vous soyez un professionnel confirmé
          </p>
        </div>

        {/* Cartes de prix */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Recommandé
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.currency && (
                    <span className="text-xl ml-1">{plan.currency}</span>
                  )}
                  {plan.period && (
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-8">{plan.description}</p>

                <Link href={plan.href}>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    {plan.name === "Basic" ? "Commencer gratuitement" : `Choisir ${plan.name}`}
                  </Button>
                </Link>

                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Fonctionnalités incluses :</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.limitations && (
                      <>
                        <li className="pt-3 mt-3 border-t">
                          <p className="font-medium text-gray-500 mb-2">Limitations :</p>
                          {plan.limitations.map((limitation) => (
                            <div key={limitation} className="flex items-start gap-3 text-gray-500 mt-2">
                              <X className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                              <span>{limitation}</span>
                            </div>
                          ))}
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {plan.popular && (
                <div className="p-4 border-t border-gray-100 bg-blue-50">
                  <p className="text-sm text-blue-800 font-medium">
                    Pour activer votre compte premium, contactez notre service d'assistance :
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm flex items-center text-blue-700">
                      <Phone className="w-4 h-4 mr-2" />
                      90 00 00 00
                    </p>
                    <p className="text-sm flex items-center text-blue-700">
                      <Phone className="w-4 h-4 mr-2" />
                      98 00 00 00
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-blue-600">
                    Notre équipe vous guidera pour le processus de paiement et l'activation de votre compte.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Questions fréquentes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">
                Comment fonctionnent les différentes formules ?
              </h3>
              <p className="text-gray-600">
                Chaque formule offre des fonctionnalités adaptées à votre niveau d'activité. 
                Vous pouvez commencer gratuitement et évoluer selon vos besoins.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Puis-je changer de formule à tout moment ?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez upgrader ou downgrader votre compte à tout moment 
                pour vous adapter à vos besoins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 