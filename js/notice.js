// Important Notice popup (shown once per browser session)
(function(){
  try{if(sessionStorage.getItem("gbm-notice-ack"))return}catch(e){}
  const m=document.getElementById("noticeModal"); if(!m)return;
  const btn=m.querySelector(".notice-btn"); const prev=document.activeElement;
  function open(){m.hidden=false;document.body.style.overflow="hidden";requestAnimationFrame(()=>m.classList.add("show"));btn.focus()}
  function close(){m.classList.remove("show");document.body.style.overflow="";try{sessionStorage.setItem("gbm-notice-ack","1")}catch(e){}setTimeout(()=>{m.hidden=true;if(prev&&prev.focus)prev.focus()},350)}
  btn.addEventListener("click",close);
  m.querySelector(".notice-x").addEventListener("click",close);
  m.addEventListener("click",e=>{if(e.target===m)close()});
  document.addEventListener("keydown",e=>{if(m.hidden)return;if(e.key==="Escape")close();if(e.key==="Tab"){const f=[...m.querySelectorAll("button")];const i=f.indexOf(document.activeElement);e.preventDefault();f[(i+(e.shiftKey?-1:1)+f.length)%f.length].focus()}});
  setTimeout(open,600);
})();
