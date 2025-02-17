
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-[#044bab] hover:underline font-['Verdana']">
            Organizations
          </Link>
          <Link to="/dme" className="text-[#044bab] hover:underline font-['Verdana']">
            DME Search
          </Link>
        </div>
      </div>
    </nav>
  );
};
