
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="w-full bg-white border-y border-black dark:bg-gray-800 dark:border-gray-700 relative">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#044bab] to-transparent opacity-75 animate-pulse"></div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#044bab] to-transparent opacity-75 animate-pulse"></div>
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center">
          <Link 
            to="/" 
            className={`font-['Verdana'] ${location.pathname === "/" 
              ? "text-black dark:text-white font-bold" 
              : "text-[#044bab] dark:text-blue-300 hover:underline"}`}
          >
            Search
          </Link>
          <span className="mx-2 text-black dark:text-white">|</span>
          <Link 
            to="/about" 
            className={`font-['Verdana'] ${location.pathname === "/about" 
              ? "text-black dark:text-white font-bold" 
              : "text-[#044bab] dark:text-blue-300 hover:underline"}`}
          >
            About
          </Link>
          <span className="mx-2 text-black dark:text-white">|</span>
          <Link 
            to="/faq" 
            className={`font-['Verdana'] ${location.pathname === "/faq" 
              ? "text-black dark:text-white font-bold" 
              : "text-[#044bab] dark:text-blue-300 hover:underline"}`}
          >
            FAQ
          </Link>
        </div>
      </div>
    </nav>
  );
};
