'use strict';

// Utility function to toggle a class
const elementToggleFunc = elem => elem.classList.toggle("active");

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
document.querySelector("[data-sidebar-btn]").addEventListener("click", () => {
  elementToggleFunc(sidebar);
});

// Page Navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Prevent right-click on avatar
document.querySelector('.avatar-box img').addEventListener('contextmenu', (e) => {
  e.preventDefault();
  return false;
});


// Prevent dev tools (caution: affects UX)
document.addEventListener('contextmenu', e => e.preventDefault());
Object.defineProperty(document, 'allowFullscreen', {value: false});

navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    pages.forEach(page => {
      if (this.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        link.classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks.forEach(navLink => navLink.classList.remove("active"));
      }
    });
  });
});

// Scroll Animation
document.addEventListener('DOMContentLoaded', function () {
  const scrollElements = document.querySelectorAll('.scroll-animation');

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
  };

  const displayScrollElement = (element) => {
    element.classList.add('visible');
    element.classList.remove('hidden');
  };

  const hideScrollElement = (element) => {
    element.classList.add('hidden');
    element.classList.remove('visible');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  window.addEventListener('scroll', handleScrollAnimation);
  handleScrollAnimation();
});