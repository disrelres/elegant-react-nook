
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./components/Header";

const App = () => (
  <Router>
    <div className="min-h-screen flex flex-col">
      <Header />
    </div>
  </Router>
);

export default App;
