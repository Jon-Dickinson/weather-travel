/**
 * Public scoring API and orchestration
 */

import { ActivityScore, ActivityType, DailyWeatherSnapshot } from "../types/domain";
import {
  scoreSkiing,
  scoreSurfing,
  scoreOutdoorSightseeing,
  scoreIndoorSightseeing,
} from "./activityScorers";
import {
  isThunderstorm,
  hasPrecipitation,
  isClearOrPartlyCloudy,
} from "./weatherHelpers";

/** * Registry of available scorers. 
 * Using a Record ensures we map the ActivityType to the correct function signature.
 */
const SCORER_REGISTRY: Record<ActivityType, (d: DailyWeatherSnapshot) => Omit<ActivityScore, "activity">> = {
  SKIING: scoreSkiing,
  SURFING: scoreSurfing,
  OUTDOOR_SIGHTSEEING: scoreOutdoorSightseeing,
  INDOOR_SIGHTSEEING: scoreIndoorSightseeing,
};

/**
 * Score all activities for a single day.
 */
export function scoreDay(day: DailyWeatherSnapshot): ActivityScore[] {
  return (Object.entries(SCORER_REGISTRY) as [ActivityType, typeof scoreSkiing][])
    .map(([activity, scorer]) => ({
      activity,
      ...scorer(day),
    }))
    .sort((a, b) => b.score - a.score);
}

/**
 * Generates a one-sentence summary of the day's conditions.
 */
export function summariseDay(day: DailyWeatherSnapshot): string {
  const getIcon = () => {
    if (isThunderstorm(day.weatherCode)) return "⛈️";
    if (hasPrecipitation(day.weatherCode)) return "🌧️";
    if (isClearOrPartlyCloudy(day.weatherCode)) return "☀️";
    return "☁️";
  };

  const min = Math.round(day.tempMin);
  const max = Math.round(day.tempMax);

  return `${getIcon()} ${min}–${max}°C`;
}