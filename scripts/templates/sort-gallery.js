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
