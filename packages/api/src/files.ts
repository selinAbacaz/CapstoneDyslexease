import { z } from 'zod';
import { CreateFilePrefs, FilePrefsOut } from './file-prefs';

export const CreateFile = z.object({
  file_name: z.string(),
  extracted_text: z.string().optional(),
});
export type CreateFile = z.infer<typeof CreateFile>;

export const CreateFileWithPrefs = z.object({
  file_name: z.string(),
  extracted_text: z.string().optional(),
  file_pref: CreateFilePrefs.omit({ file_cuid: true }),
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
  file_pref: FilePrefsOut,
});
export type FileOutWithPrefs = z.infer<typeof FileOutWithPrefs>;
