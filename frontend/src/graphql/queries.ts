import { gql } from "@apollo/client";

export const FORECAST_RANKING_QUERY = gql`
  query ForecastRanking($city: String!) {
    forecastRanking(city: $city) {
      city
      country
      latitude
      longitude
      days {
        date
        summary
        activities {
          activity
          score
          label
          reasoning
        }
      }
    }
  }
`;
