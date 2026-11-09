(() => {
  const views = ["start", "dienste", "mitgestalten", "gemeinschaft"];
  const navButtons = [...document.querySelectorAll("[data-view]")];
  function showView(name) {
    if (!views.includes(name)) return;
    views.forEach((view) => {
      const section = document.getElementById("view-" + view);
      section.hidden = view !== name;
      section.classList.toggle("active", view === name);
    });
    navButtons.forEach((button) => {
      const active = button.dataset.view === name;
      button.classList.toggle("active", active);
      if (button.classList.contains("nav-link")) {
        if (active) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  navButtons.forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
  document.querySelectorAll("[data-go]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.go)));

  const dialog = document.getElementById("login-dialog");
  document.getElementById("login-button").addEventListener("click", () => dialog.showModal());
  document.getElementById("close-dialog").addEventListener("click", () => dialog.close());
  document.getElementById("understood-button").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.querySelectorAll("[data-support]").forEach((button) => {
    button.addEventListener("click", () => {
      const count = button.querySelector("span");
      count.textContent = String(Number(count.textContent) + 1);
      button.disabled = true;
      button.textContent = "Demo-Unterstützung erfasst";
      button.setAttribute("aria-label", "Demo-Unterstützung wurde lokal angezeigt");
    });
  });

  const form = document.getElementById("idea-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const title = String(data.get("title") || "").trim();
    const description = String(data.get("description") || "").trim();
    const topic = String(data.get("topic") || "Sonstiges");
    if (!title || !description) return;
    const card = document.createElement("article");
    card.className = "proposal-card";
    const label = document.createElement("span");
    label.className = "proposal-topic";
    label.textContent = topic.toUpperCase() + " · LOKALE DEMO";
    const heading = document.createElement("h3");
    heading.textContent = title;
    const paragraph = document.createElement("p");
    paragraph.textContent = description;
    const status = document.createElement("span");
    status.className = "status";
    status.textContent = "Nur in dieser Browser-Sitzung sichtbar";
    card.append(label, heading, paragraph, status);
    document.getElementById("proposal-list").prepend(card);
    form.reset();
    document.getElementById("form-feedback").textContent = "Deine Idee wurde lokal in dieser Demo ergänzt – nicht versendet.";
  });
})();