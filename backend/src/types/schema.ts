// GraphQL Schema
// Defines the response format

export const typeDefs = `#graphql
  enum ActivityType {
    SKIING
    SURFING
    OUTDOOR_SIGHTSEEING
    INDOOR_SIGHTSEEING
  }

  type LocationForecast {
    city: String!
    country: String!
    latitude: Float!
    longitude: Float!
    days: [DayRanking!]!
  }

  type DayRanking {
    date: String!
    activities: [ActivityScore!]!
    summary: String!
  }

  type ActivityScore {
    activity: ActivityType!
    score: Int!        # 0-100
    label: String!     # Excellent | Good | Fair | Poor
    reasoning: String!
  }

  type Query {
    forecastRanking(city: String!): LocationForecast!
  }
`;