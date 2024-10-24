import { z } from 'zod';

export const authSignInSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type AuthSignInSchema = z.infer<typeof authSignInSchema>;

export const authSignInDefaultValues: AuthSignInSchema = {
  username: '',
  password: '',
};
