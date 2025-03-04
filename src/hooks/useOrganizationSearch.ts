
import { useState, useEffect } from "react";
import { Organization, ServiceType } from "@/components/types/organization";
import { supabase } from "@/integrations/supabase/client";

export const useOrganizationSearch = (
  serviceType: ServiceType | "",
  organizationType: "organization" | "program" | "",
  keyword: string
) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchOrganizations = async (orgIdToFocus?: string) => {
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
    // Check if there's an org parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const orgId = urlParams.get('org');
    
    // If there's an org parameter, set the default organization type to ensure we search
    if (orgId && !organizationType) {
      // In this hook we can't set organizationType directly
      // This is handled in the parent component
      console.log("Found org ID in URL:", orgId);
    }
    
    if (organizationType) {
      searchOrganizations(orgId || undefined);
    } else {
      setOrganizations([]);
      setHasSearched(false);
    }
  }, [serviceType, keyword, organizationType]);

  return { organizations, isLoading, hasSearched };
};
