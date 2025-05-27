import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { ApiErrorResponse } from "../interfaces/api";

export default function useFeatch<T>(featch: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isRefeatching, setRefeatching] = useState<boolean>(false);

  async function refeatch() {
    if (isLoading || isRefeatching) return;
    setRefeatching(true);
    setError(null);
    
    try {
      const data = await featch();
      setData(data);
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      setError(axiosError?.response?.data?.message || "Erro desconhecido");
    } finally {
      setRefeatching(false);
    }
  }

  useEffect(() => {
    async function load() {
      if (isLoading) return;
      setLoading(true);
      setError(null);

      try {
        const data = await featch();
        setData(data);
      } catch (error) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        setError(axiosError?.response?.data?.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [featch]);

  return { data, error, isLoading, refeatch, isRefeatching };
}
