
import { useState, useEffect } from "react";
import { ServiceType, Organization } from "@/components/types/organization";
import { SearchFilters } from "@/components/search/SearchFilters";
import { supabase } from "@/integrations/supabase/client";
import { OrganizationCard } from "@/components/search/OrganizationCard";
import { SearchResultsHeader } from "@/components/search/SearchResultsHeader";
import { saveAs } from 'file-saver';
import { ArrowUp, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [organizationType, setOrganizationType] = useState<"organization" | "program" | "">("");
  const [keyword, setKeyword] = useState("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    console.log("Current state:", { 
      serviceType, 
      organizationType, 
      keyword, 
      organizations: organizations.length, 
      isLoading,
      hasSearched
    });
  }, [serviceType, organizationType, keyword, organizations, isLoading, hasSearched]);

  const searchOrganizations = async () => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      let query;
      
      if (serviceType) {
        query = supabase
          .from('organization_services')
          .select(`
            organizations (
              *,
              organization_disabilities (disability_type),
              organization_services (service_type)
            )
          `)
          .eq('service_type', serviceType);
          
        if (organizationType) {
          query = query.eq('organizations.organization_type', organizationType);
        }

        if (keyword) {
          query = query.or(`organizations.name.ilike.%${keyword}%,organizations.description.ilike.%${keyword}%`);
        }
      } else {
        query = supabase
          .from('organizations')
          .select(`
            *,
            organization_disabilities (disability_type),
            organization_services (service_type)
          `);
          
        if (organizationType) {
          query = query.eq('organization_type', organizationType);
        }

        if (keyword) {
          query = query.or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`);
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching organizations:', error);
        return;
      }

      console.log("Raw data from query:", data);

      const transformedData = serviceType
        ? data?.map(item => item.organizations).filter(Boolean)
        : data;

      console.log("Transformed data:", transformedData);
      setOrganizations(transformedData || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (organizationType) {
      searchOrganizations();
    } else {
      setOrganizations([]);
      setHasSearched(false);
    }
  }, [serviceType, keyword, organizationType]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = () => {
    const content = organizations.map(org => {
      return `
${organizationType === 'program' ? 'Program' : 'Organization'}: ${org.name}
Description: ${org.description}
Website: ${org.website || 'N/A'}
Phone: ${org.phone || 'N/A'}
Email: ${org.email || 'N/A'}
Location: ${org.city ? `${org.city}, ${org.state} ${org.zip_code}` : 'National'}
-------------------
      `.trim();
    }).join('\n\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${organizationType}s.txt`);
  };

  console.log("Rendering Index component with:", {
    organizationType,
    organizations: organizations.length,
    isLoading,
    hasSearched
  });

  // Force render the welcome message when no organization type is selected
  const renderWelcomeMessage = !organizationType;
  
  // Force render search results when organizations are found
  const renderResults = organizations.length > 0;
  
  // Show "no results" message when a search has been performed but no results found
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
        <>
          <SearchResultsHeader 
            resultCount={organizations.length}
            onDownload={handleDownload}
          />
          <div className="grid gap-6">
            {organizations.map((org) => (
              <OrganizationCard
                key={org.id}
                organization={{
                  id: org.id,
                  name: org.name || '',
                  description: org.description || '',
                  website: org.website,
                  phone: org.phone,
                  email: org.email,
                  zip_code: org.zip_code,
                  service_type: org.organization_services?.[0]?.service_type || 'advocacy',
                  disability_type: org.organization_disabilities?.[0]?.disability_type || 'mobility_impairment'
                }}
              />
            ))}
          </div>
        </>
      )}
      
      {renderNoResults && (
        <div className="text-center font-['Verdana'] text-black dark:text-white mt-10">
          No {organizationType}s found matching your search criteria.
        </div>
      )}
      
      {renderWelcomeMessage && (
        <div className="mt-10 p-6 text-center border-2 border-dashed border-[#044bab] rounded-lg">
          <p className="text-xl font-['Verdana'] text-black dark:text-white mb-2">
            Welcome to the Resource Search Tool
          </p>
          <p className="font-['Verdana'] text-black dark:text-white">
            Please select either "Programs" or "Organizations" above to start searching for resources.
          </p>
        </div>
      )}
      
      {showScrollTop && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleScrollTop}
                className="fixed bottom-8 left-8 p-3 bg-white dark:bg-gray-700 border border-black dark:border-gray-600 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 z-50"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-6 h-6 text-[#044bab] dark:text-blue-400" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Return to top of page</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </main>
  );
};

export default Index;
