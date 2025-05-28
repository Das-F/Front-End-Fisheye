// === Fetch Photographer Data ===//
async function getPhotographers() {
  try {
    const photographerTemplate = await fetch("/data/photographers.json");
    const photographerTemplateData = await photographerTemplate.json();

    return { photographers: photographerTemplateData.photographers };
  } catch (error) {
    console.error("Erreur de chargement des photographes :", error);

    return { photographers: [] };
  }
}

// === Display Photographer Cards in DOM ===//
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}
// === Init Page ===//
async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}
// === Launch Script ===//
init();
