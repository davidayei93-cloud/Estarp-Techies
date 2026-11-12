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

// --- 2. Course Video Modal ---
const courseModal = document.getElementById('courseModal');
const closeCourseBtn = document.getElementById('closeCourseModal');
const modalCourseTitle = document.getElementById('modalCourseTitle');
const modalCourseDesc = document.getElementById('modalCourseDesc');
const modalCourseVideo = document.getElementById('modalCourseVideo');

function openCourseModal(courseId) {
  if (!courseModal || typeof COURSES === 'undefined') return;

  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;

  // Populate modal
  if (modalCourseTitle) modalCourseTitle.innerText = course.title;
  if (modalCourseDesc) modalCourseDesc.innerText = course.description;

  // Load and play video
  if (modalCourseVideo && course.videoUrl) {
    modalCourseVideo.src = course.videoUrl;
    modalCourseVideo.load();
    // Browsers require a user gesture — click already counts, so play is allowed
    modalCourseVideo.play().catch(() => {
      /* Autoplay may be blocked — user can press play manually */
    });
  }

  courseModal.classList.add('active');
}

function closeCourseModalHandler() {
  if (modalCourseVideo) {
    modalCourseVideo.pause();
    modalCourseVideo.removeAttribute('src');
    modalCourseVideo.load(); // Fully resets the player
  }
  if (courseModal) courseModal.classList.remove('active');
}

if (closeCourseBtn) {
  closeCourseBtn.addEventListener('click', closeCourseModalHandler);
}

window.addEventListener('click', (e) => {
  if (e.target === courseModal) closeCourseModalHandler();
});

// Keep closeModal() working for any other modals you add later
function closeModal(modalId) {
  if (modalId === 'courseModal') {
    closeCourseModalHandler();
    return;
  }
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('active');
}

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

// --- 5. Dynamic Course Rendering ---
// Any element with [data-courses] gets populated from COURSES (courses-data.js)
// Use data-limit="3" to only show the first 3 (Home page preview)
// Use data-featured="true" to only show featured courses
(function renderCourses() {
  if (typeof COURSES === 'undefined') return;

  const containers = document.querySelectorAll('[data-courses]');
  if (!containers.length) return;

  containers.forEach(container => {
    const limit    = parseInt(container.dataset.limit, 10) || COURSES.length;
    const featured = container.dataset.featured === 'true';

    let list = featured ? COURSES.filter(c => c.featured) : COURSES;
    list = list.slice(0, limit);

    container.innerHTML = list.map(course => `
      <div class="course-card">
        <div>
          <div class="course-header">
            <div class="course-icon ${course.iconClass}">
              <i class="${course.icon}"></i>
            </div>
            <div class="course-info">
              <h3>${course.title}</h3>
            </div>
          </div>
          <p class="course-description">${course.description}</p>
        </div>
        <div class="course-footer">
          <span class="course-tag">${course.tag}</span>
          <button class="btn-explore" onclick="openCourseModal('${course.id}')">
  Explore
</button>
        </div>
      </div>
    `).join('');
  });
})();