import { Button } from 'react-bootstrap';
import { useMutateBackend } from '../utils/fetching';
import { FileOutWithPrefs, UpdateFileAndPrefs } from '@repo/api/files';
import { useFileStore } from '../utils/zustand/file-store';

export function Save() {
  const {
    selectedFileId,
    content,
    font,
    letterSpacing,
    backgroundColor,
    maintextColor,
  } = useFileStore();
  const saveMutation = useMutateBackend<UpdateFileAndPrefs, FileOutWithPrefs>({
    endpoint: '/files',
    method: 'PATCH',
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
