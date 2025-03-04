
import { useState } from "react";
import { Search } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface KeywordSearchProps {
  onSearch: (keyword: string) => void;
  disabled: boolean;
}

export const KeywordSearch = ({ onSearch, disabled }: KeywordSearchProps) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <input
              type="text"
              placeholder="Search by keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full p-2 pe-10 border rounded-md font-['Verdana'] text-black dark:text-white dark:bg-gray-700 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              disabled={disabled}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Search by organization name or description</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#044bab] dark:hover:text-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Search"
              disabled={disabled}
            >
              <Search className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to perform search</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
