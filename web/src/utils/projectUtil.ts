export const ProjectStatus = {
  PLANNED: "planned",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

export function formatProjectStatusLabel(status: string): string {
  const labels = {
    [ProjectStatus.PLANNED]: "Planejado",
    [ProjectStatus.IN_PROGRESS]: "Em andamento",
    [ProjectStatus.COMPLETED]: "Concluído",
  };
  return labels[status] || "Desconhecido";
}
