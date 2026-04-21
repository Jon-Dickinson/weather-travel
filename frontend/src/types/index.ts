// The App uses a String Union Type for the ActivityType
// provides strict compile-time safety across the app, 
// ensuring that we only ever process 
// recognized activities like 'SKIING' or 'SURFING'

export type ActivityType =
  | "SKIING"
  | "SURFING"
  | "OUTDOOR_SIGHTSEEING"
  | "INDOOR_SIGHTSEEING";

export interface LocationForecast {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  days: DayRanking[];
}

export interface DayRanking {
  date: string;
  activities: ActivityScore[];
  summary: string;
}

export interface ActivityScore {
  activity: ActivityType;
  score: number;
  label: string;
  reasoning: string;
}
 
// --- Component Props -------------------------------------------

// [1] SearchBar Props

export interface useForcastProps {
  onSearch: (city: string) => void;
  loading: boolean;
}

// [2] ForecastView Props

export interface ForcastProps {
  forecast: LocationForecast;
}

// [3] DayCard Props

export interface DayCardProps {
  day: DayRanking;
  index: number;
  isToday: boolean;
}

// [4] ActivityBar Props

export interface ActivityBarProps {
  activityScore: ActivityScore;
  rank: number;
}