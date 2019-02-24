import React from 'react';
import { Helmet } from 'react-helmet';

import PageLayout from '../page-layout';

const AboutPage = () => (
  <PageLayout headerProps={{ title: 'About Me', subtitle: '' }}>
    <Helmet>
      <title>About me | Akshay Nair</title>
    </Helmet>
    ABOUT MOI
  </PageLayout>
);

export default AboutPage;
