(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{118:function(e,t,r){"use strict";r.d(t,"a",(function(){return l})),r.d(t,"b",(function(){return f}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=o.a.createContext({}),u=function(e){var t=o.a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},l=function(e){var t=u(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),l=u(r),b=n,f=l["".concat(i,".").concat(b)]||l[b]||d[b]||a;return r?o.a.createElement(f,s(s({ref:t},c),{},{components:r})):o.a.createElement(f,s({ref:t},c))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=b;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var c=2;c<a;c++)i[c]=r[c];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},92:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return s})),r.d(t,"toc",(function(){return p})),r.d(t,"default",(function(){return u}));var n=r(3),o=r(7),a=(r(0),r(118)),i={id:"getting-started",title:"Getting Started"},s={unversionedId:"guides/getting-started",id:"version-1.2.0/guides/getting-started",isDocsHomePage:!1,title:"Getting Started",description:"**Note: Petitio supports both require and import syntax out of the box, so",source:"@site/i18n/en-gb/docusaurus-plugin-content-docs/version-1.2.0/guides/getting-started.md",slug:"/guides/getting-started",permalink:"/petitio/docs/guides/getting-started",editUrl:"https://github.com/helperdiscord/petitio/edit/master/docs/i18n/en-gb/docusaurus-plugin-content-docs/version-1.2.0/guides/getting-started.md",version:"1.2.0",lastUpdatedAt:1617817864,formattedLastUpdatedAt:"07/04/2021",sidebar:"version-1.2.0/docs",next:{title:"Performance",permalink:"/petitio/docs/metrics/performance"}},p=[{value:"Basic Usage",id:"basic-usage",children:[]}],c={toc:p};function u(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},c,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Note: Petitio supports both ",Object(a.b)("inlineCode",{parentName:"strong"},"require")," and ",Object(a.b)("inlineCode",{parentName:"strong"},"import")," syntax out of the box, so\nthere's no need to do any pesky ESM or CJS hacks.")),Object(a.b)("h2",{id:"basic-usage"},"Basic Usage"),Object(a.b)("p",null,"The ",Object(a.b)("a",{parentName:"p",href:"../pkg/modules/petitio#export"},"default export")," of Petitio is a wrapper function for ",Object(a.b)("a",{parentName:"p",href:"../pkg/classes/petitiorequest.petitiorequest-1"},"PetitioRequest"),",\nmeaning all you need to get started is as follows:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},'import petitio from "petitio";\n\nconst request = petitio("https://example.com");\n')),Object(a.b)("p",null,"That instantiates a ",Object(a.b)("a",{parentName:"p",href:"../pkg/classes/petitiorequest.petitiorequest-1"},"PetitioRequest")," for ",Object(a.b)("inlineCode",{parentName:"p"},"example.com"),". Simple right?\nLet's take a look at how we send requests and work with responses."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-typescript"},"const result = await request.send().text();\n// equivalent to\nconst result = await request.text();\n")),Object(a.b)("p",null,"Fast and clean. Beautiful, even. But how does that work?\n",Object(a.b)("a",{parentName:"p",href:"../pkg/classes/petitiorequest.petitiorequest-1#send"},"PetitioRequest#send")," instructs Petitio to send the current\n",Object(a.b)("a",{parentName:"p",href:"../pkg/classes/petitiorequest.petitiorequest-1"},"PetitioRequest")," and returns a ",Object(a.b)("a",{parentName:"p",href:"../pkg/classes/petitioresponse.petitioresponse-1"},"PetitioResponse")," with the response data, and\nthen ",Object(a.b)("a",{parentName:"p",href:"../pkg/classes/petitioresponse.petitioresponse-1#text"},"PetitioResponse#text")," parses the response body from\na buffer to a string. The shorthand form of this is\n",Object(a.b)("a",{parentName:"p",href:"../pkg/classes/petitiorequest.petitiorequest-1#text"},"PetitioRequest#text"),", which sends the request and invokes text\nparsing for you in one call."),Object(a.b)("p",null,"That's the basics covered! Check out some more ",Object(a.b)("a",{parentName:"p",href:"https://github.com/helperdiscord/petitio/tree/master/USAGE.md"},"usage examples"),", or read\nthrough our ",Object(a.b)("a",{parentName:"p",href:"../"},"other guides"),"."))}u.isMDXComponent=!0}}]);