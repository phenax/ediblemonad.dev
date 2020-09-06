import React from 'react';
import cx from 'classnames';

import rootStyles from '../../styles/common.module.scss';
import s from './Contacts.module.scss';

const email = 'akshay.n0@protonmail.com';
const socialLinks = [
  { icon: 'github', name: 'Github', url: 'https://github.com/phenax' },
  { icon: 'codepen', name: 'Codepen', url: 'https://codepen.io/phenax/' },
  { icon: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/in/akshay-nair5' },
  { icon: 'twitter', name: 'Twitter', url: 'https://twitter.com/phenax5' },
];

const Contacts = () => (
  <div className={s.contact}>
    <div className="page-wrapper__text">
      <div className={s.email}>
        <a href={`mailto:${email}`}>{email}</a>
      </div>

      <div className={cx(s.social, rootStyles.row, 'no-collapse')}>
        {socialLinks.map(({ url, icon, name }) => (
          <a key={url} target="_blank _parent" rel="noopener" href={url} className={rootStyles.col} data-name={name}>
            <i className={`fab fa-${icon}`} />
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default Contacts;
