import { z } from "zod";

const update = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required"
    }),
    email: z.string({
      required_error: "email is required"
    }),
   contactNo: z.string({
    required_error: "contactNo is required"
   }),
   address: z.string({
    required_error: "address is required"
   }),
   profileImg: z.string({
    required_error: "profileImg is required"
   })
  })
})

export const userValidation = {
  update
}