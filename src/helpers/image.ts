import { FixedImage } from '../types/image';

let supportsWebp = false;

(() => {
  try {
    let webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
    webP.onload = webP.onerror = function () {
      supportsWebp = webP.height === 2 ? true : false;
    };
  } catch(e) { supportsWebp = false; }
})();

export const getImageProps = ({ src, srcWebp }: FixedImage) => ({
  src: supportsWebp ? srcWebp : src,
});
