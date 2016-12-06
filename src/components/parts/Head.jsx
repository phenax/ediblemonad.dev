
/**
 * Head
 *
 * The stuff that goes inside the <head>
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

export default (props) => {

	const descr= 'Akshay Nair is a full stack web developer with a passion for writing performant, maintainable code.';
	const url= 'https://phenax.github.io/';
	const logo= '/src/dist/img/logo.png';

	return (
		<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<meta name="keywords" content="akshay, nair, full stack, web, web developer, front end, programming" />

			<meta name="description" content={descr} />

			<meta property="og:url" content={url} />
			<meta property="og:image" content={logo} />
			<meta property="og:description" content={descr} />
			<meta property="og:title" content={props.title} />
			<meta property="og:site_name" content={props.title} />
			<meta property="og:see_also" content={url} />

			<meta itemprop="name" content={props.title} />
			<meta itemprop="description" content={descr} />
			<meta itemprop="image" content={logo} />

			<meta name="twitter:card" content="summary" />
			<meta name="twitter:url" content={url} />
			<meta name="twitter:title" content={props.title} />
			<meta name="twitter:description" content={descr} />
			<meta name="twitter:image" content={logo} />

			<meta name="theme-color" content="#252C33" />
			<meta name="apple-mobile-web-app-status-bar-style" content="black" />

			<title>{props.title}</title>

			<link rel="apple-touch-icon" href={logo} />
			<link rel="icon" sizes="192x192" href={logo} />
			<link rel="apple-touch-startup-image" href={logo} />
			<meta name="msapplication-square310x310logo" content={logo} />

			<link rel="manifest" href="/manifest.json" />
			<link rel="author" href="https://plus.google.com/u/0/108089047891809102209" />
			<link rel="canonical" href={url} />
		</head>
	);
};

