
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { SearchSection } from "@/components/SearchSection";
import { VideoLink } from "@/components/VideoLink";

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <VideoLink />
      <Navigation />
      <main className="flex-grow">
        <SearchSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
