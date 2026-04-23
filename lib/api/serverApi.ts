import 'server-only';
import { cookies } from 'next/headers';
import { api } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';
import type { AxiosResponse } from 'axios';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return {
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
};

export const getServerMe = async (): Promise<User | null> => {
  try {
    const config = await getAuthHeaders();
    const { data } = await api.get<User>('/users/me', config);
    return data;
  } catch {
    return null;
  }
};

export const checkSession = async (): Promise<AxiosResponse<User | null>> => {
  const config = await getAuthHeaders();
  const response = await api.get('/auth/session', config);
  return response;
};

export const fetchNotes = async (params?: Record<string, string | number>): Promise<Note[]> => {
  const config = await getAuthHeaders();
  const { data } = await api.get<Note[] | { notes: Note[] }>('/notes', { ...config, params });
  return Array.isArray(data) ? data : data?.notes || [];
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const config = await getAuthHeaders();
  const { data } = await api.get<Note>(`/notes/${id}`, config);
  return data;
};