(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[492],{3893:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/[slug]",function(){return n(4058)}])},5891:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){let{children:t}=e;return t},t.suspense=function(){let e=Error(r.NEXT_DYNAMIC_NO_SSR_CODE);throw e.digest=r.NEXT_DYNAMIC_NO_SSR_CODE,e},(0,n(1322).Z)(n(959));var r=n(5542)},4545:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){let n=o.default,a={loading:e=>{let{error:t,isLoading:n,pastDelay:r}=e;return null}};e instanceof Promise?a.loader=()=>e:"function"==typeof e?a.loader=e:"object"==typeof e&&(a=r({},a,e)),a=r({},a,t);let l=a.loader,u=()=>l().then(i);if(a.loadableGenerated&&delete(a=r({},a,a.loadableGenerated,{loader:u})).loadableGenerated,"boolean"==typeof a.ssr){if(!a.ssr)return delete a.ssr,s(u,a);delete a.ssr}return n(a)},t.noSSR=s;var r=n(5321).Z,a=n(1322).Z,l=(0,n(6687).Z)(n(959)),o=a(n(4786)),u=a(n(5891));function i(e){return{default:e.default||e}}function s(e,t){delete t.webpack,delete t.modules;let n=l.lazy(e),r=t.loading,a=l.default.createElement(r,{error:null,isLoading:!0,pastDelay:!1,timedOut:!1});return e=>l.default.createElement(l.Suspense,{fallback:a},l.default.createElement(u.default,null,l.default.createElement(n,Object.assign({},e))))}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},624:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.LoadableContext=void 0;var r=(0,n(1322).Z)(n(959));let a=r.default.createContext(null);t.LoadableContext=a},4786:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(5321).Z,a=(0,n(1322).Z)(n(959)),l=n(624);let o=[],u=[],i=!1;function s(e){let t=e(),n={loading:!0,loaded:null,error:null};return n.promise=t.then(e=>(n.loading=!1,n.loaded=e,e)).catch(e=>{throw n.loading=!1,n.error=e,e}),n}class d{promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state=r({},this._state,{error:this._res.error,loaded:this._res.loaded,loading:this._res.loading},e),this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}}function c(e){return function(e,t){let n=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},t);n.lazy=a.default.lazy(n.loader);let r=null;function o(){if(!r){let t=new d(e,n);r={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return r.promise()}if(!i){let s=n.webpack?n.webpack():n.modules;s&&u.push(e=>{for(let t of s)if(-1!==e.indexOf(t))return o()})}function c(e){!function(){o();let e=a.default.useContext(l.LoadableContext);e&&Array.isArray(n.modules)&&n.modules.forEach(t=>{e(t)})}();let t=a.default.createElement(n.loading,{isLoading:!0,pastDelay:!0,error:null});return a.default.createElement(a.default.Suspense,{fallback:t},a.default.createElement(n.lazy,e))}return c.preload=()=>o(),c.displayName="LoadableComponent",c}(s,e)}function _(e,t){let n=[];for(;e.length;){let r=e.pop();n.push(r(t))}return Promise.all(n).then(()=>{if(e.length)return _(e,t)})}c.preloadAll=()=>new Promise((e,t)=>{_(o).then(e,t)}),c.preloadReady=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return new Promise(t=>{let n=()=>(i=!0,t());_(u,e).then(n,n)})},window.__NEXT_PRELOADREADY=c.preloadReady,t.default=c},4058:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return d},default:function(){return c}});var r=n(1527),a=n(6101),l=n.n(a),o=n(313),u=n(3190);n(4010);var i=n(1722),s=n.n(i),d=!0;function c(e){let{meta:t}=e,a=(0,u.useRouter)(),{slug:i}=a.query;if(!i)return"";let d=l()(n(5655)("./".concat(i,".mdx")));return(0,r.jsx)("main",{className:s().main,children:(0,r.jsx)("article",{className:"prose prose-invert max-w-full",children:(0,r.jsxs)(o.Zo,{disableParentContext:!0,children:[(0,r.jsx)("h1",{className:"text-accent-1",children:t.title}),(0,r.jsx)(d,{})]})})})}},1722:function(e){e.exports={main:"page_main__LgpvM","fade-in":"page_fade-in__XpKrX",paraWrap:"page_paraWrap__AltRb",tag:"page_tag__FfDbl",tagSelected:"page_tagSelected__PeYLS",project:"page_project__XBysL",projectTitle:"page_projectTitle__00SBG",contactLink:"page_contactLink__vwF0i",contactLinkIcon:"page_contactLinkIcon__g8IkI",contactLinkBrandIcon:"page_contactLinkBrandIcon__VQgF5"}},4010:function(){},6101:function(e,t,n){e.exports=n(4545)},5655:function(e,t,n){var r={"./js-magic.mdx":[7447,447],"./redux-recipies.mdx":[9157,157],"./sum-types.mdx":[8523,523]};function a(e){if(!n.o(r,e))return Promise.resolve().then(function(){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t});var t=r[e],a=t[0];return n.e(t[1]).then(function(){return n(a)})}a.keys=function(){return Object.keys(r)},a.id=5655,e.exports=a},313:function(e,t,n){"use strict";n.d(t,{Zo:function(){return u},ah:function(){return l}});var r=n(959);let a=r.createContext({});function l(e){let t=r.useContext(a);return r.useMemo(()=>"function"==typeof e?e(t):{...t,...e},[t,e])}let o={};function u({components:e,children:t,disableParentContext:n}){let u=l(e);return n&&(u=e||o),r.createElement(a.Provider,{value:u},t)}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=3893)}),_N_E=e.O()}]);