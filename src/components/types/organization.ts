
export type ServiceType = 
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

export type DisabilityType = 
  | "mobility_impairment"
  | "visual_impairment"
  | "hearing_impairment"
  | "cognitive_disability"
  | "chronic_health_conditions";

export interface Organization {
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
}

export interface ProcessedOrganization {
  id: string;
  name: string;
  description: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  zip_code: string;
  service_type: ServiceType;
  disability_type: DisabilityType;
}
