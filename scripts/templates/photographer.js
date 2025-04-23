function photographerTemplate(data) {
  const { name, portrait } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name); // accessibilité
    img.setAttribute("aria-label", name); // accessibilité
    imgContainer.appendChild(img);
    article.appendChild(imgContainer);

    const h2 = document.createElement("h2");
    h2.textContent = name;
    article.appendChild(h2);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
