const products = [
  { id: "smart-garden-sensor", name: "Smart Garden Sensor" },
  { id: "portable-lantern", name: "Portable Lantern" },
  { id: "travel-backpack", name: "Travel Backpack" },
  { id: "wireless-speaker", name: "Wireless Speaker" },
  { id: "coffee-maker", name: "Precision Coffee Maker" }
];

const productMap = new Map(products.map((product) => [product.id, product.name]));

function populateProducts() {
  const select = document.querySelector("#product");
  if (!select) return;

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    select.appendChild(option);
  });
}

function handleConfirmationPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product") || "";
  const rating = params.get("rating") || "Not provided";
  const installationDate = params.get("installation-date") || "Not provided";
  const features = params.getAll("features");
  const review = params.get("review") || "No written review was provided.";
  const userName = params.get("user-name") || "Anonymous";

  const productName = productMap.get(productId) || productId || "Not provided";

  document.querySelector("#confirmation-product").textContent = productName;
  document.querySelector("#confirmation-rating").textContent = `${rating} / 5`;
  document.querySelector("#confirmation-date").textContent = installationDate;
  document.querySelector("#confirmation-features").textContent = features.length ? features.join(", ") : "None selected";
  document.querySelector("#confirmation-review").textContent = `${userName}: ${review}`;

  const reviewSubmitted = sessionStorage.getItem("review-submitted") === "true";
  if (reviewSubmitted) {
    const currentCount = Number(localStorage.getItem("review-count") || 0) + 1;
    localStorage.setItem("review-count", String(currentCount));
    sessionStorage.removeItem("review-submitted");
  }

  const count = Number(localStorage.getItem("review-count") || 0);
  document.querySelector("#review-count").textContent = `Reviews completed: ${count}`;
}

function handleFormSubmission() {
  const form = document.querySelector(".review-form");
  if (!form) return;

  form.addEventListener("submit", () => {
    sessionStorage.setItem("review-submitted", "true");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  populateProducts();
  handleFormSubmission();

  if (document.querySelector(".confirmation-card")) {
    handleConfirmationPage();
  }
});
