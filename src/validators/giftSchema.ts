import { z } from "zod";

export const giftSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido"),
  message: z.string().optional(),
  elderName: z.string().min(1, "Selecione um idoso"),
});
