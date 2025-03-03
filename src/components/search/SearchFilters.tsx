
import { ServiceType } from "../types/organization";
import { OrganizationTypeSelector } from "./OrganizationTypeSelector";
import { ServiceTypeSelect } from "./ServiceTypeSelect";
import { KeywordSearch } from "./KeywordSearch";

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
  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-6 rounded-lg shadow-sm mb-8 border border-black dark:border-gray-700">
      <div className="flex flex-col gap-6">
        <OrganizationTypeSelector 
          organizationType={organizationType} 
          onChange={onOrganizationTypeChange} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ServiceTypeSelect 
            serviceType={serviceType} 
            onChange={onServiceTypeChange} 
            disabled={!organizationType} 
          />

          <KeywordSearch 
            onSearch={(keyword) => onKeywordChange?.(keyword)} 
            disabled={!organizationType} 
          />
        </div>
      </div>
    </div>
  );
};
