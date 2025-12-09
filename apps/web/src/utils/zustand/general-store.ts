import { create } from 'zustand';

type AccountForms = 'none' | 'login' | 'signup';

type GeneralStore = {
  accountFormType: AccountForms;
  setAccountForm: (newForm: AccountForms) => void;
};

export const useGeneralStore = create<GeneralStore>((set) => ({
  accountFormType: 'none',
  setAccountForm: (newForm) => {
    set({ accountFormType: newForm });
  },
}));
