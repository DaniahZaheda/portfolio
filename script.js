// Dynamic year
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Typewriter effect
const roles = [
  "Computer Systems Engineer",
  "Hardware & Software",
  "Front-End Web Developer"
];
const typeTarget = document.getElementById("typewriter");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;
const typingDelay = 80;
const pauseDelay = 1200;

function typeLoop() {
  if (!typeTarget) return;

  const current = roles[roleIndex];
  if (!deleting) {
    typeTarget.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, pauseDelay);
      return;
    }
  } else {
    typeTarget.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : typingDelay);
}
typeLoop();

// Scroll reveal
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => observer.observe(el));

// Nav active link + smooth scroll highlight
const navLinks = document.querySelectorAll(".nav-links a");
const sections = Array.from(navLinks).map((link) =>
  document.querySelector(link.getAttribute("href"))
);

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 120;
  sections.forEach((section, index) => {
    if (!section) return;
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach((l) => l.classList.remove("active"));
      navLinks[index].classList.add("active");
    }
  });
});

// Mobile menu
const menuToggle = document.querySelector(".menu-toggle");
const navLinksContainer = document.querySelector(".nav-links");

if (menuToggle && navLinksContainer) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    navLinksContainer.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("open");
      menuToggle.classList.remove("open");
    });
  });
}

// Gmail integration for contact form
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    const to = "daniahzaheda@gmail.com"; 
    const subject = `New message from portfolio - ${name || "Visitor"}`;
    const body = `${message}
    `;

    const gmailUrl =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      "&to=" + encodeURIComponent(to) +
      "&su=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.open(gmailUrl, "_blank");
  });
}
