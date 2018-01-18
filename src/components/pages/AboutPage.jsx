
/**
 * AboutPage
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

const Para= 
	props => 
		<p dangerouslySetInnerHTML={{__html: props.content.replace(/\s+/g, ' ')}}/>;

export default props => (

	<div className='about-view about page-wrapper' data-view='/about' data-active={props.active.toString()}>

		<div className='page-wrapper__title'>Yo</div>

		<div className='page-wrapper__text'>

			<Para content={`
				I am Akshay, a full-stack web developer with an obsession for writing maintainable, performant code.
				I live in Mumbai, India. I am passionate about JavaScript, Linux, writing open source software and all things tech.
			`} />

			<Para content={`
				I build optimized and scalable back-ends with technologies like NodeJS(ExpressJS, PlasmaJS, KoaJS),
				Kotlin(Vert.X), Golang, Python(flask, japronto, sanic) and PHP(CakePHP).
				For the front-end, I enjoy messing around with libraries like ReactJS(preact or nerv), HyperHTML, jQuery, RxJS.
				Also, I am a pro-platform guy in all places possible,
				i.e. DOM over jQuery, fetch over axios, webcomponents over the other component libraries, and so on.
			`} />

			<Para content={`
				<div>And about this website....</div>
				I built a react based build script to generate static pages out of react components.
				(<a href="https://github.com/phenax/phenax.github.io" target="_blank _parent" rel="noopener">Check the code out here</a>)
				Also, I made sure it works fine even when the browser doesn't support JavaScript.
			`} />

			<Para content={`
				Also, I love music.
				Some of my favorite bands are Amon Amarth, Avatar, Gojira, Trivium, Killswitch Engage, August Burns Red, etc.
			`} />
		</div>
	</div>
);
