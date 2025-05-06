// --------collecting data from photographer.json--------
const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get("id"));
let dataPhotographer = {};
async function getPhotographerById(id) {
  try {
    const response = await fetch("/data/photographers.json");
    const data = await response.json();

    const photographer = data.photographers.find((p) => p.id === id);
    dataPhotographer = photographer;
    return {
      photographer,
      media: data.media.filter((m) => m.photographerId === id),
    };
  } catch (error) {
    console.error("Erreur de chargement des photographes :", error);
    return { photographer: null, media: [] };
  }
}
//-----------------Photographer data------------------//
async function displayPhotographerData(photographers) {
  const photographersSection = document.querySelector(".photograph-header");
  photographersSection.innerHTML = "";

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}
//-----------------Media data------------------//
async function init() {
  const { photographer, media } = await getPhotographerById(photographerId);
  if (photographer) {
    displayPhotographerData([photographer]);
    displayMediaData(media);
  } else {
    console.error("Photographe introuvable.");
  }
}

init();
//--------------------------------------------------//
//-----------------Media template------------------//
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

    const contactButton = document.createElement("div");
    contactButton.classList.add("contact_button");
    contactButton.textContent = "Contactez-moi";
    contactButton.setAttribute("aria-label", "Contact me");
    contactButton.setAttribute("onclick", "displayModal()");

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
async function displayMediaData(media) {
  const mediaSection = document.querySelector(".media-gallery");
  mediaSection.innerHTML = ""; // Nettoyage

  media.forEach((mediaItem) => {
    const mediaCard = mediaTemplate(mediaItem);
    const mediaCardDOM = mediaCard.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}
//--------------------------------------------------//
//------------Calculating likes--------//
let medias = [];
let likeButtonsInitialized = false;

function getPhotographerIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

function displayGallery(medias) {
  const galleryContainer = document.querySelector(".media-gallery");
  galleryContainer.innerHTML = "";

  medias.forEach((media) => {
    const mediaCard = mediaTemplate(media).getMediaCardDOM();

    const likeSpan = mediaCard.querySelector(".media-likes");
    likeSpan.dataset.id = media.id;

    galleryContainer.appendChild(mediaCard);
  });
}

function updateTotalLikes() {
  const total = medias.reduce((sum, media) => sum + media.likes, 0);
  const totalLikesElement = document.querySelector(".likes");
  if (totalLikesElement) {
    totalLikesElement.innerHTML = `${total} ♥`;
  }
}
//------------Like buttons------------------//
function setupLikeButtons() {
  if (likeButtonsInitialized) return;

  const galleryContainer = document.querySelector(".media-gallery");
  const likedMediaIds = new Set();

  galleryContainer.addEventListener("click", (e) => {
    const likeSpan = e.target.closest(".media-likes");
    if (!likeSpan) return;

    const mediaId = parseInt(likeSpan.dataset.id, 10);

    // Already liked
    if (likedMediaIds.has(mediaId)) return;

    const media = medias.find((m) => m.id === mediaId);
    if (media) {
      media.likes += 1;
      likeSpan.textContent = `${media.likes} ♥`;
      updateTotalLikes();
      likedMediaIds.add(mediaId);
    }
  });
  likeButtonsInitialized = true;
}

//------------Fetching data from JSON--------------//
fetch("data/photographers.json")
  .then((response) => response.json())
  .then((data) => {
    const photographerId = getPhotographerIdFromURL();

    // Ne garder que les médias du photographe courant
    medias = data.media.filter((m) => m.photographerId === photographerId);

    displayGallery(medias);
    setupLikeButtons();
    updateTotalLikes();
  });
//------------------------------------------------//
//------------Photographer price---------------//
function getPhotographerIdFromURL() {
  return parseInt(new URLSearchParams(window.location.search).get("id"), 10);
}

function displayPhotographerPrice(price) {
  const priceElement = document.querySelector(".price");
  if (priceElement) {
    priceElement.textContent = `${price} €/jour`;
  }
}

fetch("data/photographers.json")
  .then((response) => response.json())
  .then((data) => {
    const photographerId = getPhotographerIdFromURL();
    const currentPhotographer = data.photographers.find(
      (p) => p.id === photographerId
    );
    const medias = data.media.filter(
      (m) => m.photographerId === photographerId
    );
    displayGallery(medias);
    setupLikeButtons();
    updateTotalLikes();

    if (currentPhotographer) {
      displayPhotographerPrice(currentPhotographer.price);
    }
  });
