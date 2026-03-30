import { geocodeCity, fetchDailyForecast } from "../services/weather";
import { scoreDay, summariseDay } from "../services/scoringService";
import { LocationForecast, DailyWeatherSnapshot } from "../types/domain";

async function getForecastForCity(city: string): Promise<LocationForecast> {

  // 1. Resolve Location
  const location = await geocodeCity(city);

  // 2. Fetch Forecast
  const snapshots = await fetchDailyForecast(location.latitude, location.longitude);

  // 3. Transform & Score
  const days = snapshots.map((day: DailyWeatherSnapshot) => ({
    date: day.date,
    activities: scoreDay(day),
    summary: summariseDay(day),
  }));

  return {
    city: location.name,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude,
    days,
  };
}

export const resolvers = {
  Query: {
    forecastRanking: async (
      _: unknown, 
      { city }: { city: string }
    ): Promise<LocationForecast> => {
      try {
        return await getForecastForCity(city);
      } catch (error) {
        // Standardized Error Handling for the UI
        console.error(`[ForecastResolver] Error fetching data for ${city}:`, error);
        throw new Error(error instanceof Error ? error.message : "Internal Server Error");
      }
    },
  },
};