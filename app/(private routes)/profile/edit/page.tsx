'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe, updateMe } from '@/lib/api/clientApi';
import AvatarPicker from '@/lib/api/AvatarPicker';
import css from './EditProfile.module.css';
import toast from 'react-hot-toast';

export default function EditProfilePage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  useEffect(() => {
    getMe()
      .then((profile) => {
        setUsername(profile.username ?? '');
        setAvatarUrl(profile.avatar ?? '');
      })
      .catch((error) => {
        console.error('Failed to load profile', error);
        toast.error('Unable to load profile data');
      })
      .finally(() => {
        setIsLoadingProfile(false);
      });
  }, []);

  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file);
    if (!file) {
      setAvatarUrl('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalAvatarUrl = avatarUrl;

      if (avatarFile) {
        const reader = new FileReader();
        finalAvatarUrl = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(avatarFile);
        });
      }

      const updatedUser = await updateMe({
        username,
        avatar: finalAvatarUrl,
      });

      setUser(updatedUser);
      toast.success('Profile updated successfully!');
      router.push('/profile');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProfile) {
    return <p>Loading...</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <AvatarPicker profilePhotoUrl={avatarUrl} onChangePhoto={handleAvatarChange} />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}