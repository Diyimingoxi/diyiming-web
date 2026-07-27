const PROJECT_ID="rlacne6j";
const DATASET="production";
const API_VERSION="2026-07-27";
const API=`https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}`;

const esc=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const query=async groq=>{
  const response=await fetch(`${API}?query=${encodeURIComponent(groq)}`);
  if(!response.ok)throw new Error("CMS no disponible");
  return (await response.json()).result;
};

async function loadSettings(){
  const data=await query(`*[_type=="siteSettings" && _id=="siteSettings"][0]{
    companyName,heroEyebrow,heroTitle,heroDescription,aboutTitle,aboutText,
    email,phone,whatsapp,address,linkedin,facebook
  }`);
  if(!data)return;
  Object.entries(data).forEach(([key,value])=>{
    if(value)document.querySelectorAll(`[data-cms="${key}"]`).forEach(el=>el.textContent=value);
  });
  if(data.email){
    document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{a.href=`mailto:${data.email}`;a.textContent=data.email});
  }
}

async function loadServices(){
  const targets=[document.querySelector("#cms-services-home"),document.querySelector("#cms-services")].filter(Boolean);
  if(!targets.length)return;
  const data=await query(`*[_type=="service" && active==true]|order(order asc){title,category,summary}`);
  if(!data?.length)return;
  targets.forEach(target=>{
    const compact=target.id==="cms-services-home";
    target.innerHTML=data.map((item,index)=>compact
      ? `<article class="card visible"><div class="card-num">${String(index+1).padStart(2,"0")} / ${esc(item.category||"SERVICIO").toUpperCase()}</div><h3>${esc(item.title)}</h3><p>${esc(item.summary)}</p><a href="servicios.html">Ver alcance →</a></article>`
      : `<article class="service-detail"><h3>${esc(item.title)}</h3><p>${esc(item.summary)}</p></article>`
    ).join("");
  });
}

async function loadCases(){
  const target=document.querySelector("#cms-cases");
  if(!target)return;
  const data=await query(`*[_type=="caseStudy" && published==true]|order(order asc){title,sector,location,summary,"imageUrl":image.asset->url,"imageAlt":image.alt}`);
  if(!data?.length)return;
  target.innerHTML=data.map(item=>`<article class="case-card${item.imageUrl?" case-photo":""}"${item.imageUrl?` style="--case-image:url('${esc(item.imageUrl)}')"`:""}><span>${esc(item.sector)}${item.location?` · ${esc(item.location)}`:""}</span><h3>${esc(item.title)}</h3><p>${esc(item.summary)}</p></article>`).join("");
}

async function loadTeam(){
  const target=document.querySelector("#cms-team");
  if(!target)return;
  const data=await query(`*[_type=="teamMember" && active==true]|order(order asc){name,role,bio,linkedin,"photoUrl":photo.asset->url,"photoAlt":photo.alt}`);
  if(!data?.length)return;
  target.innerHTML=data.map(item=>`<article class="team-card"><div class="team-photo">${item.photoUrl?`<img src="${esc(item.photoUrl)}?auto=format&w=900" alt="${esc(item.photoAlt||item.name)}" loading="lazy">`:""}</div><div class="team-copy"><span>${esc(item.role)}</span><h3>${esc(item.name)}</h3>${item.bio?`<p>${esc(item.bio)}</p>`:""}${item.linkedin?`<a href="${esc(item.linkedin)}" target="_blank" rel="noopener">Ver LinkedIn →</a>`:""}</div></article>`).join("");
}

async function loadPosts(){
  const targets=[document.querySelector("#cms-posts-home"),document.querySelector("#cms-posts")].filter(Boolean);
  if(!targets.length)return;
  const data=await query(`*[_type=="post" && published==true]|order(publishedAt desc)[0...12]{title,excerpt,publishedAt,"slug":slug.current,"imageUrl":coverImage.asset->url,"imageAlt":coverImage.alt}`);
  if(!data?.length)return;
  targets.forEach(target=>{
    const items=target.id==="cms-posts-home"?data.slice(0,3):data;
    target.innerHTML=items.map(item=>`<a class="insight${item.imageUrl?" insight-photo":""} visible" href="articulo.html?slug=${encodeURIComponent(item.slug)}">${item.imageUrl?`<img src="${esc(item.imageUrl)}?auto=format&w=1200" alt="${esc(item.imageAlt||item.title)}" loading="lazy">`:""}<div class="insight-copy"><small>${item.publishedAt?new Date(item.publishedAt).toLocaleDateString("es-PE",{year:"numeric",month:"long",day:"numeric"}):"Artículo"}</small><h3>${esc(item.title)}</h3><span>${esc(item.excerpt||"Leer artículo")} →</span></div></a>`).join("");
  });
}

async function loadArticle(){
  const target=document.querySelector("#cms-article");
  if(!target)return;
  const slug=new URLSearchParams(location.search).get("slug");
  if(!slug){target.innerHTML="<h2>Artículo no encontrado</h2>";return}
  const data=await query(`*[_type=="post" && slug.current==${JSON.stringify(slug)} && published==true][0]{title,excerpt,publishedAt,"coverUrl":coverImage.asset->url,"coverAlt":coverImage.alt,"author":author->{name,role,"photoUrl":photo.asset->url},body[]{..., _type=="image"=>{"url":asset->url,alt}}}`);
  if(!data){target.innerHTML="<h2>Artículo no encontrado</h2><p>Regrese a la sección de conocimiento.</p>";return}
  const blocks=(data.body||[]).map(block=>{
    if(block._type==="image"&&block.url)return `<figure><img src="${esc(block.url)}?auto=format&w=1400" alt="${esc(block.alt||"Imagen del artículo")}" loading="lazy">${block.alt?`<figcaption>${esc(block.alt)}</figcaption>`:""}</figure>`;
    if(block._type!=="block")return "";
    const text=(block.children||[]).map(child=>esc(child.text)).join("");
    const tag=/^h[2-4]$/.test(block.style)?block.style:"p";
    return `<${tag}>${text}</${tag}>`;
  }).join("");
  const author=data.author?`<div class="article-author">${data.author.photoUrl?`<img src="${esc(data.author.photoUrl)}?auto=format&w=160" alt="${esc(data.author.name)}">`:""}<div><b>${esc(data.author.name)}</b><span>${esc(data.author.role||"")}</span></div></div>`:"";
  target.innerHTML=`<div class="breadcrumbs"><a href="blog.html">Conocimiento</a> / Artículo</div><span class="eyebrow">Ideas Diyiming</span><h1>${esc(data.title)}</h1><p class="lead">${esc(data.excerpt||"")}</p>${author}${data.coverUrl?`<img class="article-cover" src="${esc(data.coverUrl)}?auto=format&w=1800" alt="${esc(data.coverAlt||data.title)}">`:""}<div class="article-body">${blocks}</div>`;
  document.title=`${data.title} | Diyiming Consultores`;
}

Promise.allSettled([loadSettings(),loadServices(),loadCases(),loadTeam(),loadPosts(),loadArticle()]);
