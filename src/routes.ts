import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function routes(app: FastifyInstance) {
  app.get("/", () => {
    return "🎄 API do Natal funcionando!";
  });

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
}
