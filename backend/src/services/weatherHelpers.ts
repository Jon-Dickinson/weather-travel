/**
 * WMO Weather Code categories
 * https://open-meteo.com/en/docs
 */

// the possible categories as a type
export type WeatherCategory = 
  | 'clear' 
  | 'overcast' 
  | 'precipitation' 
  | 'snow' 
  | 'thunderstorm';

// typed mapping of codes to categories
const WMO_MAP: Record<number, WeatherCategory> = {
  0: 'clear', 1: 'clear', 2: 'clear',
  3: 'overcast',
  45: 'overcast', 48: 'overcast', // Fog
  51: 'precipitation', 53: 'precipitation', 55: 'precipitation',
  61: 'precipitation', 63: 'precipitation', 65: 'precipitation',
  71: 'snow', 73: 'snow', 75: 'snow',
  77: 'snow', 80: 'precipitation', 81: 'precipitation',
  82: 'precipitation', 85: 'snow', 86: 'snow',
  95: 'thunderstorm', 96: 'thunderstorm', 99: 'thunderstorm',
};

// Helpers
export const isClearOrPartlyCloudy = (code: number): boolean => 
  WMO_MAP[code] === 'clear';

export const isOvercast = (code: number): boolean => 
  WMO_MAP[code] === 'overcast';

export const isThunderstorm = (code: number): boolean => 
  WMO_MAP[code] === 'thunderstorm';

/**
 * Checks for any form of falling water or ice.
 */
export const hasPrecipitation = (code: number): boolean => {
  const cat = WMO_MAP[code];
  return cat === 'precipitation' || cat === 'snow' || cat === 'thunderstorm';
};

export const isHeavySnow = (code: number): boolean => 
  code === 75 || code === 86;