// === Fetch JSON Data ===//
async function fetchPhotographersData() {
  const response = await fetch("data/photographers.json");
  return await response.json();
}
// === Main Script on Page Load ===//
document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchPhotographersData();

  // === Filter Media by Photographer ===//
  const photographerMedia = data.media.filter(
    (m) => m.photographerId === photographerId
  );

  const mediaSection = document.querySelector(".media-gallery");
  const filterSelect = document.getElementById("filter");

  // === Display Media Cards ===//
  function displayMedia(mediaList) {
    mediaSection.innerHTML = "";
    mediaList.forEach((mediaItem, index) => {
      const mediaCard = mediaTemplate(mediaItem, index, mediaList);
      mediaSection.appendChild(mediaCard.getMediaCardDOM());
    });
  }

  displayMedia(photographerMedia);

  // === Media sorting === //
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

    document.addEventListener("keydown", function (e) {
      if (
        (e.key === "Enter" || e.key === " ") &&
        document.activeElement.dataset.index
      ) {
        const index = parseInt(document.activeElement.dataset.index);
        openLightbox(index, sortedMedia);
      }
    });
  });
});
