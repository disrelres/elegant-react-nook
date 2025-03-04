
import React from "react";
import { ArrowUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ScrollToTopButtonProps {
  showScrollTop: boolean;
  handleScrollTop: () => void;
}

const ScrollToTopButton = ({ showScrollTop, handleScrollTop }: ScrollToTopButtonProps) => {
  if (!showScrollTop) return null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleScrollTop}
            className="fixed bottom-8 left-8 p-3 bg-white dark:bg-gray-700 border border-black dark:border-gray-600 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6 text-[#044bab] dark:text-blue-400" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Return to top of page</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ScrollToTopButton;
