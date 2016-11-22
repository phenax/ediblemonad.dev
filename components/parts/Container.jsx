
/**
 * Container
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

import HomePage from '../pages/HomePage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import SkillsPage from '../pages/SkillsPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';

export default class Container extends React.Component {
	render() {

		const activeProps= {
			home: { active: false },
			about: { active: false },
			skills: { active: false },
			contact: { active: false },
		};

		if(this.props.page in activeProps) {
			activeProps[this.props.page].active= true;
		}

		return (
			<section class='container'>
				
				<HomePage    {...activeProps.home} />
				<AboutPage   {...activeProps.about} />
				<SkillsPage  {...activeProps.skills} />
				<ContactPage {...activeProps.contact} />

			</section>
		);
	}
}

Container.propTypes= {
	page: React.PropTypes.string.isRequired
};
