
import Component from '../component';

export default class Menu extends Component {

	constructor(selector) {
		super();

		this.$menu= document.querySelector(selector);

		this.$openMenuBtns= document.querySelectorAll('.js-open-menu');
		this.$closeMenuBtns= document.querySelectorAll('.js-close-menu');

		this._menuModifierClass= 'menu--visible';

		this._initListeners();
	}

	_initListeners() {

		this._openMenuClickHandler= this._openMenuClickHandler.bind(this);
		this._closeMenuClickHandler= this._closeMenuClickHandler.bind(this);

		this.addListeners(
			this.$openMenuBtns, 'click',
			this._openMenuClickHandler
		);

		this.addListeners(
			this.$closeMenuBtns, 'click',
			this._closeMenuClickHandler
		);
	}

	_openMenuClickHandler(e) {
		e.preventDefault();

		this.$menu.classList.add(this._menuModifierClass);
	}

	_closeMenuClickHandler(e) {
		e.preventDefault();

		this.$menu.classList.remove(this._menuModifierClass);
	}

}
