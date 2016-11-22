
/**
 * Head
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

export default class Head extends React.Component {
	render() {
		return (
			<head>
				<title>{this.props.title}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
		);
	}
}

Head.propTypes= {
	title: React.PropTypes.string.isRequired
};
