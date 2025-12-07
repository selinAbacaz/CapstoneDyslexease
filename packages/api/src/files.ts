import { z } from 'zod';

export const CreateFile = z.object({
  file_name: z.string(),
  extracted_text: z.string().optional(),
});
export type CreateFile = z.infer<typeof CreateFile>;

export const CreateFileWithPrefs = z.object({
  file_name: z.string(),
  extracted_text: z.string().optional(),
  text_color_hex: z.string().optional(),
  background_color_hex: z.string().optional(),
  text_spacing: z.int().optional(),
  font_szie: z.int().optional(),
});
export type CreateFileWithPrefs = z.infer<typeof CreateFileWithPrefs>;

export const FileOut = z.object({
  file_cuid: z.cuid(),
  file_name: z.string(),
  extracted_text: z.string(),
});
export type FileOut = z.infer<typeof FileOut>;

export const FileOutWithPrefs = z.object({
  file_cuid: z.cuid(),
  file_name: z.string(),
  extracted_text: z.string(),
  text_color_hex: z.string().nullable(),
  background_color_hex: z.string().nullable(),
  text_spacing: z.int().nullable(),
  font_szie: z.int().nullable(),
});
export type FileOutWithPrefs = z.infer<typeof FileOutWithPrefs>;
