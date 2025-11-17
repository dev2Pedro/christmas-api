import { FastifyInstance } from "fastify";
import { z, ZodError } from "zod";
import { PrismaClient } from "@prisma/client";
import { giftSchema } from "./validators/giftSchema";

const prisma = new PrismaClient();

export async function routes(app: FastifyInstance) {
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
      const data = giftSchema.parse(req.body);

      const gift = await prisma.gift.create({ data });

      return reply.status(201).send(gift);
    } catch (error) {
      if (error instanceof z.ZodError) {
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
      const paramsSchema = z.object({
        id: z.string().transform(Number),
      });

      const bodySchema = z.object({
        status: z.enum(["pendente", "em-contato", "confirmado", "entregue"]),
      });

      const { id } = paramsSchema.parse(req.params);
      const { status } = bodySchema.parse(req.body);

      const updated = await prisma.gift.update({
        where: { id },
        data: { status },
      });

      console.log("UPDATE OK:", updated);
      return reply.send(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
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
      const paramsSchema = z.object({
        id: z.string().transform(Number),
      });

      const { id } = paramsSchema.parse(req.params);

      await prisma.gift.delete({
        where: { id },
      });

      return reply.status(204).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
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
      const schema = z.object({
        name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
      });

      const { name } = schema.parse(req.body);

      const elder = await prisma.elder.create({
        data: { name },
      });

      return reply.status(201).send(elder);
    } catch (error) {
      if (error instanceof z.ZodError) {
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
      const paramsSchema = z.object({
        id: z.string().transform(Number),
      });

      const bodySchema = z.object({
        adopted: z.boolean(),
      });

      const { id } = paramsSchema.parse(req.params);
      const { adopted } = bodySchema.parse(req.body);

      const updated = await prisma.elder.update({
        where: { id },
        data: { adopted },
      });

      return reply.send(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
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
      const paramsSchema = z.object({
        id: z.string().transform((v) => Number(v)),
      });

      const { id } = paramsSchema.parse(req.params);

      await prisma.elder.delete({
        where: { id },
      });

      return reply.status(204).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
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
}
