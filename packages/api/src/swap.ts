import { z } from 'zod';

export const CreateSwap = z.object({
  file_pref_cuid: z.cuid(),
  letter1: z.string(),
  letter2: z.string(),
});
export type CreateSwap = z.infer<typeof CreateSwap>;

export const SwapOut = z.object({
  letter_swap_cuid: z.cuid(),
  letter1: z.string(),
  letter2: z.string(),
});
export type SwapOut = z.infer<typeof SwapOut>;

export const UpdateSwap = z.object({
  letter_swap_cuid: z.cuid(),
  letter1: z.string().optional(),
  letter2: z.string().optional(),
});
export type UpdateSwap = z.infer<typeof UpdateSwap>;

export const DeleteSwap = z.object({
  letter_swap_cuid: z.cuid(),
});
export type DeleteSwap = z.infer<typeof DeleteSwap>;
