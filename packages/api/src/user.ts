import { z } from 'zod';

export const UserOut = z.object({
  user_cuid: z.cuid(),
  username: z.string().nullable(),
  email: z.string().nullable(),
  user_pref_cuid: z.string().nullable(),
});
export type UserOut = z.infer<typeof UserOut>;
