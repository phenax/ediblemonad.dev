
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

		<div className='page-wrapper__title'>Hello</div>

		<div className='page-wrapper__text'>

			<Para content={`
				I'm Akshay Nair, a Full Stack Web Developer with an obsession for writing maintainable, performant code.
				I live in Mumbai, India. I am passionate about JavaScript, Linux and writing open source software.
			`} />

			<Para content={`
				I build the back-end with technologies like NodeJS(with ExpressJS, PlasmaJS and KoaJS), PHP(with FlightPHP and SlimPHP) 
				and Python(with flask and sanic(gotta go fest)).
				For the front-end, I enjoy messing around with libraries like ReactJS, jQuery, RxJS and frameworks like React+Redux, 
				PolymerJS, Angular 2. I am also a pro-platform guy, i.e. fetch over axios, custom elements v1 over the other component 
				libraries, and so on.
				I have also built stuff with React Native for developing native android applications.
			`} />

			<Para content={`
				And about this website....
				The js is built with webpack and babel, and the css files with gulp(gulp-sass). 
				For html, I built a react based build script to generate static pages out of react components.
				Also, I used progressive enhancement to make sure it works fine even when the browser doesn't support JavaScript.
			`} />

			<Para content={`
				Thats it, I guess...
				Oh.. and I listen to a lot of metal songs... Specifically, Metal-Core, Death-Core, Nu Metal, Heavy Metal, Gothic Metal,
				etc sub-genres.
			`} />

		</div>
	</div>
);
