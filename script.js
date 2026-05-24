
function filterTools(cat, btn){
  document.querySelectorAll('.tool').forEach(t=>{
    t.style.display = (cat==='all' || t.dataset.cat.includes(cat)) ? 'flex' : 'none';
  });
  document.querySelectorAll('.filterbar button').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
}
function filterPrompts(cat, btn){
  document.querySelectorAll('.prompt').forEach(p=>{
    p.style.display = (cat==='all' || p.dataset.cat.includes(cat)) ? 'flex' : 'none';
  });
  document.querySelectorAll('.filterbar button').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
}
function copyPrompt(id){
  const el=document.getElementById(id);
  const textBlock=el.querySelector('.prompt-text');
  const text=textBlock ? textBlock.innerText.trim() : el.innerText.trim();
  navigator.clipboard.writeText(text);
  alert('Prompt kopyalandı');
}


const SITE_SEARCH_INDEX = [
  {title:"Ana Sayfa", url:"index.html", desc:"AI para kazanma rehberi, ana bölümler ve başlangıç.", keywords:"ana sayfa ai para kazanma yapay zeka rehber"},
  {title:"Rehberler", url:"rehberler.html", desc:"Instagram, YouTube, AI video ve SEO rehberleri.", keywords:"rehberler instagram youtube tiktok ai video seo"},
  {title:"Instagram AI Rehberi", url:"instagram.html", desc:"Instagram Reels, carousel, hikâye ve içerik planı.", keywords:"instagram reels carousel hikaye post prompt"},
  {title:"YouTube AI Rehberi", url:"youtube.html", desc:"YouTube Shorts, uzun video, senaryo ve kanal planı.", keywords:"youtube shorts uzun video kanal senaryo prompt"},
  {title:"AI Video Rehberi", url:"ai-video.html", desc:"Runway, Pika, Kling, ElevenLabs ve CapCut iş akışı.", keywords:"ai video runway pika kling elevenlabs capcut"},
  {title:"Hazır Promptlar", url:"promptlar.html", desc:"Platform + yapay zekâ + nasıl kullanılır mantığında promptlar.", keywords:"prompt chatgpt instagram youtube capcut canva elevenlabs"},
  {title:"AI Araçları", url:"araclar.html", desc:"ChatGPT, Canva, CapCut, ElevenLabs, Runway, Suno ve diğer araçlar.", keywords:"ai araçları chatgpt canva capcut elevenlabs runway suno gemini claude"},
  {title:"Google SEO Planı", url:"seo.html", desc:"Google’da görünür olmak için sitemap, başlık ve içerik planı.", keywords:"seo google sitemap search console dizin"},
  {title:"ChatGPT", url:"araclar.html", desc:"Metin, fikir, plan, senaryo, prompt ve kod desteği.", keywords:"chatgpt openai metin fikir prompt"},
  {title:"Canva", url:"araclar.html", desc:"Post, kapak, carousel, afiş ve sosyal medya tasarımı.", keywords:"canva tasarım carousel post kapak"},
  {title:"CapCut", url:"araclar.html", desc:"Reels, Shorts, TikTok, altyazı ve kısa video kurgusu.", keywords:"capcut reels shorts tiktok altyazı kurgu"},
  {title:"ElevenLabs", url:"araclar.html", desc:"AI seslendirme ve video anlatıcı sesi.", keywords:"elevenlabs seslendirme ai ses text to speech"},
  {title:"Runway", url:"araclar.html", desc:"AI video üretimi ve kısa sahne denemeleri.", keywords:"runway ai video görselden video"},
  {title:"Suno", url:"araclar.html", desc:"AI müzik, jingle ve kısa tema üretimi.", keywords:"suno müzik jingle ai şarkı"},
  {title:"TikTok içerik fikri", url:"promptlar.html", desc:"TikTok için kısa video promptları ve CapCut iş akışı.", keywords:"tiktok video prompt capcut"}
];

function initSiteSearch(){
  const inputs = document.querySelectorAll("[data-site-search]");
  inputs.forEach(input=>{
    const box = input.parentElement.querySelector(".search-results");
    input.addEventListener("input", ()=>{
      const q = input.value.trim().toLowerCase();
      if(!q){ box.classList.remove("active"); box.innerHTML=""; return; }
      const words = q.split(/\s+/).filter(Boolean);
      const results = SITE_SEARCH_INDEX
        .map(item => {
          const hay = (item.title+" "+item.desc+" "+item.keywords).toLowerCase();
          const score = words.reduce((s,w)=> s + (hay.includes(w) ? 1 : 0), 0);
          return {...item, score};
        })
        .filter(item => item.score > 0)
        .sort((a,b)=> b.score-a.score)
        .slice(0,7);

      box.innerHTML = results.length
        ? results.map(r => `<a class="search-result-item" href="${r.url}"><div class="search-result-title">${r.title}</div><div class="search-result-desc">${r.desc}</div></a>`).join("")
        : `<div class="search-empty">Sonuç bulunamadı. Örnek: Instagram, YouTube, CapCut, ElevenLabs, prompt</div>`;
      box.classList.add("active");
    });
    input.addEventListener("keydown", e=>{
      if(e.key==="Enter"){
        const first = box.querySelector("a");
        if(first){ window.location.href = first.getAttribute("href"); }
      }
      if(e.key==="Escape"){ box.classList.remove("active"); }
    });
    document.addEventListener("click", e=>{
      if(!input.parentElement.contains(e.target)){ box.classList.remove("active"); }
    });
  });
}
document.addEventListener("DOMContentLoaded", initSiteSearch);


function copyPromptText(id){
  const el=document.getElementById(id);
  const text=el ? el.innerText.trim() : "";
  navigator.clipboard.writeText(text);
  alert("Prompt kopyalandı");
}
