import { createContext } from "react";
import { httpClient } from ".";
import { ApiRoutes } from "./routes";
import { User } from "./types";

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
export async function getLoggedInUser() {
  //try {
    //const user = (await httpClient.get(ApiRoutes.ME)).data;
    //return user;
  //} catch (e) {
    //return null;
  //}
  return {
    id: "a",
    username: "asdf",
    discriminator: "d#2",
    email:"asd",
    created_at: 23,
    submitted: false
  }

}

// type User when auth is valid, null when auth is invalid, undefined when auth req has not been sent
export const authContext = createContext<User | null | undefined>(undefined);
