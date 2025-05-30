// === Display contact modal === //
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.classList.add("active");

  // === Set Modal Title === //
  const title = modal.querySelector("h2");
  title.textContent = `Contactez-moi ${dataPhotographer.name}`;
  title.id = "modalTitle";

  modal.setAttribute("aria-labelledby", "modalTitle");
  modal.setAttribute("aria-hidden", "false");

  // Modal form submission
  const form = document.querySelector("form");

  const btnSubmit = document.querySelector(".btn-submit");
  if (btnSubmit) {
    btnSubmit.addEventListener("click" || "Enter", () => {
      const formData = {
        first: document.getElementById("first").value,
        last: document.getElementById("last").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };
      console.log("Données envoyées :", formData);
    });
  }
  // === Focus Close Button === //
  const closeInput = document.querySelector(".close");
  if (closeInput) closeInput.focus();

  // === Close Modal on Escape Key === //
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.classList.remove("active");
  }

  // === Close Modal on Click === //
  document.addEventListener("click", (e) => {
    if (e.target.matches("#contact_modal img[alt='Close modal']")) {
      closeModal();
    }
  });
  // === Close Modal Function === //
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}
