// Add ingredients, use, pack and price to any product below and they will appear on its card.
const products=[
  {name:"Risho-Liv Syrup",img:"images/riso.jpg",type:"Ayurvedic syrup"},
  {name:"Zymorish Syrup",img:"images/zymo.jpg",type:"Ayurvedic syrup"},
  {name:"FemOrish Syrup",img:"images/femo.jpg",type:"Ayurvedic syrup"},
  {name:"Blood Purrish Syrup",img:"images/blood.jpg",type:"Ayurvedic syrup"},
  {name:"Hemorish Syrup",img:"images/hemo.jpg",type:"Ayurvedic syrup"},
  {name:"Ortho Rish Syrup",img:"images/ortho.jpg",type:"Ayurvedic syrup"},
  {name:"Cofrish Expectorant",img:"images/cof.jpg",type:"Ayurvedic expectorant"},
  {name:"Jorish Oil",img:"images/jorish.jpg",type:"Ayurvedic oil"}
  // Example: {name:"...",img:"...",type:"...",ingredients:"Ashwagandha, ...",use:"...",pack:"200 ml",price:"₹___"}
];
const WA="919431873287";
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const g=document.getElementById("grid");
if(g)g.innerHTML=(g.dataset.limit?products.slice(0,+g.dataset.limit):products).map(p=>{
  const msg=encodeURIComponent("Hello, I would like information about "+p.name+".");
  return `<article class="card">
    <div class="pic"><img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy"></div>
    <div class="body">
      <span class="tag">${esc(p.type)}</span>
      <h3>${esc(p.name)}</h3>
      ${p.use?`<p>${esc(p.use)}</p>`:""}
      ${p.ingredients?`<p class="meta"><strong>Ingredients:</strong> ${esc(p.ingredients)}</p>`:""}
      ${p.pack?`<p class="meta"><strong>Pack:</strong> ${esc(p.pack)}</p>`:""}
      ${p.price?`<p class="meta"><strong>Price:</strong> ${esc(p.price)}</p>`:""}
      <a class="btn green" href="https://wa.me/${WA}?text=${msg}" target="_blank" rel="noopener">Ask about this product</a>
    </div></article>`;
}).join("");

const enq=document.getElementById("enq");
if(enq)enq.addEventListener("submit",e=>{
  e.preventDefault();
  const t="Name: "+n.value+"\nPhone: "+p.value+"\nEnquiry: "+q.value;
  window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(t),"_blank","noopener");
});


// Home page slider
(function(){
  const box=document.querySelector(".slider");if(!box)return;
  const track=box.querySelector(".track"),slides=[...track.children],dots=[...box.querySelectorAll(".dots button")];
  let i=0,timer=null,x0=null;
  function go(k){
    i=(k+slides.length)%slides.length;
    track.style.transform="translateX(-"+(i*100)+"%)";
    slides.forEach((s,j)=>{s.inert=j!==i;s.setAttribute("aria-hidden",j!==i)});
    dots.forEach((d,j)=>d.setAttribute("aria-current",j===i));
    fit();
  }
  function fit(){box.style.height=slides[i].offsetHeight+"px"}
  if(window.ResizeObserver){const ro=new ResizeObserver(fit);slides.forEach(s=>ro.observe(s))}
  window.addEventListener("resize",fit);window.addEventListener("load",fit);
  function play(){stop();if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;timer=setInterval(()=>go(i+1),5500)}
  function stop(){clearInterval(timer)}
  box.querySelector(".prev").onclick=()=>{go(i-1);play()};
  box.querySelector(".next").onclick=()=>{go(i+1);play()};
  dots.forEach((d,j)=>d.onclick=()=>{go(j);play()});
  box.addEventListener("mouseenter",stop);box.addEventListener("mouseleave",play);
  box.addEventListener("focusin",stop);box.addEventListener("focusout",play);
  box.addEventListener("touchstart",e=>{x0=e.touches[0].clientX},{passive:true});
  box.addEventListener("touchend",e=>{if(x0===null)return;const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50){go(d<0?i+1:i-1);play()}x0=null});
  go(0);play();
})();