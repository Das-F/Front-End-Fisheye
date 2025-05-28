// === Photographer Template Factory ===
function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  // === Create Photographer Card DOM ===
  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    link.setAttribute("aria-label", `${name}`);
    link.classList.add("link-photographer");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.setAttribute("aria-label", name);
    imgContainer.appendChild(img);
    link.appendChild(imgContainer);

    const h2 = document.createElement("h2");
    h2.textContent = name;
    link.appendChild(h2);
    article.appendChild(link);

    const infos = document.createElement("div");
    infos.classList.add("photographer-infos");

    const h3 = document.createElement("h3");
    h3.textContent = `${city}, ${country}`;
    article.appendChild(h3);

    const h4 = document.createElement("h4");
    h4.textContent = tagline;
    article.appendChild(h4);

    const p = document.createElement("p");
    p.textContent = price + "€/jour";
    article.appendChild(p);

    return article;
  }
  // Return object with data and methods
  return { name, picture, getUserCardDOM };
}
