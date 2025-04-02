
import { useState } from "react";
import { ServiceType } from "@/components/types/organization";
import { SearchFilters } from "@/components/search/SearchFilters";
import WelcomeMessage from "@/components/search/WelcomeMessage";
import NoResultsMessage from "@/components/search/NoResultsMessage";
import SearchResults from "@/components/search/SearchResults";
import ScrollToTopButton from "@/components/search/ScrollToTopButton";
import { useOrganizationSearch } from "@/hooks/useOrganizationSearch";
import { useScrollTop } from "@/hooks/useScrollTop";
import { AddTERIOrganization } from "@/components/admin/AddTERIOrganization";

const Index = () => {
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [organizationType, setOrganizationType] = useState<"organization" | "program" | "">("");
  const [keyword, setKeyword] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  
  const { organizations, isLoading, hasSearched } = useOrganizationSearch(
    serviceType,
    organizationType,
    keyword
  );
  
  const { showScrollTop, handleScrollTop } = useScrollTop();

  // Get the org ID from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const highlightedOrgId = urlParams.get('org');
  const adminParam = urlParams.get('admin');

  // Show admin panel if admin=true in URL
  if (adminParam === 'true' && !showAdmin) {
    setShowAdmin(true);
  }

  return (
    <main className="flex-grow container mx-auto px-4 py-8 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-green-600 dark:text-green-400 font-['Verdana']">
        {organizationType 
          ? `SEARCH ${organizationType === 'program' ? 'PROGRAMS' : 'ORGANIZATIONS'}`
          : 'SEARCH RESOURCES'
        }
      </h1>
      
      {showAdmin && (
        <div className="mb-8">
          <AddTERIOrganization />
        </div>
      )}
      
      <SearchFilters
        serviceType={serviceType}
        organizationType={organizationType}
        onServiceTypeChange={setServiceType}
        onOrganizationTypeChange={setOrganizationType}
        onKeywordChange={setKeyword}
      />
      
      {isLoading ? (
        <div className="text-center font-['Verdana'] text-black dark:text-white">Loading...</div>
      ) : !hasSearched ? (
        <WelcomeMessage />
      ) : organizations.length === 0 ? (
        <NoResultsMessage organizationType={organizationType} />
      ) : (
        <SearchResults 
          organizations={organizations}
          organizationType={organizationType}
          highlightedOrgId={highlightedOrgId}
        />
      )}
      
      <ScrollToTopButton 
        showScrollTop={showScrollTop} 
        handleScrollTop={handleScrollTop} 
      />
    </main>
  );
};

export default Index;
