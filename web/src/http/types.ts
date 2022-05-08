export interface User {
  id: string;
  username: string;
  discriminator: string;
  email: string;
  created_at: number;
  submitted: boolean;
}
