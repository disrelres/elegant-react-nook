
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AnimatePresence } from "framer-motion";
import { DMESearchFilters } from "./DMESearchFilters";
import { SearchResultsHeader } from "../search/SearchResultsHeader";
import { OrganizationCard } from "../search/OrganizationCard";
import { ChevronUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ProcessedOrganization } from "../types/organization";

export const DMESearchSection = () => {
  const [dmeServiceType, setDMEServiceType] = useState<"sell" | "rent" | "loan" | "repair" | "">("");
  const [keyword, setKeyword] = useState("");
  const [organizations, setOrganizations] = useState<ProcessedOrganization[]>([]);
  const [hiddenOrgs, setHiddenOrgs] = useState<string[]>([]);
  const [pinnedOrgs, setPinnedOrgs] = useState<string[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const hasFilter = dmeServiceType !== "" || keyword !== "";

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = useCallback(async () => {
    let pinnedData: any[] = [];
    if (pinnedOrgs.length > 0) {
      const { data: fetchedPinnedData } = await supabase
        .from('organizations')
        .select(`
          *,
          dme_services!inner(service_type)
        `)
        .in('id', pinnedOrgs);
      pinnedData = fetchedPinnedData || [];
    }

    let filteredData: any[] = [];
    if (hasFilter) {
      let query = supabase
        .from('organizations')
        .select(`
          *,
          dme_services!inner(service_type)
        `)
        .order('name');

      if (dmeServiceType) {
        query = query.eq('dme_services.service_type', dmeServiceType);
      }
      if (keyword) {
        query = query.or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%,city.ilike.%${keyword}%,state.ilike.%${keyword}%,zip_code.ilike.%${keyword}%`);
      }

      const { data } = await query;
      filteredData = data || [];
    }
    
    const processOrg = (org: any): ProcessedOrganization => ({
      id: org.id,
      name: org.name,
      description: org.description,
      website: org.website,
      phone: org.phone,
      email: org.email,
      zip_code: org.zip_code || '',
      service_type: org.dme_services[0]?.service_type || 'sell',
      disability_type: 'mobility_impairment',
    });

    const processedPinnedOrgs = pinnedData.map(processOrg);
    const processedFilteredOrgs = hasFilter
      ? filteredData
          .filter(org => !hiddenOrgs.includes(org.id) && !pinnedOrgs.includes(org.id))
          .map(processOrg)
      : [];

    setOrganizations([...processedPinnedOrgs, ...processedFilteredOrgs]);
    setHasSearched(true);
  }, [dmeServiceType, keyword, hiddenOrgs, pinnedOrgs, hasFilter]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

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

  const handleKeywordSearch = (newKeyword: string) => {
    setKeyword(newKeyword);
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
    a.download = 'dme_organizations.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-4 bg-gray-100">
      <DMESearchFilters
        dmeServiceType={dmeServiceType}
        onDMEServiceTypeChange={setDMEServiceType}
        onKeywordChange={handleKeywordSearch}
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

      <div className="flex flex-col gap-4 relative">
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

        {showScrollTop && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={scrollToTop}
                    className="bg-white text-gray-400 hover:text-[#044bab] p-4 rounded-full shadow-lg border border-black transition-colors"
                    aria-label="Return to top"
                  >
                    <ChevronUp className="w-6 h-6" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Return to top of page</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
};
