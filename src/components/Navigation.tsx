
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="w-full bg-white border-y border-black">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center">
          <Link 
            to="/" 
            className={`font-['Verdana'] ${location.pathname === "/" 
              ? "text-black font-bold" 
              : "text-[#044bab] hover:underline"}`}
          >
            Home
          </Link>
          <span className="mx-2 text-black">|</span>
          <Link 
            to="/about" 
            className={`font-['Verdana'] ${location.pathname === "/about" 
              ? "text-black font-bold" 
              : "text-[#044bab] hover:underline"}`}
          >
            About
          </Link>
          <span className="mx-2 text-black">|</span>
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
