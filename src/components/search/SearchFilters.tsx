
import { ServiceType } from "../types/organization";
import { useState } from "react";
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
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-6 rounded-lg shadow-sm mb-8 border border-black dark:border-gray-700">
      <div className="flex flex-col gap-6">
        <div className="space-y-3">
          <p className="text-center font-['Verdana'] text-black dark:text-white mb-2">
            Please select Programs or Organizations to begin your search:
          </p>
          <div className="flex gap-4 justify-center">
            <button
              className={`py-2 px-8 rounded-md font-['Verdana'] border border-black dark:border-gray-700 transition-colors ${
                organizationType === "program"
                  ? "bg-[#044bab] text-white dark:bg-blue-600"
                  : "bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              }`}
              onClick={() => onOrganizationTypeChange("program")}
            >
              Programs
            </button>
            <button
              className={`py-2 px-8 rounded-md font-['Verdana'] border border-black dark:border-gray-700 transition-colors ${
                organizationType === "organization"
                  ? "bg-[#044bab] text-white dark:bg-blue-600"
                  : "bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              }`}
              onClick={() => onOrganizationTypeChange("organization")}
            >
              Organizations
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="p-2 border rounded-md font-['Verdana'] text-black dark:text-white dark:bg-gray-700 dark:border-gray-600 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            value={serviceType}
            onChange={(e) => onServiceTypeChange(e.target.value as ServiceType | "")}
            disabled={!organizationType}
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

          <div className="relative">
            <input
              type="text"
              placeholder="Search by keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full p-2 pe-10 border rounded-md font-['Verdana'] text-black dark:text-white dark:bg-gray-700 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              disabled={!organizationType}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#044bab] dark:hover:text-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Search"
              disabled={!organizationType}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
