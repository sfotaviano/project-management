export const TaskStatus = {
  pending: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

export function formatTaskStatusLabel(status: string): string {
  const labels = {
    [TaskStatus.pending]: "Pendente",
    [TaskStatus.IN_PROGRESS]: "Em andamento",
    [TaskStatus.COMPLETED]: "Concluído",
  };
  return labels[status] || "Desconhecido";
}
