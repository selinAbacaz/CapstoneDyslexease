import { z } from 'zod';
import { CreateFilePrefs, FilePrefsOut, UpdateFilePrefs } from './file-prefs';

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

export const UpdateFileAndPrefs = z.object({
  file_cuid: z.cuid(),
  file_name: z.string().optional(),
  extracted_text: z.string().optional(),
  file_pref: UpdateFilePrefs.omit({ file_pref_cuid: true }),
});
export type UpdateFileAndPrefs = z.infer<typeof UpdateFileAndPrefs>;

export const DeleteFile = z.object({
  file_cuid: z.string(),
});
export type DeleteFile = z.infer<typeof DeleteFile>;
