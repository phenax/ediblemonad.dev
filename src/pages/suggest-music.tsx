import React from 'react';

import PageLayout from '../page-layout';

const SuggestMusic = () => (
  <PageLayout title="Suggest me a song" headerProps={{ title: 'Suggest me a song', subtitle: 'Some of my favorite bands at the time of writing this are Amon Amarth, Avatar, Gojira, Trivium, Killswitch Engage, August Burns Red, etc.' }}>
    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfYvp7duybhojhS1LhpT4ulk_obweXDTye1biQl3UyWCk10yA/viewform?embedded=true" height="515" style={{ width: '100%', border: 'none' }}>Loading...</iframe>
  </PageLayout>
);

export default SuggestMusic;

