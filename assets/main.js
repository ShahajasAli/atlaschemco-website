
(function(){
  const EASE = t => 1 - Math.pow(1 - t, 3);
  function stagedReveal() {
    document.querySelectorAll(".hero .reveal").forEach((el, i) => {
      el.style.transitionDelay = `${i * 120}ms`;
      el.classList.add("show");
    });
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.2});
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  function animateNumber(el, target, duration=1200){
    const start = performance.now();
    const from = parseInt(el.textContent.replace(/[^\d]/g,'')) || 0;
    const diff = target - from;
    function frame(t){
      const p = Math.min(1, (t - start) / duration);
      const v = Math.round(from + diff * EASE(p));
      el.textContent = v.toLocaleString();
      if(p < 1){ requestAnimationFrame(frame); }
    }
    requestAnimationFrame(frame);
  }
  let countersStarted = false;
  function startCounters(){
    if(countersStarted) return;
    countersStarted = true;
    document.querySelectorAll(".counter .n[data-target]").forEach(el => {
      animateNumber(el, parseInt(el.dataset.target, 10) || 0);
    });
  }
  const countersEl = document.querySelector(".counters");
  if(countersEl){
    const ioCounters = new IntersectionObserver((entries)=>{
      entries.forEach(e => { if(e.isIntersecting){ startCounters(); ioCounters.disconnect(); } });
    }, {threshold: 0.3});
    ioCounters.observe(countersEl);
  }
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      const target = document.querySelector(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });
  document.querySelectorAll('.imgcard').forEach(card => {
    let rAF = null;
    function onMove(e){
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rx = y * -6;
      const ry = x * 6;
      if(rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(()=>{
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    }
    function reset(){ card.style.transform = "perspective(800px) rotateX(0) rotateY(0)"; }
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', reset);
  });
  document.addEventListener('DOMContentLoaded', stagedReveal);
})();


// Reveal-on-scroll animation
(function(){
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    document.querySelectorAll('.heroimg').forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.15});
  document.querySelectorAll('.reveal, .heroimg').forEach(el=> io.observe(el));
})();

// Mobile header toggle (if button exists)
(function(){
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.menu-btn');
  if(btn && nav){
    btn.addEventListener('click', ()=> nav.classList.toggle('open'));
  }
})();
