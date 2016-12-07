
/**
 * MainMenu
 *
 * The fullscreen main menu
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

export default class MainMenu extends React.Component {

	static propTypes= {
		items: React.PropTypes.array.isRequired
	};

	render() {

		return (

			<div className='menu row js-menu' id='menu'>

				<div className='menu__section col menu__side hide-2'>
					{this.props.children}
				</div>

				<ul className='menu__section col menu__list'>

					<a href='#' className='menu__closebtn js-close-menu icon-cancel'></a>

					{this.props.items.map(
						item => (
							<li className='menu__list__li' key={item.url}>
								<a href={item.url} className='menu__list__link' data-route>
									<div className='title'>{item.title}</div>
									<div className='descr'>{item.descr}</div>
								</a>
							</li>
						)
					)}
				</ul>
			</div>
		);
	}
}

