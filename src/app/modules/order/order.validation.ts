import { z } from "zod";

const createOrderSchema = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string(),
        quantity: z.number().int(),
      })
    ),
  }),
});

export const OrderValidation = {
  createOrderSchema,
};