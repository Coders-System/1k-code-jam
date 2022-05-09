import { httpClient } from ".";
import { ApiRoutes } from "./routes";

export async function getTimeUntilSubmission() {
  const a = (await httpClient.get(ApiRoutes.TIME)).data;
  return a.remaining;
  //return 60 * 60 * 1000
}
