
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="w-full bg-white border-y border-black dark:bg-gray-800 dark:border-gray-700 relative">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#044bab] to-transparent opacity-75 animate-pulse"></div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#044bab] to-transparent opacity-75 animate-pulse"></div>
      <div className="container mx-auto px-4 py-2 overflow-x-auto">
        <div className="flex items-center space-x-2 min-w-max">
          <Link 
            to="/" 
            className={`font-['Verdana'] ${location.pathname === "/" 
              ? "text-black dark:text-white font-bold" 
              : "text-[#044bab] dark:text-blue-300 hover:underline"}`}
          >
            Search
          </Link>
          <span className="text-black dark:text-white">|</span>
          <Link 
            to="/features" 
            className={`font-['Verdana'] ${location.pathname === "/features" 
              ? "text-black dark:text-white font-bold" 
              : "text-[#044bab] dark:text-blue-300 hover:underline"}`}
          >
            Features
          </Link>
          <span className="text-black dark:text-white">|</span>
          <Link 
            to="/dice-roller" 
            className={`font-['Verdana'] ${location.pathname === "/dice-roller" 
              ? "text-black dark:text-white font-bold" 
              : "text-[#044bab] dark:text-blue-300 hover:underline"}`}
          >
            Dice Roller
          </Link>
          <span className="text-black dark:text-white">|</span>
          <Link 
            to="/about" 
            className={`font-['Verdana'] ${location.pathname === "/about" 
              ? "text-black dark:text-white font-bold" 
              : "text-[#044bab] dark:text-blue-300 hover:underline"}`}
          >
            About
          </Link>
          <span className="text-black dark:text-white">|</span>
          <Link 
            to="/faq" 
            className={`font-['Verdana'] ${location.pathname === "/faq" 
              ? "text-black dark:text-white font-bold" 
              : "text-[#044bab] dark:text-blue-300 hover:underline"}`}
          >
            FAQ
          </Link>
          <span className="text-black dark:text-white">|</span>
          <Link 
            to="/icosahedron" 
            className={`font-['Verdana'] ${location.pathname === "/icosahedron" 
              ? "text-black dark:text-white font-bold" 
              : "text-[#044bab] dark:text-blue-300 hover:underline"}`}
          >
            Icosahedron
          </Link>
        </div>
      </div>
    </nav>
  );
};
