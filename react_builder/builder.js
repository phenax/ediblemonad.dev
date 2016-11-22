#!/usr/bin/env node

/**
 * Builds jsx components into static markups and generates html pages
 */

const { resolve }= require('path');
const { writeFile }= require('fs');
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
const outputFileName= args.has('out')? args.get('out'): 'indexer.html';


// Require the component
const Layout= require(resolve(__dirname, '../', fileName)).default;

// Render the component to markup
const layoutStr= '<!DOCTYPE html>' + renderToStaticMarkup(createElement(Layout, null, null));

// Write the output to outfile
writeFile(outputFileName, layoutStr, err => {
	if(err) throw err;

	console.log('Index file has been generated');
});

