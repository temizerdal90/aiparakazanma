
const ideas = [
  {title:"40 saniyelik YouTube Shorts", text:"Bir ilginç bilgi seç, ilk 3 saniyeye güçlü soru koy, 3 maddeyle anlat, finalde yorum sorusu sor."},
  {title:"Instagram Reels mini rehberi", text:"Bir problemi seç: 'CapCut altyazı nasıl yapılır?' Önce sonucu göster, sonra 3 adımı hızlı anlat."},
  {title:"TikTok seri fikri", text:"'AI ile 1 dakikada...' formatında 7 bölümlük seri yap: fikir, senaryo, ses, görsel, kurgu, açıklama, paylaşım."},
  {title:"Blog içerik planı", text:"Bir ana konu seç, 5 alt başlık çıkar, her başlık için 1 arama niyeti ve 1 kısa cevap hazırla."}
];

function randomIdea(){
  const box = document.querySelector("#ideaText");
  const title = document.querySelector("#ideaTitle");
  if(!box || !title) return;
  const item = ideas[Math.floor(Math.random()*ideas.length)];
  title.textContent = item.title;
  box.textContent = item.text;
}

function buildPrompt(){
  const goal = document.querySelector("#goal")?.value || "kısa video fikri üretmek";
  const platform = document.querySelector("#platform")?.value || "YouTube Shorts";
  const tone = document.querySelector("#tone")?.value || "sade, merak uyandıran";
  const ai = document.querySelector("#ai")?.value || "ChatGPT";
  const output = document.querySelector("#promptOutput");
  if(!output) return;
  output.textContent = `Şu konuda ${platform} için içerik üretmek istiyorum: "${goal}".

Bana ${tone} bir dille:
1. İlk 3 saniye için güçlü hook
2. 40-60 saniyelik kısa senaryo
3. Ekranda görünecek metinler
4. Başlık önerileri
5. Açıklama metni
6. 8 hashtag
7. CapCut/kurgu notları

hazırla. Çıktıyı net başlıklarla ver. Gereksiz uzun anlatma.`;
}

document.addEventListener("DOMContentLoaded", () => {
  randomIdea();
  buildPrompt();
  document.querySelectorAll("#goal,#platform,#tone,#ai").forEach(el => el.addEventListener("input", buildPrompt));
});
