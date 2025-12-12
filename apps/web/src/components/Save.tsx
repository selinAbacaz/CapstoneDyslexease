import { Button } from 'react-bootstrap';
import { FileOutWithPrefs, UpdateFileAndPrefs } from '@repo/api/files';
import { useFileStore } from '../utils/zustand/file-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../utils/fetching';

export function Save() {
  const {
    selectedFileId,
    content,
    font,
    letterSpacing,
    backgroundColor,
    maintextColor,
  } = useFileStore();
  const qc = useQueryClient();
  const saveMutation = useMutation({
    mutationFn: (
      updateFileDto: UpdateFileAndPrefs,
    ): Promise<FileOutWithPrefs> =>
      fetcher({
        endpoint: '/files',
        init: { method: 'PATCH', body: JSON.stringify(updateFileDto) },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['file', selectedFileId] });
    },
  });

  function saveFile() {
    saveMutation.mutate({
      file_cuid: selectedFileId,
      extracted_text: content,
      file_pref: {
        font,
        text_spacing: letterSpacing,
        background_color_hex: backgroundColor,
        text_color_hex: maintextColor,
        letterSwaps: [],
      },
    });
  }
  return (
    <Button hidden={!selectedFileId} onClick={saveFile}>
      Save File
    </Button>
  );
}
