import { geocodeCity, fetchDailyForecast } from "../services/weather";
import { scoreDay, summariseDay } from "../services/scoringService";
import { LocationForecast, DailyWeatherSnapshot } from "../types/domain";

export const resolvers = {
  Query: {
    forecastRanking: async (
      _: unknown, 
      { city }: { city: string }
    ): Promise<LocationForecast> => {
      try {

        // Step 1: Get coordinates from city name
        const location = await geocodeCity(city);

        // Step 2: Get weather using those coordinates
        const snapshots = await fetchDailyForecast(location.latitude, location.longitude);

        // Step 3: Transform & Score
        const days = snapshots.map((day: DailyWeatherSnapshot) => ({
          date: day.date,
          activities: scoreDay(day),
          summary: summariseDay(day),
        }));

        // Step 4: Construct the final result
        const finalResult: LocationForecast = {
          city: location.name,
          country: location.country,
          latitude: location.latitude,
          longitude: location.longitude,
          days,
        };

        // LOG 3: Data as it leaves the server
        // console.log(`[Stage 3: GraphQL Resolver Output] for ${city}:`, JSON.stringify(finalResult, null, 2));

        return finalResult;

      } catch (error) {
        console.error(`[ForecastResolver] Error fetching data for ${city}:`, error);
        throw new Error(error instanceof Error ? error.message : "Internal Server Error");
      }
    },
  },
};