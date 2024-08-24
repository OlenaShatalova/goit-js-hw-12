import{a as y,S,i as c}from"./assets/vendor-58a9f1d3.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();const q=({largeImageURL:o,webformatURL:e,tags:i,likes:r,views:t,comments:s,downloads:n})=>`
  <li class="gallery-item">
      <a class="gallery-link" href="${o}">
      <img class="gallery-img" src="${e}" alt="${i}" />
      </a>
      <ul class="img-info-list">
        <li class="img-info-item">
          <p class="img-info-text">Likes</p>
          <p class="img-info-value">${r}</p>
        </li>
        <li class="img-info-item">
          <p class="img-info-text">Views</p>
          <p class="img-info-value">${t}</p>
        </li>
        <li class="img-info-item">
           <p class="img-info-text">Comments</p>
          <p class="img-info-value">${s}</p>
        </li>
        <li class="img-info-item">
          <p class="img-info-text">Downloads</p>
          <p class="img-info-value">${n}</p>
        </li>
      </ul>
  </li>
  `,L=o=>o.map(e=>q(e)).join("");y.defaults.baseURL="https://pixabay.com";const b=(o,e,i)=>{const r={params:{key:"45436364-f90a0cfe5f9b13d8d0e95a311",q:o,page:e,per_page:i,image_type:"photo",orientation:"horizontal",safesearch:"true"}};return y.get("/api/",r)},d="/goit-js-hw-12/assets/icon-6c35a70b.svg";let v=new S(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});const l=document.querySelector(".js-search-form"),m=document.querySelector(".js-gallery"),h=document.querySelector(".js-load-more-btn"),M=document.querySelector(".available-photo-quantity"),a=document.querySelector(".js-loader"),u=15;let f,g="",p,w;const P=()=>{p!==w?(h.classList.remove("is-hidden"),M.textContent=f):c.show({timeout:3e3,message:"We're sorry, but you've reached the end of search results.",position:"bottomLeft",iconUrl:d})},x=async o=>{try{if(o.preventDefault(),a.classList.remove("is-hidden"),g=l.elements.user_query.value.trim(),!g){c.show({timeout:3e3,message:"To search, fill out the form!",position:"topLeft",iconUrl:d}),m.innerHTML="",l.reset(),a.classList.add("is-hidden"),h.classList.add("is-hidden");return}p=1;const{data:e}=await b(g,p,u);if(a.classList.add("is-hidden"),e.hits.length===0){c.show({timeout:5e3,message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",iconUrl:d}),m.innerHTML="",l.reset(),a.classList.add("is-hidden"),h.classList.add("is-hidden");return}m.innerHTML=L(e.hits),v.refresh(),l.reset(),w=Math.ceil(e.totalHits/u),f=e.totalHits-u,P()}catch(e){c.show({timeout:5e3,message:`An error occurred: ${e.message}`,position:"topCenter",iconUrl:d})}},$=async()=>{try{p++,a.classList.remove("is-hidden"),h.classList.add("is-hidden");const{data:o}=await b(g,p,u);m.insertAdjacentHTML("beforeend",L(o.hits)),v.refresh(),a.classList.add("is-hidden"),f-=u,P();let i=m.querySelector("li").getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}catch(o){c.show({timeout:5e3,message:`An error occurred: ${o.message}`,position:"topCenter",iconUrl:d})}};l.addEventListener("submit",x);h.addEventListener("click",$);
//# sourceMappingURL=commonHelpers.js.map
