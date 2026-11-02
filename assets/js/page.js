(function () {
  var chips = document.querySelectorAll(".fchip"), rows = document.querySelectorAll(".crow[data-cat]");
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      chips.forEach(function (x) { x.classList.remove("on"); });
      c.classList.add("on");
      rows.forEach(function (r) { r.classList.toggle("hide", c.dataset.f !== "all" && r.dataset.cat !== c.dataset.f); });
    });
  });
})();
