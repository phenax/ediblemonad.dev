import React from 'react';

import PageLayout from '../page-layout';
import Contacts from '../components/Contacts';

export default () => (
  <PageLayout title="Contact Me" headerProps={{ title: 'Contact Me', subtitle: 'Wanna get in touch?' }}>
    <Contacts />
  </PageLayout>
);
