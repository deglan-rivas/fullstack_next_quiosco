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