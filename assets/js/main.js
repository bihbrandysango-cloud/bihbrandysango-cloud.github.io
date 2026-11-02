(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var nav = document.querySelector(".nav");
  var burger = document.querySelector(".burger");
  if (burger) burger.addEventListener("click", function () { nav.classList.toggle("open"); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });

  var counters = document.querySelectorAll("[data-count]");
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      var el = e.target, end = parseFloat(el.dataset.count), pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
      if (reduce) { el.textContent = pre + end + suf; return; }
      var t0 = performance.now(), dur = 1400;
      (function tick(t) {
        var p = Math.min((t - t0) / dur, 1), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
        el.textContent = pre + v + suf;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.4 });
  counters.forEach(function (c) { cio.observe(c); });

})();
