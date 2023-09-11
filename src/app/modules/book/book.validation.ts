import { z } from "zod";

export const BookValidation = {
  create: z.object({
     body: z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    price: z.number(),
    publicationDate: z.string(),
    categoryId: z.string(),
   })
  }),
   update: z.object({
    body: z.object({
        title: z.string().optional(),
        author: z.string().optional(),
        genre: z.string().optional(),
        price: z.number().optional(),
        publicationDate: z.string().optional(),
    })
  }),
}