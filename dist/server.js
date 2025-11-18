"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const swagger_1 = require("@fastify/swagger");
const swagger_ui_1 = require("@fastify/swagger-ui");
const routes_1 = require("./routes"); // suas rotas
// Criação do servidor
const app = (0, fastify_1.default)();
// Configuração do Zod
app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
// CORS
app.register(cors_1.default, {
    origin: ["http://localhost:3000"], // pode adicionar outros domínios se precisar
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});
// Swagger
app.register(swagger_1.fastifySwagger, {
    openapi: {
        info: {
            title: "Typed API",
            version: "1.0.0",
        },
    },
});
app.register(swagger_ui_1.fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
        docExpansion: "full",
        deepLinking: false,
    },
});
// Cookie
app.register(cookie_1.default, {
    secret: "super-secret-password", // altere para uma variável de ambiente
    parseOptions: {},
});
// Rotas
app.register(routes_1.routes);
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
