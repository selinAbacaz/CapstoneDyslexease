import { create } from 'zustand';

type FormTypes = 'none' | 'login' | 'signup' | 'file-create';

type GeneralStore = {
  formType: FormTypes;
  setFormType: (newForm: FormTypes) => void;
};

export const useGeneralStore = create<GeneralStore>((set) => ({
  formType: 'none',
  setFormType: (newFormType) => {
    set({ formType: newFormType });
  },
}));
