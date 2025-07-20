import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string().optional(),
  lastName: z.string().optional(),
  firstName: z.string().optional(),
  // Add more fields as needed
});

export type User = z.infer<typeof userSchema>;
