
import { Link } from "react-router-dom";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <>
      <header className="w-full bg-white border-b border-gray-200 shadow-[0_4px_6px_-1px_rgba(4,75,171,0.3)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="text-2xl font-bold text-[#044bab] font-['Verdana']">
              Disability Related Resources
            </Link>
            <a 
              href="https://buymeacoffee.com/disrelres" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors font-['Verdana']"
            >
              Donate
            </a>
          </div>
        </div>
      </header>
      <Navigation />
    </>
  );
};
