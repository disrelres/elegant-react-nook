import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Download, LayoutGrid, List } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
  const [keyword, setKeyword] = useState("");
  const [organizations, setOrganizations] = useState<ProcessedOrganization[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [stats, setStats] = useState({
    zipCodes: 0,
    services: 0,
    totalRecords: 0,
  });
  const [hasSearched, setHasSearched] = useState(false);
  const hasFilter = serviceType !== "" || disabilityType !== "" || keyword !== "";

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

  useEffect(() => {
    handleSearch();
  }, [serviceType, disabilityType]);

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
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 mb-4">
          <select
            className="p-2 border rounded-md font-['Verdana'] text-black"
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
            className="p-2 border rounded-md font-['Verdana'] text-black"
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
            placeholder="Enter Keyword"
            className="p-2 border rounded-md font-['Verdana'] flex-grow text-black"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      {organizations.length > 0 && hasFilter && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <div className="flex items-center gap-4">
              <p className="text-black font-['Verdana']">{organizations.length} results found</p>
              <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-black">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "text-[#044bab]" : "text-gray-400"} hover:text-[#044bab] transition-colors`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "text-[#044bab]" : "text-gray-400"} hover:text-[#044bab] transition-colors`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg shadow-sm border border-black">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-[#044bab] transition-colors font-['Verdana']"
              >
                <Download className="w-4 h-4" />
                Download Results
              </button>
            </div>
          </div>
          <Separator className="my-6 bg-black" />
        </>
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

      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
        {hasFilter && organizations.map((org) => (
          <Card 
            key={org.id}
            className={`transition-all duration-200 hover:border-[#044bab] hover:shadow-lg bg-white border border-black ${
              viewMode === "list" ? "flex flex-col md:flex-row md:items-start gap-4" : ""
            }`}
          >
            <CardHeader className={viewMode === "list" ? "flex-shrink-0 md:w-1/3" : ""}>
              <h3 className="text-xl font-semibold text-[#044bab] font-['Verdana']">{org.name}</h3>
            </CardHeader>
            <CardContent className={viewMode === "list" ? "flex-grow" : ""}>
              <p className="text-black mb-4 font-['Verdana']">{org.description}</p>
              {org.website && (
                <p className="text-sm mb-2 font-['Verdana']">
                  <strong className="text-black">Website:</strong>{" "}
                  <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-[#044bab] hover:underline">
                    {org.website}
                  </a>
                </p>
              )}
              {org.phone && (
                <p className="text-sm mb-2 font-['Verdana']">
                  <strong className="text-black">Phone:</strong> <span className="text-black">{org.phone}</span>
                </p>
              )}
              {org.email && (
                <p className="text-sm font-['Verdana']">
                  <strong className="text-black">Email:</strong>{" "}
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
