function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},o={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in a)return a[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return a[e]=r,t.call(r.exports,r,r.exports),r.exports}var d=new Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(e,t){o[e]=t},t.parcelRequired7c6=r),r.register("fExtF",(function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t,a){if(!t.has(e))throw new TypeError("attempted to "+a+" private field on non-instance");return t.get(e)}})),r.register("iaRLo",(function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){return t.get?t.get.call(e):t.value}})),r.register("7K24o",(function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}})),r.register("3LGG3",(function(e,t){Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.default=function(e,t,a){if(t.set)t.set.call(e,a);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=a}}}));var d=r("bctya"),n=(d=r("bctya"),{});Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e,t){var a=l.default(e,t,"get");return s.default(e,a)};var l=i(r("fExtF")),s=i(r("iaRLo"));function i(e){return e&&e.__esModule?e:{default:e}}var c={};Object.defineProperty(c,"__esModule",{value:!0}),c.default=function(e,t,a){u.default(e,t),t.set(e,a)};var f,u=(f=r("7K24o"))&&f.__esModule?f:{default:f};var p={};Object.defineProperty(p,"__esModule",{value:!0}),p.default=function(e,t,a){var o=$.default(e,t,"set");return v.default(e,o,a),a};var $=b(r("fExtF")),v=b(r("3LGG3"));function b(e){return e&&e.__esModule?e:{default:e}}var y=r("2shzp"),h=r("2j7ES"),x=r("f6zZF"),g=r("04jNI");y.default.defaults.baseURL="https://api.themoviedb.org/3";var m=new WeakMap,w=new WeakMap,L=new WeakMap,_=new WeakMap;const M=new class{async getFilms(){const t=`${e(n)(this,L)}/${e(n)(this,_)}/day?api_key=${e(n)(this,m)}&page=${e(n)(this,w)}`,{data:a}=await y.default.get(t);return a}get page(){return e(n)(this,w)}set page(t){e(p)(this,w,t)}incrementPage(){e(p)(this,w,e(n)(this,w)+1)}decrementPage(){e(p)(this,w,1)}constructor(){e(c)(this,m,{writable:!0,value:"c6849c57578619bd16dafe22e211e348"}),e(c)(this,w,{writable:!0,value:1}),e(c)(this,L,{writable:!0,value:"trending"}),e(c)(this,_,{writable:!0,value:"movie"})}};!async function(){try{(0,g.spinnerPlay)();const e=JSON.stringify(h),{results:t}=(JSON.parse(e),await M.getFilms());(0,x.createAndRenderMarkup)(t)}catch(e){console.log(e)}finally{(0,g.spinnerStop)()}}(),openModalFooter=()=>{$4e12c0f0297ad96a$export$21666b427502ea6d.ourTeam.addEventListener("click",$4e12c0f0297ad96a$export$5dbe4d217b5e009f)},onOpenModalFooter=()=>{$4e12c0f0297ad96a$export$21666b427502ea6d.upScroll.classList.add("visually-hidden"),$4e12c0f0297ad96a$export$21666b427502ea6d.backdropFooter.classList.remove("visually-hidden"),$4e12c0f0297ad96a$export$21666b427502ea6d.body.classList.add("no-scroll"),$4e12c0f0297ad96a$export$4b5971f8b54ea82b()},closeModalFooter=()=>{$4e12c0f0297ad96a$export$21666b427502ea6d.backdropFooter.addEventListener("click",$4e12c0f0297ad96a$export$966efb3c3f923333),$4e12c0f0297ad96a$export$21666b427502ea6d.closeFooterBt.addEventListener("click",$4e12c0f0297ad96a$export$efd5f47703ccdabe),window.addEventListener("keydown",$4e12c0f0297ad96a$export$c09701d76723fae3)},onCloseModalFooterBackdrop=e=>{"backdrop-footer-modal"===e.target.className&&($4e12c0f0297ad96a$export$21666b427502ea6d.backdropFooter.classList.add("visually-hidden"),$4e12c0f0297ad96a$export$21666b427502ea6d.body.classList.remove("no-scroll"),$4e12c0f0297ad96a$export$21666b427502ea6d.upScroll.classList.remove("visually-hidden"),$4e12c0f0297ad96a$export$21666b427502ea6d.backdropFooter.removeEventListener("click",$4e12c0f0297ad96a$export$966efb3c3f923333))},onCloseModalFooterBt=()=>{$4e12c0f0297ad96a$export$21666b427502ea6d.backdropFooter.classList.add("visually-hidden"),$4e12c0f0297ad96a$export$21666b427502ea6d.body.classList.remove("no-scroll"),$4e12c0f0297ad96a$export$21666b427502ea6d.upScroll.classList.remove("visually-hidden"),$4e12c0f0297ad96a$export$21666b427502ea6d.closeFooterBt.removeEventListener("click",$4e12c0f0297ad96a$export$efd5f47703ccdabe)},onEscKeyFooter=e=>{console.log(e.code),"Escape"===e.code&&($4e12c0f0297ad96a$export$21666b427502ea6d.body.classList.remove("no-scroll"),$4e12c0f0297ad96a$export$21666b427502ea6d.backdropFooter.classList.add("visually-hidden"),$4e12c0f0297ad96a$export$21666b427502ea6d.upScroll.classList.remove("visually-hidden"),window.removeEventListener("keydown",$4e12c0f0297ad96a$export$c09701d76723fae3))},r("lWDEa");var k=r("iQIUW"),F=(y=r("2shzp"),x=r("f6zZF"),x=r("f6zZF"),r("krGWQ"));let E=1;y.default.defaults.baseURL="https://api.themoviedb.org/3/";function O(){F.refs.movieCards.innerHTML=""}F.refs.searchForm.addEventListener("submit",(async function(e){e.preventDefault(),E=1;const t=e.target.elements.searchQuery.value;if(""!==t)try{const e=await async function(e,t){try{return(await y.default.get(`search/movie?api_key=c6849c57578619bd16dafe22e211e348&language=en-US&query=${e}&page=${t}&include_adult=false`)).data.results}catch(e){console.error(e)}}(t,E);if(0!==e.length){O();const t=(0,x.getActualData)(e);(0,x.createMarkupCard)(t)}else O(),k.Notify.failure("Search result not successful. Enter the correct movie name and try again")}catch(e){console.log(e)}else k.Notify.failure("Please, enter your movie name")})),(0,d.initModal)();
//# sourceMappingURL=index.6deeee78.js.map
