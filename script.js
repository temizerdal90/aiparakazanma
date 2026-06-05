const ideas = [
  "Bugün tek platform seç ve 20 içerik fikri çıkar.",
  "Bir blog başlığını 30 saniyelik kısa video senaryosuna çevir.",
  "Canva'da 5 kapak şablonu taslağı hazırla.",
  "CapCut'ta altyazı temposunu kontrol edeceğin kısa bir deneme video hazırla.",
  "Yayınlamadan önce telif, spam ve abartılı vaat kontrolü yap."
];

const searchPlaceholders = [
  "ChatGPT ile içerik planı ara",
  "YouTube Shorts rehberi ara",
  "Dijital ürün fikirleri ara",
  "Telif ve platform uyarıları ara",
  "AI araç karşılaştırması ara"
];

function randomIdea() {
  const t = document.getElementById("ideaText");
  if (t) t.textContent = ideas[Math.floor(Math.random() * ideas.length)];
}

function setupSiteSearch() {
  const input = document.querySelector("[data-site-search]");
  const results = document.querySelector("[data-search-results]");
  if (!input) return;

  let placeholderIndex = 0;
  input.placeholder = searchPlaceholders[placeholderIndex];
  setInterval(() => {
    if (document.activeElement === input || input.value.trim()) return;
    placeholderIndex = (placeholderIndex + 1) % searchPlaceholders.length;
    input.placeholder = searchPlaceholders[placeholderIndex];
  }, 4000);

  const searchableLinks = [...document.querySelectorAll("a[href$='.html']")]
    .map((link) => ({ href: link.getAttribute("href"), text: link.textContent.trim() }))
    .filter((item) => item.href && item.text && !item.href.startsWith("en/"));

  input.addEventListener("input", () => {
    if (!results) return;
    const q = input.value.trim().toLocaleLowerCase("tr-TR");
    if (q.length < 2) {
      results.innerHTML = "";
      results.hidden = true;
      return;
    }
    const matches = searchableLinks
      .filter((item) => item.text.toLocaleLowerCase("tr-TR").includes(q) || item.href.toLocaleLowerCase("tr-TR").includes(q))
      .slice(0, 8);
    results.hidden = false;
    results.innerHTML = matches.length
      ? matches.map((item) => `<a href="${item.href}">${item.text}</a>`).join("")
      : "<span>Uygun sonuç bulunamadı.</span>";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  randomIdea();
  setupSiteSearch();
});
