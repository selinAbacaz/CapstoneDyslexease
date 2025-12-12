import {
  Button,
  FormControl,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { DEFAULT_FILE_PREFS } from '../../utils/constants';
import { CreateFileWithPrefs, FileOut } from '@repo/api/files';
import { useGeneralStore } from '../../utils/zustand/general-store';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../utils/fetching';

export function CreateFileForm() {
  const qc = useQueryClient();
  const [fileName, setFileName] = useState<string>('');
  const setFormType = useGeneralStore((state) => state.setFormType);
  const createFile = useMutation({
    mutationFn: (newFile: CreateFileWithPrefs): Promise<FileOut> =>
      fetcher({
        endpoint: '/files/prefs',
        init: { method: 'POST', body: JSON.stringify(newFile) },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['files'] });
    },
  });

  async function handleSubmit() {
    const {
      content,
      font,
      letterSpacing,
      backgroundColor,
      maintextColor,
      fontSize,
      swapPairs,
    } = DEFAULT_FILE_PREFS;
    const newFile: CreateFileWithPrefs = {
      file_name: fileName,
      file_pref: {
        font,
        text_color_hex: maintextColor,
        background_color_hex: backgroundColor,
        text_spacing: letterSpacing,
        letterSwaps: swapPairs,
        font_size: fontSize,
      },
      extracted_text: content,
    };
    createFile.mutate(newFile);
    setFormType('none');
  }

  function handleClose() {
    setFormType('none');
  }

  return (
    <Modal show={true} onHide={handleClose}>
      <ModalHeader closeButton>
        <ModalTitle>Create a File</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <InputGroup>
            <InputGroupText>Name</InputGroupText>
            <FormControl
              placeholder="File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </InputGroup>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit} disabled={!fileName}>
          Create File
        </Button>
      </ModalFooter>
    </Modal>
  );
}
