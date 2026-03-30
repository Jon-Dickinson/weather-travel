import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./types/schema";
import { resolvers } from "./resolvers/forecastResolver";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;

async function bootstrap() {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({ origin: process.env.CLIENT_ORIGIN ?? "*" }),
    express.json(),
    expressMiddleware(server)
  );

  // Lightweight health-check endpoint for infrastructure probes
  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.listen(PORT, () => {
    console.log(`GraphQL server online http://localhost:${PORT}/graphql`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
