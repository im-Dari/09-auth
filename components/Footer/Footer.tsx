import React from 'react';
import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <p>&copy; {new Date().getFullYear()} NoteHub. All rights reserved.</p>
    </footer>
  );
}