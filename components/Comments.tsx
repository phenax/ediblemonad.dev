import { useRef, useEffect } from "react";

export function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const isScriptLoaded = useRef(false);

  useEffect(() => {
    if (isScriptLoaded.current) return;
    isScriptLoaded.current = true;
    const script = document.createElement('script');
    Object.assign(script, {
      src: 'https://utteranc.es/client.js',
      async: true,
      crossOrigin:'anonymous',
    });
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('label', 'blogpost-comments')
    script.setAttribute('theme', 'github-dark')
    script.setAttribute('repo', 'phenax/ediblemonad.dev')
    ref.current?.appendChild(script);
  }, []);

  return <div ref={ref} className="[&>.utterances]:max-w-none py-6 px-3"></div>
}
