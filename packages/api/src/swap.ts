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
