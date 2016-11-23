
import { EventEmitter } from 'events';


/**
 * Router class for handling client-side routing
 */
class Router extends EventEmitter {

	// Route update event listener
	static get ROUTE_CHANGE() { return 'ROUTE_CHANGE'; }

	constructor() {
		super();

		// All routes
		this.routes= new Map();

		this._routeChangeHandler= this._routeChangeHandler.bind(this);
		this.triggerUpdate= this.triggerUpdate.bind(this);
	}

	// Initialize router
	init(config) {

		this.baseUrl= config.baseUrl || '/';
		this.otherwise= config.otherwise || '/';
		this.mounts= config.mounts || [];

		// When the router initializes, mount all mountables
		this.mounts.forEach( elem => elem.onMount());

		// All the view elements in the DOM
		this.$views= document.querySelectorAll('[data-view]');

		this._attachEventHandlers();

		// Trigger a manual update to check what route the user is currently in
		this.triggerUpdate();

		return this;
	}


	// Attach route change handler to events
	_attachEventHandlers() {

		// Attach route change handler
		this.onRouteChange(this._routeChangeHandler);

		// Attach route change handler to popstate listener
		window.addEventListener('popstate', this._routeChangeHandler);
	}


	// Is called when the route changes(To trigger view update)
	_routeChangeHandler() {

		// Resolve a url i.e. get rid of extra '/'
		const resolveRoute= (url) => `${this.baseUrl}/${url}`.replace(/[\/]+/gi, '/');

		// Find the matching route for the current url
		const matchingRoute= this.routes.get(
			resolveRoute(
				window.location.pathname.replace(/\/$/, '')
			)
		);

		// If a match exists
		if(matchingRoute) {

			// Call the controller and if it returns true, dont render view
			if(matchingRoute.controller && matchingRoute.controller())
				return;

			// Render view for the route
			this.showView(matchingRoute);
		} else {

			// If a match is not found, navigate back to the default(this.otherwise) route
			this.trigger(this.otherwise);
		}
	}

	// Get view for a route
	getView(routeUrl) {

		// For each views, filter out the ones that match the current route
		return Array
			.from(this.$views)
			.filter(
				$el => $el.dataset.view === routeUrl
			);
	}

	// Render the view
	showView(route) {

		const $views= this.getView(route.url);

		if($views.length) {

			// If the view is already rendered, dont re-render
			if($views.filter($view => ($view.dataset.active === 'true')).length) {
				return;
			}

			// "Un-render" all other views
			Array
				.from(this.$views)
				.filter( $el => $el !== $views[0] )
				.forEach(
					$el => 
						$el.removeAttribute('data-active')
					);

			// Render the current view
			$views.forEach( $view => { $view.dataset.active= 'true'; });
		}
	}

	// Add a new route
	add(route={}) {

		// If the route had a url field, add the route
		if(route.url)
			this.routes.set(route.url, route);

		return this;
	}

	// Navigate to a new url
	trigger(url) {

		// Change history
		history.pushState({}, null, url);

		// Update view
		this.triggerUpdate();
	}

	// Trigger view update
	triggerUpdate() {
		this.emit(Router.ROUTE_CHANGE);
	}

	// Add route change listeners
	onRouteChange(callback) {
		this.on(Router.ROUTE_CHANGE, callback);
	}

	// Remove route change listeners
	removeListener(callback) {
		this.off(Router.ROUTE_CHANGE, callback);
	}
}

// Create and export an instance of the router
export default new Router();
