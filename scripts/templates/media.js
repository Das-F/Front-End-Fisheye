function mediaTemplate(data) {
  const { image, video, title, likes, photographerId } = data;

  const mediaPath = `assets/images/${photographerId}/${image || video}`;

  function getMediaCardDOM() {
    const galleryLink = document.createElement("a");
    galleryLink.classList.add("gallery");
    galleryLink.setAttribute("href", "#");
    galleryLink.setAttribute("aria-label", title);

    let mediaElement;
    if (image) {
      mediaElement = document.createElement("img");
      mediaElement.setAttribute("src", mediaPath);
      mediaElement.setAttribute("alt", title);
    } else if (video) {
      mediaElement = document.createElement("video");
      mediaElement.setAttribute("controls", true);
      mediaElement.setAttribute("src", mediaPath);
    }

    mediaElement.classList.add("media-thumb");
    galleryLink.appendChild(mediaElement);

    return galleryLink;
  }

  return { getMediaCardDOM };
}

// * Carousel modal *

function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadPhotographerData() {
  const photographerId = parseInt(getPhotographerIdFromUrl(), 10);
  const response = await fetch("data/photographers.json");
  const data = await response.json();

  const photographer = data.photographers.find((p) => p.id === photographerId);
  const photographerMedia = data.media.filter(
    (m) => m.photographerId === photographerId
  );

  if (!photographer) {
    console.error("Photographe non trouvé");
    return;
  }
  displayMedia(photographerMedia);
}

let currentMediaIndex = 0;
let currentMediaList = [];

function displayLightbox() {
  const modalLightbox = document.querySelector(".lightbox");
  modalLightbox.classList.add("active");
  modalLightbox.style.display = "block";
  modalLightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  const modalLightbox = document.querySelector(".lightbox");
  modalLightbox.classList.remove("active");
  modalLightbox.style.display = "none";
  modalLightbox.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("contact_button")) {
    displayModal();
  }

  if (e.target.classList.contains("close-lightbox")) {
    closeLightbox();
  }
});

// Fermeture avec la touche Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});
