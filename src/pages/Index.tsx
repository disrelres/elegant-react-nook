
import { useState, useEffect, useRef } from "react";
import { ServiceType, Organization } from "@/components/types/organization";
import { SearchFilters } from "@/components/search/SearchFilters";
import { supabase } from "@/integrations/supabase/client";
import { OrganizationCard } from "@/components/search/OrganizationCard";
import { SearchResultsHeader } from "@/components/search/SearchResultsHeader";
import { saveAs } from 'file-saver';
import { ArrowUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Index = () => {
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [organizationType, setOrganizationType] = useState<"organization" | "program" | "">("");
  const [keyword, setKeyword] = useState("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const focusedOrgRef = useRef<HTMLDivElement>(null);

  const searchOrganizations = async (orgIdToFocus?: string) => {
    setIsLoading(true);
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

        // If we have a specific org ID to find, add it to the query
        if (orgIdToFocus) {
          // We still want to search by other criteria, but ensure we include the specific org
          // We'll filter the results afterward
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching organizations:', error);
        return;
      }

      const transformedData = serviceType
        ? data?.map(item => item.organizations).filter(Boolean)
        : data;

      setOrganizations(transformedData || []);

      // If we have an organization to focus on, scroll to it
      if (orgIdToFocus) {
        setTimeout(() => {
          if (focusedOrgRef.current) {
            focusedOrgRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            focusedOrgRef.current.setAttribute('data-highlighted', 'true');
            setTimeout(() => {
              if (focusedOrgRef.current) {
                focusedOrgRef.current.classList.add('highlight-animation');
              }
            }, 500);
          }
        }, 500);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if there's an org parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const orgId = urlParams.get('org');
    
    // If there's an org parameter, set the default organization type to ensure we search
    if (orgId && !organizationType) {
      setOrganizationType('organization');
    }
    
    if (organizationType) {
      searchOrganizations(orgId || undefined);
    } else {
      setOrganizations([]);
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

  // Get the org ID from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const highlightedOrgId = urlParams.get('org');

  return (
    <main className="flex-grow container mx-auto px-4 py-8 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-[#044bab] dark:text-blue-400 font-['Verdana']">
        {organizationType 
          ? `SEARCH ${organizationType === 'program' ? 'PROGRAMS' : 'ORGANIZATIONS'}`
          : 'SEARCH RESOURCES'
        }
      </h1>
      <SearchFilters
        serviceType={serviceType}
        organizationType={organizationType}
        onServiceTypeChange={setServiceType}
        onOrganizationTypeChange={setOrganizationType}
        onKeywordChange={setKeyword}
      />
      
      {isLoading ? (
        <div className="text-center font-['Verdana'] text-black dark:text-white">Loading...</div>
      ) : organizations.length === 0 && organizationType ? (
        <div className="text-center font-['Verdana'] text-black dark:text-white">
          No {organizationType}s found matching your search criteria.
        </div>
      ) : organizations.length > 0 ? (
        <>
          <SearchResultsHeader 
            resultCount={organizations.length}
            onDownload={handleDownload}
          />
          <div className="grid gap-6">
            {organizations.map((org) => (
              <div
                key={org.id}
                ref={org.id === highlightedOrgId ? focusedOrgRef : undefined}
                className={`transition-all duration-500 ${org.id === highlightedOrgId ? 'ring-2 ring-[#044bab] ring-offset-2' : ''}`}
              >
                <OrganizationCard
                  organization={{
                    id: org.id,
                    name: org.name || '',
                    description: org.description || '',
                    website: org.website,
                    phone: org.phone,
                    email: org.email,
                    zip_code: org.zip_code,
                    service_type: org.organization_services[0]?.service_type || 'advocacy',
                    disability_type: org.organization_disabilities[0]?.disability_type || 'mobility_impairment'
                  }}
                />
              </div>
            ))}
          </div>
        </>
      ) : null}
      
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
