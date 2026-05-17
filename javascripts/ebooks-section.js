(function () {
  function updateEbooksSectionClass() {
    document.documentElement.classList.toggle("ebooks-section", window.location.pathname.includes("/ebooks/"));
  }

  updateEbooksSectionClass();
  if (window.document$) {
    window.document$.subscribe(updateEbooksSectionClass);
  } else {
    document.addEventListener("DOMContentLoaded", updateEbooksSectionClass);
  }
})();
