import { z } from 'zod';
import { CreateSwap, SwapOut, UpdateSwap } from './swap';

export const CreateFilePrefs = z.object({
  file_cuid: z.cuid(),
  font: z.string(),
  text_color_hex: z.string(),
  background_color_hex: z.string(),
  text_spacing: z.int(),
  font_size: z.int(),
  letterSwaps: z.array(CreateSwap.omit({ file_pref_cuid: true })),
});
export type CreateFilePrefs = z.infer<typeof CreateFilePrefs>;

export const FilePrefsOut = z.object({
  file_pref_cuid: z.cuid(),
  font: z.string(),
  text_color_hex: z.string(),
  background_color_hex: z.string(),
  text_spacing: z.int(),
  font_size: z.int(),
  letterSwaps: z.array(SwapOut),
});
export type FilePrefsOut = z.infer<typeof FilePrefsOut>;

export const UpdateFilePrefs = z.object({
  file_pref_cuid: z.cuid(),
  font: z.string().optional(),
  text_color_hex: z.string().optional(),
  background_color_hex: z.string().optional(),
  text_spacing: z.int().optional(),
  font_size: z.int().optional(),
  letterSwaps: z.array(UpdateSwap),
});
export type UpdateFilePrefs = z.infer<typeof UpdateFilePrefs>;

export const DeleteFilePrefs = z.object({
  file_pref_cuid: z.cuid(),
});
export type DeleteFilePrefs = z.infer<typeof DeleteFilePrefs>;
