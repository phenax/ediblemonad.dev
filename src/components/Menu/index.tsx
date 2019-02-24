import React, { useState } from 'react';
import cx from 'classnames';

import styles from './Menu.module.scss';
import rootStyles from '../../styles/common.module.scss';

const items = [
  { url: '/', title: 'Hello', descr: 'Wowwowww sd' },
  { url: '/adsf', title: 'Hello', descr: 'Wowwowww sd' },
  { url: '/1234', title: 'Hello', descr: 'Wowwowww sd' },
];

const Menu = () => {
  const [isOpen, setMenuState] = useState(false);

  const onMenuToggle = (nextState: boolean) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setMenuState(nextState);
  };

  return (
    <div>
      <div className="header">
        <div className='header__child header__menubtn'>
          <a href='#menu' className='icon-menu' onClick={onMenuToggle(true)}>Click me</a>
        </div>
      </div>
      <div className={cx(styles.menu, rootStyles.row, { [styles.menu_visible]: isOpen })} id='menu'>
        <div className={cx(styles.menuSection, styles.menuSide, 'hide-2', rootStyles.col)}>
          <div className={styles.logo}>
            <img className={styles.logoImg} src="/logo/logo.png" alt={'Akshay Nair\'s logo'} />
            <div className={styles.logoText}>Hey There</div>
          </div>
        </div>

        <ul className={cx(styles.menuSection, styles.menuList, rootStyles.col)}>
          <a href='#' className={cx(styles.menuClosebtn, 'icon-cancel')} onClick={onMenuToggle(false)}></a>

          {items.map(
            item => (
              <li className={cx(styles.menuListLi)} key={item.url}>
                <a href={item.url} className={cx(styles.menuListLink)} data-route>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.descr}>{item.descr}</div>
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
