
const img = file => `/src/dist/img/${file}`;

const github = (projectName, title = 'Github') => ({
	title,
	url: `https://github.com/phenax/${projectName}`,
	icon: 'icon-github-circled',
});

const link = (url, title = 'Preview', icon = 'icon-link') => ({ title, url, icon });

export default [
	{
		complete: true,
		title: 'PlasmaJS',
		descr: `Built an isomorphic NodeJS framework powered with React for building web apps.
			It has features like declarative syntax, isomorphic routing, isolated routing for building REST APIs, middlewares, ES2015 syntax with babel`,
		image: '',
		tags: ['react', 'node', 'isomorphic'],
		links: [ github('plasmajs') ],
	},

	{
		complete: true,
		title: 'Diary PWA',
		descr: `Build a progressive web app in Kotlin that lets you carry a personalized secure diary in your pocket.
			Write down memories, keep your thoughts and ideas for the day in one place.
			You can also enable pattern lock for each session making your diary even more secure.`,
		image: img('diary-pwa.png'),
		tags: ['go-lang', 'graphql', 'react', 'pwa'],
		links: [ github('diary-pwa') ],
	},

	{
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

	{
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

	{
		complete: true,
		title: 'OxyRouter',
		descr: `Built a javascript library that makes hash-based routing easy to use.
			It uses handlebars to render templates and has a very simple api.`,
		image: '',
		tags: ['router', 'hash', 'handlebars'],
		links: [
			link('http://phenax.github.io/oxyrouter/#/', 'Docs + Demo'),
			github('oxyrouter'),
		]
	}
];
