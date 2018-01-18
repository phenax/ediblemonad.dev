
const img = file => `/src/dist/img/${file}`;

const github = (projectName, title = 'Github') => ({
	title,
	url: `https://github.com/phenax/${projectName}`,
	icon: 'icon-github-circled',
});

const link = (url, title = 'Preview', icon = 'icon-link') => ({ title, url, icon });

// Order of the projects
const projectsOrder = [
	'plasmajs',
	'diary-pwa',
	'pattern-lock-js',
	'mr-senti',
	'zomato-nearby-delicacy',
	'h',
	'f-inator-3000',
	'project-venus',
	'arcade-game-project-fend',
	'oxyrouter',
];

// List of projects
const projects = {


	'project-venus': {
		complete: true,
		title: 'Venus',
		descr: 'Built an all-in-one review portal for movies, restaurants, games, TV shows, products, etc in Mumbai Hackathon 2017.',
		image: img('venus.png'),
		tags: ['nodejs', 'react', 'mongodb'],
		links: [github('project-venus')],
	},

	'f-inator-3000': {
		complete: true,
		title: 'Fuckinator 3000',
		descr: 'It\'s a.... it can be used for..... nothing. It basically converts your sentence into a better sentence.',
		image: '',
		tags: ['node', 'preact', 'nlp'],
		links: [github('f-inator-3000')],
	},

	'h': {
		complete: true,
		title: 'H Kotlin',
		descr: `Built a simple, easy to use, library for HTML templating in kotlin.
			It allows you to write re-usable components in Kotlin.`,
		image: img('h.png'),
		tags: ['kotlin', 'html', 'jvm'],
		links: [github('h')],
	},
	
	'pattern-lock-js': {
		complete: true,
		title: 'Pattern Lock JS',
		descr: 'Built a customizable pattern lock JavaScript library for the web. It uses HTML5 canvas.',
		image: img('pattern.png'),
		tags: ['canvas', 'pattern'],
		links: [github('pattern-lock-js')],
	},

	'mr-senti': {
		complete: true,
		title: 'Mr. Senti',
		descr: `Build a demo for sentiment analysis in python.
			It uses Support Vector Machine to classify the provided string as "happy" or "sad"`,
		image: '',
		tags: ['python', 'scikit-learn', 'flask', 'machine-learning'],
		links: [
			link('http://mr-senti.herokuapp.com/'),
			github('mr-senti'),
		],
	},

	'plasmajs': {
		complete: true,
		title: 'PlasmaJS',
		descr: `Built an isomorphic NodeJS framework powered with React for building web apps.
			It has features like declarative syntax, isomorphic routing, isolated routing for building REST APIs, middlewares, ES2015 syntax with babel`,
		image: img('plasma.png'),
		tags: ['react', 'node', 'isomorphic'],
		links: [ github('plasmajs') ],
	},

	'diary-pwa': {
		complete: true,
		title: 'Diary PWA',
		descr: `Build a progressive web app in Kotlin that lets you carry a personalized secure diary in your pocket.
			Write down memories, keep your thoughts and ideas for the day in one place.
			You can also enable pattern lock for each session making your diary even more secure.`,
		image: img('diary-pwa.png'),
		tags: ['go-lang', 'graphql', 'preact', 'pwa'],
		links: [ github('diary-pwa') ],
	},

	'zomato-nearby-delicacy': {
		complete: true,
		title: 'Nearby Delicacies',
		descr: 'Built a simple web app that uses the zomato api to search restaurants in a 1KM radius.',
		image: img('zomato.png'),
		tags: ['knockout', 'zomato'],
		links: [
			link('https://phenax.github.io/zomato-nearby-delicacy/static/'),
			github('zomato-nearby-delicacy'),
		]
	},

	'arcade-game-project-fend': {
		complete: true,
		title: 'Evil Bugs Game',
		descr: `Built an arcade game(Evil Bugs[Brilliant name, right?]) with the objective of collecting stars and
			bringing them back to the grass area. Thats it, I think.... Oh, and the bugs are evil. So... avoid them.`,
		image: img('evil_bugs.png'),
		tags: ['canvas', 'game'],
		links: [
			link('https://phenax.github.io/arcade-game-project-fend/'),
			github('arcade-game-project-fend'),
		]
	},

	'oxyrouter': {
		complete: true,
		title: 'OxyRouter',
		descr: `Built a javascript library that makes hash-based routing easy to use.
			It uses handlebars to render templates and has a very simple api.`,
		image: img('oxyrouter.png'),
		tags: ['router', 'hash', 'handlebars'],
		links: [
			link('http://phenax.github.io/oxyrouter/#/', 'Docs + Demo'),
			github('oxyrouter'),
		]
	}
};


export default projectsOrder
	.map(key => projects[key])
	.filter(k => !!k);

