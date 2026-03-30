import { ActivityType } from "../types";
import { theme } from "../theme";

export const ACTIVITY_META: Record<
  ActivityType,
  { label: string; icon: string; description: string }
> = {
  SKIING: {
    label: "Skiing",
    icon: "⛷️",
    description: "Alpine & cross-country conditions",
  },
  SURFING: {
    label: "Surfing",
    icon: "🏄",
    description: "Wave & wind quality",
  },
  OUTDOOR_SIGHTSEEING: {
    label: "Outdoor Sightseeing",
    icon: "🏛️",
    description: "Parks, landmarks & walking tours",
  },
  INDOOR_SIGHTSEEING: {
    label: "Indoor Sightseeing",
    icon: "🖼️",
    description: "Museums, galleries & cultural sites",
  },
};

export function formatDate(dateStr: string): { weekday: string; date: string } {
  const travelDay = new Date(dateStr + "T12:00:00"); // noon avoids TZ off-by-one
  return {
    weekday: travelDay.toLocaleDateString("en-GB", { weekday: "short" }),
    date: travelDay.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
  };
}

export function scoreColor(score: number): string {
  if (score >= 80) return theme.colors.scoreExcellent;
  if (score >= 60) return theme.colors.scoreGood;
  if (score >= 40) return theme.colors.scoreFair;
  return theme.colors.scorePoor;
}

export function scoreBg(score: number): string {
  if (score >= 80) return theme.colors.scoreExcellentBg;
  if (score >= 60) return theme.colors.scoreGoodBg;
  if (score >= 40) return theme.colors.scoreFairBg;
  return theme.colors.scorePoorBg;
}
