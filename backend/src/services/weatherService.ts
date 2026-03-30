// import NodeCache from "node-cache";
// import { 
//   GeocodingResponse, 
//   GeocodingResult, 
//   OpenMeteoForecastResponse, 
//   DailyWeatherSnapshot 
// } from "../types/domain";

// // Initialize cache: 1 hour default TTL, check for expired keys every 10 mins
// const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

// const GEOCODING_BASE = "https://geocoding-api.open-meteo.com/v1";
// const FORECAST_BASE = "https://api.open-meteo.com/v1";

// /**
//  * Helper to calculate seconds until midnight to ensure 
//  * forecast data refreshes for the new day.
//  */
// function getSecondsUntilMidnight(): number {
//   const now = new Date();
//   const midnight = new Date(now);
//   midnight.setHours(24, 0, 0, 0);
//   return Math.floor((midnight.getTime() - now.getTime()) / 1000);
// }

// async function apiClient<T>(baseUrl: string, endpoint: string, params: Record<string, any>): Promise<T> {
//   const queryString = new URLSearchParams(params).toString();
//   const res = await fetch(`${baseUrl}${endpoint}?${queryString}`);
//   if (!res.ok) throw new Error(`API Request failed: ${res.status}`);
//   return res.json() as Promise<T>;
// }

// export async function geocodeCity(city: string): Promise<GeocodingResult> {
//   const cacheKey = `geo_${city.toLowerCase().trim()}`;
//   const cached = cache.get<GeocodingResult>(cacheKey);
//   if (cached) return cached;

//   const data = await apiClient<GeocodingResponse>(GEOCODING_BASE, "/search", {
//     name: city,
//     count: 1,
//     language: "en",
//     format: "json",
//   });

//   if (!data.results?.length) throw new Error(`City not found: "${city}"`);
  
//   const result = data.results[0];
//   cache.set(cacheKey, result, 86400); // Cache location names for 24 hours
//   return result;
// }

// export async function fetchDailyForecast(
//   latitude: number,
//   longitude: number
// ): Promise<DailyWeatherSnapshot[]> {
//   // Round coordinates to 2 decimals to increase cache hit rate for nearby searches
//   const latKey = latitude.toFixed(2);
//   const lonKey = longitude.toFixed(2);
//   const cacheKey = `forecast_${latKey}_${lonKey}`;

//   const cached = cache.get<DailyWeatherSnapshot[]>(cacheKey);
//   if (cached) return cached;

//   const daily = [
//     "temperature_2m_max", "temperature_2m_min", "precipitation_sum",
//     "snowfall_sum", "wind_speed_10m_max", "wind_gusts_10m_max",
//     "weather_code", "sunshine_duration", "precipitation_hours", "uv_index_max",
//   ].join(",");

//   const data = await apiClient<OpenMeteoForecastResponse>(FORECAST_BASE, "/forecast", {
//     latitude,
//     longitude,
//     daily,
//     forecast_days: 7,
//     timezone: "auto",
//   });

//   const normalised = normaliseDailyForecast(data);
  
//   // Set TTL to midnight so we don't serve "yesterday's" data as today's
//   cache.set(cacheKey, normalised, getSecondsUntilMidnight());
  
//   return normalised;
// }

// function normaliseDailyForecast(raw: OpenMeteoForecastResponse): DailyWeatherSnapshot[] {
//   const { daily } = raw;
//   return daily.time.map((date, i) => ({
//     date,
//     tempMax: daily.temperature_2m_max[i],
//     tempMin: daily.temperature_2m_min[i],
//     precipitation: daily.precipitation_sum[i],
//     snowfall: daily.snowfall_sum[i],
//     windSpeed: daily.wind_speed_10m_max[i],
//     windGusts: daily.wind_gusts_10m_max[i],
//     weatherCode: daily.weather_code[i],
//     sunshineDuration: daily.sunshine_duration[i],
//     precipitationHours: daily.precipitation_hours[i],
//     uvIndexMax: daily.uv_index_max[i],
//   }));
// }