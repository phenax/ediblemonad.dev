import React from 'react';
import { Link } from 'gatsby';

import { wrapper, title, text, links } from '../styles/errorPage.module.scss';

const node404 = (
  <div>
    <div className={wrapper}>
      <div className={title}>404</div>
      <div className={text}>
        I got nothing. You probably wanna check the link you clicked on, bruh. 
      </div>
      <div className={links}>
        <Link to="/">Visit My Portfolio</Link>
      </div>
    </div>
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,300" rel="stylesheet" type="text/css" />
  </div>
);

export default () => node404;
