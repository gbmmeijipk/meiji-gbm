// Animated MEIJI product detail explorer (content from meiji-gbm.com.pk/products.html)
(function(){
  const P=[
    {id:"mami",name:"MEIJI MAMILAC",age:"Pregnancy & breastfeeding",type:"Maternal formula",img:"hero-mamilac.png",
     desc:"A formula for pregnant and breastfeeding women, in vanilla flavour. Imported, 350 g.",
     f:["Formula for pregnant and breastfeeding women","Contains folic acid, iron and calcium","Contains DHA, FOS, vitamin A and zinc","Gluten free","Quick dissolving","Vanilla flavour"]},
    {id:"fmt",name:"MEIJI FM-T",age:"0 – 6 months",type:"Infant formula",img:"hero-fmt.png",
     desc:"An infant formula fortified with DHA, with a granulated texture that dissolves easily.",
     f:["Fortified with DHA for brain and retinal development","Milk phospholipids help concentrate DHA in the body","Balanced omega-3 (alpha-linolenic) and omega-6 (linoleic) ratio, precursors of DHA and ARA","Nucleotides, also found in mother's milk, support the immune system","FOS promotes beneficial bifidobacteria and inhibits pathogenic bacteria","Balanced amounts of other vitamins and minerals","Granulated to dissolve easily"]},
    {id:"fu",name:"MEIJI FU",age:"6 – 12 months",type:"Follow-up formula",img:"hero-fu.png",
     desc:"A follow-up formula with DHA and balanced minerals for the weaning stage.",
     f:["Fortified with DHA for brain and retinal development","Milk phospholipids help concentrate DHA","Balanced omega-3 and omega-6 ratio, precursors of DHA and ARA","Nucleotides support the immune system","FOS promotes beneficial intestinal bifidobacteria","Balanced iron, calcium and other minerals often lacking in typical baby food","Natural beta-carotene as an antioxidant","Granulated to dissolve easily"]},
    {id:"pre",name:"MEIJI-PRE",age:"Preterm & low birth weight",type:"Specialised formula",img:"hero-pre.png",
     desc:"A specialised formula designed for preterm and low birth weight infants.",
     f:["FOS aids bowel movements and improves stool properties","FOS, nucleotides, vitamin A and zinc support the immune system","Balanced omega-3 and omega-6 ratio for cerebral and retinal development","Beta-carotene and selenium as antioxidants","Suitable amounts and balance of vitamins and minerals for rapidly growing infants","Granulated to dissolve easily"]},
    {id:"big",name:"MEIJI BIG",age:"1 year & over",type:"Growing-up formula",img:"hero-big.png",
     desc:"Nutritional support for healthy growth in children aged 1 and over.",
     f:["Good-quality protein, including 40% whey protein","Increased sulfur-containing amino acids such as cysteine","Fortified with DHA for brain and retinal development","Milk phospholipids help concentrate DHA","Balanced omega-3 and omega-6 ratio","FOS promotes beneficial intestinal bifidobacteria","Nucleotides support the immune system","Balanced iron, calcium and other minerals","Natural beta-carotene as an antioxidant"]},
    {id:"kids",name:"MEIJI KIDS PLUS",age:"3 years & onwards",type:"Growing-up formula",img:"hero-kids-plus.png",
     desc:"A growing-up formula for healthy growth during the rapid growth phase.",
     f:["High-quality protein and nutrition for the child's physical foundation","Calcium for healthy teeth and bones","Sufficient iron for red blood cell production and hemoglobin","Milk phospholipids from cow's milk, a good source of sphingomyelin"]},
    {id:"lact",name:"MEIJI LACTOLESS",age:"Infants & children",type:"Lactose-free formula",img:"hero-lactoless.png",
     desc:"For those with lactase deficiency or transient lactose intolerance who experience diarrhea or abdominal pain from lactose-containing milk.",
     f:["Lactose-free","Easily digestible, with absorbable milk protein","Fortified with taurine and cystine","Balanced linoleic and alpha-linolenic essential fatty acids","Well-balanced minerals and appropriate vitamin content"]}
  ];
  const root=document.getElementById("productDetail"); if(!root) return;
  const tabs=root.querySelector(".pd-tabs"), stage=root.querySelector(".pd-stage");
  const $=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
  let cur=0,timer=null;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  P.forEach((p,i)=>{const b=$("button","pd-tab",p.name.replace("MEIJI","").replace("-","")||p.name);b.type="button";b.setAttribute("role","tab");b.textContent=p.name.replace("MEIJI ","").replace("MEIJI-","");b.addEventListener("click",()=>{show(i);auto()});tabs.appendChild(b)});
  function show(i){
    cur=i;const p=P[i];
    [...tabs.children].forEach((b,j)=>{b.classList.toggle("on",j===i);b.setAttribute("aria-selected",j===i)});
    stage.innerHTML="";
    const vis=$("div","pd-visual");
    vis.appendChild($("div","pd-halo"));
    if(p.img){const im=new Image();im.src="assets/images/"+p.img;im.alt=p.name+" pack";vis.appendChild(im)}
    else{const ph=$("div","pd-ph");ph.appendChild($("span",null,"PRE"));ph.appendChild($("small",null,"Pack image coming soon"));vis.appendChild(ph)}
    const info=$("div","pd-info");
    info.appendChild($("span","pd-age",p.age));
    info.appendChild($("h3",null,p.name));
    info.appendChild($("p","pd-type",p.type));
    info.appendChild($("p","pd-desc",p.desc));
    const ul=$("ul","pd-list");
    p.f.forEach((t,k)=>{const li=$("li",null,t);li.style.setProperty("--i",k);ul.appendChild(li)});
    info.appendChild(ul);
    const a=$("a","btn btn-primary","Product inquiry");a.href="#contact";
    a.addEventListener("click",()=>{const s=document.querySelector('select[name="product"]');if(s){[...s.options].forEach(o=>{if(o.text===p.name.replace("KIDS PLUS","KIDS+ PLUS").replace("MEIJI-PRE","MEIJI PRE"))s.value=o.value})}});
    info.appendChild(a);
    stage.append(vis,info);
  }
  function auto(){clearInterval(timer);if(reduce)return;timer=setInterval(()=>show((cur+1)%P.length),9000)}
  root.addEventListener("mouseenter",()=>clearInterval(timer));root.addEventListener("mouseleave",auto);
  show(0);auto();
  const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&root.classList.add("seen")),{threshold:.15});io.observe(root);
})();
