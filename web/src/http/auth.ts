import { httpClient } from ".";
import { ApiRoutes } from "./routes";

export async function sendOAuthCallback(code: string) {
  return await httpClient.post(ApiRoutes.OAUTH_CALLBACK, {
    code,
  });
}

export async function getOAuthCallbackURL() {
  const resp = await httpClient.get(ApiRoutes.GET_OAUTH_URL);
  return resp.data.url;
}

export async function logout() {
  await httpClient.post(ApiRoutes.LOGOUT);
}

// Or null if not logged in
export async function getLoggedInUserId() {
  try {
    const userId = (await httpClient.get(ApiRoutes.ME)).data.id;
    return userId;
  } catch (e) {
    return null;
  }
}
