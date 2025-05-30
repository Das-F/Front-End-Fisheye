// === Retrieve photographer ID from URL === //
const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get("id"));
let dataPhotographer = {};
let allMedias = [];

// === Fetch photographer data and their media === //
async function getPhotographerById(id) {
  try {
    const response = await fetch("/data/photographers.json");
    const data = await response.json();

    const photographer = data.photographers.find((p) => p.id === id);
    dataPhotographer = photographer;
    allMedias = data.media.filter((m) => m.photographerId === id);
    return {
      media: data.media.filter((m) => m.photographerId === id),
      photographer: data.photographers.find((p) => p.id === id),
    };
  } catch (error) {
    console.error("Erreur de chargement des photographes :", error);
    return { media: [], photographer: null };
  }
}
// === Display photographer information === //
function displayPhotographerData(photographers) {
  const photographersSection = document.querySelector(".photograph-card");
  photographersSection.innerHTML = "";

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}
// == Initialize page: load and display data === //
async function init() {
  const { media, photographer } = await getPhotographerById(photographerId);
  if (photographer) {
    displayPhotographerData([photographer]);
    displayMediaData(media);
  } else {
    console.error("Photographe introuvable.");
  }
}
init();

// === Create photographer DOM (template) === //
function photographerTemplate(data) {
  const { name, portrait, city, country, tagline } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const container = document.createDocumentFragment();

    const photographerInfo = document.createElement("div");
    photographerInfo.classList.add("photographer-info");
    photographerInfo.setAttribute("aria-label", name);

    const h2 = document.createElement("h2");
    h2.textContent = name;

    const h3 = document.createElement("h3");
    h3.textContent = `${city}, ${country}`;

    const h4 = document.createElement("h4");
    h4.textContent = tagline;

    photographerInfo.appendChild(h2);
    photographerInfo.appendChild(h3);
    photographerInfo.appendChild(h4);

    const contactButton = document.createElement("button");
    contactButton.classList.add("contact_button");
    contactButton.textContent = "Contactez-moi";
    contactButton.setAttribute("aria-label", "Contact me");
    contactButton.addEventListener("click", () => {
      displayModal();
    });
    contactButton.setAttribute("tabindex", "0");
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("aria-label", name);

    imgContainer.appendChild(img);

    container.appendChild(photographerInfo);
    container.appendChild(contactButton);
    container.appendChild(imgContainer);

    return container;
  }

  return { getUserCardDOM };
}
// === Display photographer's media === //
function displayMediaData(media) {
  const mediaSection = document.querySelector(".media-gallery");
  mediaSection.innerHTML = "";

  media.forEach((mediaItem, index) => {
    const mediaCard = mediaTemplate(mediaItem, index);
    const mediaCardDOM = mediaCard.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}
