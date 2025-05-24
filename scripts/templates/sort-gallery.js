// /*global document, console, data, fetch, window*/
// /*global photographerId */

async function fetchPhotographersData() {
  const response = await fetch("data/photographers.json");
  return await response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchPhotographersData();
  const photographerMedia = data.media.filter(
    (m) => m.photographerId === photographerId
  );

  const mediaSection = document.querySelector(".media-gallery");
  const filterSelect = document.getElementById("filter");

  // Display photographer's media
  function displayMedia(mediaList) {
    mediaSection.innerHTML = "";
    mediaList.forEach((mediaItem, index) => {
      const mediaCard = mediaTemplate(mediaItem, index, mediaList);
      mediaSection.appendChild(mediaCard.getMediaCardDOM());
    });
  }

  displayMedia(photographerMedia);

  // Sort media based on selected filter
  filterSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    let sortedMedia = [...photographerMedia];

    if (value === "popular") {
      sortedMedia.sort((a, b) => b.likes - a.likes);
    } else if (value === "date") {
      sortedMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (value === "title") {
      sortedMedia.sort((a, b) => a.title.localeCompare(b.title));
    }

    displayMedia(sortedMedia);
  });
});
