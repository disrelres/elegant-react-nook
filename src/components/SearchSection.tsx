
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Download } from "lucide-react";

type Organization = {
  id: string;
  name: string;
  description: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  zip_code: string;
  service_type: string;
};

export const SearchSection = () => {
  const [serviceType, setServiceType] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [keyword, setKeyword] = useState("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [stats, setStats] = useState({
    zipCodes: 0,
    services: 0,
    totalRecords: 0,
  });
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch initial stats
  useEffect(() => {
    const fetchStats = async () => {
      const { data: locations } = await supabase
        .from('organization_locations')
        .select('zip_code', { count: 'exact', head: true });
      
      const { data: services } = await supabase
        .from('organization_services')
        .select('service_type', { count: 'exact', head: true });
      
      const { data: orgs } = await supabase
        .from('organizations')
        .select('id', { count: 'exact', head: true });

      setStats({
        zipCodes: locations?.length || 0,
        services: services?.length || 0,
        totalRecords: orgs?.length || 0,
      });
    };

    fetchStats();
  }, []);

  const handleSearch = async () => {
    let query = supabase
      .from('organizations')
      .select(`
        *,
        organization_locations!inner(zip_code),
        organization_services!inner(service_type)
      `)
      .order('name');

    if (serviceType) {
      query = query.eq('organization_services.service_type', serviceType);
    }
    if (zipCode) {
      query = query.eq('organization_locations.zip_code', zipCode);
    }
    if (keyword) {
      query = query.or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`);
    }

    const { data } = await query;
    
    setOrganizations(data || []);
    setHasSearched(true);
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
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        {stats.totalRecords > 0 ? (
          <p className="text-lg text-gray-600 font-['Verdana']">
            {stats.zipCodes} zip codes, {stats.services} services, and {stats.totalRecords} organizations... and growing.
          </p>
        ) : (
          <p className="text-lg text-gray-600 font-['Verdana']">Loading statistics...</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <select
          className="p-2 border rounded-md font-['Verdana']"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        >
          <option value="">Select Service Type</option>
          <option value="advocacy">Advocacy</option>
          <option value="employment_support">Employment Support</option>
          <option value="education_training">Education & Training</option>
          <option value="healthcare_services">Healthcare Services</option>
          <option value="housing_assistance">Housing Assistance</option>
          <option value="transportation">Transportation</option>
          <option value="counseling">Counseling</option>
          <option value="assistive_technology">Assistive Technology</option>
          <option value="recreation_social">Recreation & Social</option>
          <option value="legal_services">Legal Services</option>
        </select>

        <input
          type="text"
          placeholder="Enter Zip Code"
          className="p-2 border rounded-md font-['Verdana']"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Keyword"
          className="p-2 border rounded-md font-['Verdana']"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleSearch}
          className="bg-[#044bab] text-white px-6 py-2 rounded-md hover:bg-[#033b89] transition-colors font-['Verdana']"
        >
          Search
        </button>
      </div>

      {organizations.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600 font-['Verdana']">{organizations.length} results found</p>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#044bab] transition-colors font-['Verdana']"
          >
            <Download className="w-4 h-4" />
            Download Results
          </button>
        </div>
      )}

      {hasSearched && organizations.length === 0 && (
        <p className="text-center text-gray-600 font-['Verdana']">No results found. Please try different search criteria.</p>
      )}

      {!hasSearched && (
        <p className="text-center text-gray-600 font-['Verdana']">Please select search filters to view results.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <Card 
            key={org.id}
            className="transition-all duration-200 hover:border-[#044bab] hover:shadow-lg"
          >
            <CardHeader>
              <h3 className="text-xl font-semibold text-[#044bab] font-['Verdana']">{org.name}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 font-['Verdana']">{org.description}</p>
              {org.website && (
                <p className="text-sm mb-2 font-['Verdana']">
                  <strong>Website:</strong>{" "}
                  <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-[#044bab] hover:underline">
                    {org.website}
                  </a>
                </p>
              )}
              {org.phone && (
                <p className="text-sm mb-2 font-['Verdana']">
                  <strong>Phone:</strong> {org.phone}
                </p>
              )}
              {org.email && (
                <p className="text-sm font-['Verdana']">
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${org.email}`} className="text-[#044bab] hover:underline">
                    {org.email}
                  </a>
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
