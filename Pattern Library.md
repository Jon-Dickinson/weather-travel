
### The Data Orchestrator (Backend)

forecastResolver.ts

```TypeScript
// The "Brain" of the operation: Geocode -> Fetch -> Score -> Return
export const resolvers = {
  Query: {
    forecastRanking: async (_, { city }) => {
      const location = await geocodeCity(city);
      const snapshots = await fetchDailyForecast(location.latitude, location.longitude);

      const days = snapshots.map((day) => ({
        date: day.date,
        activities: scoreDay(day), // Calls the Activity Scorers
        summary: summariseDay(day),
      }));

      return { ...location, days };
    },
  },
};
```

### The Scoring Engine (Business Logic)

activityScorers.ts

```TypeScript
// Pattern: createScorer(data, isIndoor, logic, fallback)
export const scoreSurfing = (day) =>
  createScorer(day, false, (add) => {
    // 1. Wind/Waves Logic
    if (day.windSpeed >= 15 && day.windSpeed <= 35) add(40, "ideal wind for waves");
    // 2. Temperature Logic
    if (day.tempMax >= 22) add(30, "warm air temperature");
    // 3. Safety Logic
    if (isThunderstorm(day.weatherCode)) add(-30, "thunderstorm risk");
  }, "marginal conditions");
```

### The UI Pattern: "Master-Detail"

Files: ForecastView.tsx → DayCard.tsx

How the 7-day list is generated and how "Today" is highlighted.

```TypeScript
// ForecastView: The List Manager
{forecast.days.map((day, i) => (
  <DayCard
    key={day.date}
    day={day}
    index={i}
    isToday={day.date === new Date().toISOString().split("T")[0]}
  />
))}

// DayCard: The Intelligent Summary
// Pulls the top-ranked activity (index 0) to show even when collapsed
const topActivity = day.activities?.[0];
<DayTopBadge color={scoreColor(topActivity.score)}>
  <span>{topActivity.score}</span>
  <DayTopActivity>{topActivity.activity}</DayTopActivity>
</DayTopBadge>
```

### The UI Pattern: "The Ranked Item"

File: ActivityBar.tsx

```TypeScript
export function ActivityBar({ activityScore, rank }) {
  const { activity, score, label, reasoning } = activityScore;
  const meta = ACTIVITY_META[activity]; // Gets Icon/Label
  
  return (
    <ActivityRow style={{ "--animation-delay": `${rank * 60}ms` }}>
      <ActivityIcon>{meta.icon}</ActivityIcon>
      <ActivityInfo>
        <ActivityName>{meta.label}</ActivityName>
        <ActivityReasoning>{reasoning}</ActivityReasoning>
      </ActivityInfo>
      <ActivityScoreBlock color={scoreColor(score)} bg={scoreBg(score)}>
        <ActivityScoreNumber>{score}</ActivityScoreNumber>
        <ActivityScoreLabel>{label}</ActivityScoreLabel>
      </ActivityScoreBlock>
    </ActivityRow>
  );
}
```

### The Design Tokens (Utility)

File: scoringUtils.ts

change the "Excellent/Good/Poor" thresholds.

```TypeScript
const STANDARD_SCALE = [
  { min: 80, label: "Excellent" },
  { min: 60, label: "Good" },
  { min: 40, label: "Fair" },
  { min: 0,  label: "Poor" },
];

export const clamp = (value) => Math.max(0, Math.min(100, Math.round(value)));
```

###

```TypeScript
// Pattern: Portal [Modal]
import { createPortal } from "react-dom";

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  // Uses createPortal to render outside the main DOM hierarchy (avoids z-index issues)
  return createPortal(
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </ModalContent>
    </Overlay>,
    document.body
  );
}

import { useState } from "react";

const [isModalOpen, setIsModalOpen] = useState(false);

<button onClick={() => setIsModalOpen(true)} style={{ marginLeft: 'auto' }}>
  About TravelCast
</button>

<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <h3>Welcome to TravelCast</h3>
  <p>We help you find the best activities based on real-time weather data.</p>
</Modal>

```

###

```TypeScript
// Pattern: Compound Action Button
export function AsyncButton({ onClick, children }) {
  const [status, setStatus] = useState("idle"); // idle | loading | success

  const handleClick = async () => {
    setStatus("loading");
    try {
      await onClick();
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000); // Reset after delay
    } catch {
      setStatus("idle");
    }
  };

  return (
    <Button onClick={handleClick} disabled={status === "loading"}>
      {status === "loading" ? <Spinner /> : children}
      {status === "success" && <SuccessCheck />}
    </Button>
  );
}
```

###

```TypeScript

```

###

```TypeScript

```

###

```TypeScript

```

###

```TypeScript

```