import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
}

export function ResilientImage({ src, alt, title, className = '' }: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 p-6 text-center dark:from-zinc-800 dark:to-zinc-900 ${className}`}
      >
        <ImageIcon className="mb-3 h-7 w-7 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
        <p className="font-display text-sm font-semibold text-zinc-700 dark:text-zinc-200">{title}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
