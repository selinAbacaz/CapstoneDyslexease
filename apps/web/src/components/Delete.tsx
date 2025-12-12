import { Button } from 'react-bootstrap';
import { useFileStore } from '../utils/zustand/file-store';
import { DeleteFile, FileOut } from '@repo/api/files';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../utils/fetching';

export function Delete() {
  const qc = useQueryClient();
  const selectedFileId = useFileStore((state) => state.selectedFileId);
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

  return (
    <Button
      hidden={!selectedFileId}
      onClick={() => deleteMutation.mutate({ file_cuid: selectedFileId })}
    >
      Delete File
    </Button>
  );
}
