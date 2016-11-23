#!/usr/bin/env node

/**
 * Builds jsx components into static markups and generates html pages
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

const { resolve }= require('path');
const { writeFile }= require('fs-path');
const { renderToStaticMarkup }= require('react-dom/server');
const { createElement }= require('react');

require('babel-register')();

/**
 * Parse the arguments array
 */
function parseArguements(args) {
	return args
		.filter( arg => /^-\w+=(.*)$/.test(arg) )           // Filter out the args that match the format
		.map( arg => {                                      // Parse the arguements
			arg= arg.slice(1, arg.length).split('=');

			return { flag: arg[0], value: arg[1] };
		})
		.reduce( (argMap, arg) => {                         // Make it a Map
			
			argMap.set(arg.flag, arg.value);
			
			return argMap;
		}, new Map());
}



const args= parseArguements(process.argv);

// Show help message
if(args.has('help')) {
	console.log(`
Usage: node ./path/to/builder.js -file=./path/to/File.jsx -out=./outputFile.html
`);
	process.exit(0);
}

// File not specified error
if(!args.has('file')) {
	console.warn('\nNeed to specify the file with -file=../path/to/File.jsx\n');
	process.exit(1);
}


// Get the filename
const fileName= args.get('file');
const outputFileName= args.has('out')? args.get('out'): 'output.html';


// Require the component
const Layout= require(resolve('./', fileName)).default;

// For each of the pages in the router, create a directory
Layout.pages.forEach(

	page => {

		const props= { page };
		
		// Render the component to markup
		const layoutStr= '<!DOCTYPE html>' + renderToStaticMarkup(createElement(Layout, props, null));

		const filePath= resolve('.' + page.url, outputFileName);

		// Write the output to outfile
		writeFile(filePath, layoutStr, err => {
			if(err) throw err;

			console.log(`${page.title} -- rendered at ${filePath}`);
		});
	}
);
