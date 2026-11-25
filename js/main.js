const languageSelect=document.getElementById("languageSelect");
function setLanguage(lang){
  const dict=translations[lang]||translations.en;
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==="ur"?"rtl":"ltr";
  document.body.dir=lang==="ur"?"rtl":"ltr";
  document.body.classList.toggle("japanese",lang==="ja");
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key=el.getAttribute("data-i18n");
    if(dict[key]) el.textContent=dict[key];
  });
  languageSelect.value=lang;
  try{localStorage.setItem("gbm-language",lang)}catch(e){}
  document.title=lang==="ur"?"گلوبل برانڈز مارکیٹنگ | MEIJI پاکستان":lang==="ja"?"Global Brands Marketing | MEIJI Pakistan":"Global Brands Marketing (Pvt) Ltd. | MEIJI Pakistan";
}
let saved="en";try{saved=localStorage.getItem("gbm-language")||"en"}catch(e){}
setLanguage(saved);
languageSelect.addEventListener("change",e=>setLanguage(e.target.value));
const menuToggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".main-nav");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false")}));
document.getElementById("year").textContent=new Date().getFullYear();
const back=document.getElementById("backToTop");
window.addEventListener("scroll",()=>back.classList.toggle("visible",window.scrollY>500));
back.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
document.querySelectorAll("[data-product]").forEach(link=>link.addEventListener("click",()=>{const select=document.querySelector('select[name="product"]');select.value=link.dataset.product;}));

// Accessible, touch-friendly MEIJI product slideshow with automatic rotation.
const showcase=document.querySelector(".product-showcase");
if(showcase){
  const slides=[...showcase.querySelectorAll(".showcase-slide")];
  const dots=[...showcase.querySelectorAll(".showcase-dots button")];
  let activeSlide=0, rotation=null, touchStartX=0;
  const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function showProductSlide(index){
    activeSlide=(index+slides.length)%slides.length;
    slides.forEach((slide,i)=>{slide.classList.toggle("is-active",i===activeSlide);slide.setAttribute("aria-hidden",String(i!==activeSlide));});
    dots.forEach((dot,i)=>{dot.classList.toggle("is-active",i===activeSlide);dot.setAttribute("aria-current",i===activeSlide?"true":"false");});
  }
  function stopRotation(){if(rotation){clearInterval(rotation);rotation=null;}}
  function startRotation(){if(reducedMotion||document.hidden)return;stopRotation();rotation=setInterval(()=>showProductSlide(activeSlide+1),5000);}
  document.getElementById("productPrev").addEventListener("click",()=>{showProductSlide(activeSlide-1);startRotation();});
  document.getElementById("productNext").addEventListener("click",()=>{showProductSlide(activeSlide+1);startRotation();});
  dots.forEach((dot,i)=>dot.addEventListener("click",()=>{showProductSlide(i);startRotation();}));
  showcase.addEventListener("mouseenter",stopRotation);
  showcase.addEventListener("mouseleave",startRotation);
  showcase.addEventListener("focusin",stopRotation);
  showcase.addEventListener("focusout",startRotation);
  showcase.addEventListener("touchstart",e=>{touchStartX=e.changedTouches[0].screenX;},{passive:true});
  showcase.addEventListener("touchend",e=>{const delta=e.changedTouches[0].screenX-touchStartX;if(Math.abs(delta)>45){showProductSlide(activeSlide+(delta<0?1:-1));startRotation();}},{passive:true});
  document.addEventListener("visibilitychange",()=>document.hidden?stopRotation():startRotation());
  showProductSlide(0);startRotation();
}

document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  const form=e.currentTarget;
  if(!form.reportValidity())return;
  const data=new FormData(form);
  const subject=encodeURIComponent("Website inquiry – "+(data.get("product")||"General inquiry"));
  const body=encodeURIComponent("Name: "+data.get("name")+"\nBusiness: "+data.get("business")+"\nEmail: "+data.get("email")+"\nPhone: "+data.get("phone")+"\nProduct: "+data.get("product")+"\n\nMessage:\n"+data.get("message"));
  document.getElementById("formStatus").textContent="Opening your email application with the inquiry details.";
  window.location.href="mailto:info@meiji-gbm.com.pk?subject="+subject+"&body="+body;
});
