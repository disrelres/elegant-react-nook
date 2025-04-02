
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Trophy, Users, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GolfNewsItem {
  id: number;
  title: string;
  description: string;
  source: string;
  url: string;
  date: string;
  category: string;
  imageUrl?: string;
}

const golfNews: GolfNewsItem[] = [
  {
    id: 1,
    title: "PGA Tour Announces New Tournament Schedule",
    description: "The PGA Tour has released its upcoming tournament schedule with several new venues.",
    source: "PGA Tour",
    url: "https://www.pgatour.com",
    date: "2023-10-15",
    category: "tournaments",
    imageUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=1470"
  },
  {
    id: 2,
    title: "5 Ways to Improve Your Short Game",
    description: "Golf Digest experts share their top tips for mastering your short game approach.",
    source: "Golf Digest",
    url: "https://www.golfdigest.com",
    date: "2023-10-10",
    category: "instruction",
    imageUrl: "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&q=80&w=1470"
  },
  {
    id: 3,
    title: "New Drivers Hitting the Market in 2023",
    description: "GolfWRX reviews the latest drivers that promise more distance and forgiveness.",
    source: "GolfWRX",
    url: "https://www.golfwrx.com",
    date: "2023-10-08",
    category: "equipment",
    imageUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=1470"
  },
  {
    id: 4,
    title: "TopGolf Opens New Location in Chicago",
    description: "The popular golf entertainment complex opens its doors in the Windy City.",
    source: "TopGolf",
    url: "https://www.topgolf.com",
    date: "2023-10-05",
    category: "entertainment",
    imageUrl: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=1470"
  },
  {
    id: 5,
    title: "Interview with Rory McIlroy on His Mental Game",
    description: "Golf.com sits down with the four-time major champion to discuss his approach to the mental side of golf.",
    source: "Golf.com",
    url: "https://www.golf.com",
    date: "2023-10-02",
    category: "interviews",
    imageUrl: "https://images.unsplash.com/photo-1596112723472-fab1c0fa631b?auto=format&fit=crop&q=80&w=1470"
  },
  {
    id: 6,
    title: "Best Public Golf Courses to Play in 2023",
    description: "Golf Digest ranks the top 100 public courses that every golfer should experience.",
    source: "Golf Digest",
    url: "https://www.golfdigest.com",
    date: "2023-09-28",
    category: "courses",
    imageUrl: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=1470"
  },
  {
    id: 7,
    title: "2023 Major Championship Preview",
    description: "PGA Tour experts break down what to expect at next year's majors.",
    source: "PGA Tour",
    url: "https://www.pgatour.com",
    date: "2023-09-25",
    category: "tournaments",
    imageUrl: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=1470"
  },
  {
    id: 8,
    title: "TopGolf Introduces New Game Modes",
    description: "The popular entertainment venue adds exciting new games to their technology lineup.",
    source: "TopGolf",
    url: "https://www.topgolf.com",
    date: "2023-09-20",
    category: "entertainment",
    imageUrl: "https://images.unsplash.com/photo-1596112723472-fab1c0fa631b?auto=format&fit=crop&q=80&w=1470"
  }
];

const GolfHub = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredNews = activeTab === "all" 
    ? golfNews 
    : golfNews.filter(item => item.category === activeTab);

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-green-600 dark:text-green-400 font-['Verdana']">GOLF HUB</h1>
      
      <p className="mb-8 font-['Verdana'] text-black">
        Your one-stop destination for the latest news, instructions, equipment reviews, and more from 
        the world's top golf sources including PGA Tour, Golf.com, Golf Digest, TopGolf, and GolfWRX.
      </p>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-8 bg-white/70 backdrop-blur-md border border-black">
          <TabsTrigger value="all" className="font-['Verdana']">All</TabsTrigger>
          <TabsTrigger value="tournaments" className="font-['Verdana']">Tournaments</TabsTrigger>
          <TabsTrigger value="instruction" className="font-['Verdana']">Instruction</TabsTrigger>
          <TabsTrigger value="equipment" className="font-['Verdana']">Equipment</TabsTrigger>
          <TabsTrigger value="courses" className="font-['Verdana']">Courses</TabsTrigger>
          <TabsTrigger value="entertainment" className="font-['Verdana']">Entertainment</TabsTrigger>
          <TabsTrigger value="interviews" className="font-['Verdana']">Interviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map(item => (
              <Card key={item.id} className="overflow-hidden border border-black hover:shadow-lg transition-shadow duration-300 bg-white/70 backdrop-blur-md">
                {item.imageUrl && (
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-['Verdana'] text-gray-600">
                      {item.source}
                    </span>
                    <span className="text-sm font-['Verdana'] text-gray-600">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-['Verdana'] text-black">{item.title}</CardTitle>
                  <CardDescription className="font-['Verdana']">{item.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 flex justify-between">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-['Verdana'] capitalize">
                    {item.category}
                  </span>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-['Verdana'] text-[#044bab] hover:underline"
                  >
                    Read More <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-green-600 dark:text-green-400 font-['Verdana']">FEATURED SOURCES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <SourceCard 
            title="PGA Tour" 
            description="Official home of the PGA Tour, providing tournament coverage, player stats, and news."
            url="https://www.pgatour.com" 
            icon={<Trophy className="h-5 w-5" />}
          />
          <SourceCard 
            title="Golf.com" 
            description="Latest golf news, equipment reviews, instruction, and course guides."
            url="https://www.golf.com" 
            icon={<Calendar className="h-5 w-5" />}
          />
          <SourceCard 
            title="Golf Digest" 
            description="Expert golf instruction, equipment reviews, and golf course rankings."
            url="https://www.golfdigest.com" 
            icon={<Users className="h-5 w-5" />}
          />
          <SourceCard 
            title="TopGolf" 
            description="Golf entertainment venues combining technology and fun for all skill levels."
            url="https://www.topgolf.com" 
            icon={<MapPin className="h-5 w-5" />}
          />
          <SourceCard 
            title="GolfWRX" 
            description="Golf equipment news, reviews, and community discussion forums."
            url="https://www.golfwrx.com" 
            icon={<ExternalLink className="h-5 w-5" />}
          />
        </div>
      </div>
    </main>
  );
};

const SourceCard = ({ 
  title, 
  description, 
  url, 
  icon 
}: { 
  title: string; 
  description: string; 
  url: string;
  icon: React.ReactNode;
}) => {
  return (
    <Card className="border border-black bg-white/70 backdrop-blur-md hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <CardTitle className="text-md font-['Verdana'] text-black">{title}</CardTitle>
        </div>
        <CardDescription className="font-['Verdana']">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-0">
        <Button asChild variant="link" className="p-0 h-auto font-['Verdana'] text-[#044bab]">
          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center">
            Visit Website <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GolfHub;
