import React from 'react';
import Link from 'next/link';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          NoteHub
        </Link>
        <nav>
          <ul className={css.navList}>
            <AuthNavigation />
          </ul>
        </nav>
      </div>
    </header>
  );
}