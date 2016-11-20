
export default class Component {

	constructor() {
		
	}

	onMount() {}

	onUnMount() {}

	addListeners($elems, events, callback) {

		Array
			.from($elems)
			.forEach(
				($el) => this.addListener($el, events, callback)
			);
	}

	addListener($el, events, callback) {

		events
			.split(' ')
			.forEach(
				event => $el.addEventListener(event, callback)
			);
	}

	removeListeners($elems, events, callback) {

		Array
			.from($elems)
			.forEach(
				($el) => this.removeListener($el, events, callback)
			);
	}

	removeListener($el, events, callback) {

		events
			.split(' ')
			.forEach(
				event => $el.removeEventListener(event, callback)
			);
	}
}
