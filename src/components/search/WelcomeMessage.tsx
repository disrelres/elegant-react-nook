
import React from 'react';

export const WelcomeMessage = () => {
  return (
    <div className="mt-10 p-6 text-center border-2 border-dashed border-[#044bab] rounded-lg">
      <p className="text-xl font-['Verdana'] text-black dark:text-white mb-2">
        Welcome to the Resource Search Tool
      </p>
      <p className="font-['Verdana'] text-black dark:text-white">
        Please select either "Programs" or "Organizations" above to start searching for resources.
      </p>
    </div>
  );
};
