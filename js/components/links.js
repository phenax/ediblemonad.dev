
import Component from '../component';
import Router from '../libs/router';

export default class RouterLinks extends Component {

	constructor(props) {
		super(props);
		
		this.$allLinks= document.querySelectorAll('[data-route]');

		this.initializeLister();
	}

	initializeLister() {

		if('history' in window && 'pushState' in window.history) {
			this._linkClickHandler= this._linkClickHandler.bind(this);
			
			this.addListeners(
				this.$allLinks, 'click',
				this._linkClickHandler
			);
		}
	}

	_linkClickHandler(e) {
		e.preventDefault();

		// Trigger view change
		Router.trigger(e.currentTarget.getAttribute('href'));
	}
}
