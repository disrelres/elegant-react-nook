
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, Copy } from "lucide-react";
import { ProcessedOrganization } from "../types/organization";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OrganizationCardProps {
  organization: ProcessedOrganization;
}

export const OrganizationCard = ({
  organization,
}: OrganizationCardProps) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const speakContent = () => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = `Organization: ${organization.name}. 
                   Description: ${organization.description}. 
                   ${organization.website ? `Website: ${organization.website}` : ''} 
                   ${organization.phone ? `Phone: ${organization.phone}` : ''} 
                   ${organization.email ? `Email: ${organization.email}` : ''}`;
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  };

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/[^\d]/g, '');
  };

  const copyToClipboard = () => {
    const shareText = `${organization.name} - ${getOrganizationShareUrl()}`;
    navigator.clipboard.writeText(shareText).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const getOrganizationShareUrl = () => {
    // Create a URL with the organization ID as a parameter
    const url = new URL(window.location.href);
    url.searchParams.set('org', organization.id);
    return url.toString();
  };

  return (
    <Card className="w-full bg-white/70 backdrop-blur-md border border-black">
      <CardContent className="flex-grow pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2 mr-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={copyToClipboard}
                    className="text-gray-400 hover:text-[#044bab] transition-colors"
                    aria-label="Copy link to clipboard"
                  >
                    <Copy className="w-6 h-6" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy link to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={speakContent}
                    className="text-gray-400 hover:text-[#044bab] transition-colors"
                    aria-label="Read content aloud"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Listen to organization details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {copySuccess && (
              <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-in fade-in slide-in-from-top-2 duration-300 z-50">
                Link copied to clipboard!
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-[#044bab] font-['Verdana'] select-text flex-1">{organization.name}</h3>
        </div>
        <p className="text-black font-['Verdana'] select-text mb-4">{organization.description}</p>
        {organization.website && (
          <p className="text-sm mb-2 font-['Verdana'] select-text">
            <strong className="text-black">Website:</strong>{" "}
            <a href={organization.website} target="_blank" rel="noopener noreferrer" className="text-[#044bab] hover:underline">
              {organization.website}
            </a>
          </p>
        )}
        {organization.phone && (
          <p className="text-sm mb-2 font-['Verdana'] select-text">
            <strong className="text-black">Phone:</strong>{" "}
            <a href={`tel:${formatPhoneNumber(organization.phone)}`} className="text-[#044bab] hover:underline">
              {organization.phone}
            </a>
          </p>
        )}
        {organization.email && (
          <p className="text-sm font-['Verdana'] select-text">
            <strong className="text-black">Email:</strong>{" "}
            <a href={`mailto:${organization.email}`} className="text-[#044bab] hover:underline">
              {organization.email}
            </a>
          </p>
        )}
      </CardContent>
    </Card>
  );
};
