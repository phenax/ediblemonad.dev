import React from 'react';
import { Helmet } from 'react-helmet';

import Menu from './components/Menu';

interface Props {
  children: any,
  title?: string,
  description?: string,
  keywords?: string,
};

const PageLayout = ({ children,title, description, keywords, ...props }: Props) => (
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

export default PageLayout;
