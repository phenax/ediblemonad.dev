import React from 'react';
import { Link } from 'gatsby';

import PageLayout from '../page-layout';

import s from '../styles/page.module.scss';

const donateUrl = 'https://www.buymeacoffee.com/phenax';

const ExtLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <a href={to} className={s.link} style={{ fontWeight: 'bold' }}>
    {children}
  </a>
);

const gh = (lib: string) => <ExtLink to={`https://github.com/phenax/${lib}`}>{lib}</ExtLink>;

const AboutPage = () => (
  <PageLayout title="About me" headerProps={{ title: 'About Me', subtitle: 'type Akshay = Developer | Metalhead | Geek | Nerd;' }}>
    <h2 className={s.title}>
      putStrLn {`"`}Hello world{`"`};
    </h2>

    <p className={s.para}>
      I am Akshay, a full-stack web developer with an obsession for writing functional, maintainable, performant code. I live in Mumbai,
      India. I am passionate about JavaScript, Linux, writing open source software and all things tech.
      <br />
      Functional programmer to the core, I like working with and building software that are written as small building blocks that compose
      together to form a usable application.
    </p>

    <p className={s.para}>
      I absolutely love working on open source projects in my free time. I{`'`}ve authored a few js libraries like {gh('algebraic-effects')}
      , {gh('enum-fp')}, {gh('pipey')}, {gh('pattern-lock-js')}. If linux is your thing, you can check out, {gh('shotkey')},{' '}
      {gh('bsp-layout')}. If you like what I make, you can <ExtLink to={donateUrl}>buying me a coffee</ExtLink>.
    </p>

    <p className={s.para}>
      Also, I love music. A lot! Some of my favorite artists at the time of writing this are Amon Amarth, Tool, Polyphia, Gojira, Chon,
      Killswitch Engage, August Burns Red, Foo Fighters, etc.{' '}
      {/*
      <Link to="/suggest-music" className={s.link}>
        Tell me about your favorites
      </Link>
      */}
    </p>
  </PageLayout>
);

export default AboutPage;
