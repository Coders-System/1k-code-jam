import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { SubmissionPage } from "./pages/SubmissionPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submission" element={<SubmissionPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
