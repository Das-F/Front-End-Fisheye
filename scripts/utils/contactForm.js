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
  modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("contact_button")) {
    displayModal();
  }

  // Close by click button "Close modal"
  if (e.target.matches("#contact_modal img[alt='Close modal']")) {
    closeModal();
  }
});
// Close modal by Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Modal form submission
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log("Données envoyées :", Object.fromEntries(formData.entries()));
  });
}
