(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{159:function(e,t,a){"use strict";a.r(t);a(57),a(176);var n=a(8),r=a.n(n),c=a(0),i=a.n(c),l=a(173),o=(a(208),a(209)),u=a.n(o),s=a(174),m=a.n(s),d=a(210),f=a(168),b=function(e){var t=Object(f.b)(e),a=t.base64,n=t.src,r=Object(c.useState)(!1),i=r[0],l=r[1],o=Object(c.useState)(null),u=o[0],s=o[1];return Object(c.useEffect)(function(){if(!i){var e=new Image;e.src=n,e.onload=function(){return l(!0)},e.onerror=s}},[n]),{error:u,src:i?n:a}},p=a(213),v=a.n(p),g=a(175),E=a.n(g),k=function(e){var t=e.id,a=e.image,n=e.title,r=e.links,c=e.description,l=e.tags,o=b(a).src,s=Object(d.useDebounce)(o,500);return i.a.createElement("div",{className:v.a.project,"data-id":t,key:t},i.a.createElement("div",{className:m()("wrap",E.a.row)},i.a.createElement("div",{className:m()(E.a.col,v.a.block,v.a.block_bg),style:{backgroundImage:o&&"url("+o+")"}},i.a.createElement("div",{className:v.a.blockFakeBackground,style:{backgroundImage:s&&"url("+s+")",opacity:s!==o?0:1,transitionDuration:"500ms"}})),i.a.createElement("div",{className:m()(E.a.col,v.a.block,v.a.block_sm)},i.a.createElement("div",{className:v.a.blockTitle},n),i.a.createElement("div",{className:v.a.blockTags},(l||[]).map(function(e){return i.a.createElement("span",{key:e,className:v.a.blockTagsTag},e)})),i.a.createElement("div",{className:v.a.blockContent},c),i.a.createElement("div",{className:v.a.blockLinks},r.map(function(e){return i.a.createElement("a",{key:e.link,target:"_blank _parent",rel:"noopener",href:e.link},i.a.createElement("i",{className:m()(v.a.blockLinkIcon,(t=e,u()(t),"icon-someicon"))}),e.gh?"Github":e.text);var t})))))};a.d(t,"pageQeury",function(){return h});t.default=function(e){var t=e.data,a=t.allProjectsJson,n=t.allFile.edges.map(function(e){return e.node.childImageSharp}).reduce(function(e,t){var a;return r()({},e,((a={})[t.fixed.originalName]=t.fixed,a))},{}),c=a.edges.map(function(e){return e.node}).map(function(e){return r()({},e,{image:n[e.image]?n[e.image]:{src:e.image}})});return i.a.createElement(l.a,{headerProps:{subtitle:"Full Stack Web Developer"}},c.map(function(e){return i.a.createElement(k,Object.assign({key:e.id},e))}))};var h="1751051111"},164:function(e,t,a){var n;e.exports=(n=a(167))&&n.default||n},166:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(4),i=a.n(c),l=a(37),o=a.n(l);a.d(t,"a",function(){return o.a});a(164),r.a.createContext({});i.a.object,i.a.string.isRequired,i.a.func,i.a.func},167:function(e,t,a){"use strict";a.r(t);var n=a(8),r=a.n(n),c=a(0),i=a.n(c),l=a(4),o=a.n(l),u=a(58),s=a(2),m=function(e){var t=e.location,a=s.default.getResourcesForPathnameSync(t.pathname);return i.a.createElement(u.a,r()({location:t,pageResources:a},a.json))};m.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=m},168:function(e,t,a){"use strict";a.d(t,"a",function(){return i}),a.d(t,"b",function(){return l});var n=a(8),r=a.n(n),c=!1;!function(){try{var e=new Image;e.src="data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA",e.onload=e.onerror=function(){c=2===e.height}}catch(t){c=!1}}();var i=function(e){var t=e.src,a=e.srcWebp;return c&&a?a:t},l=function(e){return r()({},e,{src:i(e)})}},169:function(e,t,a){"use strict";a(176);var n=a(170),r=a(0),c=a.n(r),i=a(174),l=a.n(i),o=a(166),u=a(179),s=a.n(u),m=a(175),d=a.n(m),f=a(168),b=[{url:"/",title:"Projects",descr:"Fun stuff"},{url:"/about",title:"About Me",descr:"Know more about this metal-head"},{url:"/blog",title:"My blog",descr:"I post about FP, react, etc"},{url:"/skills",title:"Skills",descr:"I haz m@d 5ki11z br0"},{url:"/contact",title:"Contact",descr:"Get in touch"}];t.a=function(){var e,t=Object(r.useState)(!1),a=t[0],i=t[1],u=n.data.file,m=(u=void 0===u?{}:u).childImageSharp,p=(m=void 0===m?{}:m).fixed,v=void 0===p?{src:""}:p,g=function(e){return function(t){t.preventDefault(),i(e)}};return c.a.createElement("div",null,c.a.createElement("div",{className:s.a.topbar},c.a.createElement("div",{className:s.a.topbarMenubtn},c.a.createElement("a",{href:"#menu",className:"icon-menu",onClick:g(!0)}))),c.a.createElement("div",{className:l()(s.a.menu,d.a.row,(e={},e[s.a.menu_visible]=a,e)),id:"menu"},c.a.createElement("div",{className:l()(s.a.menuSection,s.a.menuSide,d.a.hideOnSm,d.a.col)},c.a.createElement("div",{className:s.a.logo},c.a.createElement("img",{className:s.a.logoImg,draggable:!1,src:Object(f.a)(v)}),c.a.createElement("div",{className:s.a.logoText},"Hey There"))),c.a.createElement("ul",{className:l()(s.a.menuSection,s.a.menuList,d.a.col)},c.a.createElement("a",{href:"#",className:l()(s.a.menuClosebtn,"icon-cancel"),onClick:g(!1)}),b.map(function(e){return c.a.createElement("li",{className:l()(s.a.menuListLi),key:e.url},c.a.createElement(o.a,{to:e.url,className:l()(s.a.menuListLink)},c.a.createElement("div",{className:s.a.title},e.title),c.a.createElement("div",{className:s.a.descr},e.descr)))}))))}},170:function(e){e.exports={data:{file:{childImageSharp:{fixed:{src:"/static/154949b1fe0e5bde989bad025624cc67/c29cf/logo.png",srcWebp:"/static/154949b1fe0e5bde989bad025624cc67/9ca63/logo.webp",srcSet:"/static/154949b1fe0e5bde989bad025624cc67/c29cf/logo.png 1x",srcSetWebp:"/static/154949b1fe0e5bde989bad025624cc67/9ca63/logo.webp 1x"}}}}}},171:function(e,t,a){"use strict";var n=a(8),r=a.n(n),c=a(0),i=a.n(c),l=a(180),o=a.n(l),u={type:"mini",subtitle:""};t.a=function(e){var t=r()({},u,e),a=t.title,n=t.subtitle;return i.a.createElement("div",{className:o.a.wrapper},i.a.createElement("div",{className:o.a.content},i.a.createElement("div",{className:o.a.title},a),i.a.createElement("div",{className:o.a.subtitle},n)))}},173:function(e,t,a){"use strict";a(57);var n=a(8),r=a.n(n),c=a(38),i=a.n(c),l=a(0),o=a.n(l),u=a(178),s=a(169),m=a(171),d=a(177),f=a.n(d),b={title:"Akshay Nair",description:"Akshay Nair is a full stack web developer with a passion for writing performant, maintainable code.",keywords:"akshay, nair, functional, programming, performant, javascript, react, developer, code, github",headerProps:{}};t.a=function(e){var t=r()({},b,e),a=t.children,n=t.title,c=t.description,l=t.keywords,d=t.headerProps,p=i()(t,["children","title","description","keywords","headerProps"]);return o.a.createElement(o.a.Fragment,null,o.a.createElement(u.Helmet,null,o.a.createElement("title",null,n),o.a.createElement("meta",{name:"description",content:c}),o.a.createElement("meta",{name:"keywords",content:l})),o.a.createElement("div",p,o.a.createElement(s.a,null),o.a.createElement(m.a,Object.assign({title:n,subtitle:c},d)),o.a.createElement("main",{className:f.a.content},a)))}},208:function(e,t,a){"use strict";a(188)("link",function(e){return function(t){return e(this,"a","href",t)}})},209:function(e,t){e.exports=function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}},210:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useDebouncedCallback=t.useDebounce=void 0;var n=c(a(211)),r=c(a(212));function c(e){return e&&e.__esModule?e:{default:e}}t.useDebounce=n.default,t.useDebouncedCallback=r.default},211:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],n=!0,r=!1,c=void 0;try{for(var i,l=e[Symbol.iterator]();!(n=(i=l.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(o){r=!0,c=o}finally{try{!n&&l.return&&l.return()}finally{if(r)throw c}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=function(e,t){var a=(0,r.useState)(e),c=n(a,2),i=c[0],l=c[1];return(0,r.useEffect)(function(){var a=setTimeout(function(){l(e)},t);return function(){clearTimeout(a)}},[e,t]),i};var r=a(0)},212:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,a){var r=(0,n.useRef)(null),c=(0,n.useCallback)(e,a);return(0,n.useEffect)(function(){return function(){clearTimeout(r.current)}},[]),function(){for(var e=arguments.length,a=Array(e),n=0;n<e;n++)a[n]=arguments[n];clearTimeout(r.current),r.current=setTimeout(function(){c.apply(void 0,a)},t)}};var n=a(0)}}]);
//# sourceMappingURL=component---src-pages-index-tsx-d0eaa76695b81c7a90a8.js.map