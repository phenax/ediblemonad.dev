import React from 'react';
import { Helmet } from 'react-helmet';

import PageLayout from '../page-layout';

import s from '../styles/page.module.scss';

const AboutPage = () => (
  <PageLayout title="About me" headerProps={{ title: 'About Me', subtitle: '' }}>
    <h2 className={s.title}>Hello world</h2>

    <p className={s.para}>
      I am Akshay, a full-stack web developer with an obsession for writing maintainable, performant code.
			I live in Mumbai, India. I am passionate about JavaScript, Linux, writing open source software and all things tech.
    </p>

    <p className={s.para}>
      I build optimized and scalable back-ends with technologies like NodeJS(ExpressJS, PlasmaJS, KoaJS),
      Kotlin(Vert.X), Golang, Python(flask, japronto, sanic) and PHP(CakePHP).
      For the front-end, I enjoy messing around with libraries like ReactJS(preact or nerv), HyperHTML, jQuery, RxJS.
      Also, I am a pro-platform guy in all places possible,
      i.e. DOM over jQuery, fetch over axios, webcomponents over the other component libraries, and so on.
    </p>

    <p className={s.para}>
      Also, I love music. A lot!
			Some of my favorite bands at the time of writing this are Amon Amarth, Avatar, Gojira, Trivium, Killswitch Engage, August Burns Red, etc.
    </p>
  </PageLayout>
);

export default AboutPage;
