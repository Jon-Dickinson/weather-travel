import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { FORECAST_RANKING_QUERY } from "../graphql/queries";
import { LocationForecast } from "../types";

// I keep the Interface inside the Hook Component to remain self contained

interface QueryResult {
  forecastRanking: LocationForecast;
}

export function useForecast() {
  const [city, setCity] = useState<string | null>(null);

  const [runQuery, { data, loading, error }] = useLazyQuery<QueryResult>(

    FORECAST_RANKING_QUERY,
    {
      fetchPolicy: "cache-first", // re-use cached results within a session
    }
  );

  function search(newCity: string) {
    setCity(newCity);
    runQuery({ variables: { city: newCity } });
  }

  return {
    city,
    forecast: data?.forecastRanking ?? null,
    loading,
    error: error?.message ?? null,
    search,
  };
}
