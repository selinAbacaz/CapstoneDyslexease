import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap';
import { useFetchBackend, useMutateBackend } from '../utils/fetching';
import { FileOut } from '@repo/api/files';
import { UpdateUser, UserOut } from '@repo/api/user';
import { useGeneralStore } from '../utils/zustand/general-store';

export function FileSelector() {
  const { selectedFileId, setSelectedFileId } = useGeneralStore();
  const { data, isLoading } = useFetchBackend<FileOut[]>({
    endpoint: '/files',
    key: ['files'],
  });
  const mutation = useMutateBackend<UpdateUser, UserOut>({
    endpoint: '/users/me',
    method: 'PATCH',
    invalidateKeys: [['file', selectedFileId]],
  });

  function handleClick(selected_file_cuid: string) {
    setSelectedFileId(selected_file_cuid);
    mutation.mutate({ selected_file_cuid });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <Dropdown>
        <DropdownToggle>Select File</DropdownToggle>
        <DropdownMenu>
          {data.map((file) => (
            <DropdownItem
              key={file.file_cuid}
              onClick={() => handleClick(file.file_cuid)}
            >
              {file.file_name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
