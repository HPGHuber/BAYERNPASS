(() => {
  const views = ["start", "dienste", "mitgestalten", "gemeinschaft", "pass"];
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
  const infoDialog = document.getElementById("info-dialog");
  document.getElementById("login-button").addEventListener("click", () => dialog.showModal());
  document.getElementById("close-dialog").addEventListener("click", () => dialog.close());
  document.getElementById("understood-button").addEventListener("click", () => dialog.close());
  document.getElementById("passkey-info").addEventListener("click", () => infoDialog.showModal());
  document.getElementById("close-info").addEventListener("click", () => infoDialog.close());
  document.getElementById("info-understood").addEventListener("click", () => infoDialog.close());
  [dialog, infoDialog].forEach((item) => item.addEventListener("click", (event) => { if (event.target === item) item.close(); }));

  const serviceNames = {rathaus:"Rathaus & Verwaltung",familie:"Bildung & Familie",gesundheit:"Gesundheit & Soziales",mobilitaet:"Mobilität & Umwelt",kultur:"Kultur & Freizeit",engagement:"Ehrenamt & Vereine"};
  const storageKey = "bayernpass-demo-favorites-v1";
  let favorites = [];
  try { favorites = JSON.parse(localStorage.getItem(storageKey) || "[]").filter((id) => serviceNames[id]); } catch (_) { favorites = []; }
  function saveFavorites() { try { localStorage.setItem(storageKey, JSON.stringify(favorites)); } catch (_) {} }
  function renderFavorites() {
    document.querySelectorAll("[data-favorite]").forEach((button) => {
      const saved = favorites.includes(button.dataset.favorite);
      button.classList.toggle("saved", saved);
      button.textContent = saved ? "★" : "☆";
      button.setAttribute("aria-pressed", String(saved));
    });
    const count = favorites.length;
    document.getElementById("favorite-count").textContent = count;
    document.getElementById("pass-favorite-count").textContent = count;
    const home = document.getElementById("home-favorites");
    const pass = document.getElementById("pass-favorites");
    home.replaceChildren(); pass.replaceChildren();
    if (!count) {
      const empty = document.createElement("p"); empty.className = "empty-state"; empty.textContent = "Noch nichts gemerkt. Speichere Dienste mit dem Stern, um sie hier wiederzufinden."; home.append(empty);
      const empty2 = document.createElement("p"); empty2.className = "empty-state"; empty2.textContent = "Du hast noch keine Dienste gespeichert."; pass.append(empty2);
      return;
    }
    favorites.forEach((id) => {
      const row = document.createElement("div"); row.className = "favorite-row";
      const icon = document.createElement("span"); icon.textContent = "☆";
      const name = document.createElement("strong"); name.textContent = serviceNames[id];
      row.append(icon, name); home.append(row);
      const fullRow = row.cloneNode(true);
      const remove = document.createElement("button"); remove.className = "remove-favorite"; remove.type = "button"; remove.textContent = "Entfernen"; remove.addEventListener("click", () => toggleFavorite(id));
      fullRow.append(remove); pass.append(fullRow);
    });
  }
  function toggleFavorite(id) {
    favorites = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
    saveFavorites(); renderFavorites();
  }
  document.querySelectorAll("[data-favorite]").forEach((button) => button.addEventListener("click", () => toggleFavorite(button.dataset.favorite)));
  document.getElementById("clear-favorites").addEventListener("click", () => { favorites = []; saveFavorites(); renderFavorites(); });
  renderFavorites();

  let activeFilter = "Alle";
  const searchInput = document.getElementById("service-search");
  function filterServices() {
    const query = searchInput.value.trim().toLocaleLowerCase("de");
    let visible = 0;
    document.querySelectorAll(".service-card").forEach((card) => {
      const matchesFilter = activeFilter === "Alle" || card.dataset.category === activeFilter;
      const haystack = (card.dataset.search + " " + card.textContent).toLocaleLowerCase("de");
      const matchesQuery = !query || haystack.includes(query);
      card.hidden = !(matchesFilter && matchesQuery);
      if (!card.hidden) visible++;
    });
    document.getElementById("no-service-results").hidden = visible > 0;
    document.getElementById("service-results-label").textContent = visible + (visible === 1 ? " Bereich gefunden" : " Bereiche gefunden");
  }
  searchInput.addEventListener("input", filterServices);
  document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item === button));
    filterServices();
  }));
  function runGlobalSearch(term) {
    showView("dienste");
    searchInput.value = term;
    activeFilter = "Alle";
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item.dataset.filter === "Alle"));
    filterServices();
    searchInput.focus();
  }
  document.getElementById("search-submit").addEventListener("click", () => runGlobalSearch(document.getElementById("global-search").value));
  document.getElementById("global-search").addEventListener("keydown", (event) => { if (event.key === "Enter") runGlobalSearch(event.currentTarget.value); });
  document.querySelectorAll("[data-search]").forEach((button) => button.addEventListener("click", () => runGlobalSearch(button.dataset.search)));
  document.getElementById("search-focus").addEventListener("click", () => { showView("start"); document.getElementById("global-search").focus(); });

  document.querySelectorAll("[data-support]").forEach((button) => button.addEventListener("click", () => {
    const count = button.querySelector("span");
    count.textContent = String(Number(count.textContent) + 1);
    button.disabled = true;
    button.setAttribute("aria-label", "Demo-Unterstützung wurde lokal angezeigt");
    button.textContent = "✓ Danke – Demo-Unterstützung erfasst";
  }));
  const form = document.getElementById("idea-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const title = String(data.get("title") || "").trim();
    const description = String(data.get("description") || "").trim();
    const topic = String(data.get("topic") || "Sonstiges");
    if (!title || !description) return;
    const card = document.createElement("article"); card.className = "proposal-card";
    const label = document.createElement("span"); label.className = "proposal-topic"; label.textContent = topic.toUpperCase() + " · LOKALE DEMO";
    const heading = document.createElement("h3"); heading.textContent = title;
    const paragraph = document.createElement("p"); paragraph.textContent = description;
    const status = document.createElement("span"); status.className = "sample-label"; status.textContent = "Nur in dieser Browser-Sitzung sichtbar";
    card.append(label, heading, paragraph, status); document.getElementById("proposal-list").prepend(card);
    form.reset(); document.getElementById("form-feedback").textContent = "Deine Idee wurde lokal in dieser Demo ergänzt – nicht versendet.";
  });
})();