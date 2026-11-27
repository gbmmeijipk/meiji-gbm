// Careers: build an email to HR from the form (attach CV in the email app)
(function(){
  const f=document.getElementById("careerForm"); if(!f)return;
  f.addEventListener("submit",e=>{
    e.preventDefault();
    const d=new FormData(f), g=k=>(d.get(k)||"").toString().trim();
    const subject="Career Application - "+g("role");
    const body=["Name: "+g("name"),"Phone: "+g("phone"),"Email: "+g("email"),"Area of interest: "+g("role"),"","About me:",g("msg"),"","(Please attach your CV to this email before sending.)"].join("\n");
    location.href="mailto:info@meiji-gbm.com.pk?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
    const ok=f.querySelector(".career-ok");ok.hidden=false;
  });
})();
