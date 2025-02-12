
export const Footer = () => {
  return (
    <footer className="w-full bg-[#044bab] mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-sm font-['Verdana']">
            © {new Date().getFullYear()} test. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <a 
              href="http://www.youtube.com/@DisabilityRelatedResource" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-gray-200 text-sm font-['Verdana'] transition-colors"
            >
              YouTube
            </a>
            <a 
              href="https://bsky.app/profile/disabilityrelres.bsky.social" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-gray-200 text-sm font-['Verdana'] mt-1 transition-colors"
            >
              Bluesky
            </a>
            <a 
              href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAYynA85UODhYNTVKSkRBVzhKREw0MDFGVERWSFJTWS4u" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-gray-200 text-sm font-['Verdana'] mt-1 transition-colors"
            >
              Feedback Form
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
