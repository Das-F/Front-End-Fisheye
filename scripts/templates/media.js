function mediaTemplate(data, index) {
  const { image, video, title, date, likes, photographerId } = data;

  const mediaPath = `assets/images/${photographerId}/${image || video}`;
  console.log(index);
  function getMediaCardDOM() {
    const galleryLink = document.createElement("div");
    galleryLink.classList.add("gallery");
    galleryLink.setAttribute("aria-label", title);
    galleryLink.setAttribute("tabindex", "0");
    galleryLink.setAttribute("role", "button");
    galleryLink.setAttribute("data-index", index);

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
    mediaElement.addEventListener("click", function () {
      openLightbox(index);
    });

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
  }

  return { getMediaCardDOM };
}

// -------------------Sorting------------------//

// function getPhotographerIdFromUrl() {
//   const params = new URLSearchParams(window.location.search);
//   return parseInt(params.get("id"));
// }
// async function fetchPhotographersData() {
//   const response = await fetch("data/photographers.json");
//   return await response.json();
// }

// const response = await fetchPhotographersData();
// const data = await response.json();
// const photographerId = getPhotographerIdFromUrl();
// const photographer = data.photographers.find(
//   (photographer) => photographer.id === photographerId
// );
// const media = data.media.filter(
//   (media) => media.photographerId === photographerId
// );

// const buttonSortPopular = document.querySelector(".listbox1-1");
// buttonSortPopular.addEventListener("click", function () {
//   const PopularMedia = Array.from(likes);
//   PopularMedia.sort(function (a, b) {
//     return b.likes - a.likes;
//   });
//   console.log("clickedPopular");
// });
