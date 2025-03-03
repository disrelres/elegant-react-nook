
import { useState, useEffect } from "react";
import { ServiceType } from "@/components/types/organization";
import { SearchFilters } from "@/components/search/SearchFilters";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { WelcomeMessage } from "@/components/search/WelcomeMessage";
import { NoResultsMessage } from "@/components/search/NoResultsMessage";
import { ScrollToTopButton } from "@/components/search/ScrollToTopButton";
import { SearchResults } from "@/components/search/SearchResults";
import { useOrganizationSearch } from "@/hooks/useOrganizationSearch";
import { useScrollTop } from "@/hooks/useScrollTop";

const Index = () => {
  // State for filter values
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [organizationType, setOrganizationType] = useState<"organization" | "program" | "">("");
  const [keyword, setKeyword] = useState("");

  // Custom hooks
  const { organizations, isLoading, hasSearched, searchOrganizations } = 
    useOrganizationSearch(serviceType, organizationType, keyword);
  const { showScrollTop } = useScrollTop();

  // Effect to trigger search when filters change
  // Fixed: Using useEffect instead of useState for this side effect
  useEffect(() => {
    if (organizationType) {
      searchOrganizations();
    }
  }, [serviceType, organizationType, keyword, searchOrganizations]);

  // Determine which component to render
  const renderWelcomeMessage = !organizationType;
  const renderResults = organizations.length > 0;
  const renderNoResults = hasSearched && organizationType && organizations.length === 0 && !isLoading;

  return (
    <main className="flex-grow container mx-auto px-4 py-8 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-[#044bab] dark:text-blue-400 font-['Verdana']">
        {organizationType 
          ? `SEARCH ${organizationType === 'program' ? 'PROGRAMS' : 'ORGANIZATIONS'}`
          : 'SEARCH RESOURCES'
        }
      </h1>
      
      <Alert className="mb-6 border-[#044bab] bg-blue-50 dark:bg-blue-900/20">
        <Info className="h-5 w-5 text-[#044bab]" />
        <AlertDescription className="text-black dark:text-white font-['Verdana']">
          To begin your search, select either <strong>Programs</strong> or <strong>Organizations</strong> from the options below.
        </AlertDescription>
      </Alert>
      
      <SearchFilters
        serviceType={serviceType}
        organizationType={organizationType}
        onServiceTypeChange={setServiceType}
        onOrganizationTypeChange={setOrganizationType}
        onKeywordChange={setKeyword}
      />
      
      {isLoading && (
        <div className="text-center font-['Verdana'] text-black dark:text-white">Loading...</div>
      )}
      
      {renderResults && !isLoading && (
        <SearchResults organizations={organizations} />
      )}
      
      {renderNoResults && <NoResultsMessage organizationType={organizationType} />}
      
      {renderWelcomeMessage && <WelcomeMessage />}
      
      <ScrollToTopButton visible={showScrollTop} />
    </main>
  );
};

export default Index;
