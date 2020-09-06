import { FixedImage } from '../types/image';

let supportsWebp = false;

(() => {
  try {
    const webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
    webP.onload = webP.onerror = function() {
      supportsWebp = webP.height === 2;
    };
  } catch (e) {
    supportsWebp = false;
  }
})();

export const getImageSrc = ({ src, srcWebp }: FixedImage): string => (supportsWebp && srcWebp ? srcWebp : src);

export const imageWrapper = (image: FixedImage): FixedImage => ({ ...image, src: getImageSrc(image) });
