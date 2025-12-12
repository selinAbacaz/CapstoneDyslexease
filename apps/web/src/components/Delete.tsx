import { Button } from 'react-bootstrap';
import { useFileStore } from '../utils/zustand/file-store';
import { DeleteFile, FileOut } from '@repo/api/files';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../utils/fetching';

export function Delete() {
  const qc = useQueryClient();
  const selectedFileId = useFileStore((state) => state.selectedFileId);
  const reset = useFileStore((state) => state.reset);
  const deleteMutation = useMutation({
    mutationFn: (deleteFile: DeleteFile): Promise<FileOut> =>
      fetcher<FileOut>({
        endpoint: '/files',
        init: { method: 'DELETE', body: JSON.stringify(deleteFile) },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['files'] });
    },
  });

  function handleDelete() {
    const oldId = selectedFileId;
    reset();
    deleteMutation.mutate({ file_cuid: oldId });
  }

  return (
    <Button hidden={!selectedFileId} onClick={handleDelete}>
      Delete File
    </Button>
  );
}
