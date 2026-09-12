'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


// Avatar blink interaction
const avatarImgs = document.querySelectorAll(".avatar-box img");
const avatarBox = document.querySelector(".avatar-box");

if (avatarImgs.length > 0) {
  let blinkTimeout;

  const triggerBlink = () => {
    const lightAvatar = document.querySelector(".avatar-light");
    const darkAvatar = document.querySelector(".avatar-dark");

    if (lightAvatar) lightAvatar.src = "./assets/images/my-avatar-black-eyes-closed.jpg";
    if (darkAvatar) darkAvatar.src = "./assets/images/my-avatar-black-eyes-closed-dark.jpg";

    clearTimeout(blinkTimeout);
    blinkTimeout = setTimeout(() => {
      if (lightAvatar) lightAvatar.src = "./assets/images/my-avatar-black-eyes.jpg";
      if (darkAvatar) darkAvatar.src = "./assets/images/my-avatar-black-eyes-dark.jpg";
    }, 200);
  };

  // Blink when clicking the avatar itself
  if (avatarBox) {
    avatarBox.addEventListener("click", triggerBlink);
  }

  // Blink when clicking any button or link anywhere on the UI
  document.addEventListener("click", (e) => {
    const isClickable = e.target.closest("a, button, .theme-btn");
    const isAvatarBox = e.target.closest(".avatar-box"); // Prevent double trigger

    if (isClickable && !isAvatarBox) {
      triggerBlink();
    }
  });
}


// theme toggle functionality with view transitions
const themeBtn = document.querySelector("[data-theme-btn]");

themeBtn.addEventListener("click", function (e) {
  if (!document.startViewTransition) {
    document.body.classList.toggle("light-theme");
    return;
  }

  document.startViewTransition(() => {
    document.body.classList.toggle("light-theme");
  });
});



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn && overlay) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// skill progress animation on scroll
const skillFills = document.querySelectorAll('.skill-progress-fill');

if (skillFills.length > 0) {
  const animateSkills = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-width');
        fill.style.width = targetWidth;
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

  skillFills.forEach(fill => {
    animateSkills.observe(fill);
  });
}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// function to activate page
const activatePage = function (targetPage) {
  for (let i = 0; i < pages.length; i++) {
    if (targetPage === pages[i].dataset.page) {
      pages[i].classList.add("active");
      navigationLinks[i].classList.add("active");
      window.scrollTo(0, 0);
    } else {
      pages[i].classList.remove("active");
      navigationLinks[i].classList.remove("active");
    }
  }
};

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();
    window.location.hash = targetPage;
    activatePage(targetPage);
  });
}

// load initial page from hash
window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash) {
    activatePage(hash);
  }
});

// prevent browser from remembering scroll position on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// aggressively clear form and remove query params on load or back-navigation
window.addEventListener("pageshow", () => {
  window.scrollTo(0, 0);

  const contactForm = document.querySelector('[data-form]');
  if (contactForm) {
    contactForm.reset();
  }

  // Clean up URL if it accidentally got form parameters appended
  if (window.location.search) {
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
  }
});

// dynamically set FormSubmit redirect URL to the About page
const formSubmitForm = document.querySelector("[data-form]");
if (formSubmitForm) {
  formSubmitForm.addEventListener("submit", function() {
    let nextInput = formSubmitForm.querySelector("input[name=\"_next\"]");
    if (!nextInput) {
      nextInput = document.createElement("input");
      nextInput.type = "hidden";
      nextInput.name = "_next";
      formSubmitForm.appendChild(nextInput);
    }
    nextInput.value = window.location.origin + window.location.pathname + "#about";
  });
}
