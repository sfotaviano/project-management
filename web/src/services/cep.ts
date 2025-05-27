import type { ICep } from "../interfaces/cep";
import api from "./api";

export async function getAddressByCep(cep: string): Promise<ICep> {
  const response = await api.get<ICep>(`/cep/${cep}`);
  return response.data;
}
