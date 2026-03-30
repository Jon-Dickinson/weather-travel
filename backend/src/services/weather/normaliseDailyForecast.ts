import { OpenMeteoForecastResponse, DailyWeatherSnapshot } from "../../types/domain";

// The data transformation layer

export function normaliseDailyForecast(raw: OpenMeteoForecastResponse): DailyWeatherSnapshot[] {
  const { daily } = raw;
  return daily.time.map((date, i) => ({
    date,
    tempMax: daily.temperature_2m_max[i],
    tempMin: daily.temperature_2m_min[i],
    precipitation: daily.precipitation_sum[i],
    snowfall: daily.snowfall_sum[i],
    windSpeed: daily.wind_speed_10m_max[i],
    windGusts: daily.wind_gusts_10m_max[i],
    weatherCode: daily.weather_code[i],
    sunshineDuration: daily.sunshine_duration[i],
    precipitationHours: daily.precipitation_hours[i],
    uvIndexMax: daily.uv_index_max[i],
  }));
}