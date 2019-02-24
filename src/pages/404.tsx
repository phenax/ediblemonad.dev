import React from 'react';
import { Link } from 'gatsby';

import s from '../styles/errorPage.module.scss';

const node404 = (
  <div>
    <div className={s.wrapper}>
      <div className={s.title}>404</div>
      <div className={s.text}>
        I got nothing. You probably wanna check the link you clicked on, bruh. 
      </div>
      <div className={s.links}>
        <Link to="/">Visit My Portfolio</Link>
      </div>
    </div>
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,300" rel="stylesheet" type="text/css" />
  </div>
);

export default () => node404;
