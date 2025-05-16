/*global document, console, data, fetch, window*/
/*global photographerId, URLSearchParams */

function getPhotographerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}
async function fetchPhotographersData() {
  const response = await fetch("data/photographers.json");
  return await response.json();
}

// const response = fetchPhotographersData();
// const photographerId = getPhotographerIdFromUrl();
const photographer = data.photographers.find(
  (photographer) => photographer.id === photographerId
);

const buttonSortPopular = document.getElementById("popular");
buttonSortPopular.addEventListener("click", function () {
  const likes = media.map((media) => {
    return {
      date: media.date,
      id: media.id,
      likes: media.likes,
      title: media.title,
    };
  });
  const media = data.media.filter(
    (media) => media.photographerId === photographerId
  );
  const PopularMedia = Array.from(likes);
  PopularMedia.sort(function (a, b) {
    return b.likes - a.likes;
  });
  console.log("clickedPopular");
});

const buttonSortDate = document.getElementById("date");
buttonSortDate.addEventListener("click", function () {
  const media = data.media.filter(
    (media) => media.photographerId === photographerId
  );
  const dateMedia = Array.from(media);
  dateMedia.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  console.log("clickedDate");
});

const buttonSortTitle = document.getElementById("title");
buttonSortTitle.addEventListener("click", function () {
  const media = data.media.filter(
    (media) => media.photographerId === photographerId
  );
  const titleMedia = Array.from(media);
  titleMedia.sort(function (a, b) {
    return a.title.localeCompare(b.title);
  });
  console.log("clickedTitle");
});
