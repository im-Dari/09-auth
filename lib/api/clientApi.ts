import { api } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

export type AuthResponse = User;

export const login = async (data: { email: string; password: string }): Promise<User> => {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
};

export const register = async (data: { email: string; password: string }): Promise<User> => {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
  const res = await api.get<User | null>('/auth/session');
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const res = await api.get<User>('/users/me');
  return res.data;
};

export const updateMe = async (data: { username: string; avatar?: string }): Promise<User> => {
  const res = await api.patch<User>('/users/me', data);
  return res.data;
};

export const fetchNotes = async (params: {
  search?: string;
  page?: number;
  tag?: string;
  perPage?: number;
}): Promise<{ notes: Note[]; totalPages: number }> => {
  const queryParams: Record<string, string | number> = {
    perPage: params.perPage || 12,
    page: params.page || 1,
  };

  if (params.search) queryParams.search = params.search;
  if (params.tag && params.tag !== 'all') queryParams.tag = params.tag;

  const res = await api.get<{ notes: Note[]; totalPages: number }>('/notes', {
    params: queryParams,
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const res = await api.post<Note>('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};