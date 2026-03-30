import { OpenMeteoForecastResponse, DailyWeatherSnapshot } from "../../types/domain";
import { apiClient, cache, FORECAST_BASE } from "./shared";
import { normaliseDailyForecast } from "./normaliseDailyForecast";
import { getSecondsUntilMidnight } from "./utils";

/**
 * The primary data orchestrator.
 */
export async function fetchDailyForecast(
  latitude: number,
  longitude: number
): Promise<DailyWeatherSnapshot[]> {
  const latKey = latitude.toFixed(2);
  const lonKey = longitude.toFixed(2);
  const cacheKey = `forecast_${latKey}_${lonKey}`;

  // 1. MUST await the get call now that the cache provider is async-compatible
  const cached = await cache.get(cacheKey) as DailyWeatherSnapshot[] | undefined;
  if (cached) return cached;

  const dailyVars = [
    "temperature_2m_max", "temperature_2m_min", "precipitation_sum",
    "snowfall_sum", "wind_speed_10m_max", "wind_gusts_10m_max",
    "weather_code", "sunshine_duration", "precipitation_hours", "uv_index_max",
  ].join(",");

  const data = await apiClient<OpenMeteoForecastResponse>(FORECAST_BASE, "/forecast", {
    latitude,
    longitude,
    daily: dailyVars,
    forecast_days: 7,
    timezone: "auto",
  });

  const normalised = normaliseDailyForecast(data);

  // 2. MUST await the set call (especially important for Redis connections)
  await cache.set(cacheKey, normalised, getSecondsUntilMidnight());
  
  return normalised;
}