import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AnimatePresence } from "framer-motion";
import { VideoLink } from "./search/VideoLink";
import { SearchFilters } from "./search/SearchFilters";
import { SearchResultsHeader } from "./search/SearchResultsHeader";
import { OrganizationCard } from "./search/OrganizationCard";
import type { Organization, ProcessedOrganization, ServiceType, DisabilityType } from "./types/organization";

type ServiceType = 
  | "advocacy"
  | "employment_support"
  | "education_training"
  | "healthcare_services"
  | "housing_assistance"
  | "transportation"
  | "counseling"
  | "assistive_technology"
  | "recreation_social"
  | "legal_services";

type DisabilityType = 
  | "mobility_impairment"
  | "visual_impairment"
  | "hearing_impairment"
  | "cognitive_disability"
  | "chronic_health_conditions";

type Organization = {
  id: string;
  name: string;
  description: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  is_national: boolean;
  created_at: string;
  updated_at: string;
  city: string;
  state: string;
  zip_code: string;
  organization_disabilities: { disability_type: DisabilityType }[];
  organization_services: { service_type: ServiceType }[];
};

type ProcessedOrganization = {
  id: string;
  name: string;
  description: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  zip_code: string;
  service_type: ServiceType;
  disability_type: DisabilityType;
};

export const SearchSection = () => {
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [disabilityType, setDisabilityType] = useState<DisabilityType | "">("");
  const [organizations, setOrganizations] = useState<ProcessedOrganization[]>([]);
  const [hiddenOrgs, setHiddenOrgs] = useState<string[]>([]);
  const [pinnedOrgs, setPinnedOrgs] = useState<string[]>([]);
  const [stats, setStats] = useState({
    zipCodes: 0,
    services: 0,
    totalRecords: 0,
  });
  const [hasSearched, setHasSearched] = useState(false);
  const hasFilter = serviceType !== "" || disabilityType !== "";

  useEffect(() => {
    const fetchStats = async () => {
      const { data: orgsWithZip } = await supabase
        .from('organizations')
        .select('zip_code', { count: 'exact', head: true });
      
      const { data: services } = await supabase
        .from('organization_services')
        .select('service_type', { count: 'exact', head: true });
      
      const { data: orgs } = await supabase
        .from('organizations')
        .select('id', { count: 'exact', head: true });

      setStats({
        zipCodes: orgsWithZip?.length || 0,
        services: services?.length || 0,
        totalRecords: orgs?.length || 0,
      });
    };

    fetchStats();
  }, []);

  const handleSearch = async () => {
    const pinnedQuery = supabase
      .from('organizations')
      .select(`
        *,
        organization_services!inner(service_type),
        organization_disabilities!inner(disability_type)
      `)
      .in('id', pinnedOrgs);

    const { data: pinnedData } = await pinnedQuery;

    let query = supabase
      .from('organizations')
      .select(`
        *,
        organization_services!inner(service_type),
        organization_disabilities!inner(disability_type)
      `)
      .order('name');

    if (serviceType) {
      query = query.eq('organization_services.service_type', serviceType);
    }
    if (disabilityType) {
      query = query.eq('organization_disabilities.disability_type', disabilityType);
    }

    const { data: filteredData } = await query;
    
    if (filteredData || pinnedData) {
      const processOrg = (org: Organization): ProcessedOrganization => ({
        id: org.id,
        name: org.name,
        description: org.description,
        website: org.website,
        phone: org.phone,
        email: org.email,
        zip_code: org.zip_code || '',
        service_type: org.organization_services[0]?.service_type || 'advocacy',
        disability_type: org.organization_disabilities[0]?.disability_type || 'mobility_impairment',
      });

      const processedPinnedOrgs = (pinnedData || [])
        .map(processOrg);

      const processedFilteredOrgs = (filteredData || [])
        .filter(org => !hiddenOrgs.includes(org.id) && !pinnedOrgs.includes(org.id))
        .map(processOrg);

      setOrganizations([...processedPinnedOrgs, ...processedFilteredOrgs]);
    } else {
      setOrganizations([]);
    }
    setHasSearched(true);
  };

  useEffect(() => {
    handleSearch();
  }, [serviceType, disabilityType, hiddenOrgs, pinnedOrgs]);

  const handleHideOrg = (orgId: string) => {
    setHiddenOrgs(prev => [...prev, orgId]);
  };

  const handleTogglePin = (orgId: string) => {
    setPinnedOrgs(prev => 
      prev.includes(orgId) 
        ? prev.filter(id => id !== orgId)
        : [...prev, orgId]
    );
  };

  const handleDownload = () => {
    if (!organizations.length) return;
    
    const content = organizations.map(org => 
      `Name: ${org.name}\nDescription: ${org.description}\nWebsite: ${org.website || 'N/A'}\nPhone: ${org.phone || 'N/A'}\nEmail: ${org.email || 'N/A'}\n\n`
    ).join('---\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'organizations.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-4 bg-gray-100">
      <VideoLink />
      
      <SearchFilters
        disabilityType={disabilityType}
        serviceType={serviceType}
        onDisabilityTypeChange={setDisabilityType}
        onServiceTypeChange={setServiceType}
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
              isPinned={pinnedOrgs.includes(org.id)}
              onHide={handleHideOrg}
              onTogglePin={handleTogglePin}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
