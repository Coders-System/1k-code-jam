import { useEffect } from "react";
import queryString from "query-string";
import { httpClient } from "../http";
import { ApiRoutes } from "../http/routes";

export function OauthCallbackPage() {
  const parsedQuery = queryString.parse(window.location.search);

  useEffect(() => {
    const logInUser = async () => {
      const resp = await httpClient.post(ApiRoutes.OAUTH_CALLBACK, {
        code: parsedQuery.code,
      });
      if (resp.status === 200) {
        window.location.href = "/submission";
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
