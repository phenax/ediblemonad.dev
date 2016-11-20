
import Router from './libs/router';

import Menu from './components/menu';
import RouterLinks from './components/links';

if(window.location.hash.length)
	window.location.hash= '';

const mountElems= [
	new Menu(),
	new RouterLinks(),
];

Router
	.add({
		url: '/'
	})
	.add({
		url: '/about'
	})
	.init({
		otherwise: '/',
		mounts: mountElems,
	});
