import React, { useState } from 'react';
import cx from 'classnames';
import { Link } from 'gatsby';

import styles from './Menu.module.scss';
import rootStyles from '../../styles/common.module.scss';

const items = [
  {
    url: '/',
    title: 'Projects',
    descr: 'Fun stuff',
  },
  {
    url: '/about',
    title: 'About Me',
    descr: 'Know more about this metal-head',
  },
  {
    url: '/blog',
    title: 'My blog',
    descr: 'I post about FP, react, etc',
  },
  {
    url: '/skills',
    title: 'Skills',
    descr: 'I haz m@d 5ki11z br0',
  },
  {
    url: '/contact',
    title: 'Contact',
    descr: 'Get in touch',
  },
];

const Menu = () => {
  const [isOpen, setMenuState] = useState(false);

  const onMenuToggle = (nextState: boolean) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setMenuState(nextState);
  };

  return (
    <div>
      <div className={styles.topbar}>
        <div className={styles.topbarMenubtn}>
          <a href='#menu' className='icon-menu' onClick={onMenuToggle(true)}>Click me</a>
        </div>
      </div>
      <div className={cx(styles.menu, rootStyles.row, { [styles.menu_visible]: isOpen })} id='menu'>
        <div className={cx(styles.menuSection, styles.menuSide, rootStyles.hideOnSm, rootStyles.col)}>
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
                <Link to={item.url} className={cx(styles.menuListLink)}>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.descr}>{item.descr}</div>
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
