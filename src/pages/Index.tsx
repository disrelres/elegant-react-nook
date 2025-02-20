
import { useState, useEffect } from "react";
import { DisabilityType, ServiceType, Organization } from "@/components/types/organization";
import { SearchFilters } from "@/components/search/SearchFilters";
import { supabase } from "@/integrations/supabase/client";
import { OrganizationCard } from "@/components/search/OrganizationCard";
import { SearchResultsHeader } from "@/components/search/SearchResultsHeader";
import { saveAs } from 'file-saver';

const Index = () => {
  const [disabilityType, setDisabilityType] = useState<DisabilityType | "">("");
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [keyword, setKeyword] = useState("");
  const [organizationType, setOrganizationType] = useState<"organization" | "program" | "">("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchOrganizations = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('organizations')
        .select(`
          *,
          organization_disabilities (disability_type),
          organization_services (service_type)
        `);

      // Apply organization type filter
      if (organizationType) {
        query = query.eq('organization_type', organizationType);
      }

      // Apply disability type filter
      if (disabilityType) {
        query = query.contains('organization_disabilities', [{ disability_type: disabilityType }]);
      }

      // Apply service type filter
      if (serviceType) {
        query = query.contains('organization_services', [{ service_type: serviceType }]);
      }

      // Apply keyword search
      if (keyword) {
        query = query.ilike('name', `%${keyword}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching organizations:', error);
        return;
      }

      setOrganizations(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (disabilityType || serviceType || keyword || organizationType) {
      searchOrganizations();
    } else {
      setOrganizations([]);
    }
  }, [disabilityType, serviceType, keyword, organizationType]);

  const handleDownload = () => {
    const content = organizations.map(org => {
      return `
Organization: ${org.name}
Description: ${org.description}
Website: ${org.website || 'N/A'}
Phone: ${org.phone || 'N/A'}
Email: ${org.email || 'N/A'}
Location: ${org.city}, ${org.state} ${org.zip_code}
-------------------
      `.trim();
    }).join('\n\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'organizations.txt');
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#044bab] font-['Verdana']">SEARCH</h1>
      <SearchFilters
        disabilityType={disabilityType}
        serviceType={serviceType}
        organizationType={organizationType}
        onDisabilityTypeChange={setDisabilityType}
        onServiceTypeChange={setServiceType}
        onOrganizationTypeChange={setOrganizationType}
        onKeywordChange={setKeyword}
      />
      
      {isLoading ? (
        <div className="text-center font-['Verdana'] text-black">Loading...</div>
      ) : !disabilityType && !serviceType && !keyword && !organizationType ? (
        <div className="text-center font-['Verdana'] text-black">
          Please select filters or enter a keyword to search for organizations.
        </div>
      ) : organizations.length === 0 ? (
        <div className="text-center font-['Verdana'] text-black">
          No organizations found matching your search criteria.
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
    </main>
  );
};

export default Index;

