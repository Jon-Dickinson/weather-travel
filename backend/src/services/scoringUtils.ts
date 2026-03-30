/**
 * Shared scoring utilities and helper functions
 */

/** Clamp a value to [0, 100]. */
export const clamp = (value: number): number => 
  Math.max(0, Math.min(100, Math.round(value)));

type ScoreThreshold = { min: number; label: string };

/**
 * Generic function to find a label based on descending thresholds.
 * Using this prevents logic duplication for different types of scores.
 */
function getLabelFromScale(score: number, scale: ScoreThreshold[]): string {
  const match = scale.find((threshold) => score >= threshold.min);
  // We cast here because we know our scales cover the full 0-100 range
  return match?.label ?? scale[scale.length - 1].label;
}

const STANDARD_SCALE: ScoreThreshold[] = [
  { min: 80, label: "Excellent" },
  { min: 60, label: "Good" },
  { min: 40, label: "Fair" },
  { min: 0,  label: "Poor" },
] as const;

const INDOOR_SCALE: ScoreThreshold[] = [
  { min: 70, label: "Highly recommended" },
  { min: 50, label: "Good choice" },
  { min: 30, label: "Worth a visit" },
  { min: 0,  label: "Always viable" },
] as const;

/** Map a score to a label. */
export const scoreLabel = (score: number): string => 
  getLabelFromScale(score, STANDARD_SCALE);

/** Label scale for indoor sightseeing */
export const indoorScoreLabel = (score: number): string => 
  getLabelFromScale(score, INDOOR_SCALE);