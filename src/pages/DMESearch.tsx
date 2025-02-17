
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DMESearchSection } from "@/components/dme/DMESearchSection";

const DMESearch = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <DMESearchSection />
      </main>
      <Footer />
    </div>
  );
};

export default DMESearch;
