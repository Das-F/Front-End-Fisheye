const lightbox = document.querySelector(".lightbox");

function openLightbox(index) {
  console.log(allMedias[index]);
  const media = allMedias[index];
  lightbox.classList.add("active");
  const lightboxContainer = document.querySelector(".lightbox-container");
  const mediaPath = `assets/images/${media.photographerId}/${
    media.image || media.video
  }`;
  let mediaElement = null;
  if (media.image) {
    mediaElement = document.createElement("img");

    mediaElement.setAttribute("src", mediaPath);
    mediaElement.setAttribute("alt", media.title);
  } else if (media.video) {
    mediaElement = document.createElement("video");
    mediaElement.setAttribute("controls", true);
    mediaElement.setAttribute("src", mediaPath);
  }
  lightboxContainer.innerHTML = `${mediaElement.outerHTML}`;
  const closeButton = document.querySelector(".close-lightbox");
  closeButton.addEventListener("click", closeLightbox);
}

// function getPhotographerIdFromUrl() {
//   const params = new URLSearchParams(window.location.search);
//   return params.get("id");
// }

// async function loadPhotographerData() {
//   const photographerId = parseInt(getPhotographerIdFromUrl(), 10);
//   const response = await fetch("data/photographers.json");
//   const data = await response.json();

//   const photographer = data.photographers.find((p) => p.id === photographerId);
//   const photographerMedia = data.media.filter(
//     (m) => m.photographerId === photographerId
//   );

//   if (!photographer) {
//     console.error("Photographe non trouvé");
//     return;
//   }
//   displayMedia(photographerMedia);
// }

// let currentMediaIndex = 0;
// let currentMediaList = [];

// function displayLightbox() {
//   const modalLightbox = document.querySelector(".lightbox");
//   modalLightbox.classList.add("active");
//   modalLightbox.style.display = "block";
//   modalLightbox.setAttribute("aria-hidden", "false");
// }

function closeLightbox() {
  const modalLightbox = document.querySelector(".lightbox");
  modalLightbox.classList.remove("active");
  modalLightbox.style.display = "none";
  modalLightbox.setAttribute("aria-hidden", "true");
}

// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("lightbox")) {
//     displayLightbox();
//   }

//   if (e.target.classList.contains("close-lightbox")) {
//     closeLightbox();
//   }
// });

// // Fermeture avec la touche Escape
// document.addEventListener("keydown", function (e) {
//   if (e.key === "Escape") {
//     closeLightbox();
//   }
// });
