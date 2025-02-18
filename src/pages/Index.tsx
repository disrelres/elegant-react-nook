
import { useState } from "react";
import { DisabilityType, ServiceType } from "@/components/types/organization";
import { SearchFilters } from "@/components/search/SearchFilters";

const Index = () => {
  const [disabilityType, setDisabilityType] = useState<DisabilityType | "">("");
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [keyword, setKeyword] = useState("");

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <SearchFilters
        disabilityType={disabilityType}
        serviceType={serviceType}
        onDisabilityTypeChange={setDisabilityType}
        onServiceTypeChange={setServiceType}
        onKeywordChange={setKeyword}
      />
      {!disabilityType && !serviceType && !keyword && (
        <div className="text-center font-['Verdana'] text-black">
          Please select filters or enter a keyword to search for organizations.
        </div>
      )}
    </main>
  );
};

export default Index;
