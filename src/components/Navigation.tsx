
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className={`font-['Verdana'] ${location.pathname === "/" 
              ? "text-black font-bold" 
              : "text-[#044bab] hover:underline"}`}
          >
            Organizations
          </Link>
          <Link 
            to="/dme" 
            className={`font-['Verdana'] ${location.pathname === "/dme" 
              ? "text-black font-bold" 
              : "text-[#044bab] hover:underline"}`}
          >
            DME Search
          </Link>
        </div>
      </div>
    </nav>
  );
};
