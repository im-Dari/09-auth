import { create } from 'zustand';

interface NoteDraft {
  title: string;
  content: string;
  tag: string;
}

interface DraftStore {
  draft: NoteDraft;
  setDraft: (draft: Partial<NoteDraft>) => void;
  resetDraft: () => void;
}

const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Work',
};

export const useDraftStore = create<DraftStore>()((set) => ({
  draft: initialDraft,
  setDraft: (data) => set((state) => ({ draft: { ...state.draft, ...data } })),
  resetDraft: () => set({ draft: initialDraft }),
}));
