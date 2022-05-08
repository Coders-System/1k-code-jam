import { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { getOAuthCallbackURL } from "../http/auth";

export function NotFoundPage() {
  const [oauthURL, setOauthUrl] = useState<string | null>();

  useEffect(() => {
    getOAuthCallbackURL().then((url) => setOauthUrl(url));
  }, []);

  return (
    <div className="h-screen flex items-center flex-col justify-center ">
      <Navbar oauthURL={oauthURL} />
      <div className="my-auto w-full flex flex-col gap-3 items-center justify-center">
        <h1 className="text-center text-4xl ">404 Page Not Found </h1>
        <a className="underline underline-offset-2" href="/">
          Go home
        </a>
      </div>
      <Footer />
    </div>
  );
}
