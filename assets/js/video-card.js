// Plays the silent cover while a video card is on screen, and opens the full walkthrough with controls.
(function () {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const covers = document.querySelectorAll('.vcard .cover');
  if (!reduced && 'IntersectionObserver' in window) {
    const seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.play().catch(function () {});
        else e.target.pause();
      });
    }, { threshold: 0.35 });
    covers.forEach(function (v) { seen.observe(v); });
  }
  function open(src) {
    const d = document.createElement('dialog');
    d.className = 'vmodal';
    d.innerHTML = '<button class="x" type="button" aria-label="Close video">×</button><video controls autoplay muted playsinline></video>';
    d.querySelector('video').src = src;
    const close = function () { d.close(); };
    d.querySelector('.x').onclick = close;
    d.addEventListener('click', function (e) { if (e.target === d) close(); });
    d.addEventListener('close', function () { d.remove(); covers.forEach(function (v) { if (!reduced) v.play().catch(function () {}); }); });
    document.body.appendChild(d);
    covers.forEach(function (v) { v.pause(); });
    d.showModal();
  }
  document.querySelectorAll('.vcard').forEach(function (c) {
    const src = c.querySelector('.cover').getAttribute('src');
    c.querySelectorAll('.cover, .play, .watch').forEach(function (el) {
      el.addEventListener('click', function () { open(src); });
    });
  });
})();
