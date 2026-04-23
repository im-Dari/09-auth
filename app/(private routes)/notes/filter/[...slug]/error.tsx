'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function FilterError({ error, reset }: ErrorProps) {
  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <h2>Something went wrong in the notes filter!</h2>
      <p>{error.message || 'Failed to load filtered notes.'}</p>
      <button
        onClick={reset}
        style={{
          padding: '8px 16px',
          fontSize: '14px',
          backgroundColor: '#0d6efd',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '16px',
        }}
      >
        Try again
      </button>
    </div>
  );
}
