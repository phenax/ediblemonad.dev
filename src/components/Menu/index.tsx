import React, { useState } from 'react';
import cx from 'classnames';
import { Link, graphql, useStaticQuery } from 'gatsby';

import styles from './Menu.module.scss';
import rootStyles from '../../styles/common.module.scss';

import { getImageSrc } from '../../helpers/image';

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
  const { file: { childImageSharp: { fixed: logoImg = { src: '' } } = {} } = {} } = useStaticQuery(query);

  const onMenuToggle = (nextState: boolean) => (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setMenuState(nextState);
  };

  return (
    <div>
      <div className={styles.topbar}>
        <div className={styles.topbarMenubtn}>
          <a href='#menu' className='icon-menu' onClick={onMenuToggle(true)} />
        </div>
      </div>
      <div className={cx(styles.menu, rootStyles.row, { [styles.menu_visible]: isOpen })} id='menu'>
        <div className={cx(styles.menuSection, styles.menuSide, rootStyles.hideOnSm, rootStyles.col)}>
          <div className={styles.logo}>
            <img className={styles.logoImg} draggable={false} src={getImageSrc(logoImg)} />
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

export const query = graphql`
  query MenuData {
    file(relativePath: {eq: "images/logo/logo.png"}) {
      childImageSharp {
        fixed(quality: 80, width: 340) {
          src
          srcWebp
          srcSet
          srcSetWebp
        }
      }
    }
  }
`;

export default Menu;
