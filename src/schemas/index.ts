import { z } from "zod";
import { formatCurrency } from "../utils";

const MIN_TOTAL = 1
export const OrderSchema = z.object({
  to: z.string().min(1, { message: "Tu Nombre es obligatorio" }),
  total: z.number().min(1, `Total debe ser mayor a ${formatCurrency(MIN_TOTAL)}`),
  order: z
    .object({
      id: z.number(),
      // name: z.string()._addCheck((value) => {
      //   if (value.length < 3) throw new Error("Name must be at least 3 characters");
      //   return value;
      // })
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      subtotal: z.number(),
    })
    .array(),
});

export const OrderIdSchema = z.object({
  orderId: z.string()
    .transform((str) => Number(str))
    .refine((val) => !isNaN(val), { message: 'Id no es un valor numerico' })
    .refine((val) => val > 0, { message: 'Id no es un valor positivo' })
})

export const SearchFormSchema = z.object({
  search: z.string()
    .transform((str) => str.trim())
    .refine((str) => str.length > 1, { message: "La búsqueda no puede estar vacía" })
  // .trim()
  // .min(1, { message: "Tu Nombre es obligatorio" })
  // .max(50, { message: "Tu Nombre no debe ser mayor a 50 caracteres" })
})