import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap';
import { FileOut } from '@repo/api/files';
import { UpdateUser, UserOut } from '@repo/api/user';
import { useGeneralStore } from '../utils/zustand/general-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../utils/fetching';
import { useAuthStore } from '../utils/zustand/auth-store';

export function FileSelector() {
  const qc = useQueryClient();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { selectedFileId, setSelectedFileId } = useGeneralStore();
  const { data, isLoading } = useQuery<FileOut[]>({
    queryFn: () => fetcher<FileOut[]>({ endpoint: '/files' }),
    queryKey: ['files'],
    enabled: isAuthenticated,
  });
  const mutation = useMutation({
    mutationFn: (updateUserDto: UpdateUser): Promise<UserOut> =>
      fetcher({
        endpoint: '/users/me',
        init: { method: 'PATCH', body: JSON.stringify(updateUserDto) },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['file', selectedFileId] });
    },
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
      <Dropdown hidden={data.length === 0}>
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
