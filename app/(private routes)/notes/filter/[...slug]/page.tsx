import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';

type Props = {
  params: { slug: string[] };
};

export default async function FilteredNotesPage({ params }: Props) {
  const tag = params.slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, tag, perPage: 12 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag || 'all'} />
    </HydrationBoundary>
  );
}