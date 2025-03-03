
import React from 'react';
import { Organization } from "@/components/types/organization";
import { SearchResultsHeader } from "@/components/search/SearchResultsHeader";
import { OrganizationCard } from "@/components/search/OrganizationCard";
import { saveAs } from 'file-saver';

interface SearchResultsProps {
  organizations: Organization[];
}

export const SearchResults = ({ organizations }: SearchResultsProps) => {
  const handleDownload = () => {
    const content = organizations.map(org => {
      const orgType = org.organization_type === 'program' ? 'Program' : 'Organization';
      return `
${orgType}: ${org.name}
Description: ${org.description}
Website: ${org.website || 'N/A'}
Phone: ${org.phone || 'N/A'}
Email: ${org.email || 'N/A'}
Location: ${org.city ? `${org.city}, ${org.state} ${org.zip_code}` : 'National'}
-------------------
      `.trim();
    }).join('\n\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `search-results.txt`);
  };

  return (
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
  );
};
