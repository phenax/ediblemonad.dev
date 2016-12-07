
/**
 * AboutPage
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

export default props => (

	<div className='about-view about page-wrapper' data-view='/about' data-active={props.active.toString()}>

		<div className='page-wrapper__title'>Hello</div>

		<div className='page-wrapper__text'>

			<p dangerouslySetInnerHTML={{__html: `
					I'm Akshay Nair, a Full Stack Web Developer with an obsession for writing maintainable, performant code.
					I live in Mumbai, India. I am passionate about JavaScript and writing open source software.
				`.replace(/\s+/g, ' ')}}
			/>

			<p dangerouslySetInnerHTML={{__html: `

				`}}
			/>

		</div>
	</div>
);
