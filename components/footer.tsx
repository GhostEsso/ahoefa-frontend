import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">À propos</h3>
            <p className="text-sm">
              Ahoefa est votre partenaire de confiance pour trouver la propriété idéale au Togo.
              Nous connectons les agents immobiliers professionnels avec les acheteurs et locataires.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="/properties" className="text-sm hover:text-white transition-colors">
                  Propriétés
                </a>
              </li>
              <li>
                <a href="/agents" className="text-sm hover:text-white transition-colors">
                  Agents
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-sm hover:text-white transition-colors">
                  Devenir Agent
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@ahoefa.com</li>
              <li>Téléphone: +228 00 00 00 00</li>
              <li>Adresse: Lomé, Togo</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Inscrivez-vous pour recevoir nos dernières offres
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-3 py-2 bg-gray-800 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Ahoefa. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
} 