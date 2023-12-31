import { z } from "zod";

const createCategories = z.object({
  body: z.object({
    title: z.string({
      required_error: "title is required"
    })
  })
})

const updateCategories = z.object({
  body: z.object({
    title: z.string({
      required_error: "title is required"
    })
  })
})

export const categoriesValidation = {
  createCategories,
  updateCategories
}