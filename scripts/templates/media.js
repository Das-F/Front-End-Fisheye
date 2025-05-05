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

    const mediaTitleAndLikes = document.createElement("div");
    mediaTitleAndLikes.classList.add("media-title-likes");

    const mediaTitle = document.createElement("h3");
    mediaTitle.textContent = title;
    mediaTitle.classList.add("media-title");

    const mediaLikes = document.createElement("span");
    mediaLikes.textContent = `${likes} ♥`;
    mediaLikes.classList.add("media-likes");

    mediaTitleAndLikes.appendChild(mediaTitle);
    mediaTitleAndLikes.appendChild(mediaLikes);

    // Conteneur global (article)
    const mediaCard = document.createElement("article");
    mediaCard.classList.add("media-card");

    mediaCard.appendChild(galleryLink);
    mediaCard.appendChild(mediaTitleAndLikes);

    return mediaCard;
    // return galleryLink;
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
  if (e.target.classList.contains("lightbox")) {
    displayLightbox();
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

// function mediaTemplate(data) {
//   const { image, video, title, likes, photographerId } = data;

//   const mediaPath = `assets/images/${photographerId}/${image || video}`;

//   function getMediaCardDOM() {
//     const galleryLink = document.createElement("a");
//     galleryLink.classList.add("gallery");
//     galleryLink.setAttribute("href", "#");
//     galleryLink.setAttribute("aria-label", title);

//     let mediaElement;
//     if (image) {
//       mediaElement = document.createElement("img");
//       mediaElement.setAttribute("src", mediaPath);
//       mediaElement.setAttribute("alt", title);
//     } else if (video) {
//       mediaElement = document.createElement("video");
//       mediaElement.setAttribute("controls", true);
//       mediaElement.setAttribute("src", mediaPath);
//     }

//     mediaElement.classList.add("media-thumb");
//     galleryLink.appendChild(mediaElement);

//     return galleryLink;
//   }

//   return { getMediaCardDOM };
// }

// // * Carousel modal *

// // Id photographer by URL
// function getPhotographerIdFromUrl() {
//   const params = new URLSearchParams(window.location.search);
//   return params.get("id");
// }
// // Photographers data
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

//   currentMediaList = photographerMedia;
//   currentMediaIndex = 0;

//   displayGalleryMedia(photographerMedia);
// }
// let currentMediaList = [];
// let currentMediaIndex = 0;

// window.addEventListener("DOMContentLoaded", loadPhotographerData);

// // Display medias in gallery
// function displayGalleryMedia(mediaList) {
//   const galleryContainer = document.querySelector(".gallery");
//   galleryContainer.innerHTML = ""; // Vide la galerie avant d'ajouter les nouveaux éléments

//   mediaList.forEach((media, index) => {
//     const mediaElement = document.createElement("div");
//     mediaElement.classList.add("media-thumb");
//     mediaElement.setAttribute("data-title", media.title);
//     mediaElement.setAttribute("data-index", index); // Ajout de l'index pour chaque média
//     const mediaPath = `assets/images/${media.photographerId}/${
//       media.image || media.video
//     }`;

//     let imgOrVideo;
//     if (media.image) {
//       imgOrVideo = document.createElement("img");
//       imgOrVideo.setAttribute("src", mediaPath);
//       imgOrVideo.setAttribute("alt", media.title);
//     } else if (media.video) {
//       imgOrVideo = document.createElement("video");
//       imgOrVideo.setAttribute("controls", true);
//       imgOrVideo.setAttribute("src", mediaPath);
//     }

//     mediaElement.appendChild(imgOrVideo);
//     galleryContainer.appendChild(mediaElement);

//     // Ajout de l'événement de clic pour afficher la lightbox
//     mediaElement.addEventListener("click", () => {
//       openLightbox(mediaList, index); // Appel de la fonction pour afficher le média dans la lightbox
//     });
//   });
// }
// // Open lightbox
// function openLightbox(mediaList, startIndex) {
//   currentMediaList = mediaList;
//   currentMediaIndex = startIndex;

//   const modal = document.querySelector(".lightbox");
//   modal.classList.add("active");
//   modal.style.display = "block";
//   modal.setAttribute("aria-hidden", "false");
//   displayLightboxMedia(currentMediaIndex);
// }

// // Display lightbox media
// function displayLightboxMedia(index) {
//   const media = currentMediaList[index];
//   const modalContent = document.querySelector(".lightbox-content");

//   // Vérifie si le média est une image ou une vidéo et l'affiche dans la lightbox
//   if (media.image) {
//     const img = document.createElement("img");
//     img.src = `assets/images/${media.photographerId}/${media.image}`;
//     img.alt = media.title;
//     modalContent.innerHTML = ""; // Efface le contenu précédent
//     modalContent.appendChild(img);
//   } else if (media.video) {
//     const video = document.createElement("video");
//     video.src = `assets/images/${media.photographerId}/${media.video}`;
//     video.controls = true;
//     modalContent.innerHTML = ""; // Efface le contenu précédent
//     modalContent.appendChild(video);
//   }
// }

// // Fonction pour aller au média suivant
// function nextMedia() {
//   currentMediaIndex++;
//   if (currentMediaIndex >= currentMediaList.length) {
//     currentMediaIndex = 0; // revient au début si on dépasse la fin
//   }
//   displayGallery();
// }

// // Fonction pour aller au média précédent
// function prevMedia() {
//   currentMediaIndex--;
//   if (currentMediaIndex < 0) {
//     currentMediaIndex = currentMediaList.length - 1; // revient à la fin si on est avant le début
//   }
//   displayGallery();
// }
// // Close lightbox
// function closeLightbox() {
//   const modalLightbox = document.querySelector(".lightbox");
//   modalLightbox.classList.remove("active");
//   modalLightbox.style.display = "none";
//   modalLightbox.setAttribute("aria-hidden", "true");
// }
// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("close-lightbox")) {
//     closeLightbox();
//   }
// });
// // Escape touch
// document.addEventListener("keydown", function (e) {
//   if (e.key === "Escape") {
//     closeLightbox();
//   }
// });

// Essai n°2
// function displayLightboxMedia(index) {
//   const container = document.querySelector(".lightbox-container");
//   const media = currentMediaList[index];
//   const path = `assets/photographers/${media.photographerId}/${
//     media.image || media.video
//   }`;
//   let mediaHtml = "";

//   if (media.image) {
//     mediaHtml = `<img src="${path}" alt="${media.title}">`;
//   } else if (media.video) {
//     mediaHtml = `<video controls>
//                    <source src="${path}" type="video/mp4">
//                  </video>`;
//   }

//   container.innerHTML = `
//     ${mediaHtml}
//     <p class="lightbox-title">${media.title}</p>
//   `;
// }
