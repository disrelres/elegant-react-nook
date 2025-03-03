
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface OrganizationTypeSelectorProps {
  organizationType: "organization" | "program" | "";
  onChange: (value: "organization" | "program") => void;
}

export const OrganizationTypeSelector = ({
  organizationType,
  onChange
}: OrganizationTypeSelectorProps) => {
  return (
    <div className="space-y-3">
      <p className="text-center font-['Verdana'] text-black dark:text-white mb-2">
        Please select Programs or Organizations to begin your search:
      </p>
      <div className="flex gap-4 justify-center">
        <div className="w-36">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`w-full py-2 rounded-md font-['Verdana'] border border-black dark:border-gray-700 transition-colors ${
                    organizationType === "program"
                      ? "bg-[#044bab] text-white dark:bg-blue-600"
                      : "bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                  } text-center`}
                  onClick={() => onChange("program")}
                >
                  Programs
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Find specific services and support programs</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="w-36">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`w-full py-2 rounded-md font-['Verdana'] border border-black dark:border-gray-700 transition-colors ${
                    organizationType === "organization"
                      ? "bg-[#044bab] text-white dark:bg-blue-600"
                      : "bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
                  } text-center`}
                  onClick={() => onChange("organization")}
                >
                  Organizations
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Browse organizations providing multiple services</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
