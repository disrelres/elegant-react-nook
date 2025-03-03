
import { useState, useCallback } from 'react';
import { ServiceType, Organization } from '@/components/types/organization';
import { supabase } from '@/integrations/supabase/client';

export const useOrganizationSearch = (
  serviceType: ServiceType | "",
  organizationType: "organization" | "program" | "",
  keyword: string
) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchOrganizations = useCallback(async () => {
    if (!organizationType) {
      setOrganizations([]);
      setHasSearched(false);
      return;
    }

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
  }, [serviceType, organizationType, keyword]);

  return {
    organizations,
    isLoading,
    hasSearched,
    searchOrganizations
  };
};
