import styled from "@emotion/styled";
import { ActivityScore } from "../types";
import { ACTIVITY_META, scoreColor, scoreBg } from "../utils/activityMeta";
import { theme } from "../theme";

const ActivityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  animation: slideIn 0.3s ease var(--animation-delay, 0ms);

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-8px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const ActivityRank = styled.div`
  font-weight: 700;
  font-size: 0.8rem;
  color: ${theme.colors.inkMuted};
  min-width: 18px;
  text-align: center;
`;

const ActivityIcon = styled.div`
  font-size: 1.4rem;
  flex-shrink: 0;
`;

const ActivityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

const ActivityName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${theme.colors.ink};
`;

const ActivityReasoning = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.inkMuted};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 660px) {
    display: none;
  }

`;

const ActivityScoreBlock = styled.div<{ color: string; bg: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 12px;
  border-radius: 4px;
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  flex-shrink: 0;
  min-width: 120px;
  border: 1px solid #afafaf;

  @media (max-width: 600px) {
    min-width: 38px;
    max-width: 38px;
    min-height: 38px;
    max-height: 38px;
    width: 38px
    height: 38px;
    border-radius: 50%;
  }
`;

const ActivityScoreNumber = styled.span`
  font-weight: 700;
  font-size: 1rem;
`;

const ActivityScoreLabel = styled.span`
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-weight: 600;

  @media (max-width: 600px) {
   display: none;
  }
`;

const ActivityBarTrack = styled.div`
  width: 20px;
  height: 4px;
  background: ${theme.colors.border};
  border-radius: 2px;
  overflow: hidden;
  flex-shrink: 0;
`;

const ActivityBarFill = styled.div<{ width: number; color: string }>`
  width: 80px;
  height: 100%;
  background: ${(props) => props.color};
  transition: width 0.4s ease;
`;

interface Props {
  activityScore: ActivityScore;
  rank: number;
}

export function ActivityBar({ activityScore, rank }: Props) {
  const { activity, score, label, reasoning } = activityScore;
  const meta = ACTIVITY_META[activity];
  const color = scoreColor(score);
  const bg = scoreBg(score);

  return (
    <ActivityRow
      style={{ "--animation-delay": `${rank * 60}ms` } as React.CSSProperties}
    >
      <ActivityRank>{rank + 1}</ActivityRank>
      <ActivityIcon>{meta.icon}</ActivityIcon>
      <ActivityInfo>
        <ActivityName>{meta.label}</ActivityName>
        <ActivityReasoning>{reasoning}</ActivityReasoning>
      </ActivityInfo>
      <ActivityScoreBlock color={color} bg={bg}>
        <ActivityScoreNumber>{score}</ActivityScoreNumber>
        <ActivityScoreLabel>{label}</ActivityScoreLabel>
      </ActivityScoreBlock>
      <ActivityBarTrack>
        <ActivityBarFill width={score} color={color} />
      </ActivityBarTrack>
    </ActivityRow>
  );
}
