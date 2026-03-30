import { ActivityScore, DailyWeatherSnapshot } from "../types/domain";
import {
  isClearOrPartlyCloudy,
  isOvercast,
  isThunderstorm,
  hasPrecipitation,
  isHeavySnow,
} from "./weatherHelpers";
import { clamp, scoreLabel, indoorScoreLabel } from "./scoringUtils";

/**
 * A helper to reduce boilerplate in each scorer.
 * It handles the reason-gathering, clamping, and label selection.
 */
function createScorer(
  day: DailyWeatherSnapshot,
  isIndoor: boolean,
  logic: (add: (points: number, reason?: string) => void) => void,
  fallbackReason: string
): Omit<ActivityScore, "activity"> {
  let score = 0;
  const reasons: string[] = [];

  const add = (points: number, reason?: string) => {
    score += points;
    if (reason) reasons.push(reason);
  };

  logic(add);

  const finalScore = clamp(score);
  return {
    score: finalScore,
    label: isIndoor ? indoorScoreLabel(finalScore) : scoreLabel(finalScore),
    reasoning: reasons.length ? reasons.join(", ") : fallbackReason,
  };
}

export const scoreSkiing = (day: DailyWeatherSnapshot) => 
  createScorer(day, false, (add) => {

    // Snowfall
    if (day.snowfall > 20) add(50, "heavy snowfall");
    else if (day.snowfall > 10) add(35, "good snowfall");
    else if (day.snowfall > 2) add(20, "light snowfall");

    // Temp
    if (day.tempMax < -5) add(25, "very cold");
    else if (day.tempMax < 0) add(20, "cold temperatures");
    else if (day.tempMax < 5) add(10, "near-freezing");
    else if (day.tempMax > 10) add(-15, "too warm for snow");

    // Sky
    if (isClearOrPartlyCloudy(day.weatherCode)) add(25, "clear skies");
    else if (isOvercast(day.weatherCode)) add(10, "overcast");
    else if (isThunderstorm(day.weatherCode)) add(-20, "thunderstorm risk");

    // Safety
    if (day.windGusts > 80) add(-20, "dangerous gusts");
    else if (day.windGusts > 50) add(-10, "strong gusts");
  }, "marginal conditions");

export const scoreSurfing = (day: DailyWeatherSnapshot) =>
  createScorer(day, false, (add) => {

    // Wind/Waves
    if (day.windSpeed >= 15 && day.windSpeed <= 35) add(40, "ideal wind for waves");
    else if (day.windSpeed >= 10 && day.windSpeed < 15) add(25, "light swell-building wind");
    else if (day.windSpeed > 55) add(-10, "dangerously strong wind");

    // Air Temp
    if (day.tempMax >= 22 && day.tempMax <= 32) add(30, "warm air temperature");
    else if (day.tempMax >= 10) add(10, "cool temperature");

    // Sky & Rain
    if (isClearOrPartlyCloudy(day.weatherCode)) add(20, "clear skies");
    if (day.precipitation > 10) add(-15, "heavy rain");
    if (isThunderstorm(day.weatherCode)) add(-30, "thunderstorm risk");
  }, "marginal conditions");

export const scoreOutdoorSightseeing = (day: DailyWeatherSnapshot) =>
  createScorer(day, false, (add) => {
    const sunshineHours = day.sunshineDuration / 3600;
    if (sunshineHours >= 8) add(40, "abundant sunshine");
    else if (sunshineHours >= 5) add(30, "good sunshine");

    if (day.tempMax >= 18 && day.tempMax <= 28) add(30, "perfect temperature");
    
    if (day.precipitation === 0) add(20, "no rain");
    else if (day.precipitationHours > 6) add(-25, "prolonged rain");

    if (isThunderstorm(day.weatherCode)) add(-30, "thunderstorm risk");
    if (day.windSpeed > 55) add(-28, "dangerously windy");
  }, "marginal conditions");

export const scoreIndoorSightseeing = (day: DailyWeatherSnapshot) =>
  createScorer(day, true, (add) => {
    add(20); // Base baseline

    if (hasPrecipitation(day.weatherCode)) add(35, "rainy weather");
    if (day.tempMax > 35 || day.tempMin < -10) add(20, "extreme outside temperature");
    
    // Hazards
    if (isThunderstorm(day.weatherCode)) add(-20, "thunderstorm makes travel risky");
    if (day.windGusts > 80) add(-15, "dangerous gusts");
  }, "pleasant day, still worth exploring indoors");
  