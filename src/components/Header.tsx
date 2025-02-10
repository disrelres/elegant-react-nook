
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#044bab] font-['Verdana']">
            test
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-[#044bab] transition-colors font-['Verdana']">
              Home
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
