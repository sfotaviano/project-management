export interface IProject {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  location?: string;
  created_at: string;
  updated_at: string;
}
