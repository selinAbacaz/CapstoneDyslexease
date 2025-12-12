import { z } from 'zod';

export const UserOut = z.object({
  user_cuid: z.cuid(),
  username: z.string(),
  email: z.string(),
  selected_file_cuid: z.cuid(),
});
export type UserOut = z.infer<typeof UserOut>;

export const UpdateUser = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  selected_file_cuid: z.cuid().optional(),
});
export type UpdateUser = z.infer<typeof UpdateUser>;
