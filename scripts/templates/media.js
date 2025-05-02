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

    return galleryLink;
  }

  return { getMediaCardDOM };
}

// Carousel modal
function mediaCarouselModal(data) {
  const { image, video, title, photographerId } = data;

  const mediaPath = `assets/images/${photographerId}/${image || video}`;

  function getMediaModalDOM() {
    const modalCarousel = document.createElement("div");
    modalCarousel.classList.add("modal-carousel");

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

    const titleMedia = document.createElement("h2");
    titleMedia.textContent = title;

    modalCarousel.appendChild(mediaElement);
    modalCarousel.appendChild(titleMedia);

    return modalCarousel;
  }

  return { getMediaModalDOM };
}

// Carousel controls
// $(document).keydown(function(e) {
//   const keyCode = e.keyCode ? e.keyCode : e.which

//   if (keyCode === 39) {
//       goToNextSlide()
//   } else if (keyCode === 37) {
//       goToPreviousSlide()
//   }
// })

// $carouselPauseBtn.on('click', function() {
//   clearInterval(carouselInterval)
// })
// $(document).keydown(function(e) {
//   const keyCode = e.keyCode ? e.keyCode : e.which

//   if (keyCode === 39) {
//       goToNextSlide()
//   } else if (keyCode === 37) {
//       goToPreviousSlide()
//   }
// })

// $carouselPauseBtn.on('click', function() {
//   clearInterval(carouselInterval)
// })
