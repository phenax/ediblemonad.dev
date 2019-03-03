import React from 'react';

import PageLayout from '../page-layout';

import s from '../styles/page.module.scss';

const AboutPage = () => (
  <PageLayout title="About me" headerProps={{ title: 'About Me', subtitle: '' }}>
    <h2 className={s.title}>
      print "Hello world";
    </h2>

    <p className={s.para}>
      I am Akshay, a full-stack web developer with an obsession for writing functional, maintainable, performant code.
			I live in Mumbai, India. I am passionate about JavaScript, Linux, writing open source software and all things tech.
    </p>

    <p className={s.para}>
      Functional programmer to the core, I like working with and building composable apis for every line of code.
      For the front-end, I enjoy building things with libraries like React, HyperHTML, RxJS, crocks.
      I build optimized and scalable back-ends with technologies like NodeJS(ExpressJS, PlasmaJS, KoaJS),
      Kotlin(Vert.X), Golang, Python(flask, japronto, sanic) and PHP(CakePHP).
    </p>

    <p className={s.para}>
      Also, I love music. A lot!
			Some of my favorite bands at the time of writing this are Amon Amarth, Avatar, Gojira, Trivium, Killswitch Engage, August Burns Red, etc.
      {' '}
      <a href="/suggest-music" className={s.link}>Tell me about your favorites</a>
    </p>
  </PageLayout>
);

export default AboutPage;
