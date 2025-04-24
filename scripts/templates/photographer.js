function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container"); // A REVOIR APRES TOUT INSERE SI PERTINENT OU PAS
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name); // accessibilité
    img.setAttribute("aria-label", name); // accessibilité
    imgContainer.appendChild(img);
    article.appendChild(imgContainer); // A REVOIR APRES TOUT INSERE SI PERTINENT OU PAS

    const h2 = document.createElement("h2");
    h2.textContent = name;
    article.appendChild(h2);

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
  return { name, picture, getUserCardDOM };
}
