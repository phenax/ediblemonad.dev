import { useEffect, useState } from 'react';

import { FixedImage } from '../types/image';

// TODO: Use intersection observer to trigger load
const useLazyImage = ({ base64, src }: FixedImage) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string|Event|null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = setError;
  }, [src]);

  return { error, src: isLoaded ? src : base64 };
};

export default useLazyImage;
