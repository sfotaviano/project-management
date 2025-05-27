import type { IProject } from "../interfaces/project";
import api from "./api";

export async function createProject(
  data: Partial<IProject>
): Promise<IProject> {
  const response = await api.post<IProject>("/project", data);
  return response.data;
}

export async function getProjects(): Promise<IProject[]> {
  const response = await api.get<IProject[]>("/project");
  return response.data;
}

export async function getProject(id?: number | null): Promise<IProject | null> {
  if (!id) return null;
  const response = await api.get<IProject>(`/project/${id}`);
  return response.data;
}

export async function updateProject(
  id: number,
  data: Partial<IProject>
): Promise<IProject> {
  const response = await api.put<IProject>(`/project/${id}`, data);
  return response.data;
}

export async function deleteProject(id: number): Promise<void> {
  await api.delete(`/project/${id}`);
}
