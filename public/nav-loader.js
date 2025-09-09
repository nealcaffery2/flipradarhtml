// public/nav-loader.js
(function loadNav(){
  const mount = document.getElementById("nav-placeholder");
  if (!mount) return;

  fetch("/nav.html")
    .then(r => r.text())
    .then(html => {
      mount.innerHTML = html;

      // --- Active tab highlight
      const path = window.location.pathname;
      document.querySelectorAll(".tabs a").forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === path);
      });

      // --- Dark mode toggle (persist to localStorage)
      const DM_KEY = "fr_darkmode";
      const applyDark = (on) => {
        document.body.classList.toggle("dark", !!on);
        try { localStorage.setItem(DM_KEY, on ? "1" : "0"); } catch {}
      };
      applyDark((localStorage.getItem(DM_KEY) || "0") === "1");
      document.getElementById("darkToggle")?.addEventListener("click", () => {
        applyDark(!document.body.classList.contains("dark"));
      });

      // --- Profile / hamburger dropdown
      const menu   = document.getElementById("profileMenu");
      const avatar = document.getElementById("avatar");
      const burger = document.getElementById("hamburgerBtn");
      const toggleMenu = () => { if (menu) menu.style.display = (menu.style.display === "block" ? "none" : "block"); };
      avatar?.addEventListener("click", toggleMenu);
      burger?.addEventListener("click", toggleMenu);
      document.addEventListener("click", (e) => {
        if (!menu) return;
        const inside = menu.contains(e.target) || avatar?.contains(e.target) || burger?.contains(e.target);
        if (!inside) menu.style.display = "none";
      });

      // --- Simple auth state (localStorage)
      const AUTH_KEY = "fr_authed";
      const setAuthed = (v) => { try { localStorage.setItem(AUTH_KEY, v ? "1" : "0"); } catch {} };
      const isAuthed  = () => (localStorage.getItem(AUTH_KEY) || "0") === "1";
      const renderAuth = () => {
        const on = isAuthed();
        const loginBtn  = document.getElementById("loginBtn");
        const logoutBtn = document.getElementById("logoutBtn");
        if (loginBtn)  loginBtn.style.display  = on ? "none" : "block";
        if (logoutBtn) logoutBtn.style.display = on ? "block" : "none";
        const av = document.getElementById("avatar");
        if (av) av.textContent = on ? "FR" : "GU";
      };

      // --- Wire buttons
      document.getElementById("settingsBtn")?.addEventListener("click", () => {
        // Point this to your real settings page when ready
        window.location.href = "/landingpage.html";
      });

      document.getElementById("logoutBtn")?.addEventListener("click", () => {
        // Clear auth + any app-specific local state
        setAuthed(false);
        try {
          localStorage.removeItem("fr_settings");
          localStorage.removeItem("fr_darkmode"); // optional: reset theme on logout
        } catch {}
        // Close menu then go home
        if (menu) menu.style.display = "none";
        window.location.href = "/index.html";
      });

      document.getElementById("loginBtn")?.addEventListener("click", () => {
        // Fake login toggle; replace with your real auth flow later
        setAuthed(true);
        renderAuth();
        if (menu) menu.style.display = "none";
        // Redirect after login (optional)
        window.location.href = "/index.html";
      });

      renderAuth();
    })
    .catch(() => console.warn("nav load failed"));
})();
