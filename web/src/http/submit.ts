import { httpClient } from ".";
import { ApiRoutes } from "./routes";

interface ProjectSubmitDto {
  project_name: string;
  tech_stack: string[];
  description: string;
  video_link: string;
  code_link: string;
}

export async function submitProject(data: ProjectSubmitDto) {
  await httpClient.post(ApiRoutes.SUBMIT, data);
}
