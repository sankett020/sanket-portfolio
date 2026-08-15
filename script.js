// ===============================
// FOOTER YEAR
// ===============================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );
  });

  // Close menu after clicking a navigation link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

}


// ===============================
// CURSOR GLOW
// ===============================

const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow) {

  document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;

  });

}


// ===============================
// ACTIVE NAVIGATION & SMOOTH SCROLL
// ===============================

const navItems = document.querySelectorAll(".nav-links a[href^='#']");
const navTargets = Array.from(navItems)
  .map((link) => {
    const href = link.getAttribute("href");
    return href && href !== "#" ? document.querySelector(href) : null;
  })
  .filter(Boolean);

let isManualScrolling = false;
let scrollTimeout = null;

function setActiveLink(targetId) {
  navItems.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === `#${targetId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

if (navTargets.length && navItems.length) {

  const observer = new IntersectionObserver(
    (entries) => {
      if (isManualScrolling) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-25% 0px -50% 0px",
      threshold: 0.1
    }
  );

  navTargets.forEach((target) => {
    observer.observe(target);
  });

  // Top and bottom scroll fallbacks
  window.addEventListener(
    "scroll",
    () => {
      if (isManualScrolling) return;

      if (window.scrollY < 80) {
        setActiveLink("home");
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        setActiveLink("contact");
      }
    },
    { passive: true }
  );

}


// ===============================
// SMOOTH ANCHOR OFFSET & INSTANT ACTIVE LINK TRIGGER
// ===============================

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    // Set active link immediately on click for instant user feedback
    setActiveLink(target.id);

    isManualScrolling = true;
    clearTimeout(scrollTimeout);

    const navHeight = 78;

    const targetPosition =
      targetId === "#home"
        ? 0
        : target.getBoundingClientRect().top +
          window.scrollY -
          navHeight -
          15;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth"
    });

    scrollTimeout = setTimeout(() => {
      isManualScrolling = false;
    }, 800);

  });

});

// Handle initial scroll positioning if URL has a hash on load
window.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        const navHeight = 78;
        const targetPosition =
          window.location.hash === "#home"
            ? 0
            : target.getBoundingClientRect().top +
              window.scrollY -
              navHeight -
              15;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: "smooth"
        });

        setActiveLink(target.id);
      }, 100);
    }
  }
});

