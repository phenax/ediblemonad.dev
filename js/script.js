
import Menu from './components/menu';

if(window.location.hash.length)
	window.location.hash= '';

new Menu('.js-menu');
