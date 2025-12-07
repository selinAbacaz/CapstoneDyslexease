import { z } from 'zod';

export const UserOut = z.object({
  user_cuid: z.cuid(),
  username: z.string(),
  email: z.string(),
});
export type UserOut = z.infer<typeof UserOut>;
