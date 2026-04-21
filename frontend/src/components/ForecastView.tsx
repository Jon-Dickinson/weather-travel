import styled from "@emotion/styled";
import { ForcastProps } from "../types";
import { DayCard } from "./DayCard";
import { theme } from "../theme";

// [2] The Container

export function ForecastView({ forecast }: ForcastProps) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <ForecastViewContainer>
      <ForecastHeader>
        <ForecastCity>
          {forecast.city}
          <ForecastCountry>{forecast.country}</ForecastCountry>
        </ForecastCity>
        <ForecastSubtitle>7-day activity ranking</ForecastSubtitle>
      </ForecastHeader>

      {/* Child -> DayCard */}

      <DaysList>
        {forecast.days.map((day, i) => (
          <DayCard
            key={day.date}
            day={day}
            index={i}
            isToday={day.date === today}
          />
        ))}
      </DaysList> 
    </ForecastViewContainer>
  );
}

const ForecastViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  background-color: #ffffff;
`;

const ForecastHeader = styled.div`
  margin-bottom: 24px;
`;

const ForecastCity = styled.h2`
  font-family: ${theme.font.display};
  font-size: 2rem;
  letter-spacing: -0.02em;
  margin: 0 0 8px 0;
  color: ${theme.colors.ink};
`;

const ForecastCountry = styled.span`
  font-size: 0.65em;
  color: ${theme.colors.inkMuted};
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-left: 8px;
`;

const ForecastSubtitle = styled.p`
  font-size: 0.85rem;
  color: ${theme.colors.inkMuted};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0;
  font-weight: 500;
`;

const DaysList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;