window.addEventListener("DOMContentLoaded", () => {
  const currentYear = new Date().getFullYear();
  const lastModifiedDate = document.lastModified;

  const el1 = document.getElementById("currentyear");
  const el2 = document.getElementById("currentYear");
  if (el1) el1.textContent = currentYear;
  if (el2) el2.textContent = currentYear;
});