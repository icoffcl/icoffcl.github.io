document.addEventListener("DOMContentLoaded", function () {
    // Set current year
    const yearEl = document.getElementById("currentYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Disable drag-and-drop, right-click, and text selection for the entire document
    const protectElements = () => {
      // Disable drag-and-drop for all elements
      document.querySelectorAll("*").forEach(el => {
        el.setAttribute("draggable", "false");
        el.addEventListener("dragstart", e => e.preventDefault());
        el.addEventListener("drop", e => e.preventDefault());
      });

      // Disable right-click globally
      document.addEventListener("contextmenu", e => e.preventDefault());

      // Disable text selection for the entire body
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";

      // Disable right-click on links
      document.querySelectorAll("a").forEach(link => {
        link.addEventListener("contextmenu", e => e.preventDefault());
      });
    };

    protectElements();

    // Prevent keyboard shortcuts for saving, printing, dev tools, etc.
    document.addEventListener("keydown", function (e) {
      const key = e.key.toLowerCase();
      if (
        (e.ctrlKey && ["s", "p", "u"].includes(key)) ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    });

    // Hide broken images (optional) - this removes the image if it fails to load
    document.querySelectorAll("img").forEach(img => {
      img.addEventListener("error", () => {
        img.style.display = "none";
      });
    });

    // Clear image state cache
    window.addEventListener("beforeunload", () => {
      document.querySelectorAll("img").forEach(img => {
        localStorage.removeItem("img_" + img.src);
      });
    });

    // Protect same-origin iframes (to disable drag and right-click inside iframe content)
    document.querySelectorAll("iframe").forEach(iframe => {
      iframe.setAttribute("draggable", "false");
      iframe.addEventListener("dragstart", e => e.preventDefault());

      iframe.addEventListener("load", () => {
        try {
          // Only works for same-origin iframe
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

          // Disable drag and right-click in iframe content
          iframeDoc.querySelectorAll("*").forEach(el => {
            el.setAttribute("draggable", "false");
            el.addEventListener("dragstart", e => e.preventDefault());
            el.addEventListener("drop", e => e.preventDefault());
          });

          iframeDoc.body.style.userSelect = "none";
          iframeDoc.body.style.webkitUserSelect = "none";

          iframeDoc.addEventListener("contextmenu", e => e.preventDefault());
        } catch (err) {
          // If the iframe is cross-origin, we can't access it
          console.warn("Cannot access iframe contents due to cross-origin policy.");
        }
      });
    });
  });
