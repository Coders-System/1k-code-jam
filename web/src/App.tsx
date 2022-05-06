import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { OauthCallbackPage } from "./pages/OauthCallbackPage";
import { SubmissionPage } from "./pages/SubmissionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submission" element={<SubmissionPage />} />
        <Route path="/oauth/callback" element={<OauthCallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
