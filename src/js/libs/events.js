
/**
 * Lightweight EventEmitter api
 */
export default class EventHandler {

	_eventStack = {};

	on(eventName, callback) {
		this._eventStack[eventName] = this._eventStack[eventName] || [];
		this._eventStack[eventName].push(callback);
	}

	off(eventName, callback) {
		const index = this._eventStack[eventName].indexOf(callback);
		(index !== -1) && this._eventStack[eventName].splice(index, 1);
	}

	emit(eventName, ...args) {
		(this._eventStack[eventName] || [])
			.forEach(cb => cb(...args));
	}
}
