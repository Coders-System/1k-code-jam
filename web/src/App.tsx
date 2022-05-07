import React, {useEffect, useState} from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { OauthCallbackPage } from "./pages/OauthCallbackPage";
import { SubmissionPage } from "./pages/SubmissionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submission" element={<RequireAuth><SubmissionPage /></RequireAuth>} />
        <Route path="/oauth/callback" element={<OauthCallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}


function RequireAuth({ children }: { children: JSX.Element }) {
  const [auth,setAuth] = useState<string | null>(null);
  const [pending,setPending] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAuth(null);
      setPending(false);
    },400)
  }, []);

  if (pending){ return null}

  if (auth) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}


export default App;
