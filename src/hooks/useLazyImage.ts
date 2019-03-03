import { useEffect, useState } from 'react';

import { imageWrapper } from '../helpers/image';
import { FixedImage } from '../types/image';

const noop = () => {};

const loadImage = (src: string) => {
  const img = new Image();
  img.src = src;
  return {
    promise: new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    }),
    cancel: () => {
      img.onload = noop;
      img.onerror = noop;
    },
  };
};

type Config = { isInView: boolean };

// TODO: Use intersection observer to trigger load
const useLazyImage = (image: FixedImage, { isInView }: Config = { isInView: true }) => {
  const { base64, src } = imageWrapper(image);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string|Event|null>(null);

  useEffect(() => {
    if (isLoaded || !isInView) return;

    const img = loadImage(src);
    img.promise
      .then(() => setIsLoaded(true))
      .catch(setError);

    return () => img.cancel();
  }, [src, isInView]);

  return { error, src: isLoaded ? src : base64 };
};

export default useLazyImage;
