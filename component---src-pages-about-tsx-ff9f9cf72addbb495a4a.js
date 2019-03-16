(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{157:function(e,a,t){"use strict";t.r(a);t(185);var n=t(0),r=t.n(n),i=t(168),c=t(178),l=t(186),s=t.n(l);a.default=function(){return r.a.createElement(c.a,{title:"About me",headerProps:{title:"About Me",subtitle:"type Akshay = Developer | Metalhead | Geek | Nerd;"}},r.a.createElement("h2",{className:s.a.title},'print "Hello world";'),r.a.createElement("p",{className:s.a.para},"I am Akshay, a full-stack web developer with an obsession for writing functional, maintainable, performant code. I live in Mumbai, India. I am passionate about JavaScript, Linux, writing open source software and all things tech."),r.a.createElement("p",{className:s.a.para},"Functional programmer to the core, I like working with and building composable apis for every line of code. For the front-end, I enjoy building things with libraries like React, HyperHTML, RxJS, crocks. I build optimized and scalable back-ends with technologies like NodeJS(ExpressJS, PlasmaJS, KoaJS), Kotlin(Vert.X), Golang, Python(flask, japronto, sanic) and PHP(CakePHP)."),r.a.createElement("p",{className:s.a.para},"Also, I love music. A lot! Some of my favorite bands at the time of writing this are Amon Amarth, Avatar, Gojira, Trivium, Killswitch Engage, August Burns Red, etc."," ",r.a.createElement(i.a,{to:"/suggest-music",className:s.a.link},"Tell me about your favorites")))}},167:function(e,a,t){var n;e.exports=(n=t(169))&&n.default||n},168:function(e,a,t){"use strict";var n=t(0),r=t.n(n),i=t(4),c=t.n(i),l=t(37),s=t.n(l);t.d(a,"a",function(){return s.a});t(167),r.a.createContext({});c.a.object,c.a.string.isRequired,c.a.func,c.a.func},169:function(e,a,t){"use strict";t.r(a);var n=t(8),r=t.n(n),i=t(0),c=t.n(i),l=t(4),s=t.n(l),o=t(58),u=t(2),m=function(e){var a=e.location,t=u.default.getResourcesForPathnameSync(a.pathname);return c.a.createElement(o.a,r()({location:a,pageResources:t},t.json))};m.propTypes={location:s.a.shape({pathname:s.a.string.isRequired}).isRequired},a.default=m},171:function(e,a,t){"use strict";t.d(a,"a",function(){return c}),t.d(a,"b",function(){return l});var n=t(8),r=t.n(n),i=!1;!function(){try{var e=new Image;e.src="data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA",e.onload=e.onerror=function(){i=2===e.height}}catch(a){i=!1}}();var c=function(e){var a=e.src,t=e.srcWebp;return i&&t?t:a},l=function(e){return r()({},e,{src:c(e)})}},172:function(e,a,t){(function(e){e.window=e,e.document=e.document||{body:null,documentElement:null}}).call(this,t(81))},173:function(e,a,t){"use strict";t(181);var n=t(174),r=t(0),i=t.n(r),c=t(170),l=t.n(c),s=t(168),o=t(183),u=t.n(o),m=t(179),d=t.n(m),f=t(171),p=[{url:"/",title:"Projects",descr:"Fun stuff"},{url:"/about",title:"About Me",descr:"Know more about this metal-head"},{url:"/blog",title:"Blog",descr:"I post about FP, react, etc"},{url:"/skills",title:"Skills",descr:"I haz m@d 5ki11z br0"},{url:"/contact",title:"Contact",descr:"Get in touch"}];a.a=function(){var e,a=Object(r.useState)(!1),t=a[0],c=a[1],o=n.data.file,m=(o=void 0===o?{}:o).childImageSharp,b=(m=void 0===m?{}:m).fixed,h=void 0===b?{src:""}:b,v=function(e){return function(a){a.preventDefault(),c(e)}};return i.a.createElement("div",null,i.a.createElement("div",{className:u.a.topbar},i.a.createElement("div",{className:u.a.topbarMenubtn},i.a.createElement("a",{href:"#menu",className:"fas fa-bars",onClick:v(!0)}))),i.a.createElement("div",{className:l()(u.a.menu,d.a.row,(e={},e[u.a.menu_visible]=t,e)),id:"menu"},i.a.createElement("div",{className:l()(u.a.menuSection,u.a.menuSide,d.a.hideOnSm,d.a.col)},i.a.createElement("div",{className:u.a.logo},i.a.createElement("img",{className:u.a.logoImg,draggable:!1,src:Object(f.a)(h)}),i.a.createElement("div",{className:u.a.logoText},"Hey There"))),i.a.createElement("ul",{className:l()(u.a.menuSection,u.a.menuList,d.a.col)},i.a.createElement("a",{href:"#",className:l()(u.a.menuClosebtn,"fas fa-times"),onClick:v(!1)}),p.map(function(e){return i.a.createElement("li",{className:l()(u.a.menuListLi),key:e.url},i.a.createElement(s.a,{to:e.url,className:l()(u.a.menuListLink)},i.a.createElement("div",{className:u.a.title},e.title),i.a.createElement("div",{className:u.a.descr},e.descr)))}))))}},174:function(e){e.exports={data:{file:{childImageSharp:{fixed:{src:"/static/154949b1fe0e5bde989bad025624cc67/c29cf/logo.png",srcWebp:"/static/154949b1fe0e5bde989bad025624cc67/9ca63/logo.webp",srcSet:"/static/154949b1fe0e5bde989bad025624cc67/c29cf/logo.png 1x",srcSetWebp:"/static/154949b1fe0e5bde989bad025624cc67/9ca63/logo.webp 1x"}}}}}},175:function(e,a,t){"use strict";var n=t(8),r=t.n(n),i=t(0),c=t.n(i),l=t(184),s=t.n(l),o={subtitle:"",preTitle:""};a.a=function(e){var a=r()({},o,e),t=a.title,n=a.subtitle,i=a.preTitle;return c.a.createElement("div",{className:s.a.wrapper},c.a.createElement("div",{className:s.a.content},i,c.a.createElement("div",{className:s.a.title},t),c.a.createElement("div",{className:s.a.subtitle},n)))}},178:function(e,a,t){"use strict";t(57);var n=t(8),r=t.n(n),i=t(38),c=t.n(i),l=t(0),s=t.n(l),o=t(182),u=(t(172),t(173)),m=t(175),d=t(186),f=t.n(d),p={title:"Akshay Nair",description:"Akshay Nair is a full stack web developer with a passion for writing performant, maintainable code.",keywords:"akshay, nair, functional, programming, performant, javascript, react, developer, code, github",headerProps:{}};a.a=function(e){var a=r()({},p,e),t=a.children,n=a.title,i=a.description,l=a.keywords,d=a.headerProps,b=c()(a,["children","title","description","keywords","headerProps"]);return s.a.createElement(s.a.Fragment,null,s.a.createElement(o.Helmet,null,s.a.createElement("title",null,n),s.a.createElement("meta",{name:"description",content:i}),s.a.createElement("meta",{name:"keywords",content:l})),s.a.createElement("div",b,s.a.createElement(u.a,null),s.a.createElement(m.a,Object.assign({title:n,subtitle:i},d)),s.a.createElement("main",{className:f.a.content},t)))}},185:function(e,a,t){"use strict";t(191)("link",function(e){return function(a){return e(this,"a","href",a)}})}}]);
//# sourceMappingURL=component---src-pages-about-tsx-ff9f9cf72addbb495a4a.js.map