export interface User {
  id: string;
  username: string;
  discriminator: string;
  email: string;
  created_at: number;
  submitted: boolean;
  voted: boolean;
}

export interface Submission {
  project_name: string;
  tech_stack: string[];
  video_link: string;
  code_link: string;
  submitted_at: string;
}
