import Fastify from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { routes } from "./routes"; // suas rotas

// Criação do servidor
const app = Fastify();

// Configuração do Zod
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// CORS
app.register(cors, {
  origin: ["http://localhost:3000"], // pode adicionar outros domínios se precisar
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

// Swagger
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

// Cookie
app.register(cookie, {
  secret: "super-secret-password", // altere para uma variável de ambiente
  parseOptions: {},
});

// Rotas
app.register(routes);

// Porta dinâmica para Render
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
