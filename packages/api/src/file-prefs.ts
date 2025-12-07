import { z } from 'zod';

export const CreateFilePrefs = z.object({
  text_color_hex: z.string().optional(),
  background_color_hex: z.string().optional(),
  text_spacing: z.int().optional(),
  font_szie: z.int().optional(),
});
export type CreateFilePrefs = z.infer<typeof CreateFilePrefs>;

export const FilePrefsOut = z.object({
  text_color_hex: z.string().nullable(),
  background_color_hex: z.string().nullable(),
  text_spacing: z.int().nullable(),
  font_szie: z.int().nullable(),
});
export type FilePrefsOut = z.infer<typeof FilePrefsOut>;
