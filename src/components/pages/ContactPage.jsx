
/**
 * ContactPage
 *
 * My react component description
 *
 * Copyright (C) 2016 Akshay Nair
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Akshay Nair<phenax5@gmail.com>
 *
 */

import React from 'react';

const socialLinks= [
	{ icon: 'github-circled',  name: 'Github',    url: 'https://github.com/phenax' },
	{ icon: 'codepen',         name: 'Codepen',   url: 'https://codepen.io/phenax/' },
	{ icon: 'facebook',        name: 'Facebook',  url: 'https://fb.com/einstein1997' },
	{ icon: 'linkedin',        name: 'LinkedIn',  url: 'https://www.linkedin.com/in/akshay-nair5' },
	{ icon: 'twitter',         name: 'Twitter',   url: 'https://twitter.com/phenax5' },
];

export default props => (

	<div className='contact-view contact page-wrapper' data-view='/contact' data-active={props.active.toString()}>
		
		<div className='page-wrapper__title'>Contact Me</div>
		<div className='page-wrapper__text'>

			<div className='contact__email'>
				<a href='mailto:akshaynair1597@gmail.com'>akshaynair1597@gmail.com</a>
			</div>

			<div className='contact__social row no-collapse'>
				{socialLinks.map(
					(soc, i) => 
						<a key={i} target='_blank _parent'
							rel='noopener'
							href={soc.url} 
							className={`icon-${soc.icon} col`} 
							data-name={soc.name}
						/>
				)}
			</div>
		</div>
	</div>
);
