
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { VideoLink } from "./components/VideoLink";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import ClonedSearch from "./pages/ClonedSearch";

const App = () => (
  <Router>
    <div className="min-h-screen flex flex-col">
      <Header />
      <VideoLink />
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/cloned-search" element={<ClonedSearch />} />
      </Routes>
      <Footer />
    </div>
  </Router>
);

export default App;
