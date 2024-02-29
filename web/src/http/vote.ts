import { httpClient } from ".";
import { ApiRoutes } from "./routes";
import { Submission } from "./types";

export async function getSubmissions(): Promise<{ submissions: Submission[] }> {
  return (await httpClient.get(ApiRoutes.VOTE_GET_SUBMISSIONS)).data;
}

export async function voteSubmission(projectName: string) {
  await httpClient.post(ApiRoutes.VOTE_SUBMISSION, { name: projectName });
}
