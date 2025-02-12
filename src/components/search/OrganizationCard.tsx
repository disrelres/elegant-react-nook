
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Pin, PinOff } from "lucide-react";
import { ProcessedOrganization } from "../types/organization";

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
  return (
    <motion.div
      initial={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(event, info) => {
        if (info.offset.x < -100) {
          onHide(organization.id);
        }
      }}
    >
      <Card className="transition-all duration-200 hover:border-[#044bab] hover:border-2 hover:shadow-lg bg-white border border-black flex flex-col md:flex-row md:items-start gap-4">
        <CardHeader className="flex-shrink-0 md:w-1/3 relative">
          <button
            onClick={() => onTogglePin(organization.id)}
            className="absolute top-2 right-2 text-gray-400 hover:text-[#044bab] transition-colors"
          >
            {isPinned ? (
              <Pin className="w-5 h-5" />
            ) : (
              <PinOff className="w-5 h-5" />
            )}
          </button>
          <h3 className="text-xl font-semibold text-[#044bab] font-['Verdana']">{organization.name}</h3>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-black mb-4 font-['Verdana']">{organization.description}</p>
          {organization.website && (
            <p className="text-sm mb-2 font-['Verdana']">
              <strong className="text-black">Website:</strong>{" "}
              <a href={organization.website} target="_blank" rel="noopener noreferrer" className="text-[#044bab] hover:underline">
                {organization.website}
              </a>
            </p>
          )}
          {organization.phone && (
            <p className="text-sm mb-2 font-['Verdana']">
              <strong className="text-black">Phone:</strong> <span className="text-black">{organization.phone}</span>
            </p>
          )}
          {organization.email && (
            <p className="text-sm font-['Verdana']">
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
