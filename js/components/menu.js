
import Component from '../component';

export default class Menu extends Component {

	get classNames() {
		return {
			menu: 'js-menu',
			openMenu: 'js-open-menu',
			closeMenu: 'js-close-menu',
			menuVisible: 'menu--visible'
		};
	}

	constructor() {
		super();

		this.$menu= document.querySelector(`.${this.classNames.menu}`);

		this.$openMenuBtns= document.querySelectorAll(`.${this.classNames.openMenu}`);
		this.$closeMenuBtns= document.querySelectorAll(`.${this.classNames.closeMenu}`);

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

		this.show();
	}

	_closeMenuClickHandler(e) {
		e.preventDefault();

		this.hide();
	}

	show() {

		if(!this.$menu.classList.contains(this.classNames.menuVisible))
			this.$menu.classList.add(this.classNames.menuVisible);
	}

	hide() {

		if(this.$menu.classList.contains(this.classNames.menuVisible))
			this.$menu.classList.remove(this.classNames.menuVisible);
	}

}
