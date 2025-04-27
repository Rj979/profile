'use strict';

document.addEventListener('DOMContentLoaded', function() {
  // Sidebar toggle
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  
  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", function() {
      sidebar.classList.toggle("active");
    });
  }

  // Page navigation
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");
  
  navigationLinks.forEach(link => {
    link.addEventListener("click", function() {
      const targetPage = this.textContent.toLowerCase();
      
      pages.forEach(page => {
        page.classList.toggle("active", page.dataset.page === targetPage);
      });
      
      navigationLinks.forEach(navLink => {
        navLink.classList.toggle("active", navLink === this);
      });
      
      window.scrollTo(0, 0);
    });
  });

  // Update copyright year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Prevent right-click on avatar
  const avatarImg = document.querySelector('.avatar-box img');
  if (avatarImg) {
    avatarImg.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
  }
});