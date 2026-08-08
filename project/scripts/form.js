const eventTypeMap = {
  'morning-meeting': 'Morning meeting',
  'customer-appreciation': 'Customer appreciation',
  'family-gathering': 'Family gathering',
  'custom-request': 'Custom request'
};

// Explicit JS Regex Patterns
const NAME_REGEX = /^(?=.{2,50}$)[A-Za-zÀ-ÿ\s.'-]+$/;
const PHONE_REGEX = /^[\d+().\s-]{7,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clearFieldValidation(input) {
  if (!input) return;
  input.setCustomValidity('');
  input.removeAttribute('aria-invalid');
}

function showFieldError(input, message) {
  if (!input) return;
  input.setCustomValidity(message);
  input.setAttribute('aria-invalid', 'true');
  input.reportValidity();
}

function handleFormSubmission(event) {
  event.preventDefault();
  const form = event.target;

  const nameInput = form['full-name'];
  const emailInput = form['email'];
  const phoneInput = form['phone'];

  // Reset custom validity state before validation
  clearFieldValidation(nameInput);
  clearFieldValidation(emailInput);
  clearFieldValidation(phoneInput);

  const fullName = nameInput?.value.trim() || '';
  const email = emailInput?.value.trim() || '';
  const phone = phoneInput?.value.trim() || '';
  const eventType = form['event-type']?.value || '';
  const guestCount = form['guest-count']?.value || '';
  const message = form['message']?.value.trim() || '';

  // 1. Hard JS Check: Full Name
  if (!NAME_REGEX.test(fullName)) {
    showFieldError(nameInput, 'Full name must contain at least 2 letters and no numbers.');
    return;
  }

  // 2. Hard JS Check: Email
  if (!EMAIL_REGEX.test(email)) {
    showFieldError(emailInput, 'Please enter a valid email address.');
    return;
  }

  // 3. Hard JS Check: Phone Number
  if (!PHONE_REGEX.test(phone)) {
    showFieldError(phoneInput, 'Phone number must contain between 7 and 15 digits.');
    return;
  }

  // 4. Native Validity Check for selects, min/max numbers, and remaining required fields
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = {
    fullName,
    email,
    phone,
    eventType,
    guestCount,
    message
  };

  localStorage.setItem('bakery-last-submission', JSON.stringify(formData));

  const currentCount = Number(localStorage.getItem('request-count') || 0);
  localStorage.setItem('request-count', String(currentCount + 1));

  window.location.href = 'review.html';
}

function renderReviewPage() {
  const rawData = localStorage.getItem('bakery-last-submission');
  
  const count = Number(localStorage.getItem("request-count") || 0);
  const countEl = document.querySelector("#review-count");
  if (countEl) {
    countEl.textContent = `Requests submitted: ${count}`;
  }

  if (!rawData) return;

  const data = JSON.parse(rawData);

  const elName = document.querySelector("#confirmation-name");
  const elEmail = document.querySelector("#confirmation-email");
  const elPhone = document.querySelector("#confirmation-phone");
  const elEvent = document.querySelector("#confirmation-event");
  const elGuests = document.querySelector("#confirmation-guests");
  const elMessage = document.querySelector("#confirmation-message");

  if (elName) elName.textContent = data.fullName || "Not provided";
  if (elEmail) elEmail.textContent = data.email || "Not provided";
  if (elPhone) elPhone.textContent = data.phone || "Not provided";
  if (elEvent) elEvent.textContent = eventTypeMap[data.eventType] || data.eventType || "Not provided";
  if (elGuests) elGuests.textContent = data.guestCount || "Not provided";
  if (elMessage) elMessage.textContent = data.message || "No special requests provided.";

  const backLink = document.querySelector(".back-link");
  if (backLink) {
    backLink.addEventListener("click", () => {
      localStorage.removeItem('bakery-last-submission');
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  if (form) {
    form.reset();
    form.addEventListener("submit", handleFormSubmission);

    const nameInput = form['full-name'];
    const emailInput = form['email'];
    const phoneInput = form['phone'];

    [nameInput, emailInput, phoneInput].forEach((input) => {
      if (!input) return;
      input.addEventListener('input', () => clearFieldValidation(input));
      input.addEventListener('change', () => clearFieldValidation(input));
    });
  }

  if (document.querySelector(".confirmation-card")) {
    renderReviewPage();
  }
});