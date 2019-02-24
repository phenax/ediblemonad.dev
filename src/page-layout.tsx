import React from 'react';
import { Helmet } from 'react-helmet';

import Menu from './components/Menu';

type Props = {
  children: any
  title?: string
  description?: string
  keywords?: string
};

const defaultProps = {
  title: 'Akshay Nair',
  description: 'Akshay Nair is a full stack web developer with a passion for writing performant, maintainable code.',
  keywords: 'akshay, nair, functional, programming, performant, javascript, react, developer, code, github',
};

const PageLayout = (passedProps: Props) => {
  const { children, title, description, keywords, ...props } = { ...defaultProps, ...passedProps };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
  
      <div {...props}>
        <Menu />
        <main>
          {children}
        </main>
      </div>
    </>
  );
};

export default PageLayout;
