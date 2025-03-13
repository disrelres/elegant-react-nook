
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full bg-white border-b border-black">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-green-600 dark:text-green-400 font-['Verdana']">
            Disability Related Resources
          </Link>
          <div className="flex items-center space-x-6">
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
      </div>
    </header>
  );
};
