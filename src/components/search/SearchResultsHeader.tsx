
import { Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SearchResultsHeaderProps {
  resultCount: number;
  onDownload: () => void;
}

export const SearchResultsHeader = ({ resultCount, onDownload }: SearchResultsHeaderProps) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div className="flex items-center gap-4">
          <p className="text-black font-['Verdana']">{resultCount} results found</p>
        </div>
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
      <Separator className="my-6 bg-black" />
    </>
  );
};
