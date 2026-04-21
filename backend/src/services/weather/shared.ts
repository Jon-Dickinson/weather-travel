import axios from "axios";

export const GEOCODING_BASE = "https://geocoding-api.open-meteo.com/v1";
export const FORECAST_BASE = "https://api.open-meteo.com/v1";

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.reason || error.message;
    return `API Request failed (${status}): ${message}`;
  }
  return error instanceof Error ? error.message : "An unexpected error occurred";
}

export async function apiClient<T>(
  baseUrl: string, 
  endpoint: string, 
  params: Record<string, any>
): Promise<T> {
  try {
    const response = await axios.get<T>(endpoint, {
      baseURL: baseUrl,
      params,
    });

    // LOG 1: Raw data from the external API
    // console.log(`[Stage 1: API Response] from ${endpoint}:`, response.data);

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

