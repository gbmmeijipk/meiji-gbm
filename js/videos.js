// Click-to-play YouTube videos (loads the player only when clicked)
document.querySelectorAll(".yt-card").forEach(card=>{
  card.addEventListener("click",()=>{
    const id=card.dataset.yt; if(!id||card.querySelector("iframe"))return;
    const f=document.createElement("iframe");
    f.src="https://www.youtube-nocookie.com/embed/"+encodeURIComponent(id)+"?autoplay=1&rel=0";
    f.title=card.dataset.title||"MEIJI product video";
    f.allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen";
    f.allowFullscreen=true;
    card.innerHTML="";card.appendChild(f);card.classList.add("playing");
  });
});
