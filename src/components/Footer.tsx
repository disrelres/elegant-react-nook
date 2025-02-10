
export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm font-['Verdana']">
            © {new Date().getFullYear()} test. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-500 text-sm font-['Verdana']">
              Made with ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
