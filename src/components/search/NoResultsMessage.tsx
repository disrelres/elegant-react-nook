
import React from 'react';

interface NoResultsMessageProps {
  organizationType: "organization" | "program" | "";
}

export const NoResultsMessage = ({ organizationType }: NoResultsMessageProps) => {
  return (
    <div className="text-center font-['Verdana'] text-black dark:text-white mt-10">
      No {organizationType}s found matching your search criteria.
    </div>
  );
};
