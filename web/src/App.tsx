import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { httpClient } from "./http";
import { ApiRoutes } from "./http/routes";
import { HomePage } from "./pages/HomePage";
import { OauthCallbackPage } from "./pages/OauthCallbackPage";
import { SubmissionPage } from "./pages/SubmissionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/submission"
          element={
            <RequireAuth>
              <SubmissionPage />
            </RequireAuth>
          }
        />
        <Route path="/oauth/callback" element={<OauthCallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const [auth, setAuth] = useState<number | null>(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const userId = (await httpClient.get(ApiRoutes.ME)).data.id;
        console.log(userId);
        setAuth(userId);
      } catch (e) {
        console.log("asdf");
        setAuth(null);
      }

      setPending(false);
    }, 400);
  }, []);

  if (pending) {
    return null;
  }

  if (auth) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default App;
