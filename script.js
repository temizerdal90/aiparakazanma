
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



const seedData = {
  niches: {
    "otomotiv": {
      angles: ["parça seçimi", "usta tavsiyesi", "yan sanayi/orijinal farkı", "bakım hataları", "araç sahibinin bilmesi gerekenler"],
      examples: ["Fren balatası alırken yapılan 5 hata", "Orijinal parça ile yan sanayi parça nasıl ayırt edilir?", "Araç bakımında ertelenmemesi gereken 3 parça"]
    },
    "para": {
      angles: ["tasarruf", "ek gelir fikri", "dijital ürün", "freelance", "bütçe planı"],
      examples: ["Yeni başlayanlar için 5 dijital ürün fikri", "AI ile hizmet satmaya başlamak", "Evden yapılabilecek sade ek gelir fikirleri"]
    },
    "teknoloji": {
      angles: ["yeni araçlar", "AI karşılaştırma", "telefon/bilgisayar ipuçları", "verimlilik", "güvenlik"],
      examples: ["ChatGPT ile 10 dakikada içerik planı", "Ücretsiz AI araçlarıyla video fikri üretme", "Bilgisayarı hızlandırmak için 5 basit ayar"]
    },
    "sağlık": {
      angles: ["genel bilgilendirme", "alışkanlık", "uyarı işaretleri", "doğru bilinen yanlışlar", "rutin"],
      examples: ["Su içmeyi unutanlar için 5 pratik yöntem", "Uyku düzenini bozan 4 alışkanlık", "Hareketsiz kalmanın günlük etkileri"]
    },
    "tarih": {
      angles: ["tarihte bugün", "ilkler", "ilginç olay", "kısa biyografi", "neden önemli?"],
      examples: ["İstanbul'un fethi neden dönüm noktasıydı?", "İlk iPhone neden bu kadar önemliydi?", "Tarihte bugün 3 ilginç olay"]
    },
    "oyun": {
      angles: ["rehber", "hata", "karakter/ekip dizilimi", "güncelleme", "başlangıç ipucu"],
      examples: ["Yeni başlayanların yaptığı 5 oyun hatası", "Takım dizilimi yaparken dikkat edilecekler", "Oyunda kaynak yönetimi nasıl yapılır?"]
    }
  },
  platformRules: {
    "YouTube Shorts": {duration:"45-60 sn", style:"net anlatım + güçlü ilk 3 saniye", cta:"Yorumlara kendi fikrini yaz"},
    "Instagram Reels": {duration:"20-35 sn", style:"görsel hızlı akış + kısa caption", cta:"Kaydet ve sonra dene"},
    "TikTok": {duration:"15-30 sn", style:"hızlı tempo + seri mantığı", cta:"2. bölüm gelsin mi?"},
    "Blog": {duration:"700-1200 kelime", style:"başlıklar, kısa cevap, örnekler", cta:"İlgili rehbere geç"}
  },
  tones: {
    "Merak uyandıran": ["Bunu çoğu kişi yanlış biliyor", "Asıl fark burada başlıyor", "İlk bakışta küçük görünüyor ama sonucu büyük"],
    "Eğitici": ["Kısa ve net anlatalım", "Adım adım gidelim", "Önce temel mantığı kuralım"],
    "Eğlenceli": ["Bunu görünce 'ben de yapmışım' diyeceksin", "Küçük hata, büyük masraf", "İşin komik tarafı şu"],
    "Profesyonel": ["Bu konuda karar verirken üç noktaya bakılır", "Risk ve faydayı ayırmak gerekir", "Doğru seçim iş akışını hızlandırır"]
  }
};

function pick(arr, i){ return arr[i % arr.length]; }
function clean(v){ return (v || "").trim(); }

function generateSmartContent(){
  const topic = clean(document.getElementById("topic").value) || "AI ile kısa video üretimi";
  const platform = document.getElementById("platformSmart").value;
  const niche = document.getElementById("niche").value;
  const tone = document.getElementById("toneSmart").value;
  const goal = document.getElementById("goalSmart").value;
  const rule = seedData.platformRules[platform];
  const data = seedData.niches[niche] || seedData.niches["teknoloji"];
  const toneLines = seedData.tones[tone] || seedData.tones["Merak uyandıran"];

  const idea1 = `${topic}: ${pick(data.angles, topic.length)} üzerinden kısa içerik`;
  const idea2 = `${pick(data.examples, topic.length + platform.length)} — bunu ${platform} formatına çevir`;
  const idea3 = `${topic} hakkında “doğru bilinen yanlışlar” listesi`;

  const hook = `${pick(toneLines, topic.length)}: ${topic} konusunda en çok atlanan nokta ne?`;
  const title = `${topic} hakkında bilmen gereken 5 kısa nokta`;
  const altTitle = `${topic}: yeni başlayanların yaptığı 3 hata`;

  const scenario = platform === "Blog"
    ? `Girişte konuyu tek cümleyle açıkla. Ardından “Neden önemli?”, “Nasıl başlanır?”, “En sık hata”, “Kullanılacak araçlar” ve “Sonuç” başlıklarını kullan. Her bölümde kısa örnek ver.`
    : `0-3 sn: ${hook}
4-12 sn: Sorunu göster: “Çoğu kişi ${topic} işinde direkt sonuca atlıyor.”
13-28 sn: 3 adım ver: fikir → prompt → düzenleme.
29-45 sn: Örnek göster: “Bunu ${platform} için şöyle kullan.”
Final: “İstersen bu konu için hazır prompt da paylaşırım.”`;

  const tools = platform === "Blog"
    ? ["ChatGPT/Gemini: taslak ve başlık", "Canva: kapak görseli", "Google Search Console: konu kontrolü"]
    : ["ChatGPT/Gemini: fikir ve senaryo", "Canva: görsel/kapak", "CapCut: kurgu ve altyazı", "ElevenLabs: gerekiyorsa seslendirme"];

  const promptChain = `1) Fikir promptu:
“${topic} konusunda ${platform} için ${tone.toLowerCase()} tonda 10 içerik fikri üret. Her fikrin neden izlenebileceğini yaz.”

2) Senaryo promptu:
“Seçtiğim fikir için ${rule.duration} formatında kısa senaryo yaz. İlk 3 saniyede güçlü hook olsun. Gereksiz uzun anlatma.”

3) Geliştirme promptu:
“Bu senaryoyu daha net, daha akıcı ve izleyiciyi tutacak şekilde kısalt. Ekran yazılarını ayrıca listele.”

4) Yayın promptu:
“Bu içerik için 5 başlık, 1 açıklama, 8 hashtag ve kapak yazısı öner.”

5) Kontrol promptu:
“Bu içeriği abartılı vaat, yanlış bilgi ve gereksiz tekrar açısından kontrol et.”`;

  const weekPlan = [
    `Pazartesi: ${topic} için 10 fikir çıkar`,
    `Salı: En iyi 3 fikri ${platform} formatına çevir`,
    `Çarşamba: 1 içerik senaryosu hazırla`,
    `Perşembe: Canva/CapCut ile taslak üret`,
    `Cuma: Başlık, açıklama ve hashtag yaz`,
    `Cumartesi: Yayınla ve yorumları takip et`,
    `Pazar: En iyi fikri seri haline getir`
  ];

  document.getElementById("smartOutput").innerHTML = `
    <div class="resultHero">
      <span>${platform}</span><span>${tone}</span><span>${goal}</span>
      <h2>${title}</h2>
      <p>${hook}</p>
    </div>

    <div class="resultGrid">
      <section><h3>3 içerik fikri</h3>
        <ol><li>${idea1}</li><li>${idea2}</li><li>${idea3}</li></ol>
      </section>
      <section><h3>Kısa senaryo / akış</h3><pre>${scenario}</pre></section>
      <section><h3>Başlık alternatifleri</h3>
        <ul><li>${title}</li><li>${altTitle}</li><li>${topic}: 1 dakikada sade anlatım</li></ul>
      </section>
      <section><h3>Araç akışı</h3>
        <ul>${tools.map(t=>`<li>${t}</li>`).join("")}</ul>
      </section>
      <section><h3>Prompt zinciri</h3><pre>${promptChain}</pre></section>
      <section><h3>7 günlük mini plan</h3>
        <ul>${weekPlan.map(t=>`<li>${t}</li>`).join("")}</ul>
      </section>
    </div>
  `;
}

function copySmartOutput(){
  const out = document.getElementById("smartOutput");
  const txt = out ? out.innerText : "";
  navigator.clipboard.writeText(txt).then(()=> {
    const btn = document.getElementById("copySmartBtn");
    if(btn){ btn.textContent = "Kopyalandı"; setTimeout(()=>btn.textContent="Sonucu kopyala",1600); }
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  ["topic","platformSmart","niche","toneSmart","goalSmart"].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.addEventListener("input", generateSmartContent);
  });
  generateSmartContent();
});



function detectStoryParts(topic){
  const lower = (topic || "").toLowerCase();
  let place = "modern bir ortam";
  let characters = "ana karakterler";
  let twist = "beklenmedik bir detay";
  let moral = "önyargıların her zaman doğru olmadığı";
  let object = "olay";

  if(lower.includes("araba") || lower.includes("tamirci") || lower.includes("usta")){
    place = "küçük ama modern bir oto tamirhanesi";
    characters = "arabası bozulan üç arkadaş ve kendinden emin bir kadın usta";
    twist = "ustanın kadın olması ve herkesten daha profesyonel davranması";
    moral = "ustalığın cinsiyeti olmadığı";
    object = "duman atan araba";
  } else if(lower.includes("market") || lower.includes("bakkal")){
    place = "kalabalık küçük bir market";
    characters = "aceleci müşteriler ve beklenmedik şekilde zeki bir çalışan";
    twist = "herkesin hafife aldığı kişinin sorunu çözmesi";
    moral = "dış görünüşe göre karar verilmemesi gerektiği";
    object = "karışan ödeme/ürün sorunu";
  } else if(lower.includes("okul") || lower.includes("öğretmen")){
    place = "aydınlık bir sınıf";
    characters = "öğrenciler ve şaşırtıcı derecede farklı düşünen bir öğretmen";
    twist = "beklenen cevabın ters köşe çıkması";
    moral = "öğrenmenin ezber değil fark etmek olduğu";
    object = "tahtadaki soru";
  } else if(lower.includes("doktor") || lower.includes("hastane")){
    place = "yoğun ama temiz bir klinik";
    characters = "endişeli insanlar ve sakin bir uzman";
    twist = "karmaşık görünen sorunun basit bir dikkatle anlaşılması";
    moral = "uzmanlığın sakinlik ve bilgiyle birleştiğinde değerli olduğu";
    object = "acil gibi görünen durum";
  }

  return {place, characters, twist, moral, object};
}

function buildShortsPrompt(){
  const topic = document.getElementById("shortsTopic")?.value.trim() || "3 kişi arabası bozulmuş ve tamirciye geliyorlar, usta kadın çıkıyor";
  const duration = document.getElementById("shortsDuration")?.value || "30";
  const genre = document.getElementById("shortsGenre")?.value || "Komedi + şaşırtıcı sahne";
  const style = document.getElementById("shortsStyle")?.value || "Gerçekçi, modern Türk sosyal medya videosu";
  const ending = document.getElementById("shortsEnding")?.value || "Güçlü mesajlı final";
  const parts = detectStoryParts(topic);

  const scenePrompt = `${duration} saniyelik dikey YouTube Shorts videosu oluştur.

Konu:
${topic}

Format:
Dikey video, 9:16, YouTube Shorts.
Tür: ${genre}.
Tarz: ${style}.
Tempo: Hızlı kesmeler, net yüz ifadeleri, doğal oyunculuk, kısa ve vurucu diyaloglar.
Final: ${ending}.

Sahne ortamı:
${parts.place}. Görüntü gerçekçi, temiz, sosyal medya temposunda ve sinematik ışıkla çekilmiş gibi olsun.

Karakterler:
${parts.characters}. Karakterler doğal davransın. Mizah abartılı mimikten değil, durumun şaşırtıcılığından gelsin.

0-4 saniye:
${parts.object} gösterilir. Karakterler panik veya şaşkın şekilde sahneye girer. Kamera hızlıca ortamı, yüzleri ve sorunu gösterir.
Diyalog:
“Abi bu iş bugün bizi fena uğraştıracak galiba.”

5-9 saniye:
Karakterlerden biri yardım ister. Beklenen kişinin aksine sahneye kendinden emin, etkileyici ve profesyonel biri girer.
Kamera kısa bir sessizlik yaratır. Karakterlerin yüzleri tek tek yakın plan gösterilir.
Ekran yazısı:
“Ortam 2 saniye sustu...”

10-15 saniye:
Yeni gelen kişi soruna yaklaşır ve tek bakışta durumu analiz eder. Diğerleri hâlâ şaşkındır.
Diyalog:
“Bunu büyütmüşsünüz. Asıl sorun burada.”

16-22 saniye:
Hızlı montaj: el hareketleri, detay planlar, yüz ifadeleri, sorunun çözülmesi. Kamera ritmi hızlanır.
Arka planda hafif komik ama kaliteli bir müzik olabilir.

23-27 saniye:
Sorun çözülür. Herkes şaşkın ve hayran kalır. İçlerinden biri düşük sesle:
“Biz daha ne olduğunu anlamadık...”
der.

28-${duration} saniye:
Final cümlesi:
“Bir dahakine sorunu değil, önyargıyı tamire getirin.”

Son ekran yazısı:
“${parts.moral.charAt(0).toUpperCase() + parts.moral.slice(1)}.”

Görsel not:
Kaliteli, gerçekçi, modern, sosyal medya için uygun, dikkat çekici ama abartısız. Karakterleri karikatür gibi değil, gerçek insan gibi göster.`;

  const titles = [
    "Usta gelince herkes sustu 😅",
    "Arabayı değil ön yargıyı tamir etti",
    "Kimse böyle bir usta beklemiyordu",
    "Sanayide 30 saniyelik ders",
    "Ustalığın cinsiyeti olmaz"
  ];

  const desc = `Kısa bir arıza hikâyesi gibi başladı, ama asıl bozulan şeyin ${parts.moral} olduğu ortaya çıktı.`;
  const hashtags = "#shorts #hikaye #komedi #youtubeshorts #sosyalmedya #kısavideo #ai";

  const output = `YOUTUBE SHORTS VIDEO PROMPTU

${scenePrompt}

BAŞLIK ÖNERİLERİ
${titles.map((t,i)=>`${i+1}. ${t}`).join("\n")}

AÇIKLAMA
${desc}

HASHTAG
${hashtags}

KISA KONTROL LİSTESİ
- İlk 3 saniye merak uyandırıyor mu?
- Sahne anlaşılır mı?
- Diyalog kısa mı?
- Final cümlesi paylaşılabilir mi?
- Mesaj abartısız ve net mi?`;

  const out = document.getElementById("shortsPromptOutput");
  if(out) out.textContent = output;
}

function copyShortsPrompt(){
  const txt = document.getElementById("shortsPromptOutput")?.innerText || "";
  navigator.clipboard.writeText(txt).then(()=>{
    const btn = document.getElementById("copyShortsBtn");
    if(btn){ btn.textContent = "Kopyalandı"; setTimeout(()=>btn.textContent="Promptu kopyala",1500); }
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  ["shortsTopic","shortsDuration","shortsGenre","shortsStyle","shortsEnding"].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.addEventListener("input", buildShortsPrompt);
  });
  buildShortsPrompt();
});



async function buildShortsPromptAI(){
  const topic = document.getElementById("shortsTopic")?.value.trim() || "";
  const duration = document.getElementById("shortsDuration")?.value || "30";
  const genre = document.getElementById("shortsGenre")?.value || "";
  const style = document.getElementById("shortsStyle")?.value || "";
  const ending = document.getElementById("shortsEnding")?.value || "";
  const out = document.getElementById("shortsPromptOutput");
  const btn = document.getElementById("aiShortsBtn");

  if(!out) return;
  if(!topic){
    out.textContent = "Önce konu yaz.";
    return;
  }

  const oldText = btn ? btn.textContent : "";
  if(btn){ btn.textContent = "AI üretiyor..."; btn.disabled = true; }
  out.textContent = "Gemini API ile video promptu hazırlanıyor...";

  try{
    const res = await fetch("/api/shorts-prompt", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({topic, duration, genre, style, ending})
    });

    const data = await res.json();

    if(!res.ok){
      out.textContent =
        "API çalışmadı. Muhtemel sebep: Vercel'de GEMINI_API_KEY yok veya kota/izin hatası var.\n\n" +
        "Hata:\n" + JSON.stringify(data, null, 2) +
        "\n\nAşağıda API'siz yedek prompt üretildi:\n\n";
      buildShortsPrompt();
      out.textContent = out.textContent;
      return;
    }

    out.textContent = data.text || "Cevap boş geldi.";
  }catch(err){
    out.textContent =
      "API isteği başarısız oldu. Bağlantı veya Vercel Function kontrol edilmeli.\n\n" +
      (err?.message || String(err)) +
      "\n\nAPI'siz yedek üretim için 'API'siz üret' butonunu kullan.";
  }finally{
    if(btn){ btn.textContent = oldText || "Gemini ile üret"; btn.disabled = false; }
  }
}
