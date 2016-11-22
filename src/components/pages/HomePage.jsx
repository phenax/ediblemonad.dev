
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

import projectList from '../projects.jsx';


export default class HomePage extends React.Component {

	render() {

		const projects= 
			projectList
				.filter( project => project.complete )

		return (
			<div className='home-view' data-view='/' data-active={this.props.active.toString()}>

				<div className='work'>

					{projects.map(

						(project, i) => (

							<div className='work__project' key={i}>

								<div className='wrap row'>

									<div className='col block block-bg'></div>
									
									<div className='col block block-sm'>
									
										<div className='block__title'>{project.title}</div>
									
										<div className='block__content'>{project.descr}</div>
									
										<div className='block__links'>

											{project.links.map(

												link => 
													<a
														key={link.title}
														className={`block__links__a fa ${link.icon}`}
														href={link.url}>

														{link.title}
													</a>
											)}
										</div>
									</div>
								</div>
							</div>
						)
					)}

				</div>
			</div>
		);
	}
}
