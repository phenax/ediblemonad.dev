import { useEffect, useState } from 'react';

import { imageWrapper } from '../helpers/image';

import { FixedImage } from '../types/image';

// TODO: Use intersection observer to trigger load
const useLazyImage = (image: FixedImage) => {
  const { base64, src } = imageWrapper(image);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string|Event|null>(null);

  useEffect(() => {
    if (isLoaded) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = setError;
  }, [src]);

  return { error, src: isLoaded ? src : base64 };
};

export default useLazyImage;
