
import Router from './libs/router';

import Menu from './components/menu';
import RouterLinks from './components/links';

//  All mountables(elements to mount when the router is set up)
const mountElems= [
	new Menu(),
	new RouterLinks(),
];

// Add a route change listener
Router.onRouteChange(() => {

	if(window.location.hash.length)
		window.location.hash= '';

	mountElems[0].hide();
});

// Router configuration
Router
	.add({ url: '/' })
	.add({ url: '/about' })
	.add({ url: '/contact' })
	.init({
		otherwise: '/',
		mounts: mountElems,
	});
