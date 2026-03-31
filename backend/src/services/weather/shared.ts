export const GEOCODING_BASE = "https://geocoding-api.open-meteo.com/v1";
export const FORECAST_BASE = "https://api.open-meteo.com/v1";

export async function apiClient<T>(baseUrl: string, endpoint: string, params: Record<string, any>): Promise<T> {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${baseUrl}${endpoint}?${queryString}`);
  if (!res.ok) throw new Error(`API Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}