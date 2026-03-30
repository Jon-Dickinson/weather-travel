export type ActivityType =
  | "SKIING"
  | "SURFING"
  | "OUTDOOR_SIGHTSEEING"
  | "INDOOR_SIGHTSEEING";
 
export interface ActivityScore {
  activity: ActivityType;
  score: number;
  label: string;
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