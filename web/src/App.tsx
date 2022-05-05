import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Footer} from "./components/Footer";
import {Navbar} from "./components/Navbar";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
