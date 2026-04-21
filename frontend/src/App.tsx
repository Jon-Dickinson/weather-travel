import { useEffect } from "react";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import { ApolloProvider, useLazyQuery } from "@apollo/client";
import { apolloClient } from "./graphql/client";
import { SearchBar } from "./components/SearchBar";
import { ForecastView } from "./components/ForecastView";
import { FORECAST_RANKING_QUERY } from "./graphql/queries";
import { LocationForecast } from "./types";
import { theme } from "./theme";


/**
 * Main application logic and state management.
 * AppInner is separated to utilize hooks within the ApolloProvider context.
 */
function AppInner() {
  // useLazyQuery allows us to trigger the API call manually (on search) 
 
  const [runQuery, { data, loading, error }] = useLazyQuery<{ forecastRanking: LocationForecast }>(
    FORECAST_RANKING_QUERY,
    { fetchPolicy: "cache-first" } // Prioritize Apollo cache to reduce unnecessary network requests
  );

  useEffect(() => {
    if (data) {
      // LOG 4: Data as seen by the UI components
      // console.log("[Stage 4: Front End Received]", data.forecastRanking);
    }
  }, [data]);

  /**
   * Triggers the GraphQL query with the user-provided city string.
   */
  const search = (city: string) => {
    runQuery({ variables: { city } });
  };

  // Safe access to the nested forecast data, defaulting to null if not yet loaded.
  const forecast = data?.forecastRanking ?? null;

 
  const renderContent = () => {
    if (loading) {
      return (
        <LoadingState>
          <LoadingOrb />
          <p>Fetching forecast…</p>
        </LoadingState>
      );
    }

    if (forecast) {
      return <ForecastView forecast={forecast} />;
    }

    // Only show the landing/empty state if there isn't an active error.
    if (!error) {
      return (
        <EmptyState>
          <EmptyActivities>
            {['⛷️', '🏄', '🏛️', '🖼️'].map((emoji) => (
              <span key={emoji}>{emoji}</span>
            ))}
          </EmptyActivities>
          <p>Enter any city to see a 7-day activity forecast</p>
        </EmptyState>
      );
    }
    return null; 
  };

  return (
    <App_>
      <AppHeader>
        <HeaderInner>
          <Brand>
            <BrandMark>☈</BrandMark>
            <BrandName>TravelCast</BrandName>
          </Brand>
          <BrandTagline>data from open-meteo.com</BrandTagline>
        </HeaderInner>
      </AppHeader>

      <AppMain>
        <SearchSection>
          {/* SearchBar handles local input state and emits the value via onSearch */}
          <SearchBar onSearch={search} loading={loading} />
          
          {/* Conditional Error UI: Only renders if the Apollo query fails */}
          {error && (
            <ErrorBanner role="alert">
              <span>⚠</span> {error.message}
            </ErrorBanner>
          )}
        </SearchSection>

        {/* Search Results */}
        {renderContent()}
      </AppMain>
    </App_>
  );
}

/**
 * Entry point: Wraps the application in the necessary providers for 
 * Apollo (GraphQL) and Emotion/Global styles.
 */
export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Global styles={GlobalStyles} />
      <AppInner />
    </ApolloProvider>
  );
}

const GlobalStyles = `
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: ${theme.font.body};
    background: ${theme.colors.bg};
    color: ${theme.colors.ink};
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
`;

const App_ = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AppHeader = styled.header`
  background: ${theme.colors.ink};
  color: white;
  padding: 0;
`;

const HeaderInner = styled.div`
  max-width: ${theme.maxWidth};
  margin: 0 auto;
  padding: 28px 24px 24px;
  display: flex;
  align-items: baseline;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 20px 16px;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BrandMark = styled.span`
  font-size: 2rem;
  color: ${theme.colors.logo};
  line-height: 1;
`;

const BrandName = styled.span`
  font-family: ${theme.font.display};
  font-size: 1.75rem;
  letter-spacing: -0.02em;
  color: white;
`;

const BrandTagline = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 300;
  padding-bottom: 2px;
  margin: 0;
`;

const AppMain = styled.main`
  flex: 1;
  max-width: ${theme.maxWidth};
  width: 100%;
  margin: 0 auto;
  padding: 32px 24px 64px;
`;

const SearchSection = styled.div`
  margin-bottom: 32px;
`;

const ErrorBanner = styled.div`
  margin-top: 12px;
  background: #fdf0ee;
  border: 1px solid #f0c4bb;
  border-radius: ${theme.radius.sm};
  padding: 10px 14px;
  font-size: 0.875rem;
  color: ${theme.colors.accentHover};
  display: flex;
  align-items: center;
  gap: 8px;

  span:first-of-type {
    font-size: 1.1rem;
    flex-shrink: 0;
  }
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 48px 24px;

  p {
    color: ${theme.colors.inkMuted};
    font-size: 0.95rem;
  }
`;

const LoadingOrb = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${theme.colors.accent},
    ${theme.colors.accentHover}
  );
  opacity: 0.3;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.5;
    }
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 64px 24px;
  text-align: center;

  p {
    color: ${theme.colors.inkMuted};
    font-size: 1rem;

    @media (max-width: 600px) {
      font-size: 0.75rem;
    }

  }
`;

const EmptyActivities = styled.div`
  font-size: 3rem;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;

  span {
    animation: float 3s ease-in-out infinite;

    &:nth-of-type(1) {
      animation-delay: 0s;
    }
    &:nth-of-type(2) {
      animation-delay: 0.2s;
    }
    &:nth-of-type(3) {
      animation-delay: 0.4s;
    }
    &:nth-of-type(4) {
      animation-delay: 0.6s;
    }
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-12px);
    }
  }

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;