(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const form = document.querySelector("#inquiry-form");
  const note = document.querySelector("#form-note");
  const year = document.querySelector("#year");

  if (year) year.textContent = String(new Date().getFullYear());

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  if (form && note) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const brief = [
        "KITE STUDIO — PROJECT BRIEF",
        "",
        "Name: " + String(data.get("name") || "").trim(),
        "Email: " + String(data.get("email") || "").trim(),
        "",
        "Project:",
        String(data.get("project") || "").trim()
      ].join("\n");
      try {
        await navigator.clipboard.writeText(brief);
        note.textContent = "Project brief copied. Paste it into your preferred email or messaging app. Nothing was sent to a server.";
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = brief;
        textarea.setAttribute("readonly", "");
        textarea.className = "copy-fallback";
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand("copy");
        textarea.remove();
        note.textContent = copied
          ? "Project brief copied. Paste it into your preferred email or messaging app. Nothing was sent to a server."
          : "Your brief is ready, but automatic copy was blocked. Please select and copy your details manually.";
      }
    });
  }
})();