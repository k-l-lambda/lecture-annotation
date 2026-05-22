(function () {
  var preview;
  var previewImage;
  var activeLink;
  var touchLink;
  var touchTimer;
  var imageLinkSelector = 'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".webp"], a[href$=".gif"]';

  function isRoadToRealityPage() {
    return window.location.pathname.includes("/ebooks/The_Road_to_Reality/");
  }

  function updateEbooksSectionClass() {
    document.documentElement.classList.toggle("ebooks-section", window.location.pathname.includes("/ebooks/"));
  }

  function ensurePreview() {
    if (preview) {
      return;
    }

    preview = document.createElement("div");
    preview.className = "ebook-image-preview";
    preview.setAttribute("role", "dialog");
    preview.setAttribute("aria-hidden", "true");

    previewImage = document.createElement("img");
    previewImage.className = "ebook-image-preview__image";
    previewImage.alt = "";

    preview.appendChild(previewImage);
    document.body.appendChild(preview);
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function positionPreview(link) {
    var rect = link.getBoundingClientRect();
    var margin = 12;
    var width = preview.offsetWidth || 420;
    var height = preview.offsetHeight || 280;
    var left = rect.left;
    var top = rect.bottom + margin;

    if (window.matchMedia("(max-width: 700px)").matches) {
      left = (window.innerWidth - width) / 2;
      top = window.innerHeight - height - margin;
    } else if (top + height > window.innerHeight - margin) {
      top = rect.top - height - margin;
    }

    preview.style.left = clamp(left, margin, window.innerWidth - width - margin) + "px";
    preview.style.top = clamp(top, margin, window.innerHeight - height - margin) + "px";
  }

  function showPreview(link) {
    if (!isRoadToRealityPage()) {
      return;
    }

    ensurePreview();
    activeLink = link;
    previewImage.src = link.href;
    previewImage.alt = link.textContent.trim() || link.getAttribute("aria-label") || "图片预览";
    preview.setAttribute("aria-hidden", "false");
    preview.classList.add("ebook-image-preview--visible");

    window.requestAnimationFrame(function () {
      if (activeLink === link) {
        positionPreview(link);
      }
    });
  }

  function hidePreview() {
    if (!preview) {
      return;
    }

    activeLink = null;
    touchLink = null;
    preview.classList.remove("ebook-image-preview--visible");
    preview.setAttribute("aria-hidden", "true");
  }

  function imageLinkFromEvent(event) {
    var link = event.target.closest && event.target.closest(imageLinkSelector);
    if (!link || !isRoadToRealityPage()) {
      return null;
    }
    return link;
  }

  function handleMouseOver(event) {
    var link = imageLinkFromEvent(event);
    if (!link || link === activeLink) {
      return;
    }
    showPreview(link);
  }

  function handleMouseOut(event) {
    var link = imageLinkFromEvent(event);
    if (!link || (event.relatedTarget && link.contains(event.relatedTarget))) {
      return;
    }
    hidePreview();
  }

  function handleFocusIn(event) {
    var link = imageLinkFromEvent(event);
    if (link) {
      showPreview(link);
    }
  }

  function handleFocusOut(event) {
    if (imageLinkFromEvent(event)) {
      hidePreview();
    }
  }

  function handleClick(event) {
    var link = imageLinkFromEvent(event);
    var isTouch = event.pointerType === "touch" || window.matchMedia("(hover: none)").matches;

    if (!link) {
      if (preview && !preview.contains(event.target)) {
        hidePreview();
      }
      return;
    }

    if (!isTouch) {
      return;
    }

    if (touchLink !== link) {
      event.preventDefault();
      touchLink = link;
      showPreview(link);
      clearTimeout(touchTimer);
      touchTimer = window.setTimeout(function () {
        touchLink = null;
      }, 5000);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      hidePreview();
    }
  }

  function setupImageLinkPreviews() {
    hidePreview();
    ensurePreview();
  }

  function initializeEbookEnhancements() {
    updateEbooksSectionClass();
    setupImageLinkPreviews();
  }

  document.addEventListener("mouseover", handleMouseOver);
  document.addEventListener("mouseout", handleMouseOut);
  document.addEventListener("focusin", handleFocusIn);
  document.addEventListener("focusout", handleFocusOut);
  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", handleKeyDown);
  window.addEventListener("scroll", hidePreview, { passive: true });
  window.addEventListener("resize", hidePreview);

  initializeEbookEnhancements();
  if (window.document$) {
    window.document$.subscribe(initializeEbookEnhancements);
  } else {
    document.addEventListener("DOMContentLoaded", initializeEbookEnhancements);
  }
})();
