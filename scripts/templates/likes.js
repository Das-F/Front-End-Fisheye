// === Initialize Likes Feature ===//
let likeButtonsInitialized = false;

// === Get Photographer ID from URL === //
function getPhotographerIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"), 10);
}

// === Display Media Gallery === //
function displayGallery(medias) {
  const galleryContainer = document.querySelector(".media-gallery");
  galleryContainer.innerHTML = "";

  medias.forEach((media, index) => {
    const mediaCard = mediaTemplate(media, index).getMediaCardDOM();

    const likeSpan = mediaCard.querySelector(".media-likes");
    likeSpan.dataset.id = media.id;

    galleryContainer.appendChild(mediaCard);
  });
}
// === Update Total Likes Display === //
function updateTotalLikes() {
  const total = medias.reduce((sum, media) => sum + media.likes, 0);
  const totalLikesElement = document.querySelector(".likes");
  if (totalLikesElement) {
    totalLikesElement.innerHTML = `${total} ♥`;
  }
}
// === Setup Like Button Interaction === //
function setupLikeButtons() {
  if (likeButtonsInitialized) {
    return;
  }

  const galleryContainer = document.querySelector(".media-gallery");
  const likedMediaIds = new Set();

  galleryContainer.addEventListener("click", (e) => {
    const likeSpan = e.target.closest(".media-likes");
    if (!likeSpan) {
      return;
    }

    const mediaId = parseInt(likeSpan.dataset.id, 10);

    // Prevent duplicate likes //
    if (likedMediaIds.has(mediaId)) {
      return;
    }

    const media = medias.find((m) => m.id === mediaId);
    if (media) {
      media.likes += 1;
      likeSpan.textContent = `${media.likes} ♥`;
      likeSpan.setAttribute("aria-label", `likes : ${media.likes} likes`);
      updateTotalLikes();
      likedMediaIds.add(mediaId);
    }
  });
  likeButtonsInitialized = true;
}

// === Fetch and Display Media + Likes === //
fetch("data/photographers.json")
  .then((response) => response.json())
  .then((data) => {
    const photographerId = getPhotographerIdFromURL();

    medias = data.media.filter((m) => m.photographerId === photographerId);

    displayGallery(medias);
    setupLikeButtons();
    updateTotalLikes();
  });

// === Display Photographer's Daily Price ===
function displayPhotographerPrice(price) {
  const priceElement = document.querySelector(".price");
  if (priceElement) {
    priceElement.textContent = `${price} €/jour`;
    priceElement.setAttribute("aria-label", `Prix : ${price} euros par jour`);
  }
}

// === Fetch and Display Photographer Info + Price === //
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
