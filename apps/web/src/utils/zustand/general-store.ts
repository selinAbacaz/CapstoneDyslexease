import { create } from 'zustand';

type FormTypes = 'none' | 'login' | 'signup' | 'file-create';

type GeneralStore = {
  formType: FormTypes;
  selectedFileId: string;
  setFormType: (newForm: FormTypes) => void;
  setSelectedFileId: (newId: string) => void;
};

export const useGeneralStore = create<GeneralStore>((set) => ({
  formType: 'none',
  selectedFileId: '',
  setFormType: (newFormType) => {
    set({ formType: newFormType });
  },
  setSelectedFileId: (newId: string) => {
    set({ selectedFileId: newId });
  },
}));
