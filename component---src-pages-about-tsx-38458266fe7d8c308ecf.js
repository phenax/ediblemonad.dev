(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{156:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),i=t(170),l=t(173),s=t.n(l);a.default=function(){return r.a.createElement(i.a,{title:"About me",headerProps:{title:"About Me",subtitle:""}},r.a.createElement("h2",{className:s.a.title},"Hello world"),r.a.createElement("p",{className:s.a.para},"I am Akshay, a full-stack web developer with an obsession for writing maintainable, performant code. I live in Mumbai, India. I am passionate about JavaScript, Linux, writing open source software and all things tech."),r.a.createElement("p",{className:s.a.para},"I build optimized and scalable back-ends with technologies like NodeJS(ExpressJS, PlasmaJS, KoaJS), Kotlin(Vert.X), Golang, Python(flask, japronto, sanic) and PHP(CakePHP). For the front-end, I enjoy messing around with libraries like ReactJS(preact or nerv), HyperHTML, jQuery, RxJS. Also, I am a pro-platform guy in all places possible, i.e. DOM over jQuery, fetch over axios, webcomponents over the other component libraries, and so on."),r.a.createElement("p",{className:s.a.para},"Also, I love music. A lot! Some of my favorite bands at the time of writing this are Amon Amarth, Avatar, Gojira, Trivium, Killswitch Engage, August Burns Red, etc."))}},163:function(e,a,t){var n;e.exports=(n=t(166))&&n.default||n},165:function(e,a,t){"use strict";var n=t(0),r=t.n(n),i=t(4),l=t.n(i),s=t(37),c=t.n(s);t.d(a,"a",function(){return c.a});t(163),r.a.createContext({});l.a.object,l.a.string.isRequired,l.a.func,l.a.func},166:function(e,a,t){"use strict";t.r(a);var n=t(8),r=t.n(n),i=t(0),l=t.n(i),s=t(4),c=t.n(s),o=t(58),m=t(2),u=function(e){var a=e.location,t=m.default.getResourcesForPathnameSync(a.pathname);return l.a.createElement(o.a,r()({location:a,pageResources:t},t.json))};u.propTypes={location:c.a.shape({pathname:c.a.string.isRequired}).isRequired},a.default=u},167:function(e,a,t){"use strict";var n=t(0),r=t.n(n),i=t(171),l=t.n(i),s=t(165),c=t(175),o=t.n(c),m=t(172),u=t.n(m),d=[{url:"/",title:"Projects",descr:"Fun stuff"},{url:"/about",title:"About Me",descr:"Know more about this metal-head"},{url:"/blog",title:"My blog",descr:"I post about FP, react, etc"},{url:"/skills",title:"Skills",descr:"I haz m@d 5ki11z br0"},{url:"/contact",title:"Contact",descr:"Get in touch"}];a.a=function(){var e,a=Object(n.useState)(!1),t=a[0],i=a[1],c=function(e){return function(a){a.preventDefault(),i(e)}};return r.a.createElement("div",null,r.a.createElement("div",{className:o.a.topbar},r.a.createElement("div",{className:o.a.topbarMenubtn},r.a.createElement("a",{href:"#menu",className:"icon-menu",onClick:c(!0)}))),r.a.createElement("div",{className:l()(o.a.menu,u.a.row,(e={},e[o.a.menu_visible]=t,e)),id:"menu"},r.a.createElement("div",{className:l()(o.a.menuSection,o.a.menuSide,u.a.hideOnSm,u.a.col)},r.a.createElement("div",{className:o.a.logo},r.a.createElement("img",{className:o.a.logoImg,src:"/img/logo/logo.png",alt:"Akshay Nair's logo"}),r.a.createElement("div",{className:o.a.logoText},"Hey There"))),r.a.createElement("ul",{className:l()(o.a.menuSection,o.a.menuList,u.a.col)},r.a.createElement("a",{href:"#",className:l()(o.a.menuClosebtn,"icon-cancel"),onClick:c(!1)}),d.map(function(e){return r.a.createElement("li",{className:l()(o.a.menuListLi),key:e.url},r.a.createElement(s.a,{to:e.url,className:l()(o.a.menuListLink)},r.a.createElement("div",{className:o.a.title},e.title),r.a.createElement("div",{className:o.a.descr},e.descr)))}))))}},168:function(e,a,t){"use strict";var n=t(8),r=t.n(n),i=t(0),l=t.n(i),s=t(176),c=t.n(s),o={type:"mini",subtitle:""};a.a=function(e){var a=r()({},o,e),t=a.title,n=a.subtitle;return l.a.createElement("div",{className:c.a.wrapper},l.a.createElement("div",{className:c.a.content},l.a.createElement("div",{className:c.a.title},t),l.a.createElement("div",{className:c.a.subtitle},n)))}},170:function(e,a,t){"use strict";t(57);var n=t(8),r=t.n(n),i=t(38),l=t.n(i),s=t(0),c=t.n(s),o=t(174),m=t(167),u=t(168),d=t(173),p=t.n(d),f={title:"Akshay Nair",description:"Akshay Nair is a full stack web developer with a passion for writing performant, maintainable code.",keywords:"akshay, nair, functional, programming, performant, javascript, react, developer, code, github",headerProps:{}};a.a=function(e){var a=r()({},f,e),t=a.children,n=a.title,i=a.description,s=a.keywords,d=a.headerProps,h=l()(a,["children","title","description","keywords","headerProps"]);return c.a.createElement(c.a.Fragment,null,c.a.createElement(o.Helmet,null,c.a.createElement("title",null,n),c.a.createElement("meta",{name:"description",content:i}),c.a.createElement("meta",{name:"keywords",content:s})),c.a.createElement("div",h,c.a.createElement(m.a,null),c.a.createElement(u.a,Object.assign({title:n,subtitle:i},d)),c.a.createElement("main",{className:p.a.content},t)))}}}]);
//# sourceMappingURL=component---src-pages-about-tsx-38458266fe7d8c308ecf.js.map