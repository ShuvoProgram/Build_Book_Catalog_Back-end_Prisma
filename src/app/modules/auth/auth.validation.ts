import {z} from 'zod';
import { role } from './auth.constants';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "name is required"
    }),
    email: z.string({
      required_error: "email is required"
    }),
    password: z.string({
      required_error: "password is required"
    }),
   role: z.enum([...role] as [string, ...string[]], {
    required_error: "role is required"
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

export const AuthValidation = {
  createUserZodSchema
}