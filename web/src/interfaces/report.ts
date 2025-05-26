export interface IReport {
  projects: {
    total: number;
    completed: number;
    in_progress: number;
    planned: number;
  };
  tasks: {
    total: number;
    completed: number;
    in_progress: number;
    pending: number;
  };
}
