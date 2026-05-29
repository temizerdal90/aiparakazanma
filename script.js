const ideas=["Bugün tek platform seç ve 20 içerik fikri çıkar.","Bir blog başlığını 30 saniyelik kısa video senaryosuna çevir.","Canva'da 5 kapak şablonu taslağı hazırla.","CapCut'ta altyazı temposunu kontrol edeceğin kısa bir deneme video hazırla.","Yayınlamadan önce telif, spam ve abartılı vaat kontrolü yap."];
function randomIdea(){const t=document.getElementById('ideaText');if(t)t.textContent=ideas[Math.floor(Math.random()*ideas.length)];}
document.addEventListener('DOMContentLoaded',randomIdea);
