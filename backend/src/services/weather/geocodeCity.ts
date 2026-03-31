import { GeocodingResponse, GeocodingResult } from "../../types/domain";
import { apiClient, cache, GEOCODING_BASE } from "./shared";

// Handles location lookup

export async function geocodeCity(city: string): Promise<GeocodingResult> {
  const cacheKey = `geo_${city.toLowerCase().trim()}`;
  const cached = await cache.get(cacheKey) as GeocodingResult | undefined;
  if (cached) return cached;

  const data = await apiClient<GeocodingResponse>(GEOCODING_BASE, "/search", {
    name: city,
    count: 1,
    language: "en",
    format: "json",
  });

  if (!data.results?.length) throw new Error(`City not found: "${city}"`);
  
  const result = data.results[0];
  cache.set(cacheKey, result, 86400); 
  return result;
}