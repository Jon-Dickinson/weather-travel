import { OpenMeteoForecastResponse, DailyWeatherSnapshot } from "../../types/domain";

// The data transformation layer

export function normaliseDailyForecast(raw: OpenMeteoForecastResponse): DailyWeatherSnapshot[] {
  const { daily } = raw;
  
  const normalized = daily.time.map((date, dayIndex) => ({
    date,
    tempMax: daily.temperature_2m_max[dayIndex],
    tempMin: daily.temperature_2m_min[dayIndex],
    precipitation: daily.precipitation_sum[dayIndex],
    snowfall: daily.snowfall_sum[dayIndex],
    windSpeed: daily.wind_speed_10m_max[dayIndex],
    windGusts: daily.wind_gusts_10m_max[dayIndex],
    weatherCode: daily.weather_code[dayIndex],
    sunshineDuration: daily.sunshine_duration[dayIndex],
    precipitationHours: daily.precipitation_hours[dayIndex],
    uvIndexMax: daily.uv_index_max[dayIndex],
  }));

  // LOG 2: Data converted to the internal Domain Type
  // console.log(`[Stage 2: Normalized Data] Count: ${normalized.length} days`, normalized[0]);
  
  return normalized;
}