async function getPhotographers() {
  try {
    const photographerTemplate = await fetch("/data/photographers.json");
    const photographerTemplateData = await photographerTemplate.json();

    return { photographers: photographerTemplateData.photographers };
  } catch (error) {
    console.error("Erreur de chargement des photographes :", error);

    return { photographers: [] }; // renvoie une liste vide en cas d’erreur
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    // Creation link - image + name
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
    // Add link in article
    article.appendChild(link);

    // Block complementary informations
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
  return { name, picture, getUserCardDOM };
}
