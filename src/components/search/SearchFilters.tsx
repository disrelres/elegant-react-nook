
import { DisabilityType, ServiceType } from "../types/organization";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  disabilityType: DisabilityType | "";
  serviceType: ServiceType | "";
  onDisabilityTypeChange: (value: DisabilityType | "") => void;
  onServiceTypeChange: (value: ServiceType | "") => void;
  onKeywordChange?: (keyword: string) => void;
  onDMEServiceTypeChange?: (value: "sell" | "rent" | "loan" | "repair" | "") => void;
  dmeServiceType?: "sell" | "rent" | "loan" | "repair" | "";
}

export const SearchFilters = ({
  disabilityType,
  serviceType,
  dmeServiceType = "",
  onDisabilityTypeChange,
  onServiceTypeChange,
  onKeywordChange,
  onDMEServiceTypeChange,
}: SearchFiltersProps) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onKeywordChange?.(keyword);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-black">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <select
          className="p-2 border rounded-md font-['Verdana'] text-black"
          value={disabilityType}
          onChange={(e) => onDisabilityTypeChange(e.target.value as DisabilityType | "")}
        >
          <option value="">Select Disability Type</option>
          <option value="mobility_impairment">Mobility Impairment</option>
          <option value="visual_impairment">Visual Impairment</option>
          <option value="hearing_impairment">Hearing Impairment</option>
          <option value="cognitive_disability">Cognitive Disability</option>
          <option value="chronic_health_conditions">Chronic Health Conditions</option>
        </select>

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
        </select>

        <select
          className="p-2 border rounded-md font-['Verdana'] text-black"
          value={dmeServiceType}
          onChange={(e) => onDMEServiceTypeChange?.(e.target.value as "sell" | "rent" | "loan" | "repair" | "")}
        >
          <option value="">Select DME Service Type</option>
          <option value="sell">Sell</option>
          <option value="rent">Rent</option>
          <option value="loan">Loan</option>
          <option value="repair">Repair</option>
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
                <p>Search resources</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
