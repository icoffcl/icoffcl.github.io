// Utility: Encrypt-like garbage text
function getFakeText(length) {
  const chars = "█▓▒░<>[]{}()$#@&*!%+=~^";
  let output = "";
  for (let i = 0; i < length; i++) {
    output += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return output;
}

// Offline: corrupt UI and hide content
function goOfflineMode() {
  document.body.classList.add("broken-mode");

  document.querySelectorAll("img").forEach((img) => {
    img.style.display = "none";
  });

  const title = document.getElementById("main-title");
  const text = document.getElementById("main-text");

  title.textContent = getFakeText(20);
  text.textContent = getFakeText(100);
}

// Online: reload to recover real content
function goOnlineMode() {
  location.reload(); // Full page refresh to restore everything
}

// Network status listeners
window.addEventListener("offline", goOfflineMode);
window.addEventListener("online", goOnlineMode);

// Disable dev tools shortcuts
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

// Disable drag, right-click, text select
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.body.style.userSelect = "none";
document.querySelectorAll("*").forEach((el) => {
  el.setAttribute("draggable", "false");
  el.addEventListener("dragstart", (e) => e.preventDefault());
  el.addEventListener("drop", (e) => e.preventDefault());
});

// Clear all storage on unload
window.addEventListener("beforeunload", () => {
  localStorage.clear();
  sessionStorage.clear();
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
});

// Initial offline check on page load
if (!navigator.onLine) {
  goOfflineMode();
}

document.getElementById("currentYear").textContent = new Date().getFullYear();
