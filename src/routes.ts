import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

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

  // CRIAR UM GIFT
  app.post("/gifts", async (req, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      message: z.string().optional(),
      elderName: z.string(),
    });

    const data = bodySchema.parse(req.body);
    const gift = await prisma.gift.create({ data });

    return reply.status(201).send(gift);
  });

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
    } catch (err) {
      console.error("❌ ERRO NO PUT /gifts/:id:", err);
      return reply.status(500).send({
        message: "Erro ao atualizar",
        error: err,
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

  // CRIAR UM ELDER
  app.post("/elders", async (req, reply) => {
    const schema = z.object({
      name: z.string(),
    });

    const { name } = schema.parse(req.body);

    const elder = await prisma.elder.create({
      data: { name },
    });

    return reply.status(201).send(elder);
  });

  // DELETAR UM ELDER
  app.delete("/elders/:id", async (req, reply) => {
    const paramsSchema = z.object({
      id: z.string().transform((v) => Number(v)),
    });

    const { id } = paramsSchema.parse(req.params);

    await prisma.elder.delete({
      where: { id },
    });

    return reply.status(204).send();
  });

  // DELETAR UM GIFT
  app.delete("/gifts/:id", async (req, reply) => {
    const paramsSchema = z.object({
      id: z.string().transform(Number),
    });

    const { id } = paramsSchema.parse(req.params);

    await prisma.gift.delete({
      where: { id },
    });

    return reply.status(204).send();
  });
}
