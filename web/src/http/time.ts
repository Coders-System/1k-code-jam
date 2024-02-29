import { httpClient } from ".";
import { ApiRoutes } from "./routes";

export async function getTimeUntilSubmission() {
  const a = (await httpClient.get(ApiRoutes.SUBMIT_TIME)).data;
  return a.remaining;
}

export async function getTimeUntilVoteEnd() {
  const a = (await httpClient.get(ApiRoutes.VOTE_END_TIME)).data;
  return a;
}
