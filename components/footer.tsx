import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">13 Teams</h3>
            <p className="text-gray-400">
              The ultimate platform for scheduling sports games and creating
              teams.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#teams"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Available Games
                </a>
              </li>
              <li>
                <a
                  href="#teams/new"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Create Game
                </a>
              </li>
              <li>
                <a
                  href="#my-teams"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  My Teams
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Sports</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">⚽ Football</span>
              </li>
              <li>
                <span className="text-gray-400">🏀 Basketball</span>
              </li>
              <li>
                <span className="text-gray-400">🎾 Tennis</span>
              </li>
              <li>
                <span className="text-gray-400">🏐 Volleyball</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: info@13teams.com</li>
              <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-400">Location: Sports City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 13 Teams. All rights reserved. Made with ❤️ for sports
            enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
};
