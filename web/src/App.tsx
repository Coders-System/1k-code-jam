import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authContext, getLoggedInUser } from "./http/auth";
import { User } from "./http/types";
import { NotFoundPage } from "./pages/404";
import { HomePage } from "./pages/HomePage";
import { OauthCallbackPage } from "./pages/OauthCallbackPage";
import { SubmissionPage } from "./pages/SubmissionPage";
import { VotePage } from "./pages/VotePage";

function App() {
  const [auth, setAuth] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    getLoggedInUser()
      .then((e) => {
        setAuth(e);
      })
      .catch(() => {
        setAuth(null);
      });
  }, []);

  return (
    <authContext.Provider value={auth}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<SubmissionPage />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/oauth/callback" element={<OauthCallbackPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  );
}

export default App;
