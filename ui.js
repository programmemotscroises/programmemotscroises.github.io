(function () {
  "use strict";
  function init() {
    const header = document.querySelector(".app-header");
    const btn = document.getElementById("menuBtn");
    if (!header || !btn) return;
    btn.addEventListener("click", () => {
      header.classList.toggle("open");
    });
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
