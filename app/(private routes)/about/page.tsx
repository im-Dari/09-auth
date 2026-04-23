import { Metadata } from 'next';
import About from '@/components/About/About';

export const metadata: Metadata = {
  title: 'About | NoteHub',
  description: 'Learn more about NoteHub application',
};

export default function AboutPage() {
  return (
    <main>
      <About />
    </main>
  );
}