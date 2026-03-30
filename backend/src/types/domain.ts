// ─── External API Types

export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}

export interface OpenMeteoForecastResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    snowfall_sum: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    weather_code: number[];
    sunshine_duration: number[];
    precipitation_hours: number[];
    uv_index_max: number[];
  };
}

// ─── Domain Types ─────────────────────────────────────────────────────────────

export type ActivityType =
  | "SKIING"
  | "SURFING"
  | "OUTDOOR_SIGHTSEEING"
  | "INDOOR_SIGHTSEEING";

export interface DailyWeatherSnapshot {
  date: string;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  snowfall: number;
  windSpeed: number;
  windGusts: number;
  weatherCode: number;
  sunshineDuration: number; // seconds
  precipitationHours: number;
  uvIndexMax: number;
}

export interface ActivityScore {
  activity: ActivityType;
  score: number; // 0–100
  label: string; // "Excellent" | "Good" | "Fair" | "Poor"
  reasoning: string;
}

export interface DayRanking {
  date: string;
  activities: ActivityScore[];
  summary: string;
}

export interface LocationForecast {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  days: DayRanking[];
}
