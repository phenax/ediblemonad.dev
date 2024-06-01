import { render } from '@css-everything/render/dist/index.js'
import hljs from 'highlight.js';
import React, { useEffect, useMemo, useRef } from 'react'
import dynamic from 'next/dynamic'

export const CssEverything = React.memo(({ css, id }: { css: string, id: string }) => {
  const cssRoot = useRef<HTMLDivElement | null>(null);
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    render({ root: cssRoot.current! })
    hasRun.current = true
  }, [])

  const cssHighlighted = useMemo(() => {
    return hljs.highlight(css, { language: 'css' }).value.trim()
  }, [css])

  return <div>
    <div className="bg-[#222] p-1">
      <div className="px-3 py-1 bg-[#111] font-bold text-xs">Result</div>
      <div className="px-3 py-2">
        <div ref={cssRoot} id={id} />
      </div>
    </div>
    <pre>
      <code className="hljs language-css" dangerouslySetInnerHTML={{ __html: cssHighlighted }}></code>
    </pre>

    <style>
      {css}
    </style>
  </div>
});

CssEverything.displayName = 'CssEverything'

export default dynamic(async () => CssEverything, { ssr: false })

