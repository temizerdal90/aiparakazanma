
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
