
/**
 * MainMenu
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


export default class MainMenu extends React.Component {
	render() {
		return (
			<div class='menu row js-menu' id='menu'>
				<div class='menu__section col menu__side hide-2'>
					<div>Hullo There</div>
				</div>
				<ul class='menu__section col menu__list'>
					<a href='#' class='menu__closebtn js-close-menu fa fa-close'></a>

					<li class='menu__list__li'>
						<a href='/' class='menu__list__link' data-route>
							<div class='title'>Work</div>
							<div class='descr'>Cool projects(not bragging)</div>
						</a>
					</li>

					<li class='menu__list__li'>
						<a href='/about' class='menu__list__link' data-route>
							<div class='title'>About</div>
							<div class='descr'>Some info about this metal head</div>
						</a>
					</li>

					<li class='menu__list__li'>
						<a href='/contact' class='menu__list__link' data-route>
							<div class='title'>Skills</div>
							<div class='descr'>I haz mad 5killz bro</div>
						</a>
					</li>

					<li class='menu__list__li'>
						<a href='/contact' class='menu__list__link' data-route>
							<div class='title'>Contact</div>
							<div class='descr'>Get in touch</div>
						</a>
					</li>
				</div>
			</div>
		);
	}
}

MainMenu.propTypes= {
	
};
