
import Component from '../component';

export default class RouterLinks extends Component {

	constructor(props) {
		super(props);
		
		this.$allLinks= document.querySelectorAll('[data-route]');

		this.initializeLister();
	}

	initializeLister() {

		this._linkClickHandler= this._linkClickHandler.bind(this);

		this.addListeners(
			this.$allLinks, 'click',
			this._linkClickHandler
		);
	}

	_linkClickHandler(e) {
		if('history' in window && 'pushState' in window.history) {
			e.preventDefault();
		} else return;

		// Trigger view change

	}

}
