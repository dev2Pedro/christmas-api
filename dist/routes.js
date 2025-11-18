"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const giftSchema_1 = require("./validators/giftSchema");
const prisma = new client_1.PrismaClient();
async function routes(app) {
    app.get("/", () => {
        return "🎄 API do Natal funcionando!";
    });
    app.get("/gifts", async () => {
        const gifts = await prisma.gift.findMany({
            orderBy: { createdAt: "desc" },
        });
        return gifts;
    });
    app.post("/gifts", async (req, reply) => {
        try {
            const data = giftSchema_1.giftSchema.parse(req.body);
            const gift = await prisma.gift.create({ data });
            return reply.status(201).send(gift);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({
                    message: "Dados inválidos",
                    errors: error.issues.map((err) => ({
                        field: err.path.join("."),
                        message: err.message,
                    })),
                });
            }
            return reply.status(500).send({
                message: "Erro ao criar gift",
                error,
            });
        }
    });
    app.put("/gifts/:id", async (req, reply) => {
        try {
            const paramsSchema = zod_1.z.object({
                id: zod_1.z.string().transform(Number),
            });
            const bodySchema = zod_1.z.object({
                status: zod_1.z.enum(["pendente", "em-contato", "confirmado", "entregue"]),
            });
            const { id } = paramsSchema.parse(req.params);
            const { status } = bodySchema.parse(req.body);
            const updated = await prisma.gift.update({
                where: { id },
                data: { status },
            });
            return reply.send(updated);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({
                    message: "Dados inválidos",
                    errors: error.issues,
                });
            }
            console.error("❌ ERRO NO PUT /gifts/:id:", error);
            return reply.status(500).send({
                message: "Erro ao atualizar",
                error,
            });
        }
    });
    app.delete("/gifts/:id", async (req, reply) => {
        try {
            const paramsSchema = zod_1.z.object({
                id: zod_1.z.string().transform(Number),
            });
            const { id } = paramsSchema.parse(req.params);
            await prisma.gift.delete({
                where: { id },
            });
            return reply.status(204).send();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({
                    message: "ID inválido",
                    errors: error.issues,
                });
            }
            return reply.status(500).send({
                message: "Erro ao deletar gift",
                error,
            });
        }
    });
    app.get("/elders", async () => {
        const elders = await prisma.elder.findMany({
            orderBy: { name: "asc" },
        });
        return elders;
    });
    app.post("/elders", async (req, reply) => {
        try {
            const schema = zod_1.z.object({
                name: zod_1.z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
            });
            const { name } = schema.parse(req.body);
            const elder = await prisma.elder.create({
                data: { name },
            });
            return reply.status(201).send(elder);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({
                    message: "Dados inválidos",
                    errors: error.issues,
                });
            }
            return reply.status(500).send({
                message: "Erro ao criar idoso",
                error,
            });
        }
    });
    app.put("/elders/:id", async (req, reply) => {
        try {
            const paramsSchema = zod_1.z.object({
                id: zod_1.z.string().transform(Number),
            });
            const bodySchema = zod_1.z.object({
                adopted: zod_1.z.boolean(),
            });
            const { id } = paramsSchema.parse(req.params);
            const { adopted } = bodySchema.parse(req.body);
            const updated = await prisma.elder.update({
                where: { id },
                data: { adopted },
            });
            return reply.send(updated);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({
                    message: "Dados inválidos",
                    errors: error.issues,
                });
            }
            console.error("❌ ERRO NO PUT /elders/:id:", error);
            return reply.status(500).send({
                message: "Erro ao atualizar idoso",
                error,
            });
        }
    });
    app.delete("/elders/:id", async (req, reply) => {
        try {
            const paramsSchema = zod_1.z.object({
                id: zod_1.z.string().transform((v) => Number(v)),
            });
            const { id } = paramsSchema.parse(req.params);
            await prisma.elder.delete({
                where: { id },
            });
            return reply.status(204).send();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply.status(400).send({
                    message: "ID inválido",
                    errors: error.issues,
                });
            }
            return reply.status(500).send({
                message: "Erro ao deletar idoso",
                error,
            });
        }
    });
    app.post("/admin/login", async (req, reply) => {
        const schema = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(1),
        });
        try {
            const { email, password } = schema.parse(req.body);
            if (email !== process.env.ADMIN_EMAIL ||
                password !== process.env.ADMIN_PASSWORD) {
                return reply.status(401).send({
                    message: "Credenciais inválidas",
                });
            }
            reply.setCookie("admin_authenticated", "true", {
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 30,
            });
            return reply.send({ message: "Login realizado com sucesso" });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return reply.status(400).send({
                    message: "Erro nos dados enviados",
                    errors: error.issues,
                });
            }
            return reply.status(500).send({
                message: "Erro no servidor",
                error,
            });
        }
    });
}
