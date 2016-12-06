
/**
 * Footer
 *
 * Page footer
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


export default class Footer extends React.Component {
	render() {
		return (
			<footer className='footer'>
				<div className='footer__bottom'>All rights reserved. Akshay Nair 2016 &copy;</div>
			</footer>
		);
	}
}

/*
				<div className='footer__links row'>
					<div className='col'><a href='/blog' className='footer__links__a'>Blog</a></div>
					<div className='col'><a href='#' className='footer__links__a'>Lab</a></div>
					<div className='col'><a href='#' className='footer__links__a'>Awesome</a></div>
				</div>

 */