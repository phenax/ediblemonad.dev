
export default class Component {

	addListeners($elems, events, callback) {

		Array
		.from($elems)
		.forEach(
			($el) =>
				this.addListener($el, events, callback)
		);
	}

	addListener($el, events, callback) {

		events
			.split(' ')
			.forEach(
				event =>
					$el.addEventListener(event, callback)
			);
	}
}
