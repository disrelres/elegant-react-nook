
import { DisabilityType, ServiceType } from "../types/organization";

interface SearchFiltersProps {
  disabilityType: DisabilityType | "";
  serviceType: ServiceType | "";
  onDisabilityTypeChange: (value: DisabilityType | "") => void;
  onServiceTypeChange: (value: ServiceType | "") => void;
}

export const SearchFilters = ({
  disabilityType,
  serviceType,
  onDisabilityTypeChange,
  onServiceTypeChange,
}: SearchFiltersProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          className="p-2 border rounded-md font-['Verdana'] text-black"
          value={disabilityType}
          onChange={(e) => onDisabilityTypeChange(e.target.value as DisabilityType | "")}
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
          onChange={(e) => onServiceTypeChange(e.target.value as ServiceType | "")}
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
      </div>
    </div>
  );
};
