import type { ITask } from "../interfaces/task";
import api from "./api";

export async function createTask(data: Partial<ITask>): Promise<ITask> {
  const response = await api.post<ITask>("/task", data);
  return response.data;
}

export async function getTasks(): Promise<ITask[]> {
  const response = await api.get<ITask[]>("/task");
  return response.data;
}

export async function getTask(id?: number | null): Promise<ITask | null> {
  if (!id) return null;
  const response = await api.get<ITask>(`/task/${id}`);
  return response.data;
}

export async function updateTask(
  id: number,
  data: Partial<ITask>
): Promise<ITask> {
  const response = await api.put<ITask>(`/task/${id}`, data);
  return response.data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/task/${id}`);
}
