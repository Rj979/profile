'use strict';

// Utility function to toggle a class
const elementToggleFunc = elem => elem.classList.toggle("active");

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
document.querySelector("[data-sidebar-btn]").addEventListener("click", () => {
  elementToggleFunc(sidebar);
});

// Testimonials Modal
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

document.querySelectorAll("[data-testimonials-item]").forEach(item => {
  item.addEventListener("click", () => {
    const avatar = item.querySelector("[data-testimonials-avatar]");
    modalImg.src = avatar.src;
    modalImg.alt = avatar.alt;
    modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;

    elementToggleFunc(modalContainer);
    elementToggleFunc(overlay);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const certificateImages = document.querySelectorAll('.certificate-item img');
  certificateImages.forEach(img => {
    const imageUrl = img.getAttribute('data-src');
    generateThumbnail(imageUrl, 200, 150)
      .then(thumbnailUrl => {
        img.src = thumbnailUrl;
      })
      .catch(error => {
        console.error('Error generating thumbnail:', error);
      });
  });
});



// Close Modal
const closeModal = () => {
  elementToggleFunc(modalContainer);
  elementToggleFunc(overlay);
};
modalCloseBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Custom Select Dropdown
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");

select.addEventListener("click", () => elementToggleFunc(select));

selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const selectedValue = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Filter Functionality
const filterItems = document.querySelectorAll("[data-filter-item]");
const filterFunc = selectedValue => {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

document.addEventListener('DOMContentLoaded', function() {
  const filterSelectBox = document.querySelector('.filter-select-box');
  if (filterSelectBox) {
    filterSelectBox.remove();
  }
});

// Filter Buttons for Large Screens
const filterBtn = document.querySelectorAll("[data-filter-btn]");
let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// Form Validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

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

  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });

  handleScrollAnimation();
});

function generateThumbnail(imageUrl, width, height) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const aspectRatio = img.width / img.height;
      if (aspectRatio > 1) {
        canvas.width = width;
        canvas.height = width / aspectRatio;
      } else {
        canvas.height = height;
        canvas.width = height * aspectRatio;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/webp'));
    };
    img.onerror = (error) => {
      reject(new Error(`Failed to load image: ${imageUrl}`));
    };
  });
}



// Page Navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

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
