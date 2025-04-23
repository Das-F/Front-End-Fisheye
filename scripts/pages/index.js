async function getPhotographers() {
  try {
    const photographerTemplate = await fetch("/data/photographers.json");
    const photographerTemplateData = await photographerTemplate.json();

    return { photographers: photographerTemplateData.photographers };
  } catch (error) {
    console.error("Erreur de chargement des photographes :", error);

    return { photographers: [] }; // renvoie une liste vide en cas d’erreur
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
