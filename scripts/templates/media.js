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
    mediaLikes.classList.add("media-likes");
    mediaLikes.dataset.id = data.id;
    mediaLikes.setAttribute("aria-label", "likes");
    mediaLikes.innerHTML = `
  <span class="like-number">${likes}</span>
  <span class="like-icon" aria-hidden="true">♥</span>
`;

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
