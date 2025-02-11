
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Download } from "lucide-react";

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
  const [zipCode, setZipCode] = useState("");
  const [keyword, setKeyword] = useState("");
  const [organizations, setOrganizations] = useState<ProcessedOrganization[]>([]);
  const [stats, setStats] = useState({
    zipCodes: 0,
    services: 0,
    totalRecords: 0,
  });
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      // Get unique zip codes count
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
    if (zipCode) {
      query = query.eq('zip_code', zipCode);
    }
    if (keyword) {
      query = query.or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`);
    }

    const { data } = await query;
    
    if (data) {
      const processedOrgs: ProcessedOrganization[] = data.map((org: Organization) => ({
        id: org.id,
        name: org.name,
        description: org.description,
        website: org.website,
        phone: org.phone,
        email: org.email,
        zip_code: org.zip_code || '',
        service_type: org.organization_services[0]?.service_type || 'advocacy',
        disability_type: org.organization_disabilities[0]?.disability_type || 'mobility_impairment',
      }));
      setOrganizations(processedOrgs);
    } else {
      setOrganizations([]);
    }
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
    <div className="container mx-auto px-4 py-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-black">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_100px_2fr] gap-4 mb-4">
          <select
            className="p-2 border rounded-md font-['Verdana']"
            value={disabilityType}
            onChange={(e) => setDisabilityType(e.target.value as DisabilityType | "")}
          >
            <option value="">Select Disability Type</option>
            <option value="mobility_impairment">Mobility Impairment</option>
            <option value="visual_impairment">Visual Impairment</option>
            <option value="hearing_impairment">Hearing Impairment</option>
            <option value="cognitive_disability">Cognitive Disability</option>
            <option value="chronic_health_conditions">Chronic Health Conditions</option>
          </select>

          <select
            className="p-2 border rounded-md font-['Verdana']"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value as ServiceType | "")}
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
            className="p-2 border rounded-md font-['Verdana'] w-full"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />

          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter Keyword"
              className="p-2 border rounded-md font-['Verdana'] flex-grow"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-[#044bab] text-white px-6 py-2 rounded-md hover:bg-[#033b89] transition-colors font-['Verdana'] whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {organizations.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <p className="text-[#044bab] font-['Verdana']">{organizations.length} results found</p>
          <div className="bg-white p-2 rounded-lg shadow-sm border border-black">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#044bab] transition-colors font-['Verdana']"
            >
              <Download className="w-4 h-4" />
              Download Results
            </button>
          </div>
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
            className="transition-all duration-200 hover:border-[#044bab] hover:shadow-lg bg-white border border-black"
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
