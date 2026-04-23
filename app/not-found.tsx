import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '2rem' }}>Oops! Page not found</h2>
      <p style={{ marginBottom: '2rem' }}>The page you are looking for might have been removed or is temporarily unavailable.</p>
      <Link href="/" style={{ color: '#0070f3', fontWeight: 'bold', textDecoration: 'underline' }}>
        Return to Home Page
      </Link>
    </main>
  );
} 