/*global document, console, allMedias*/

const lightbox = document.querySelector(".lightbox");

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
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
  const mediaTitle = document.createElement("h3");
  mediaTitle.textContent = media.title;
  lightboxContainer.appendChild(mediaTitle);
  const closeButton = document.querySelector(".close-lightbox");
  closeButton.addEventListener("click", closeLightbox);
}
document.addEventListener("keydown", function (e) {
  if (
    (e.key === "Enter" || e.key === " ") &&
    document.activeElement.dataset.index
  ) {
    openLightbox(parseInt(document.activeElement.dataset.index));
  }
});

function closeLightbox() {
  const modalLightbox = document.querySelector(".lightbox");
  modalLightbox.classList.remove("active");
  modalLightbox.setAttribute("aria-hidden", "true");
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});

function showMedia(index) {
  currentIndex = (index + allMedias.length) % allMedias.length;
  const media = allMedias[currentIndex];
  const mediaPath = `assets/images/${media.photographerId}/${
    media.image || media.video
  }`;
  const lightboxContainer = document.querySelector(".lightbox-container");
  let mediaElement;
  let mediaTitle;

  if (media.image) {
    mediaElement = document.createElement("img");
    mediaElement.setAttribute("src", mediaPath);
    mediaElement.setAttribute("alt", media.title);
  } else {
    mediaElement = document.createElement("video");
    mediaElement.setAttribute("controls", true);
    mediaElement.setAttribute("src", mediaPath);
  }
  mediaTitle = document.createElement("h3");
  mediaTitle.textContent = media.title;

  lightboxContainer.innerHTML = `${mediaElement.outerHTML}`;
  lightboxContainer.appendChild(mediaTitle);
}

document.querySelector(".next-lightbox").addEventListener("click", () => {
  showMedia(currentIndex + 1);
});

document.querySelector(".prev-lightbox").addEventListener("click", () => {
  showMedia(currentIndex - 1);
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowRight") {
    showMedia(currentIndex + 1);
  } else if (e.key === "ArrowLeft") {
    showMedia(currentIndex - 1);
  }
});
