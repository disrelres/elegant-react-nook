
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

const About = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <VideoLink />
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-[#044bab] font-['Verdana']">About</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-black">
          <p className="text-black font-['Verdana']">
            When I had my stroke, we needed resources immediately. I was upset when I realized nobody had compiled them. So, I did it for myself. I realized that I most certainly wasn't the only one that needed this information. I set to extending the collection to cover other conditions. I hope you will show your appreciation to my ongoing efforts by donating.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
