import React from 'react';

interface Props {
  children: any
}; 

export default ({ children, ...props }: Props) => (
  <div>
    <style>{`
    .gatsby-highlight pre[class*="language-"].line-numbers {
      padding-left: 2.8em; /* 3 */
    }
    `}</style>
    <div>Post</div>
    <pre>{JSON.stringify(props, 0, 2)}</pre>
    {children}
  </div>
);
