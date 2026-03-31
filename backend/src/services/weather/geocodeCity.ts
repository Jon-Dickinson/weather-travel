import { GeocodingResponse, GeocodingResult } from "../../types/domain";
import { apiClient, GEOCODING_BASE } from "./shared";

export async function geocodeCity(city: string): Promise<GeocodingResult> {
  const data = await apiClient<GeocodingResponse>(GEOCODING_BASE, "/search", {
    name: city,
    count: 1,
    language: "en",
    format: "json",
  });

  if (!data.results?.length) throw new Error(`City not found: "${city}"`);
  
  return data.results[0];
}