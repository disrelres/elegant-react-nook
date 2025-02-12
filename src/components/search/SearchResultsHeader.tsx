
import { useState } from "react";
import { Download, ChevronUp, ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";

interface SearchResultsHeaderProps {
  resultCount: number;
  onDownload: () => void;
}

export const SearchResultsHeader = ({ resultCount, onDownload }: SearchResultsHeaderProps) => {
  const [showTips, setShowTips] = useState(true);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-4">
          <p className="text-black font-['Verdana']">{resultCount} results found</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center gap-1 px-3 py-2 text-gray-400 hover:text-[#044bab] transition-colors font-['Verdana'] bg-white rounded-lg shadow-sm border border-black"
          >
            {showTips ? (
              <>
                Hide Tips
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show Tips
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
          <div className="bg-white p-2 rounded-lg shadow-sm border border-black">
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-[#044bab] transition-colors font-['Verdana']"
            >
              <Download className="w-4 h-4" />
              Download Results
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showTips && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-4 rounded-lg shadow-sm border border-black mb-6">
              <p className="text-black font-['Verdana'] mb-2">
                <strong>Tips:</strong>
              </p>
              <ul className="list-disc list-inside text-black font-['Verdana'] space-y-2">
                <li>Swipe a card left to dismiss it from your current results</li>
                <li>Click the pin icon in the top-right corner of a card to keep it visible across all searches</li>
                <li>Pinned cards will always appear at the top of your results</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Separator className="my-6 bg-black" />
    </>
  );
};
