
import Router from './libs/router';

import menu from './components/menu';
import routerLinks from './components/links';

//  All mountables(elements to mount when the router is set up)
const mountElems= [
	menu,
	routerLinks,
];

// If it supports pushState routing
if('history' in window && 'pushState' in window.history) {

	// Add a route change listener
	Router.onRouteChange(() => {

		// Remove hash(if the user had js disabled and just enabled it)
		if(window.location.hash.length)
			window.location.hash= '';

		// Hide menu
		menu.hide();
	});

	// Router configuration
	Router
		.add({ url: '/' })
		.add({ url: '/about' })
		.add({ url: '/skills' })
		.add({ url: '/contact' })
		.init({
			otherwise: '/',
			mounts: mountElems,
		});
} else {

	// Else mount the elements
	mountElems.forEach( el => el.onMount() );
}