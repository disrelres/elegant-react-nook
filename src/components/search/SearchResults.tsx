
import React, { useRef } from "react";
import { Organization } from "../types/organization";
import { OrganizationCard } from "./OrganizationCard";
import { SearchResultsHeader } from "./SearchResultsHeader";
import { saveAs } from 'file-saver';

interface SearchResultsProps {
  organizations: Organization[];
  organizationType: "organization" | "program" | "";
  highlightedOrgId: string | null;
}

const SearchResults = ({ organizations, organizationType, highlightedOrgId }: SearchResultsProps) => {
  const focusedOrgRef = useRef<HTMLDivElement>(null);

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

  return (
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
                service_type: org.organization_services?.[0]?.service_type || 'advocacy',
                disability_type: org.organization_disabilities?.[0]?.disability_type || 'mobility_impairment'
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
