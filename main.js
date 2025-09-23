// Active menu highlight
const links=document.querySelectorAll('.menu a');
const sections=[...links].map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
function onScroll(){ let idx=sections.findIndex(sec=>sec.getBoundingClientRect().top>80); if(idx===-1) idx=sections.length; const activeIdx=Math.max(0, idx-1); links.forEach((a,i)=>a.classList.toggle('active', i===activeIdx)); }
window.addEventListener('scroll', onScroll, {passive:true}); window.addEventListener('load', onScroll);

// Carousel + lightbox
(function(){ const c=document.querySelector('.carousel'); if(!c) return;
  const track=c.querySelector('.track'); const slides=[...c.querySelectorAll('.slide')]; const dots=c.querySelector('.dots');
  let i=0,t=null;
  function dotsBuild(){ dots.innerHTML=''; slides.forEach((_,k)=>{ const d=document.createElement('div'); d.className='dot'+(k===i?' active':''); d.addEventListener('click',()=>go(k)); dots.appendChild(d); }); }
  function setActive(k){ dots.querySelectorAll('.dot').forEach((el,idx)=>el.classList.toggle('active', idx===k)); }
  function go(k){ i=(k+slides.length)%slides.length; track.style.transform=`translateX(-${i*100}%)`; setActive(i); restart(); }
  function next(){ go(i+1) } function prev(){ go(i-1) } function restart(){ if(t) clearInterval(t); t=setInterval(next, 5000); }
  dotsBuild(); restart(); c.querySelector('.btn-prev').addEventListener('click', ()=>go(i-1)); c.querySelector('.btn-next').addEventListener('click', ()=>go(i+1));
  let sx=null; track.addEventListener('pointerdown', e=>{ sx=e.clientX; track.style.transition='none'; });
  track.addEventListener('pointerup', e=>{ track.style.transition='transform .6s ease'; if(sx==null)return; const dx=e.clientX-sx; if(Math.abs(dx)>40)(dx<0?go(i+1):go(i-1)); sx=null; });
  slides.forEach(sl=>sl.addEventListener('click',()=>{ const img=sl.querySelector('img'); const lb=document.querySelector('.lightbox'); lb.querySelector('img').src=img.dataset.full||img.src; lb.classList.add('open'); }));
  document.querySelector('.lightbox').addEventListener('click', e=>{ if(e.target.classList.contains('lightbox')) e.currentTarget.classList.remove('open'); });
})();