
import Router from './libs/router';

import Menu from './components/menu';
import RouterLinks from './components/links';

const mountElems= [
	new Menu(),
	new RouterLinks(),
];

Router.onRouteChange(() => {

	if(window.location.hash.length)
		window.location.hash= '';

	mountElems[0].hide();
});

Router
	.add({ url: '/' })
	.add({ url: '/about' })
	.init({
		otherwise: '/',
		mounts: mountElems,
	});
