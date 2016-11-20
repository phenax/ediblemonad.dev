
import Menu from './components/menu';
import RouterLinks from './components/links';

if(window.location.hash.length)
	window.location.hash= '';

new Menu();
new RouterLinks();
