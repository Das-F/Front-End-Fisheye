// === Lightbox Setup === //
const lightbox = document.querySelector(".lightbox");
let currentMediaList = [];

// === Open Lightbox and Display Media === //
function openLightbox(index, mediaList) {
  currentIndex = index;
  currentMediaList = mediaList || allMedias;
  const media = currentMediaList[index];
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

// === Open Lightbox with Keyboard (Enter or Space) === //
document.addEventListener("keydown", function (e) {
  if (
    (e.key === "Enter" || e.key === " ") &&
    document.activeElement.dataset.index
  ) {
    openLightbox(parseInt(document.activeElement.dataset.index));
  }
});

// === Close Lightbox === //
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

// === Display Media by Index === //
function showMedia(index) {
  currentIndex = (index + currentMediaList.length) % currentMediaList.length;
  const media = currentMediaList[currentIndex];
  if (!media) {
    console.error("Media non trouvé à l'index :", currentIndex);
    return;
  }
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
    mediaElement.setAttribute("aria-label", media.title);
  }
  mediaTitle = document.createElement("h3");
  mediaTitle.textContent = media.title;

  lightboxContainer.innerHTML = `${mediaElement.outerHTML}`;
  lightboxContainer.appendChild(mediaTitle);
}

// === Navigation Buttons (Next / Previous) === //
document.querySelector(".next-lightbox").addEventListener("click", () => {
  showMedia(currentIndex + 1);
});

document.querySelector(".prev-lightbox").addEventListener("click", () => {
  showMedia(currentIndex - 1);
});

// === Keyboard Events for Lightbox === //
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowRight") {
    showMedia(currentIndex + 1);
  } else if (e.key === "ArrowLeft") {
    showMedia(currentIndex - 1);
  }
});
