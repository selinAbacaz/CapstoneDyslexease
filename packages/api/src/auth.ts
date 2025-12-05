import { z } from 'zod';

export const Auth = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});
export type Auth = z.infer<typeof Auth>;

export const TokenOut = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type TokenOut = z.infer<typeof TokenOut>;
