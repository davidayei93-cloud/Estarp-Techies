/* ==========================================================================
   Estarp Techies Academy — Shared Scripts
   ========================================================================== */

// --- 1. Mobile Navigation Toggle ---
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinksContainer) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('mobile-open');
  });
}

// --- 2. Course "Coming Soon" Modal ---
const courseModal = document.getElementById('courseModal');
const closeCourseBtn = document.getElementById('closeCourseModal');
const modalCourseTitle = document.getElementById('modalCourseTitle');

function openCourseModal(title) {
  if (!courseModal) return;
  if (modalCourseTitle) modalCourseTitle.innerText = title;
  courseModal.classList.add('active');
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('active');
}

if (closeCourseBtn) {
  closeCourseBtn.addEventListener('click', () => closeModal('courseModal'));
}

window.addEventListener('click', (e) => {
  if (e.target === courseModal) closeModal('courseModal');
});

// --- 3. Contact Form Handling ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
    contactForm.reset();
  });
}

// --- 4. Newsletter Form Handling ---
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to the Estarp Techies Academy newsletter!');
    newsletterForm.reset();
  });
}