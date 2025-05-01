function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.classList.add("active");
  const title = modal.querySelector("h2");
  title.textContent = `Contactez-moi ${dataPhotographer.name}`;
  title.id = "modalTitle";

  modal.setAttribute("aria-labelledby", "modalTitle");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.classList.remove("active");
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("contact_button")) {
    displayModal();
  }

  // Close button
  if (e.target.matches("#contact_modal img[alt='Close modal']")) {
    closeModal();
  }
  modal.setAttribute("aria-hidden, true ");
});

// Modal form submission
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  console.log("Données envoyées :", Object.fromEntries(formData.entries()));
});
