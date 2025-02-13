
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Pin, PinOff, Volume2 } from "lucide-react";
import { ProcessedOrganization } from "../types/organization";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OrganizationCardProps {
  organization: ProcessedOrganization;
  isPinned: boolean;
  onHide: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export const OrganizationCard = ({
  organization,
  isPinned,
  onHide,
  onTogglePin,
}: OrganizationCardProps) => {
  const isMobile = useIsMobile();

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

  const cardMotionProps = isMobile ? {
    drag: "x" as const,
    dragConstraints: { left: 0, right: 0 },
    onDragEnd: (event: any, info: any) => {
      if (info.offset.x < -100) {
        onHide(organization.id);
      }
    }
  } : {};

  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      {...cardMotionProps}
    >
      <Card className="transition-all duration-200 hover:border-[#044bab] hover:border-2 hover:shadow-lg bg-white border border-black flex flex-col md:flex-row md:items-start gap-4">
        <CardHeader className="flex-shrink-0 md:w-1/3 relative">
          <div className="flex justify-between items-start">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={speakContent}
                    className="absolute top-2 left-2 text-gray-400 hover:text-[#044bab] transition-colors p-2"
                    aria-label="Read content aloud"
                  >
                    <Volume2 className="w-10 h-10" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Read card content aloud</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onTogglePin(organization.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-[#044bab] transition-colors p-2"
                  >
                    {isPinned ? (
                      <Pin className="w-10 h-10" />
                    ) : (
                      <PinOff className="w-10 h-10" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isPinned ? 'Unpin this card' : 'Pin this card to keep it visible'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <h3 className="text-xl font-semibold text-[#044bab] font-['Verdana'] mt-4 select-text">{organization.name}</h3>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-black mb-4 font-['Verdana'] select-text">{organization.description}</p>
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
    </motion.div>
  );
};
