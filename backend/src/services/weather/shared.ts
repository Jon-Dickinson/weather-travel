import NodeCache from "node-cache";
import Redis from "ioredis";

// Define a common interface for our cache implementation
interface CacheStore {
  get: (key: string) => Promise<any> | any;
  set: (key: string, value: any, ttl?: number) => Promise<any> | any;
}

// Factory function to select the store based on environment
function createCacheStore(): CacheStore {
  if (process.env.USE_REDIS === "true") {
    console.log("[Cache] Initializing Redis provider");
    const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
    return {
      get: async (key: string) => JSON.parse(await redis.get(key) || "null"),
      set: async (key: string, value: any, ttl?: number) => 
        await redis.set(key, JSON.stringify(value), "EX", ttl || 3600),
    };
  }

  console.log("[Cache] Initializing in-memory node-cache provider");
  const localCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
  return {
    get: (key: string) => localCache.get(key),
    set: (key: string, value: any, ttl?: number) => localCache.set(key, value, ttl || 3600),
  };
}

export const cache = createCacheStore();
export const GEOCODING_BASE = "https://geocoding-api.open-meteo.com/v1";
export const FORECAST_BASE = "https://api.open-meteo.com/v1";

export async function apiClient<T>(baseUrl: string, endpoint: string, params: Record<string, any>): Promise<T> {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${baseUrl}${endpoint}?${queryString}`);
  if (!res.ok) throw new Error(`API Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}