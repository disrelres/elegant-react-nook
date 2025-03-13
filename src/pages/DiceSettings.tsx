
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check } from "lucide-react";

type ColorScheme = {
  name: string;
  diceColor: string;
  textColor: string;
};

const DiceSettings = () => {
  const navigate = useNavigate();
  const [selectedScheme, setSelectedScheme] = useState<string>("black-white");
  const [wanderingBubblesEnabled, setWanderingBubblesEnabled] = useState<boolean>(false);
  
  const colorSchemes: ColorScheme[] = [
    { name: "black-white", diceColor: "black", textColor: "white" },
    { name: "red-white", diceColor: "#ea384c", textColor: "white" },
    { name: "blue-yellow", diceColor: "#0EA5E9", textColor: "#FEF7CD" },
  ];
  
  const handleSaveSettings = () => {
    // In a real app, we'd save these settings to localStorage or a state management solution
    // For now, we'll just navigate back to the dice roller
    navigate("/dice-roller");
  };
  
  return (
    <main className="flex-grow container mx-auto px-4 py-8 dark:bg-gray-900">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-2">
            <Link to="/dice-roller">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-[#044bab] dark:text-blue-400 font-['Verdana']">
            Dice Settings
          </h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-['Verdana']">Color Schemes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {colorSchemes.map((scheme) => (
                <div 
                  key={scheme.name}
                  className={`relative cursor-pointer rounded-lg border-2 p-2 transition-all ${
                    selectedScheme === scheme.name ? "border-[#044bab]" : "border-gray-200"
                  }`}
                  onClick={() => {
                    setSelectedScheme(scheme.name);
                    setWanderingBubblesEnabled(false);
                  }}
                >
                  <div 
                    className="w-full h-16 rounded-md flex items-center justify-center mb-2"
                    style={{ backgroundColor: scheme.diceColor, color: scheme.textColor }}
                  >
                    <span className="text-xl">#</span>
                  </div>
                  
                  {selectedScheme === scheme.name && (
                    <div className="absolute top-2 right-2 bg-[#044bab] rounded-full p-1">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div 
              className={`relative cursor-pointer rounded-lg border-2 p-2 transition-all ${
                wanderingBubblesEnabled ? "border-[#044bab]" : "border-gray-200"
              }`}
              onClick={() => {
                setWanderingBubblesEnabled(true);
                setSelectedScheme("");
              }}
            >
              <div className="w-full h-24 rounded-md overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-yellow-400 to-green-500 opacity-70 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white drop-shadow-md">Wandering Bubbles</span>
                </div>
              </div>
              
              {wanderingBubblesEnabled && (
                <div className="absolute top-2 right-2 bg-[#044bab] rounded-full p-1">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Button 
          onClick={handleSaveSettings}
          className="w-full font-['Verdana'] bg-[#044bab] hover:bg-[#033a8a]"
        >
          Save Settings
        </Button>
      </div>
    </main>
  );
};

export default DiceSettings;
