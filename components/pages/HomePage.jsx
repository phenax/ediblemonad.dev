
/**
 * HomePage
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


export default class HomePage extends React.Component {
	render() {
		return (
			<div class='home-view' data-view='/'>
				<div class='work'>

					<div class='work__project'>
						<div class='wrap row'>
							<div class='col block block-bg'></div>
							
							<div class='col block block-sm'>
							
								<div class='block__title'>Project Title</div>
							
								<div class='block__content'>
									Alcohol concrete neon tube table shrine DIY rebar. Market convenience store Chiba tanto cartel assassin range-rover woman fluidity pistol narrative.
								</div>
							
								<div class='block__links'>
									<a class='block__links__a fa fa-link' href='#'>Docs</a>
									<a class='block__links__a fa fa-github' href='#'>Github</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
