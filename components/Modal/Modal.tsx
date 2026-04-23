import type { ReactNode } from 'react';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '1rem',
          maxWidth: '36rem',
          width: '100%',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.16)',
          overflow: 'hidden',
        }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.125rem' }}>{title ?? 'Modal'}</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </header>
        <div style={{ padding: '1.25rem' }}>{children}</div>
      </div>
    </div>
  );
}
