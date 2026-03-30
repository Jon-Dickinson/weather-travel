# ☈ TravelCast

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)
[![Apollo Client](https://img.shields.io/badge/-Apollo%20Client-311C87?style=for-the-badge&logo=apollographql&logoColor=white)](https://www.apollographql.com/docs/react/)
[![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](https://styled-components.com/)

**☈ TravelCast**  transforms raw meteorological data into meaningful travel information.

---

#### Follow these steps to get the monorepo running locally:
```
From the Root Folder ./

# 1. Install dependencies for both Frontend and Backend

npm run install

# 2. Start the development servers (Vite + Express)

npm run dev
```
Once the servers are running, you can access the project at the following links:

Frontend UI: http://localhost:3000/

GraphQL: http://localhost:4000/graphql

## Key Architectural Features

* **GraphQL:** data fetching layer that aggregates Geocoding &amp; Open-Meteo REST APIs into a single request.
* **Heuristic Scoring Engine:** A deterministic business-logic layer that evaluates 10+ weather variables to generate activity-specific recommendations.
* **Isomorphic TypeScript Monorepo:** Shared domain models &amp; utility types ensure strict contract consistency between the Node.js backend &amp; the Vite frontend.
* **Performance-First UI:** Leveraging Apollo Client's normalized cache for instantaneous day-to-day navigation and zero-flicker state transitions.

## Key Architectural Decisions

### *Vite proxy:*

```
travelcast/
  backend/ ← runs on  :4000
    src/index.ts ← Apollo + Express entry
    package.json
    tsconfig.json
  frontend/ ← runs on :3000
    src/
    index.html
    vite.config.js ← proxy /graphql → :4000
    package.json
  package.json ← root orchestrator
```
vite.config.js forwards /graphql to localhost:4000 and the Apollo Client in React points at /graphql (same origin).

- No CORS headers needed on the frontend
- No hardcoded localhost:4000 URLs in the React components.

### *GraphQL over REST:*

In a traditional REST architecture, the Open-Meteo API returns a massive payload containing dozens of weather variables. By using GraphQL as an orchestration layer, the frontend defines a fragment for exactly what the scoring engine needs (e.g., windSpeed, uvIndex). This reduces the payload size and prevents 'over-fetching' data that never reaches the UI.

## Core Requirements Met
```
Accept a city / town input
7-day weather forecast
Rank skiing
Rank surfing
Rank outdoor sightseeing
Rank indoor sightseeing
Use Open-Meteo API

React frontend
Node.js backend
GraphQL API layer
TypeScript throughout

Separation of concerns
Extensibility
Clean data model
Frontend + Backend both present
Clear reasoning / trade-off communication
```

## What I used AI (Copilot) for

### Meteorological Data Mapping

The scoring engine evaluates six distinct categories of weather data to determine activity suitability:

| Category | Variable | Unit | Impact |
| :--- | :--- | :---: | :--- |
| **Thermal** | `tempMax`, `tempMin` | °C | Establishes core safety and comfort thresholds. |
| **Hydrology** | `precipitation`, `snowfall` | mm/cm | Primary driver for Skiing (Snow) vs. Sightseeing (Rain). |
| **Wind** | `windSpeed`, `windGusts` | km/h | Wave generation for Surfing; safety for Skiing/Travel. |
| **Sky State** | `weatherCode` (WMO) | Code | Determines UI icons and environmental "Vibe." |
| **Time/Light** | `sunshineDuration` | Sec | Critical for Outdoor Sightseeing quality and visibility. |
| **Safety** | `uvIndexMax` | Index | Applied as a negative weight for long-exposure activities. |

### The Business Logic Equations

The "Backend Process" follows a Heuristic Scoring Model. 
It doesn't use one single math equation, but rather a Compounding Weighted Sum.

### A. The "Skiing" Logic (Threshold-Heavy)

Primary Multiplier: Snowfall. $>20\text{mm}$ provides a massive $+50$ point boost (50% of total possible score). The "Goldilocks" Temperature: Scores are highest when $T < 0°C$. If $T > 10°C$, a penalty of $-15$ is applied because the "Business Rule" assumes snow quality will degrade (slush). Safety Cut-off: Wind gusts $>80\text{km/h}$ trigger a $-20$ penalty, simulating lift closures.

### B. The "Surfing" Logic (Range-Validation)

Wind-Wave Relationship: Unlike other activities, Surfing looks for a mid-range wind ($15–35\text{km/h}$) to create swell. Too low ($<10$) or too high ($>55$) reduces the score. Thermal Comfort: Air temperature is a "Bonus" ($+30$ for warm weather), but not a requirement, reflecting that surfers wear wetsuits.

### C. The "Sightseeing" Logic (Inverse Relationship)

The Indoor score is designed to be the Inverse of the Outdoor score: The "Motivation" Rule: If hasPrecipitation is true, Indoor Sightseeing gets $+35$. The logic assumes users want to be inside specifically because they can't be outside. The "Travel Safety" Exception: Even though rain makes you want to go to a museum, a Thunderstorm or Heavy Snow applies a penalty ($-20$) because the backend assumes the user cannot safely travel to the venue.





## Key Application Features

**Smart Caching:** To prevent the API from hitting rate limits during testing and to make the UI feel "instant." I built a custom cache that stores weather results in memory. It rounds coordinates to keep searches consistent and automatically clears itself at midnight so the data stays fresh for the new day.

**Mobile Responsive:** The UI responds to a device width of 660px and lower.