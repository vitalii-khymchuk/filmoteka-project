function e(e){return e&&e.__esModule?e.default:e}var t;t=JSON.parse('{"adult":false,"backdrop_path":"/d6MhreFdMHONqX3iZlJGCF8UkIt.jpg","belongs_to_collection":null,"budget":200000000,"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":14,"name":"Fantasy"}],"homepage":"https://www.dc.com/BlackAdam","id":436270,"imdb_id":"tt6443346","original_language":"en","original_title":"Black Adam","overview":"Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.","popularity":4912.22,"poster_path":"/3zXceNTtyj5FLjwQXuPvLYK5YYL.jpg","production_companies":[{"id":12,"logo_path":"/iaYpEp3LQmb8AfAtmTvpqd4149c.png","name":"New Line Cinema","origin_country":"US"},{"id":34081,"logo_path":null,"name":"Flynn Picture Company","origin_country":"US"},{"id":73669,"logo_path":"/7tmSGstK3KwgcDIuBYLTAayjit9.png","name":"Seven Bucks Productions","origin_country":"US"},{"id":128064,"logo_path":"/13F3Jf7EFAcREU0xzZqJnVnyGXu.png","name":"DC Films","origin_country":"US"}],"production_countries":[{"iso_3166_1":"US","name":"United States of America"}],"release_date":"2022-10-19","revenue":140000000,"runtime":125,"spoken_languages":[{"english_name":"English","iso_639_1":"en","name":"English"}],"status":"Released","tagline":"The world needed a hero. It got Black Adam.","title":"Black Adam","video":false,"vote_average":7.138,"vote_count":488}');const n={btn1:document.querySelector(".btn1"),btn2:document.querySelector(".btn2")};let o={};function a(e){i(e)?(!function(e){const t=r(e),n=t.findIndex((e=>e.id===o.id));t.splice(n,1),d(e,t)}(e),c(e)):(!function(e){const t=r(e);t.push(o),d(e,t)}(e),c(e))}function i(e){const t=r(e);return t?t.some((e=>e.id===o.id)):(localStorage.setItem(e,"[]"),!1)}function c(e){const t=i(e)?"delete from ":"add to ";switch(e){case"watched":return void(n.btn1.textContent=(t+e).toUpperCase());case"queue":return void(n.btn2.textContent=(t+e).toUpperCase())}}function r(e){return JSON.parse(localStorage.getItem(e))}function d(e,t){localStorage.setItem(e,JSON.stringify(t))}!function(e){const{adult:t,backdrop_path:i,genres:r,id:d,original_language:u,original_title:l,overview:s,popularity:g,poster_path:p,release_date:m,title:_,video:h,vote_average:v,vote_count:f}=e,w=r.map((e=>e.id));o={adult:t,backdrop_path:i,genre_ids:w,id:d,original_language:u,original_title:l,overview:s,popularity:g,poster_path:p,release_date:m,title:_,video:h,vote_average:v,vote_count:f},n.btn1.addEventListener("click",(()=>a("watched"))),n.btn2.addEventListener("click",(()=>a("queue"))),c("watched"),c("queue")}(e(t));const u={watchedBtn:document.querySelector(".watchedBtn"),queueBtn:document.querySelector(".queueBtn")};function l(e,t){e.classList.add("active"),t.classList.remove("active")}function s(e){const t=r(e);console.log(t)}u.watchedBtn.addEventListener("click",(function(){s("watched"),l(u.watchedBtn,u.queueBtn)})),u.queueBtn.addEventListener("click",(function(){s("queue"),l(u.queueBtn,u.watchedBtn)}));
//# sourceMappingURL=index.e913712a.js.map
