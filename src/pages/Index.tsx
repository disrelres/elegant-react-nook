
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchSection } from "@/components/SearchSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <SearchSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
