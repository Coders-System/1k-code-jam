import { useEffect } from "react";
import queryString from "query-string";
import { sendOAuthCallback } from "../http/auth";

export function OauthCallbackPage() {
  const parsedQuery = queryString.parse(window.location.search);

  useEffect(() => {
    const logInUser = async () => {
      const resp = await sendOAuthCallback(parsedQuery.code as string);
      if (resp.status === 200) {
        window.location.href = "/dashboard";
      }
    };

    if (parsedQuery.code) {
      logInUser();
    }
  }, []);

  if (!parsedQuery.code) {
    window.location.href = "/";
    return <></>;
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <h1 className="text-center text-4xl">Logging you in...</h1>
    </div>
  );
}
