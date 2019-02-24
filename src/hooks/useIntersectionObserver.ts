import { useEffect, useState } from 'react';
import 'intersection-observer';

type Options = {
  offset: string|number
  threshold?: number[]
  filter?: (e: IntersectionObserverEntry) => boolean
};

const useIntersectionObserver = (target: React.RefObject<HTMLElement>, options: Options = { offset: 0 }) => {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    const onIntersection = (entries: IntersectionObserverEntry[]) => {
      const filteredEntries = options.filter ? entries.filter(options.filter) : entries;
      setEntries(filteredEntries);
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

  return entries[0];
};

export default useIntersectionObserver;
