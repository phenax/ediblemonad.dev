import React from 'react';
import { Helmet } from 'react-helmet';

import PageLayout from '../page-layout';

const AboutPage = () => (
  <PageLayout title="About me" headerProps={{ title: 'About Me', subtitle: '' }}>
    ABOUT MOI
  </PageLayout>
);

export default AboutPage;
