
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <span className="inline-block animate-fade-down px-3 py-1 text-sm font-medium bg-gray-100 rounded-full">
          Welcome to your new application
        </span>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-up">
          Build something amazing with modern technologies
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 animate-fade-up">
          This template is designed with attention to detail, focusing on user experience
          and modern design principles.
        </p>
        
        <div className="flex justify-center gap-4 animate-fade-up">
          <button className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
