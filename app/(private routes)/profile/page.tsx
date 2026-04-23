import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getServerMe } from '@/lib/api/serverApi';
import css from './Profile.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Profile | NoteHub',
  description: 'View your profile information',
};

export default async function ProfilePage() {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || '/default-avatar.svg'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p><strong>Username:</strong> {user?.username || 'Guest'}</p>
          <p><strong>Email:</strong> {user?.email || 'Not available'}</p>
        </div>
      </div>
    </main>
  );
}