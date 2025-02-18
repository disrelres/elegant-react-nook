
import { useState, useEffect } from "react";
import { OrganizationCard } from "./search/OrganizationCard";
import { SearchFilters } from "./search/SearchFilters";
import { SearchResultsHeader } from "./search/SearchResultsHeader";
import { saveAs } from 'file-saver';
import { AnimatePresence } from "framer-motion";
import { DisabilityType, ServiceType, ProcessedOrganization } from "./types/organization";

// Sample initial data - you should replace this with your actual data
const initialOrganizations: ProcessedOrganization[] = [
  {
    id: "1",
    name: "Sample Organization",
    description: "A sample organization description",
    website: "https://example.com",
    phone: "123-456-7890",
    email: "contact@example.com",
    zip_code: "12345",
    service_type: "advocacy",
    disability_type: "mobility_impairment"
  }
];

export const SearchSection = () => {
  const [disabilityType, setDisabilityType] = useState<DisabilityType | "">("");
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [keyword, setKeyword] = useState<string>("");
  const [organizations, setOrganizations] = useState<ProcessedOrganization[]>(initialOrganizations);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setHasSearched(true);
    let filteredOrganizations = initialOrganizations.filter((org) => {
      const disabilityMatch = disabilityType ? org.disability_type === disabilityType : true;
      const serviceMatch = serviceType ? org.service_type === serviceType : true;
      const keywordMatch = keyword
        ? org.name.toLowerCase().includes(keyword.toLowerCase()) ||
          org.description.toLowerCase().includes(keyword.toLowerCase())
        : true;

      return disabilityMatch && serviceMatch && keywordMatch;
    });

    setOrganizations(filteredOrganizations);
  }, [disabilityType, serviceType, keyword]);

  const handleKeywordSearch = (value: string) => {
    setKeyword(value);
  };

  const handleDownload = () => {
    const data = organizations.map(org => ({
      Name: org.name,
      Description: org.description,
      Website: org.website,
      Phone: org.phone,
      Email: org.email,
      ServiceType: org.service_type,
      DisabilityType: org.disability_type,
      ZipCode: org.zip_code
    }));

    const csv = convertArrayToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'organizations.csv');
  };

  const convertArrayToCSV = (data: any[]) => {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).map(value => `"${value}"`).join(','));
    return `${header}\n${rows.join('\n')}`;
  };

  const hasFilter = disabilityType !== "" || serviceType !== "" || keyword !== "";

  return (
    <div className="container mx-auto px-4 py-4 bg-gray-100">
      <SearchFilters
        disabilityType={disabilityType}
        serviceType={serviceType}
        onDisabilityTypeChange={setDisabilityType}
        onServiceTypeChange={setServiceType}
        onKeywordChange={handleKeywordSearch}
      />

      {organizations.length > 0 && hasFilter && (
        <SearchResultsHeader
          resultCount={organizations.length}
          onDownload={handleDownload}
        />
      )}

      {hasSearched && !hasFilter && (
        <p className="text-center text-black font-['Verdana']">Please select at least one filter to view results.</p>
      )}

      {hasSearched && hasFilter && organizations.length === 0 && (
        <p className="text-center text-black font-['Verdana']">No results found. Please try different search criteria.</p>
      )}

      {!hasSearched && (
        <p className="text-center text-black font-['Verdana']">Please select search filters to view results.</p>
      )}

      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {hasFilter && organizations.map((org) => (
            <OrganizationCard
              key={org.id}
              organization={org}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
