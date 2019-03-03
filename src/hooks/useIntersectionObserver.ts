import { useEffect, useState } from 'react';
import 'intersection-observer';

type Options = {
  offset: string|number
  threshold?: number[]
  filter?: (e: IntersectionObserverEntry) => boolean
};

const useIntersectionObserver = (target: React.RefObject<HTMLElement>, options: Options = { offset: 0 }) => {
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const onIntersection = (entries: IntersectionObserverEntry[]) => {
      const [ entry ] = options.filter ? entries.filter(options.filter) : entries;
      setIsInView(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(onIntersection, {
      rootMargin: `${options.offset}px`,
      threshold: options.threshold,
    });

    target.current && observer.observe(target.current);

    return () => {
      target.current && observer.unobserve(target.current);
    };
  }, [ target.current ]);

  return isInView;
};

export default useIntersectionObserver;
