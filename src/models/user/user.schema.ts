import { z } from "zod"

export const UserSchema = z.object({
  id: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(1),
})

export type TUser = z.infer<typeof UserSchema>
export interface IUser extends TUser {}

export function parseUser(data: unknown): TUser {
  return UserSchema.parse(data)
}

