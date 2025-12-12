import { useEffect, useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap';
import { useFileStore } from '../utils/zustand/file-store';
import { useFetchBackend } from '../utils/fetching';
import { FileOutWithPrefs } from '@repo/api/files';

export function FileSelector() {
  const setFile = useFileStore((state) => state.setFile);
  const [fileId, setFileId] = useState<string>('');
  const allFiles = useFileStore((state) => state.allFiles);
  const { data: file } = useFetchBackend<FileOutWithPrefs>({
    endpoint: `/files/${fileId}/prefs`,
    enabled: !!fileId,
    key: ['file', fileId],
  });

  useEffect(() => {
    if (file) {
      const {
        file_cuid,
        extracted_text,
        file_pref: { font, text_spacing, text_color_hex, background_color_hex },
      } = file;
      setFile(
        file_cuid,
        extracted_text,
        font,
        text_spacing,
        background_color_hex,
        text_color_hex,
        [],
      );
    }
  }, [file]);

  return (
    <Dropdown hidden={allFiles.length === 0}>
      <DropdownToggle>Select File</DropdownToggle>
      <DropdownMenu>
        {allFiles.map((file) => (
          <DropdownItem
            key={file.file_cuid}
            onClick={() => setFileId(file.file_cuid)}
          >
            {file.file_name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
