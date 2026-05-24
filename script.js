
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
  {title:'Ana Sayfa', url:'index.html', desc:'AI para kazanma rehberi, ana bölümler ve başlangıç.', keywords:'ana sayfa ai para kazanma yapay zeka rehber'},
  {title:'Rehberler', url:'rehberler.html', desc:'Instagram, YouTube, TikTok, AI video ve SEO rehberleri.', keywords:'rehberler instagram youtube tiktok ai video seo'},
  {title:'Instagram AI Rehberi', url:'instagram.html', desc:'Instagram Reels, kaydırmalı paylaşım, hikâye ve içerik planı.', keywords:'instagram reels carousel hikaye post prompt'},
  {title:'YouTube AI Rehberi', url:'youtube.html', desc:'YouTube Shorts, uzun video, senaryo ve kanal planı.', keywords:'youtube shorts uzun video kanal senaryo prompt'},
  {title:'TikTok AI Rehberi', url:'tiktok-ai-rehberi.html', desc:'TikTok için ChatGPT, ElevenLabs ve CapCut iş akışı.', keywords:'tiktok ai rehberi video prompt capcut'},
  {title:'AI Video Rehberi', url:'ai-video.html', desc:'Runway, Pika, Kling, ElevenLabs ve CapCut iş akışı.', keywords:'ai video runway pika kling elevenlabs capcut'},
  {title:'Hazır Promptlar', url:'promptlar.html', desc:'Platform + yapay zekâ + nasıl kullanılır mantığında promptlar.', keywords:'prompt chatgpt instagram youtube tiktok capcut canva elevenlabs'},
  {title:'AI Araçları', url:'araclar.html', desc:'ChatGPT, Canva, CapCut, ElevenLabs, Runway, Suno ve diğer araçlar.', keywords:'ai araçları chatgpt canva capcut elevenlabs runway suno gemini claude'},
  {title:'CapCut Kurgu Promptları', url:'capcut-kurgu-promptlari.html', desc:'Reels, Shorts ve TikTok için CapCut kurgu promptları.', keywords:'capcut kurgu altyazı reels shorts tiktok prompt'},
  {title:'Instagram Reels Promptları', url:'instagram-reels-promptlari.html', desc:'Instagram Reels için hazır ChatGPT promptları.', keywords:'instagram reels promptları chatgpt capcut canva'},
  {title:'YouTube Shorts Promptları', url:'youtube-shorts-promptlari.html', desc:'YouTube Shorts için senaryo ve başlık promptları.', keywords:'youtube shorts promptları chatgpt'},
  {title:'TikTok Video Promptları', url:'tiktok-video-promptlari.html', desc:'TikTok için kısa video promptları.', keywords:'tiktok video promptları'},
  {title:'SSS', url:'sss.html', desc:'Yapay zekâ ve site hakkında sık sorulan sorular.', keywords:'sss sık sorulan sorular'},
  {title:'Yeni Başlayanlar AI Rehberi', url:'yeni-baslayanlar-ai-rehberi.html', desc:'7 günlük başlangıç planı.', keywords:'yeni başlayanlar ai rehberi'},
  {title:'Ücretsiz AI Araçları', url:'ucretsiz-ai-araclari.html', desc:'Başlangıç için ücretsiz AI araçları.', keywords:'ücretsiz ai araçları'},
  {title:'AI Araç Maliyeti', url:'ai-arac-maliyeti.html', desc:'Başlangıç, video ve görsel paketleri için maliyet mantığı.', keywords:'ai araç maliyeti ücretsiz ücretli'},
  {title:'Hangi AI Aracı Bana Uygun?', url:'hangi-ai-araci-bana-uygun.html', desc:'Yapmak istediğin işe göre araç seçimi.', keywords:'hangi ai aracı bana uygun'},
  {title:'AI İçerik Takvimi', url:'ai-icerik-takvimi.html', desc:'Instagram, YouTube ve TikTok için içerik takvimi.', keywords:'ai içerik takvimi instagram youtube tiktok'},
  {title:'Hakkımızda', url:'hakkimizda.html', desc:'Site amacı ve bağımsızlık bilgisi.', keywords:'hakkımızda site amaç'},
  {title:'İletişim', url:'iletisim.html', desc:'Öneri ve iletişim sayfası.', keywords:'iletişim'},
  {title:'Gizlilik Politikası', url:'gizlilik-politikasi.html', desc:'Gizlilik ve üçüncü taraf bağlantılar hakkında bilgi.', keywords:'gizlilik politikası'},
  {title:'Kullanım Şartları', url:'kullanim-sartlari.html', desc:'Kazanç garantisi ve marka bağlantısı notları.', keywords:'kullanım şartları yasal marka'},
  {title:'Google SEO Planı', url:'seo.html', desc:'Google’da görünür olmak için sitemap, başlık ve içerik planı.', keywords:'seo google sitemap search console dizin'}
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
