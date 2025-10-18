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
              teams in 1337 cumpos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
