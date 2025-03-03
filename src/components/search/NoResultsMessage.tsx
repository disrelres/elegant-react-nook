
import React from "react";

interface NoResultsMessageProps {
  organizationType: "organization" | "program" | "";
}

const NoResultsMessage = ({ organizationType }: NoResultsMessageProps) => {
  return (
    <div className="text-center font-['Verdana'] text-black dark:text-white">
      No {organizationType}s found matching your search criteria.
    </div>
  );
};

export default NoResultsMessage;
