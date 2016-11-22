
/**
 * Index
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

import Head from './parts/Head.jsx';
import TopBar from './parts/TopBar.jsx';
import Banner from './parts/Banner.jsx';
import Footer from './parts/Footer.jsx';
import MainMenu from './parts/MainMenu.jsx';
import Container from './parts/Container.jsx';

export default class Index extends React.Component {

	render() {

		return (
			<html>
			<Head title='Akshay Nair' />
			<body>
				<MainMenu />
				<TopBar />
				<Banner />

				<Container />

				<Footer />

				{ /* In the body to prevent render blocking */ }
				<script async defer src='./dist/js/script.js'></script>

				<link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
				<link href="//fonts.googleapis.com/css?family=Raleway:100,400|Oswald:300,400" rel="stylesheet" />
				<link href="./dist/css/style.css" rel="stylesheet" />
			</body>
			</html>
		);
	}
}
