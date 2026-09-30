"use strict";

(() => {
  const title = document.getElementById("site-title");
  const description = document.getElementById("site-description");
  const footer = document.getElementById("footer-label");
  const categories = document.getElementById("categories");
  const search = document.getElementById("search");
  const counter = document.getElementById("counter");
  const empty = document.getElementById("empty");

  title.textContent = siteConfig.title;
  description.textContent = siteConfig.description;
  footer.textContent = siteConfig.title;
  document.title = `${siteConfig.title} · Panel de accesos`;
  document.getElementById("year").textContent = new Date().getFullYear();

  const normalize = (value) => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es").trim();
  const element = (tag, className, content) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  };

  function makeCard(link) {
    // Invalid schemes never become clickable, even when links.js is edited later.
    let href;
    try {
      const parsed = new URL(link.url);
      if (parsed.protocol !== "https:") throw new Error("Se requiere HTTPS");
      href = parsed.href;
    } catch {
      return null;
    }
    const card = element("a", `access-card${link.featured ? " featured" : ""}`);
    card.href = href;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", `${link.name}: ${link.description} (abre en una pestaña nueva)`);
    const icon = element("span", "card-icon", link.icon || "↗");
    icon.setAttribute("aria-hidden", "true");
    const name = element("span", "card-name", link.name);
    const external = element("span", "external-icon", "↗");
    external.setAttribute("aria-hidden", "true");
    card.append(icon, name, external);
    return card;
  }

  function render(query = "") {
    const needle = normalize(query);
    const fragment = document.createDocumentFragment();
    let count = 0;
    siteConfig.categories.forEach((category) => {
      const matching = category.links.filter((link) => normalize(`${link.name} ${link.description} ${category.name} ${category.description || ""}`).includes(needle));
      if (!matching.length) return;
      const section = element("section", "category");
      const heading = element("div", "category-heading");
      const label = element("h2", "category-title", `${category.icon}  ${category.name}`);
      heading.append(label);
      const cards = element("div", "card-grid");
      matching.forEach((link) => {
        const card = makeCard(link);
        if (card) { cards.append(card); count++; }
      });
      if (cards.childElementCount) { section.append(heading, cards); fragment.append(section); }
    });
    categories.replaceChildren(fragment);
    counter.textContent = `${count} ${count === 1 ? "acceso disponible" : "accesos disponibles"}`;
    empty.hidden = count !== 0;
  }

  search.addEventListener("input", () => render(search.value));
  render();
})();
