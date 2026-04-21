import { useState } from "react";
import styled from "@emotion/styled";
import { DayCardProps } from "../types";
import { ActivityBar } from "./ActivityBar";
import { formatDate, scoreBg, scoreColor } from "../utils/activityMeta";
import { theme } from "../theme";

// [3] The Organizer

export function DayCard({ day, index, isToday }: DayCardProps) {
  const [expanded, setExpanded] = useState(index === 0);
  const { weekday, date } = formatDate(day.date);
  const topActivity = day.activities?.[0];
  const topColor = topActivity ? scoreColor(topActivity.score) : theme.colors.border;
  const topBg    = topActivity ? scoreBg(topActivity.score)    : theme.colors.border;

  return (
    <DayCardContainer
      isExpanded={expanded}
      isToday={isToday}
      style={{ "--animation-delay": `${index * 80}ms` } as React.CSSProperties}
    >
      <DayCardHeader
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <DayHeaderLeft>
          <DayLabel>
            <DayWeekday>{isToday ? "Today" : weekday}</DayWeekday>
            <DayDate>{date}</DayDate>
          </DayLabel>
          {!expanded && (
            <DayTopBadge color={topColor} bg={topBg}>
              <span>{topActivity ? `${topActivity.score}` : "—"}</span>
              <DayTopActivity>
                {topActivity?.activity.replace(/_/g, " ").toLowerCase()}
              </DayTopActivity>
            </DayTopBadge>
          )}
        </DayHeaderLeft>
        <DayHeaderRight>
          <DaySummaryPreview title={day.summary}>
            {day.summary}
          </DaySummaryPreview>
          <DayChevron>{expanded ? "▲" : "▼"}</DayChevron>
        </DayHeaderRight>
      </DayCardHeader>

      {/* Child -> ActivityBar */}

      {expanded && (
        <DayCardBody>
          <ActivitiesList>
            {day.activities.map((a, i) => (
              <ActivityBar key={a.activity} activityScore={a} rank={i} />
            ))}
          </ActivitiesList>
        </DayCardBody>
      )}
    </DayCardContainer>
  );
}

const DayCardContainer = styled.div<{ isExpanded: boolean; isToday: boolean }>`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  overflow: hidden;
  transition: box-shadow ${theme.transition}, border-color ${theme.transition};
  animation: slideUp 0.4s ease var(--animation-delay, 0ms);

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${(props) =>
    props.isToday &&
    `
    border-color: ${theme.colors.accent};
  `};

  ${(props) =>
    props.isExpanded &&
    `
    border-color: ${theme.colors.active};
  `};
`;

const DayCardHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: none;
  padding: 14px 16px;
  cursor: pointer;
  font-family: ${theme.font.body};
  transition: background ${theme.transition};

  &:hover {
    background: ${theme.colors.surfaceRaised};
  }
`;

const DayHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 2;
  text-align: left;
`;

const DayLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 40px;
`;

const DayWeekday = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${theme.colors.ink};
`;

const DayDate = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.inkMuted};
`;

const DayTopBadge = styled.div<{ color: string; bg: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: ${p => p.bg};
  padding: 4px 10px;
  border-radius: ${theme.radius.sm};
  transition: all 0.2s ease-in-out;
  min-width: 200px;

  /* The Score Number */
  & > span:first-of-type {
    font-weight: 700;
    color: ${p => p.color};
    font-size: 0.85rem;
  }
`;

const DayTopActivity = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  opacity: 0.9;
`;

const DayHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 3;
  flex-shrink: 0;
  justify-content: flex-end;
`;

const DaySummaryPreview = styled.span`
  font-size: 0.85rem;
  color: ${theme.colors.inkMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  text-align: right;
`;

const DayChevron = styled.span`
  color: ${theme.colors.inkFaint};
  font-size: 0.8rem;
  transition: transform ${theme.transition};
`;

const DayCardBody = styled.div`
  background: ${theme.colors.surfaceRaised};
  border-top: 1px solid ${theme.colors.border};
  padding: 12px 16px;
`;

const ActivitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;