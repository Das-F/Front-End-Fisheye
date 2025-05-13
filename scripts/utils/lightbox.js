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

function closeLightbox() {
  const modalLightbox = document.querySelector(".lightbox");
  modalLightbox.classList.remove("active");
  modalLightbox.style.display = "none";
  modalLightbox.setAttribute("aria-hidden", "true");
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});
