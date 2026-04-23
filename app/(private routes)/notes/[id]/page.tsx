import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const note = await fetchNoteById(id);

    const description = note.content
      .substring(0, 160)
      .replace(/\n/g, ' ')
      .trim();

    return {
      title: `${note.title} | NoteHub`,
      description: description || `Read note: ${note.title}`,
      openGraph: {
        title: `${note.title} | NoteHub`,
        description: description || `Read note: ${note.title}`,
        url: `https://notehub.example.com/notes/${id}`,
        type: 'article',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Note | NoteHub',
      description: 'View a note in NoteHub',
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}