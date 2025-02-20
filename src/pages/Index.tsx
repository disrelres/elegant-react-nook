
import { useState, useEffect } from "react";
import { ServiceType, Organization } from "@/components/types/organization";
import { SearchFilters } from "@/components/search/SearchFilters";
import { supabase } from "@/integrations/supabase/client";
import { OrganizationCard } from "@/components/search/OrganizationCard";
import { SearchResultsHeader } from "@/components/search/SearchResultsHeader";
import { saveAs } from 'file-saver';
import { ArrowUp } from "lucide-react";

const Index = () => {
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [keyword, setKeyword] = useState("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const searchOrganizations = async () => {
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
          .eq('service_type', serviceType)
          .eq('organizations.organization_type', 'program');
      } else {
        query = supabase
          .from('organizations')
          .select(`
            *,
            organization_disabilities (disability_type),
            organization_services (service_type)
          `)
          .eq('organization_type', 'program');
      }

      // Apply keyword search
      if (keyword) {
        if (serviceType) {
          query = query.ilike('organizations.name', `%${keyword}%`);
        } else {
          query = query.ilike('name', `%${keyword}%`);
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching programs:', error);
        return;
      }

      const transformedData = serviceType
        ? data?.map(item => item.organizations).filter(Boolean)
        : data;

      setOrganizations(transformedData || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (serviceType || keyword) {
      searchOrganizations();
    } else {
      setOrganizations([]);
    }
  }, [serviceType, keyword]);

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
Program: ${org.name}
Description: ${org.description}
Website: ${org.website || 'N/A'}
Phone: ${org.phone || 'N/A'}
Email: ${org.email || 'N/A'}
Location: ${org.city}, ${org.state} ${org.zip_code}
-------------------
      `.trim();
    }).join('\n\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'programs.txt');
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#044bab] font-['Verdana']">SEARCH PROGRAMS</h1>
      <SearchFilters
        serviceType={serviceType}
        organizationType="program"
        onServiceTypeChange={setServiceType}
        onOrganizationTypeChange={() => {}} // No longer needed since we only have programs
        onKeywordChange={setKeyword}
      />
      
      {isLoading ? (
        <div className="text-center font-['Verdana'] text-black">Loading...</div>
      ) : !serviceType && !keyword ? (
        <div className="text-center font-['Verdana'] text-black">
          Please select a service type or enter a keyword to search for programs.
        </div>
      ) : organizations.length === 0 ? (
        <div className="text-center font-['Verdana'] text-black">
          No programs found matching your search criteria.
        </div>
      ) : (
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
                  service_type: org.organization_services[0]?.service_type || 'advocacy',
                  disability_type: org.organization_disabilities[0]?.disability_type || 'mobility_impairment'
                }}
              />
            ))}
          </div>
        </>
      )}
      
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-8 right-8 p-3 bg-white border border-black rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 text-[#044bab]" />
        </button>
      )}
    </main>
  );
};

export default Index;
