
import { EventEmitter } from 'events';

class Router extends EventEmitter {

	static get ROUTE_CHANGE() { return 'ROUTE_CHANGE'; }

	constructor() {
		super();

		this.routes= [];

		this._routeChangeListener= this._routeChangeListener.bind(this);

		this.onRouteChange(this._routeChangeListener);
	}

	init(config) {

		this.baseUrl= config.baseUrl || '/';
		this.otherwise= config.otherwise || '/';
		this.mounts= config.mounts || [];

		this.mounts.forEach( elem => {
			elem.onMount();
		});

		this.$views= document.querySelectorAll('[data-view]');

		return this;
	}

	_routeChangeListener() {

		this.routes
			.forEach( route => {

				const currentUrl= `${this.baseUrl}/${location.pathname}`.replace(/[\/]+/gi, '/');

				if(route.url == currentUrl) {
					if(route.controller)
						route.controller();

					this.showView(route);
				}
			});
	}

	getView(view) {
		return Array
			.from(this.$views)
			.filter(
				$el => $el.dataset.view === view
			);
	}

	showView(route) {
		const $el= this.getView(route.url);

		if($el.length) {
			console.log($el);
		}
	}

	add(route={}) {

		this.routes.push(route);

		return this;
	}

	trigger(url) {
		history.pushState({}, null, url);
		this.emitRouteChange();
	}

	emitRouteChange() {
		this.emit(Router.ROUTE_CHANGE);
	}

	onRouteChange(callback) {
		this.on(Router.ROUTE_CHANGE, callback);
	}

	removeListener(callback) {
		this.off(Router.ROUTE_CHANGE, callback);
	}
}

const router= new Router();

export default router;