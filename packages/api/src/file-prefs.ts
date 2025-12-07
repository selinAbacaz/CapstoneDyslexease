import { z } from 'zod';
import { CreateSwap, SwapOut } from './swap';

export const CreateFilePrefs = z.object({
  file_cuid: z.cuid(),
  text_color_hex: z.string().optional(),
  background_color_hex: z.string().optional(),
  text_spacing: z.int().optional(),
  font_szie: z.int().optional(),
  letterSwaps: z.array(CreateSwap.omit({ file_pref_cuid: true })),
});
export type CreateFilePrefs = z.infer<typeof CreateFilePrefs>;

export const FilePrefsOut = z.object({
  file_pref_cuid: z.cuid(),
  text_color_hex: z.string().nullable(),
  background_color_hex: z.string().nullable(),
  text_spacing: z.int().nullable(),
  font_szie: z.int().nullable(),
  letterSwaps: z.array(SwapOut),
});
export type FilePrefsOut = z.infer<typeof FilePrefsOut>;
