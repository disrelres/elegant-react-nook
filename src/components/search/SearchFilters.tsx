
import { ServiceType } from "../types/organization";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  serviceType: ServiceType | "";
  organizationType: "organization" | "program" | "";
  onServiceTypeChange: (value: ServiceType | "") => void;
  onOrganizationTypeChange: (value: "organization" | "program") => void;
  onKeywordChange?: (keyword: string) => void;
}

export const SearchFilters = ({
  serviceType,
  organizationType,
  onServiceTypeChange,
  onOrganizationTypeChange,
  onKeywordChange,
}: SearchFiltersProps) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onKeywordChange?.(keyword);
  };

  return (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-sm mb-8 border border-black">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex gap-4">
          <button
            className={`flex-1 py-2 px-4 rounded-md font-['Verdana'] border border-black transition-colors ${
              organizationType === "program"
                ? "bg-[#044bab] text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
            onClick={() => onOrganizationTypeChange("program")}
          >
            Programs
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md font-['Verdana'] border border-black transition-colors ${
              organizationType === "organization"
                ? "bg-[#044bab] text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
            onClick={() => onOrganizationTypeChange("organization")}
          >
            Organizations
          </button>
        </div>
        <select
          className="p-2 border rounded-md font-['Verdana'] text-black"
          value={serviceType}
          onChange={(e) => onServiceTypeChange(e.target.value as ServiceType | "")}
        >
          <option value="">Select Service Type</option>
          <option value="advocacy">Advocacy</option>
          <option value="employment_support">Employment Support</option>
          <option value="education_training">Education & Training</option>
          <option value="healthcare_services">Healthcare Services</option>
          <option value="housing_assistance">Housing Assistance</option>
          <option value="transportation">Transportation</option>
          <option value="counseling">Counseling</option>
          <option value="assistive_technology">Assistive Technology</option>
          <option value="recreation_social">Recreation & Social</option>
          <option value="legal_services">Legal Services</option>
          <option value="finances">Finances</option>
        </select>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 p-2 border rounded-md font-['Verdana'] text-black"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-white text-gray-400 hover:text-[#044bab] transition-colors font-['Verdana'] border border-black rounded-md"
                >
                  <Search className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
