
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="w-full bg-white border-y border-gray-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className={`font-['Verdana'] ${location.pathname === "/" 
              ? "text-black font-bold" 
              : "text-[#044bab] hover:underline"}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`font-['Verdana'] ${location.pathname === "/about" 
              ? "text-black font-bold" 
              : "text-[#044bab] hover:underline"}`}
          >
            About
          </Link>
          <Link 
            to="/faq" 
            className={`font-['Verdana'] ${location.pathname === "/faq" 
              ? "text-black font-bold" 
              : "text-[#044bab] hover:underline"}`}
          >
            FAQ
          </Link>
        </div>
      </div>
    </nav>
  );
};
