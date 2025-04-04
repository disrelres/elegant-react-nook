
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RssIcon, ExternalLink } from "lucide-react";

interface FeedItem {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
}

interface Feed {
  title: string;
  items: FeedItem[];
  loading: boolean;
  error: string | null;
}

export const HeroSection = () => {
  const [feeds, setFeeds] = useState<Record<string, Feed>>({
    "Andrew Rice Golf": {
      title: "Andrew Rice Golf",
      items: [],
      loading: true,
      error: null,
    },
    "Hooked On Golf Blog": {
      title: "Hooked On Golf Blog",
      items: [],
      loading: true,
      error: null,
    },
    "MyGolfSpy": {
      title: "MyGolfSpy",
      items: [],
      loading: true,
      error: null,
    },
    "The Sand Trap": {
      title: "The Sand Trap",
      items: [],
      loading: true,
      error: null,
    },
    "Golf.com": {
      title: "Golf.com",
      items: [],
      loading: true,
      error: null,
    }, 
    "Golf Channel": {
      title: "Golf Channel",
      items: [],
      loading: true,
      error: null,
    },
    "Golf Business News": {
      title: "Golf Business News", 
      items: [],
      loading: true,
      error: null,
    },
    "Women's Golf": {
      title: "Women's Golf",
      items: [],
      loading: true,
      error: null,
    },
  });

  // Mock fetch RSS feed function since we can't actually fetch external RSS feeds
  const fetchRssFeed = async (feedTitle: string) => {
    try {
      // In a real app, we would fetch the actual RSS feed here
      // For demo purposes, we'll create mock data after a simulated delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      // Mock data for each feed
      const mockItems: Record<string, FeedItem[]> = {
        "Andrew Rice Golf": [
          { title: "Working on Your Ball Striking", link: "https://example.com/1" },
          { title: "Driver Swing Tips", link: "https://example.com/2" },
          { title: "Improving Your Short Game", link: "https://example.com/3" },
        ],
        "Hooked On Golf Blog": [
          { title: "New Callaway Irons Review", link: "https://example.com/4" },
          { title: "Top Golf Courses in Arizona", link: "https://example.com/5" },
          { title: "Best Golf Bags of 2025", link: "https://example.com/6" },
        ],
        "MyGolfSpy": [
          { title: "Most Wanted: Drivers 2025", link: "https://example.com/7" },
          { title: "Independent Putter Testing Results", link: "https://example.com/8" },
          { title: "Golf Ball Spin Comparison", link: "https://example.com/9" },
        ],
        "The Sand Trap": [
          { title: "Bunker Play Techniques", link: "https://example.com/10" },
          { title: "Forum: Equipment Discussion", link: "https://example.com/11" },
          { title: "Course Management Tips", link: "https://example.com/12" },
        ],
        "Golf.com": [
          { title: "PGA Tour Latest News", link: "https://example.com/13" },
          { title: "Interview with Scottie Scheffler", link: "https://example.com/14" },
          { title: "Masters Tournament Preview", link: "https://example.com/15" },
        ],
        "Golf Channel": [
          { title: "Live Coverage: The Open Championship", link: "https://example.com/16" },
          { title: "Tiger Woods Comeback Analysis", link: "https://example.com/17" },
          { title: "Ryder Cup Team Updates", link: "https://example.com/18" },
        ],
        "Golf Business News": [
          { title: "Industry Growth Report 2025", link: "https://example.com/19" },
          { title: "New Golf Technology Trends", link: "https://example.com/20" },
          { title: "Course Management Software Review", link: "https://example.com/21" },
        ],
        "Women's Golf": [
          { title: "LPGA Tour Results", link: "https://example.com/22" },
          { title: "Nelly Korda's Practice Routine", link: "https://example.com/23" },
          { title: "Women's Golf Fashion Trends", link: "https://example.com/24" },
        ]
      };
      
      return { 
        success: true, 
        items: mockItems[feedTitle] || []
      };
    } catch (error) {
      return { 
        success: false, 
        error: "Failed to fetch feed" 
      };
    }
  };

  useEffect(() => {
    // Fetch all feeds
    const loadAllFeeds = async () => {
      const feedTitles = Object.keys(feeds);
      
      for (const title of feedTitles) {
        const result = await fetchRssFeed(title);
        
        setFeeds(prev => ({
          ...prev,
          [title]: {
            ...prev[title],
            loading: false,
            items: result.success ? result.items : [],
            error: result.success ? null : result.error
          }
        }));
      }
    };
    
    loadAllFeeds();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#044bab] mb-4 font-['Verdana']">
            Golf News Hub
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg font-['Verdana']">
            Stay updated with the latest news and insights from the world of golf
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(feeds).map(([key, feed]) => (
            <Card key={key} className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-[#044bab]/10 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#044bab] dark:text-[#6b93d8] font-['Verdana'] text-lg">
                    {feed.title}
                  </CardTitle>
                  <RssIcon className="h-5 w-5 text-[#044bab] dark:text-[#6b93d8]" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {feed.loading ? (
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                  </div>
                ) : feed.error ? (
                  <div className="p-4 text-red-500 font-['Verdana'] text-sm">
                    Failed to load feed: {feed.error}
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {feed.items.map((item, index) => (
                      <li key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-gray-800 dark:text-gray-200 hover:text-[#044bab] dark:hover:text-[#6b93d8]"
                        >
                          <span className="font-['Verdana'] text-sm flex-grow">{item.title}</span>
                          <ExternalLink className="h-4 w-4 flex-shrink-0 opacity-50" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400 font-['Verdana']">
          <p>Note: This is a demonstration using simulated RSS feeds. In a production environment, these would be replaced with actual RSS feed data.</p>
        </footer>
      </div>
    </div>
  );
};
