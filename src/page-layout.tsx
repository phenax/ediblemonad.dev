import React from 'react';
import { Helmet } from 'react-helmet';

import './helpers/jsenv';

import Menu from './components/Menu';
import PageHeader from './components/PageHeader';

import s from './styles/page.module.scss';

type Props = {
  children: any
  title?: string
  description?: string
  keywords?: string
  headerProps?: any
};

const defaultProps = {
  title: 'Akshay Nair',
  description: 'Akshay Nair is a full stack web developer with a passion for writing performant, maintainable code.',
  keywords: 'akshay, nair, functional, programming, performant, javascript, react, developer, code, github',
  headerProps: {},
};

const PageLayout = (passedProps: Props) => {
  const { children, title, description, keywords, headerProps, ...props } = { ...defaultProps, ...passedProps };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
  
      <div {...props}>
        <Menu />
        <PageHeader title={title} subtitle={description} {...headerProps} />
        <main className={s.content}>
          {children}
        </main>
      </div>
    </>
  );
};

export default PageLayout;
