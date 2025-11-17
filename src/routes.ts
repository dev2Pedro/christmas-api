import { FastifyInstance } from "fastify";
import { z, ZodError } from "zod";
import { PrismaClient } from "@prisma/client";
import { giftSchema } from "./validators/giftSchema"; // ✅ Importar o schema

const prisma = new PrismaClient();

export async function routes(app: FastifyInstance) {
  // STATUS
  app.get("/", () => {
    return "🎄 API do Natal funcionando!";
  });

  // -----------------------------
  // 📌 GIFTS
  // -----------------------------

  // LISTAR TODOS OS GIFTS
  app.get("/gifts", async () => {
    const gifts = await prisma.gift.findMany({
      orderBy: { createdAt: "desc" },
    });

    return gifts;
  });

  // CRIAR UM GIFT - ✅ USANDO O SCHEMA VALIDADO
  app.post("/gifts", async (req, reply) => {
    try {
      // ✅ Validação com mensagens de erro customizadas
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

  // ATUALIZAR STATUS DO GIFT
  app.put("/gifts/:id", async (req, reply) => {
    console.log("➡️ RECEBIDO NO PUT /gifts/:id");
    console.log("PARAMS:", req.params);
    console.log("BODY:", req.body);

    try {
      const paramsSchema = z.object({
        id: z.string().transform(Number),
      });

      const bodySchema = z.object({
        status: z.enum(["pendente", "em-contato", "confirmado", "entregue"]),
      });

      const { id } = paramsSchema.parse(req.params);
      const { status } = bodySchema.parse(req.body);

      console.log("ID PARSED:", id);
      console.log("STATUS PARSED:", status);

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

  // DELETAR UM GIFT
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

  // -----------------------------
  // 📌 ELDERS
  // -----------------------------

  // LISTAR TODOS OS ELDERS
  app.get("/elders", async () => {
    const elders = await prisma.elder.findMany({
      orderBy: { name: "asc" },
    });

    return elders;
  });

  // CRIAR UM ELDER - ✅ VALIDAÇÃO MELHORADA
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

  // DELETAR UM ELDER
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
