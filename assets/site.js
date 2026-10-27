// LEONYX — small behaviours: mobile menu, current-page highlight, contact form.

// Set the address that receives contact-form messages. Leave empty until it is decided.
const CONTACT_EMAIL = "";

(() => {
  const nav = document.getElementById("nav");
  const btn = document.getElementById("menu-btn");
  if (nav && btn) {
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }

  // Mark the link for the current page.
  const here = location.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "").replace(/\/$/, "") || "/";
  document.querySelectorAll("[data-nav]").forEach((a) => {
    const target = new URL(a.getAttribute("href"), location.origin).pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
    if (target === here) a.setAttribute("aria-current", "page");
  });

  // Scale headlines up only once the display font is actually available.
  if (document.fonts && document.fonts.load) {
    document.fonts.load('900 1em "Big Shoulders Display"').then((faces) => {
      if (faces.length) document.documentElement.classList.add("fonts-ready");
    }).catch(() => {});
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Contact form: opens the visitor's mail app with the message filled in.
  const form = document.getElementById("contact-form");
  if (form) {
    const note = document.getElementById("form-note");
    const say = (text, state) => { note.textContent = text; note.dataset.state = state || ""; };
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const problem = String(data.get("problem") || "").trim();
      if (!name || !email || !problem) return say("Fill in your name, email and the problem.", "error");
      const body = `${problem}\n\nFrom: ${name} <${email}>`;
      if (!CONTACT_EMAIL) {
        try { await navigator.clipboard.writeText(body); } catch (_) { /* clipboard unavailable */ }
        return say("The contact address isn't set up yet, so nothing was sent. Your message is copied to your clipboard.", "error");
      }
      const subject = encodeURIComponent(`Project enquiry from ${name}`);
      location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(body)}`;
      say("Your mail app should open with the message ready to send.");
    });
  }
})();
