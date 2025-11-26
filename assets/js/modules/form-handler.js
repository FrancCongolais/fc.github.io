// form-handler.js
const form = document.getElementById('fc-contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    status.textContent = 'Envoi en cours...';
    const data = new FormData(form);
    // Example: show success (replace with real backend or email service)
    setTimeout(() => {
      status.textContent = 'Merci — votre message a été envoyé.';
      form.reset();
    }, 800);
  });
}
