import type { IReport } from "../interfaces/report";
import api from "./api";

export async function getReportSummary(): Promise<IReport> {
  const response = await api.get<IReport>("/report");
  return response.data;
}
