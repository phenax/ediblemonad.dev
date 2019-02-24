/* eslint-disable jsx-a11y/html-has-lang */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-danger */
import React from 'react';

const HTML = props => (
  <html {...props.htmlAttributes}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="author" href="https://plus.google.com/u/0/108089047891809102209" />
      {props.headComponents}
    </head>
    <body {...props.bodyAttributes}>
      {props.preBodyComponents}
      <noscript key="noscript" id="gatsby-noscript">
        This app works best with JavaScript enabled.
      </noscript>
      <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
      {props.postBodyComponents}
      {/* <link rel="stylesheet" href="/src/dist/fontello/css/fontello.css" /> */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway:100,400|Oswald:300,400" />
    </body>
  </html>
);

export default HTML;
