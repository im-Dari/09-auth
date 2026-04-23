import { create } from 'zustand';

interface NoteStore {
  noteId: string | null;
  setNoteId: (id: string) => void;
  clearNoteId: () => void;
}

export const useNoteStore = create<NoteStore>()((set) => ({
  noteId: null,
  setNoteId: (id) => set({ noteId: id }),
  clearNoteId: () => set({ noteId: null }),
}));
