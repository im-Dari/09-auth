/* import React from 'react';  */
import css from './About.module.css';

export default function About() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>About NoteHub</h1>
      <p className={css.text}>
        NoteHub is a modern application designed to help you organize your thoughts and tasks efficiently.
      </p>
      <section className={css.section}>
        <h2 className={css.subtitle}>Our Mission</h2>
        <ul className={css.list}>
          <li>
            <strong>Security:</strong> We provide secure storage for your notes using modern auth methods.
          </li>
          <li>
            <strong>Simplicity:</strong> Focus on your ideas without unnecessary distractions.
          </li>
          <li>
            <strong>Accessibility:</strong> Access your notes from anywhere at any time.
          </li>
        </ul>
      </section>
    </main>
  );
}