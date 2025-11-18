import Fastify from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { routes } from "./routes";

const app = Fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Typed API",
      version: "1.0.0",
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
});

app.register(cookie, {
  secret: "super-secret-password",
  parseOptions: {},
});

app.register(routes);

const port = Number(process.env.PORT) || 3333;

app
  .listen({ port, host: "0.0.0.0" })
  .then(() => {
    console.log(`Server is running on port ${port}`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
