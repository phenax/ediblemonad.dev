
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
			className: 'asyncStyleSheet',
			rel: 'stylesheet',
			lazyload: true,
		};

		return (
			<html>

				<Head title='Akshay Nair' />

				<body>

					{/* Load when theres nothing left to block */}
					<link {...asyncLoad} href='/src/dist/fontello/css/fontello.css' />
					<link {...asyncLoad} href='//fonts.googleapis.com/css?family=Raleway:100,400|Oswald:300,400' />

					<link href='/src/dist/css/style.css' rel='stylesheet' />

					<div
						className='message-for-peeking-toms--look-here'
						dangerouslySetInnerHTML={{ __html: this.innerComment }}
					/>

					<MainMenu items={IndexLayout.pages.filter( page => page.menu )}>
						<div className='logo'>
							<img className='logo__img' src='/src/dist/img/logo/logo.png' alt={'Akshay Nair\'s logo'} />
							<div className='logo__text'>Hey There</div>
						</div>
					</MainMenu>

					<TopBar />
					<Banner name='Akshay Nair' subtitle='Full Stack Web Developer' />

					<Container page={this.props.page.url} />

					<Footer />

					<script async defer src='/src/dist/js/script.js'></script>
					<script dangerouslySetInnerHTML={{ __html: this.deferAsyncForLinks }} />
					<script dangerouslySetInnerHTML={{ __html: this.googleAnalytics }} />
				</body>
			</html>
		);
	}


	innerComment= `<!--

		Hey fellow nerd. Let me explain the stuff you might be looking for.
		It has a simple push state routing(with display:none; kinda templates. Because... I'm lazy)
		Also, I built a simple build process with react that converts stateless react components into 
		static html pages and also generates the html content for the other pages so it works even when 
		javascript is disabled.
		The font stylesheets are loaded asynchronously using the media query hack.
		And I'm planning to write a service worker too. Why? Because its my portfolio and I am a rebel.


		Check out the repo here - https://github.com/phenax/phenax.github.io
		Leave a star. Or a pull request.

-->`


	googleAnalytics= `
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-88549129-1', 'auto');
		ga('send', 'pageview');
	`.replace(/\s+/g, ' ');


	deferAsyncForLinks= `

		document.addEventListener('DOMContentLoaded', function loadStyleSheets() {

			var $deferLinksWrapper= document.getElementById('deferedStylesheets');
			var $asyncLinks= document.querySelectorAll('.asyncStyleSheet');

			for(var i= 0; i< $asyncLinks.length; i++)
				$asyncLinks[i].setAttribute('media', 'all');

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

