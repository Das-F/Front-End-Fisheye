/*global document, console, FormData, dataPhotographer */

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.classList.add("active");
  const title = modal.querySelector("h2");
  title.textContent = `Contactez-moi ${dataPhotographer.name}`;
  title.id = "modalTitle";

  modal.setAttribute("aria-labelledby", "modalTitle");
  modal.setAttribute("aria-hidden", "false");

  // Modal form submission
  const form = document.querySelector("form");

  const btnSubmit = document.querySelector(".btn-submit");
  if (btnSubmit) {
    btnSubmit.addEventListener("click", () => {
      const formData = new FormData(form);
      console.log("Données envoyées :");
    });
  }

  const closeInput = document.querySelector(".close");
  if (closeInput) {
    closeInput.focus();
  }
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.classList.remove("active");
  // modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (e) => {
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
