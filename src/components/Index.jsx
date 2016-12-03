
/**
 * Index
 *
 * The main layout that has everything
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

export default class IndexLayout extends React.Component {


	// All the routes
	static pages= [
		{
			url: '/',
			title: 'Work',
			descr: 'Cool projects(not bragging)',
			menu: true,
		},
		{
			url: '/about',
			title: 'About Me',
			descr: 'Some info about this metal head',
			menu: true,
		},
		{
			url: '/skills',
			title: 'Skills',
			descr: 'I haz mad 5killz bro',
			menu: true,
		},
		{
			url: '/contact',
			title: 'Contact',
			descr: 'Get in touch',
			menu: true,
		}
	];


	render() {

		// TODO: Look for a no js solution to this
		const asyncLoad= {
			media: 'bullshit-media-query-to-trick-the-browser',
			id: 'asyncStyleSheet',
			rel: 'stylesheet',
		};

		return (
			<html>

				<Head title='Akshay Nair' />

				<body>

					{/* Load when theres nothing left to block */}
					<link {...asyncLoad} lazyload href='//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' />
					<link {...asyncLoad} lazyload href='//fonts.googleapis.com/css?family=Raleway:100,400|Oswald:300,400' />

					{ /* In the body to prevent render blocking */ }
					<link href='/src/dist/css/style.css' rel='stylesheet' />


					<MainMenu items={IndexLayout.pages.filter( page => page.menu )}>
						{/*<a href='/'>*/}
		
						<div className='logo'>
							<img className='logo__img' src='/src/dist/img/logo.png' />
							<div className='logo__text'>Hey There</div>
						</div>
		
						{/*</a>*/}
					</MainMenu>

					<TopBar />
					<Banner name='Akshay Nair' subtitle='Full Stack Web Developer' />

					<Container page={this.props.page.url} />

					<Footer />

					<script async defer src='/src/dist/js/script.js'></script>
					<script dangerouslySetInnerHTML={{ __html: this.deferAsyncForLinks }} />
				</body>
			</html>
		);
	}


	deferAsyncForLinks= `

		document.addEventListener('DOMContentLoaded', function loadStyleSheets() {

			var $deferLinksWrapper= document.getElementById('deferedStylesheets');
			var $asyncLinks= document.querySelectorAll('#asyncStyleSheet');

			Array.from($asyncLinks)
				.forEach(function($link) {
					$link.setAttribute('media', 'all');
				});					

			if($deferLinksWrapper) {
				var $wrapper= document.createElement('div');
				$wrapper.innerHTML= $deferLinksWrapper.textContent;

				document.body.appendChild($wrapper);
			}
		});

	`.replace(/\s+/g, ' ');


	static propTypes= {
		page: React.PropTypes.object.isRequired
	};
}

