import { OpenMeteoForecastResponse, DailyWeatherSnapshot } from "../../types/domain";
import { apiClient, FORECAST_BASE } from "./shared";
import { normaliseDailyForecast } from "./normaliseDailyForecast";

export async function fetchDailyForecast(
  latitude: number,
  longitude: number
): Promise<DailyWeatherSnapshot[]> {
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

  return normaliseDailyForecast(data);
}