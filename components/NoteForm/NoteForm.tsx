'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import { useDraftStore } from '@/lib/store/draftStore';
import toast from 'react-hot-toast';
import css from './NoteForm.module.css';

const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const draft = useDraftStore((state) => state.draft);
  const setDraft = useDraftStore((state) => state.setDraft);
  const resetDraft = useDraftStore((state) => state.resetDraft);

  const createMutation = useMutation({
    mutationFn: (data: { title: string; content: string; tag: string }) =>
      createNote(data),
    onSuccess: () => {
      toast.success('Note created successfully!');
      resetDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.push('/notes');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create note');
      console.error(error);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!draft.title || !draft.content) {
      toast.error('Please fill in all fields');
      return;
    }
    createMutation.mutate(draft);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          className={css.input}
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          placeholder="Enter note title"
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className={css.textarea}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          placeholder="Enter note content"
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          className={css.input}
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value })}
          required
        >
          {TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="submit"
          className={css.submitButton}
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? 'Creating...' : 'Create Note'}
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.push('/notes')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
