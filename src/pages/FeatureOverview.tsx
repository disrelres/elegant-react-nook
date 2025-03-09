
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dice5, History, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}

const FeatureCard = ({ icon, title, description, to }: FeatureCardProps) => {
  return (
    <Link to={to} className="block no-underline text-inherit">
      <Card className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg mb-6 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] cursor-pointer">
        <div className="flex items-start">
          <div className="bg-[#f0f4ff] dark:bg-[#1a2248] rounded-full p-3 mr-4 text-[#044bab] dark:text-blue-300">
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 font-['Verdana'] text-[#044bab] dark:text-blue-300">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 font-['Verdana']">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const FeatureOverview = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Dice5 size={24} />,
      title: "Dice Rolling",
      description: "Roll virtual dice with different sides and combinations. Perfect for boardgames and RPGs.",
      to: "/"
    },
    {
      icon: <History size={24} />,
      title: "Roll History",
      description: "Keep track of all your past rolls with timestamps and results for reference.",
      to: "/cloned-search"
    },
    {
      icon: <Settings size={24} />,
      title: "Custom Settings",
      description: "Customize your dice, set presets, and configure your rolling preferences.",
      to: "/icosahedron"
    }
  ];

  return (
    <main className="flex-grow container mx-auto px-4 py-8 dark:bg-gray-900">
      <div 
        className={`max-w-3xl mx-auto transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#044bab] dark:text-blue-400 font-['Verdana']">
            Virtual Dice Roller
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-['Verdana']">
            A powerful and customizable dice rolling application for all your gaming needs
          </p>
          <Separator className="my-8 bg-[#044bab] dark:bg-blue-800 opacity-20" />
        </div>

        <div className="mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`transition-all duration-700 delay-${index * 200} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ 
                transitionDelay: `${index * 100}ms`
              }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/"
            className={`inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-lg bg-[#044bab] hover:bg-[#033a8a] text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-['Verdana'] ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{ transitionDelay: '400ms' }}
          >
            Start Rolling
          </Link>
        </div>
      </div>
    </main>
  );
};

export default FeatureOverview;
