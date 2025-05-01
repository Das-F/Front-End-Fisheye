function mediaTemplate(data) {
  const { image, video, title, photographerId } = data;

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
