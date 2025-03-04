
import { ServiceType } from "../types/organization";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface ServiceTypeSelectProps {
  serviceType: ServiceType | "";
  onChange: (value: ServiceType | "") => void;
  disabled: boolean;
}

export const ServiceTypeSelect = ({
  serviceType,
  onChange,
  disabled
}: ServiceTypeSelectProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <select
            className="p-2 border rounded-md font-['Verdana'] text-black dark:text-white dark:bg-gray-700 dark:border-gray-600 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            value={serviceType}
            onChange={(e) => onChange(e.target.value as ServiceType | "")}
            disabled={disabled}
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
            <option value="finances">Finances</option>
          </select>
        </TooltipTrigger>
        <TooltipContent>
          <p>Filter results by specific type of service needed</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
