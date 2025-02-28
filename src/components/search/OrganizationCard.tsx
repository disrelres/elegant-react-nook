
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, Share2, X, Twitter, Facebook, Linkedin, Copy, Instagram, Mail } from "lucide-react";
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
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
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

  const toggleShareMenu = () => {
    setIsShareMenuOpen(!isShareMenuOpen);
  };

  const copyToClipboard = () => {
    const shareText = `${organization.name} - ${window.location.href}`;
    navigator.clipboard.writeText(shareText).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
    setIsShareMenuOpen(false);
  };

  const shareVia = (platform: string) => {
    const shareText = `Check out ${organization.name}`;
    const shareUrl = window.location.href;
    
    let shareLink = '';
    
    switch(platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'bluesky':
        shareLink = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${shareText} - ${shareUrl}`)}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'email':
        shareLink = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`${shareText} - ${shareUrl}`)}`;
        break;
      default:
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank');
    }
    
    setIsShareMenuOpen(false);
  };

  // BlueSky icon custom component since it's not in Lucide
  const BlueSkyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L3 7l9 5 9-5-9-5z" />
      <path d="M12 22l9-5-9-5-9 5 9 5z" />
      <path d="M3 17l9-5" />
      <path d="M21 7l-9 5" />
    </svg>
  );

  const shareButtons = [
    { icon: <BlueSkyIcon />, name: 'Bluesky', action: () => shareVia('bluesky'), position: 'translate-x-[-60px] translate-y-[-60px]' },
    { icon: <Twitter size={16} />, name: 'Twitter', action: () => shareVia('twitter'), position: 'translate-y-[-80px]' },
    { icon: <Facebook size={16} />, name: 'Facebook', action: () => shareVia('facebook'), position: 'translate-x-[60px] translate-y-[-60px]' },
    { icon: <Linkedin size={16} />, name: 'LinkedIn', action: () => shareVia('linkedin'), position: 'translate-x-[80px]' },
    { icon: <Copy size={16} />, name: 'Copy Link', action: copyToClipboard, position: 'translate-x-[60px] translate-y-[60px]' },
    { icon: <Instagram size={16} />, name: 'Instagram', action: () => shareVia('instagram'), position: 'translate-y-[80px]' },
    { icon: <Mail size={16} />, name: 'Email', action: () => shareVia('email'), position: 'translate-x-[-60px] translate-y-[60px]' },
  ];

  return (
    <Card className="w-full bg-white/70 backdrop-blur-md border border-black">
      <CardContent className="flex-grow pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2 mr-3">
            <div className="relative">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={toggleShareMenu}
                      className={`z-10 relative flex items-center justify-center w-8 h-8 rounded-full ${isShareMenuOpen ? 'bg-gray-200' : 'bg-white'}`}
                      aria-label={isShareMenuOpen ? "Close share menu" : "Open share menu"}
                    >
                      {isShareMenuOpen ? (
                        <X className="w-5 h-5 text-gray-700" />
                      ) : (
                        <Share2 className="w-5 h-5 text-gray-400 hover:text-[#044bab] transition-colors" />
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isShareMenuOpen ? "Close share menu" : "Share this resource"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {/* Animated Share Menu */}
              <div className={`absolute top-0 left-0 transition-all duration-300 ${isShareMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}>
                {shareButtons.map((button, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={button.action}
                          className={`absolute top-4 left-4 flex items-center justify-center w-8 h-8 bg-white shadow-lg rounded-full transform transition-all duration-500 hover:shadow-xl hover:bg-gray-50 ${isShareMenuOpen ? button.position : 'scale-0'}`}
                          aria-label={`Share on ${button.name}`}
                        >
                          {button.icon}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{button.name === 'Copy Link' ? 'Copy to clipboard' : `Share via ${button.name}`}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
            
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
