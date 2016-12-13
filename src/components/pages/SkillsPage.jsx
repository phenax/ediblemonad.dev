
/**
 * SkillsPage
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

export default props => {

	const skillsList= [
		{ name: 'html5', level: 'stud' },
		{ name: 'css3', level: 'stud' },
		{ name: 'javascript-es2015', level: 'stud' },
		{ name: 'node-js', level: 'stud' },
		{ name: 'react-js', level: 'awesome' },
		{ name: 'express-js', level: 'awesome' },
		{ name: 'koa-js', level: 'cool' },
		{ name: 'php', level: 'awesome' },
		{ name: 'flight-php', level: 'awesome' },
		{ name: 'python', level: 'awesome' },
		{ name: 'python-flask', level: 'cool' },
		{ name: 'j-query', level: 'stud' },
		{ name: 'unit-testing', level: 'cool' },
		{ name: 'progressive-webapps', level: 'learning' },
	];

	return (
		<div className='skills-view skills page-wrapper' data-view='/skills' data-active={props.active.toString()}>
		
			<div className='page-wrapper__text skills__css'>
				<div className='skills__css__selector' dangerouslySetInnerHTML={{ __html: '.skills {' }} />

				<div className='skills__css__props'>

					{skillsList.map(
						(skill, i) => (
							<div className='css-prop' key={i}>
								<span className='css-prop__name'>{skill.name}</span>
								<span className={`css-prop__value ${skill.level}`} />
							</div>
						)
					)}

				</div>

				<div className='skills__css__selector' dangerouslySetInnerHTML={{ __html: '}' }} />
			</div>
		</div>
	);
}
