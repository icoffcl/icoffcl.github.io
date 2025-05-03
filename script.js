// Set the current year
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Main protection wrapper
(function () {
  const chars = "█▓▒░<>[]{}()$#@&*!%+=~^";
  let originalHTML = "";

  function getFakeText(length) {
    let output = "";
    for (let i = 0; i < length; i++) {
      output += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return output;
  }

  function scramblePage() {
    document.querySelectorAll("*").forEach((el) => {
      if (el.id === "main-title") el.textContent = getFakeText(20);
      else if (el.id === "main-text") el.textContent = getFakeText(100);
    });
  }

  function clearAssets() {
    document
      .querySelectorAll("img, video, iframe, script, link[rel='stylesheet']")
      .forEach((el) => {
        el.remove();
      });
  }

  function hideBody() {
    document.body.style.display = "none";
  }

  function showBody() {
    document.body.style.display = "block";
  }

  function goOfflineMode() {
    originalHTML = document.body.innerHTML;
    document.body.innerHTML = "";
    hideBody();
    clearAssets();
    document.body.classList.add("broken-mode");
  }

  function goOnlineMode() {
    console.log("Page is back online. Refreshing...");
    location.reload();
  }

  // Manual unlock
  window.unlockPage = function () {
    showBody();
    console.log("Page manually unlocked.");
  };

  // Future decryption
  window.enscriptLater = function (html) {
    document.body.innerHTML = html;
    showBody();
  };

  // Block cookies
  Object.defineProperty(document, "cookie", {
    get: () => "",
    set: (val) => console.warn("Blocked cookie:", val),
    configurable: true,
  });

  document.cookie.split(";").forEach((c) => {
    document.cookie =
      c.trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });

  try {
    localStorage.clear();
    sessionStorage.clear();
  } catch (e) {}

  ["localStorage", "sessionStorage"].forEach((store) => {
    Object.defineProperty(window, store, {
      get: () => ({
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
      }),
      configurable: true,
    });
  });

  Object.defineProperty(window, "indexedDB", {
    get: () => undefined,
    configurable: true,
  });

  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.body.style.userSelect = "none";

  document.querySelectorAll("*").forEach((el) => {
    el.setAttribute("draggable", "false");
    el.addEventListener("dragstart", (e) => e.preventDefault());
    el.addEventListener("drop", (e) => e.preventDefault());
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (
      (e.ctrlKey && ["s", "u", "p"].includes(key)) ||
      (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
      e.key === "F12"
    ) {
      e.preventDefault();
    }
  });

  if (window.top !== window.self) {
    window.top.location = window.self.location;
  }

  function antiDebug() {
    setInterval(() => {
      const t = performance.now();
      debugger;
      if (performance.now() - t > 100) {
        while (true) {}
      }
    }, 1000);
  }

  const noCacheMeta = document.createElement("meta");
  noCacheMeta.httpEquiv = "Cache-Control";
  noCacheMeta.content = "no-store, no-cache, must-revalidate";
  document.head.appendChild(noCacheMeta);

  // Proper image error handling
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", () => {
        img.style.display = "none";
      });
    });
  });

  window.addEventListener("beforeunload", () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie =
          c.trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      });

      document.querySelectorAll("img").forEach((img) => {
        localStorage.removeItem("img_" + img.src);
      });
    } catch (e) {}
  });

  window.addEventListener("offline", () => {
    console.warn("Offline detected.");
    goOfflineMode();
  });

  window.addEventListener("online", () => {
    console.warn("Online detected.");
    goOnlineMode();
  });

  window.onload = () => {
    if (!navigator.onLine) {
      goOfflineMode();
    } else {
      showBody();
    }
    antiDebug();
  };
})();
