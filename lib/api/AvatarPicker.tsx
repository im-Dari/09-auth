'use client';

import { useState } from 'react';
import Image from 'next/image';
import css from './AvatarPicker.module.css';

type Props = {
  profilePhotoUrl?: string;
  onChangePhoto: (file: File | null) => void;
};

const AvatarPicker = ({ profilePhotoUrl, onChangePhoto }: Props) => {
  const [previewUrl, setPreviewUrl] = useState(profilePhotoUrl || '');
  const [prevProfilePhotoUrl, setPrevProfilePhotoUrl] = useState(profilePhotoUrl);
  const [error, setError] = useState('');

  if (profilePhotoUrl !== prevProfilePhotoUrl) {
    setPrevProfilePhotoUrl(profilePhotoUrl);
    setPreviewUrl(profilePhotoUrl || '');
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Only images allowed');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Max file size is 5MB');
        return;
      }

      onChangePhoto(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreviewUrl('');
    onChangePhoto(null);
  };

  return (
    <div className={css.container}>
      <div className={css.picker}>
        {previewUrl && (
          <Image src={previewUrl} alt="Preview" width={300} height={300} className={css.avatar} />
        )}
        <label className={previewUrl ? `${css.wrapper} ${css.reload}` : css.wrapper}>
          📷 Choose photo
          <input type="file" accept="image/*" onChange={handleFileChange} className={css.input} />
        </label>
        {previewUrl && (
          <button className={css.remove} onClick={handleRemove} type="button">
            ❌
          </button>
        )}
      </div>
      {error && <p className={css.error}>{error}</p>}
    </div>
  );
};

export default AvatarPicker;