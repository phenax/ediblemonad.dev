(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{160:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(173),l=t(166),i=t(184),s=t(206),o=t.n(s),u=function(e){var a=e.frontmatter,t=e.wordCount;return r.a.createElement(l.a,{to:"/blog/"+a.slug,className:o.a.card},r.a.createElement("div",{className:o.a.cardTitle},a.title),r.a.createElement("small",null,r.a.createElement("div",null,r.a.createElement("span",{className:o.a.date},Object(i.a)(a.publishDate)),a.description+" - ",r.a.createElement("span",null,t.words," words"))))};t.d(a,"pageQuery",function(){return m});a.default=function(e){var a=e.data,t=(a=void 0===a?{allMdx:void 0}:a).allMdx||{edges:[],totalCount:0},n=t.edges,l=t.totalCount;return r.a.createElement(c.a,{title:"Akshay Nair's Blog",headerProps:{title:"Blog",subtitle:""}},r.a.createElement("div",null,"Posts ",r.a.createElement("strong",null,l)),r.a.createElement("div",null,n.map(function(e){var a=e.node;return r.a.createElement("div",{key:a.id},r.a.createElement(u,a))})))};var m="2540469366"},164:function(e,a,t){var n;e.exports=(n=t(167))&&n.default||n},166:function(e,a,t){"use strict";var n=t(0),r=t.n(n),c=t(4),l=t.n(c),i=t(37),s=t.n(i);t.d(a,"a",function(){return s.a});t(164),r.a.createContext({});l.a.object,l.a.string.isRequired,l.a.func,l.a.func},167:function(e,a,t){"use strict";t.r(a);var n=t(8),r=t.n(n),c=t(0),l=t.n(c),i=t(4),s=t.n(i),o=t(58),u=t(2),m=function(e){var a=e.location,t=u.default.getResourcesForPathnameSync(a.pathname);return l.a.createElement(o.a,r()({location:a,pageResources:t},t.json))};m.propTypes={location:s.a.shape({pathname:s.a.string.isRequired}).isRequired},a.default=m},168:function(e,a,t){"use strict";t.d(a,"a",function(){return l}),t.d(a,"b",function(){return i});var n=t(8),r=t.n(n),c=!1;!function(){try{var e=new Image;e.src="data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA",e.onload=e.onerror=function(){c=2===e.height}}catch(a){c=!1}}();var l=function(e){var a=e.src,t=e.srcWebp;return c&&t?t:a},i=function(e){return r()({},e,{src:l(e)})}},169:function(e,a,t){"use strict";t(176);var n=t(170),r=t(0),c=t.n(r),l=t(174),i=t.n(l),s=t(166),o=t(179),u=t.n(o),m=t(175),d=t.n(m),f=t(168),b=[{url:"/",title:"Projects",descr:"Fun stuff"},{url:"/about",title:"About Me",descr:"Know more about this metal-head"},{url:"/blog",title:"My blog",descr:"I post about FP, react, etc"},{url:"/skills",title:"Skills",descr:"I haz m@d 5ki11z br0"},{url:"/contact",title:"Contact",descr:"Get in touch"}];a.a=function(){var e,a=Object(r.useState)(!1),t=a[0],l=a[1],o=n.data.file,m=(o=void 0===o?{}:o).childImageSharp,p=(m=void 0===m?{}:m).fixed,v=void 0===p?{src:""}:p,E=function(e){return function(a){a.preventDefault(),l(e)}};return c.a.createElement("div",null,c.a.createElement("div",{className:u.a.topbar},c.a.createElement("div",{className:u.a.topbarMenubtn},c.a.createElement("a",{href:"#menu",className:"icon-menu",onClick:E(!0)}))),c.a.createElement("div",{className:i()(u.a.menu,d.a.row,(e={},e[u.a.menu_visible]=t,e)),id:"menu"},c.a.createElement("div",{className:i()(u.a.menuSection,u.a.menuSide,d.a.hideOnSm,d.a.col)},c.a.createElement("div",{className:u.a.logo},c.a.createElement("img",{className:u.a.logoImg,draggable:!1,src:Object(f.a)(v)}),c.a.createElement("div",{className:u.a.logoText},"Hey There"))),c.a.createElement("ul",{className:i()(u.a.menuSection,u.a.menuList,d.a.col)},c.a.createElement("a",{href:"#",className:i()(u.a.menuClosebtn,"icon-cancel"),onClick:E(!1)}),b.map(function(e){return c.a.createElement("li",{className:i()(u.a.menuListLi),key:e.url},c.a.createElement(s.a,{to:e.url,className:i()(u.a.menuListLink)},c.a.createElement("div",{className:u.a.title},e.title),c.a.createElement("div",{className:u.a.descr},e.descr)))}))))}},170:function(e){e.exports={data:{file:{childImageSharp:{fixed:{src:"/static/154949b1fe0e5bde989bad025624cc67/c29cf/logo.png",srcWebp:"/static/154949b1fe0e5bde989bad025624cc67/9ca63/logo.webp",srcSet:"/static/154949b1fe0e5bde989bad025624cc67/c29cf/logo.png 1x",srcSetWebp:"/static/154949b1fe0e5bde989bad025624cc67/9ca63/logo.webp 1x"}}}}}},171:function(e,a,t){"use strict";var n=t(8),r=t.n(n),c=t(0),l=t.n(c),i=t(180),s=t.n(i),o={type:"mini",subtitle:""};a.a=function(e){var a=r()({},o,e),t=a.title,n=a.subtitle;return l.a.createElement("div",{className:s.a.wrapper},l.a.createElement("div",{className:s.a.content},l.a.createElement("div",{className:s.a.title},t),l.a.createElement("div",{className:s.a.subtitle},n)))}},173:function(e,a,t){"use strict";t(57);var n=t(8),r=t.n(n),c=t(38),l=t.n(c),i=t(0),s=t.n(i),o=t(178),u=t(169),m=t(171),d=t(177),f=t.n(d),b={title:"Akshay Nair",description:"Akshay Nair is a full stack web developer with a passion for writing performant, maintainable code.",keywords:"akshay, nair, functional, programming, performant, javascript, react, developer, code, github",headerProps:{}};a.a=function(e){var a=r()({},b,e),t=a.children,n=a.title,c=a.description,i=a.keywords,d=a.headerProps,p=l()(a,["children","title","description","keywords","headerProps"]);return s.a.createElement(s.a.Fragment,null,s.a.createElement(o.Helmet,null,s.a.createElement("title",null,n),s.a.createElement("meta",{name:"description",content:c}),s.a.createElement("meta",{name:"keywords",content:i})),s.a.createElement("div",p,s.a.createElement(u.a,null),s.a.createElement(m.a,Object.assign({title:n,subtitle:c},d)),s.a.createElement("main",{className:f.a.content},t)))}},184:function(e,a,t){"use strict";t.d(a,"a",function(){return l});var n=t(217),r=t(218),c=t(219),l=Object(n.a)(Object(r.a)("do MMM, yyyy"),Object(c.a)(new Date,"yyyy/MM/dd"))}}]);
//# sourceMappingURL=component---src-pages-blog-tsx-a7adcb25ee3877bc9618.js.map