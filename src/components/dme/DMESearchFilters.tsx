
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search } from "lucide-react";

interface DMESearchFiltersProps {
  dmeServiceType: "sell" | "rent" | "loan" | "repair" | "";
  onDMEServiceTypeChange: (value: "sell" | "rent" | "loan" | "repair" | "") => void;
  onKeywordChange?: (keyword: string) => void;
}

export const DMESearchFilters = ({
  dmeServiceType,
  onDMEServiceTypeChange,
  onKeywordChange,
}: DMESearchFiltersProps) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onKeywordChange?.(keyword);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          className="p-2 border rounded-md font-['Verdana'] text-black"
          value={dmeServiceType}
          onChange={(e) => onDMEServiceTypeChange(e.target.value as "sell" | "rent" | "loan" | "repair" | "")}
        >
          <option value="">Select DME Service Type</option>
          <option value="sell">Sell</option>
          <option value="rent">Rent</option>
          <option value="loan">Loan</option>
          <option value="repair">Repair</option>
        </select>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 p-2 border rounded-md font-['Verdana'] text-black"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-white text-gray-400 hover:text-[#044bab] transition-colors font-['Verdana'] border border-black rounded-md"
                >
                  <Search className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search DME resources</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
