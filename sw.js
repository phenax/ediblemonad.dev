
// Cache names
const STATIC_FILE_CACHE= 'static_cache_v1';
const FILES_PRECACHE= 'precache_v1';



/**
 * List of files to precache
 * 
 * @type {Array}
 */
const precache= [

];



/**
 * Routes for network requests made from the app
 * 
 * @type {Array}
 */
const fileRoutes= [

	// All pages(/, /about, /contact, /skills)
	/^(https?\:)\/\/([^\/])*\/((about|contact|skills)\/?)?$/gi,

	// All static files
	/\/src\/dist\/(css|js|img|fontello)/gi,

	// json, xml config and other(external) js files
	/\.(json|xml|js)$/gi,

	// All images that are not in the src/dist directory
	/\.(png|ico|jpg)$/gi,

	// External font
	/fonts\.(.*)\.com\//gi,
];





/**
 * Cache first strategy for responding to network requests
 * 
 * @param  {FetchEvent} event  Fetch event
 * 
 * @return {Promise}           Response promise
 */
const cacheFirst= event => 
	caches
		.match(event.request)
		.then( res => res ||
			fetch(event.request)
				.then( response => 
					caches
						.open(STATIC_FILE_CACHE)
						.then(cache => {
							cache.put(event.request, response.clone());
							return response;
						})
				)
		);



// onInstall
self.addEventListener('install', e => {

	e.waitUntil(
		caches
			.open(FILES_PRECACHE)
			.then(cache => cache.addAll(precache))
	);
});


// onFetch
self.addEventListener('fetch', e => {

	const reqUrl= e.request.url;

	// If its not an http or https request(to ignore browser extensions, etc)
	if(!(/^(https?)\:\/\//gi.test(reqUrl)))
		return;


	// Look for the first route that matches the current request
	const matchResult= fileRoutes.find(route => {

		// For regex
		if(route instanceof RegExp)
			return route.test(reqUrl) || route.test(reqUrl);     // TODO: Fix this wierd thing or report it if its a bug

		// For strings(maybe in the future I'll need it)
		else if(typeof route === 'string')
			return reqUrl.endsWith(route);
	});


	console.log(reqUrl, matchResult);


	// If there is a matching route, respond with cacheFirst strategy(promise)
	if(matchResult)
		e.respondWith(cacheFirst(e));
});
