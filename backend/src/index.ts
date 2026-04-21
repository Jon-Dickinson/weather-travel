// import dotenv from 'dotenv';

import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./types/schema";
import { resolvers } from "./resolvers/forecastResolver";

// NOTE: .env file support is configured below but not currently in use.
// Future: Uncomment dotenv.config() and add .env file for environment-specific config.
// dotenv.config();

/**
 * Configuration with sensible defaults.
 * In production, these should be provided via environment variables or .env file.
 */
const config = {
  PORT: parseInt(process.env.PORT || "4000", 10),
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "*",
};

async function bootstrap() {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({ origin: config.CLIENT_ORIGIN }),
    express.json(),
    expressMiddleware(server)
  );

  // Lightweight health-check endpoint for infrastructure probes
  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.listen(config.PORT, () => {
    console.log(`GraphQL server online http://localhost:${config.PORT}/graphql`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
