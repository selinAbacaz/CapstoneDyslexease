import { Button } from 'react-bootstrap';
import { useFileStore } from '../utils/zustand/file-store';
import { useMutateBackend } from '../utils/fetching';
import { DeleteFile, FileOut } from '@repo/api/files';

export function Delete() {
  const selectedFileId = useFileStore((state) => state.selectedFileId);
  const deleteMutation = useMutateBackend<DeleteFile, FileOut>({
    endpoint: '/files',
    method: 'DELETE',
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
