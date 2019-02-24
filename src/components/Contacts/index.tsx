import React from 'react';
import cx from 'classnames';

import pageStyles from '../../styles/page.module.scss';
import rootStyles from '../../styles/common.module.scss';
import s from './Contacts.module.scss';

const socialLinks= [
	{ icon: 'github-circled',  name: 'Github',    url: 'https://github.com/phenax' },
	{ icon: 'codepen',         name: 'Codepen',   url: 'https://codepen.io/phenax/' },
	{ icon: 'linkedin',        name: 'LinkedIn',  url: 'https://www.linkedin.com/in/akshay-nair5' },
	{ icon: 'twitter',         name: 'Twitter',   url: 'https://twitter.com/phenax5' },
];

const Contacts = () => (
  <div className={s.contact}>
		<div className={pageStyles.title}>Contact Me</div>
		<div className='page-wrapper__text'>

			<div className={s.email}>
				<a href='mailto:akshaynair1597@gmail.com'>akshaynair1597@gmail.com</a>
			</div>

			<div className={cx(s.social, rootStyles.row, 'no-collapse')}>
				{socialLinks.map(({ url, icon, name }) =>
          <a key={url} target='_blank _parent'
            rel='noopener'
            href={url} 
            className={cx(rootStyles.col, `icon-${icon}`)}
            data-name={name}
          />
				)}
			</div>
		</div>
	</div>
);

export default Contacts;
