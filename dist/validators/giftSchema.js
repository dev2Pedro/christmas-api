"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giftSchema = void 0;
const zod_1 = require("zod");
exports.giftSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Nome muito curto"),
    email: zod_1.z.string().email("Email inválido"),
    phone: zod_1.z
        .string()
        .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido"),
    message: zod_1.z.string().optional(),
    elderName: zod_1.z.string().min(1, "Selecione um idoso"),
});
