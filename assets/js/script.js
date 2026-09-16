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

// menu toggle functionality for mobile
const menuBtn = document.querySelector("[data-menu-btn]");
const navbar = document.querySelector("[data-navbar]");

if (menuBtn && navbar) {
  menuBtn.addEventListener("click", function () { elementToggleFunc(navbar); });
}



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
    if (navbar && navbar.classList.contains("active")) {
      navbar.classList.remove("active");
    }
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


// --- APPLE-STYLE BOOT ANIMATION ---
document.body.classList.add("loading");

window.addEventListener("load", function() {
  const avatar = document.querySelector(".avatar-box");
  
  if (avatar) {
    // 1. Calculate center of viewport
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    
    // 2. Get exact center of avatar in its normal position
    const rect = avatar.getBoundingClientRect();
    const avatarCenterX = rect.left + (rect.width / 2);
    const avatarCenterY = rect.top + (rect.height / 2);
    
    // 3. Calculate translate required to push it to viewport center
    const translateX = viewportCenterX - avatarCenterX;
    const translateY = viewportCenterY - avatarCenterY;
    
    // 4. Force layout instantly (scale 3x, centered)
    avatar.style.transition = "none";
    avatar.style.transform = `translate(${translateX}px, ${translateY}px) scale(3)`;
    
    // Force browser reflow to apply the instant CSS
    avatar.getBoundingClientRect(); 
    
    // 5. Trigger animation shortly after load
    setTimeout(() => {
      // Smooth Apple spring transition back to origin
      avatar.style.transition = "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)";
      avatar.style.transform = "translate(0px, 0px) scale(1)";
      
      // 6. Cascade the rest of the UI slightly after avatar starts moving
      setTimeout(() => {
        document.body.classList.remove("loading");
        document.body.classList.add("loaded");
        
        // Clean up inline styles after animation finishes
        setTimeout(() => {
          avatar.style.transition = "";
          avatar.style.transform = "";
        }, 1200);
        
      }, 400); // 400ms delay before UI cascades up
      
    }, 100); // 100ms pause to show centered avatar
  } else {
    // Fallback
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
  }
});

// --- VIDEO MODAL WALKTHROUGH ---
const videoModalContainer = document.querySelector("[data-video-modal-container]");
const videoOverlay = document.querySelector("[data-video-overlay]");
const videoModalCloseBtn = document.querySelector("[data-video-modal-close-btn]");
const projectVideoPlayer = document.getElementById("project-video-player");
const projectLinks = document.querySelectorAll(".project-item a[data-video]");

// Control buttons
const btnPlayPause = document.querySelector("[data-play-pause]");
const playIcon = document.querySelector(".play-icon");
const pauseIcon = document.querySelector(".pause-icon");
const skipBtns = document.querySelectorAll("[data-skip]");
const btnMute = document.querySelector("[data-mute]");
const volHighIcon = document.querySelector(".vol-high-icon");
const volMuteIcon = document.querySelector(".vol-mute-icon");
const volumeSlider = document.querySelector("[data-volume]");
const btnFullscreen = document.querySelector("[data-fullscreen]");
const videoWrapper = document.querySelector(".video-wrapper");

const closeVideoModal = () => {
  if (videoModalContainer) {
    videoModalContainer.classList.remove("active");
    if (projectVideoPlayer) {
      projectVideoPlayer.pause();
      projectVideoPlayer.currentTime = 0;
    }
  }
};

const updatePlayPauseIcon = () => {
  if (projectVideoPlayer.paused) {
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  } else {
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  }
};

const updateVolumeIcon = () => {
  if (projectVideoPlayer.muted || projectVideoPlayer.volume === 0) {
    volHighIcon.style.display = "none";
    volMuteIcon.style.display = "block";
  } else {
    volHighIcon.style.display = "block";
    volMuteIcon.style.display = "none";
  }
};

if (videoModalContainer && projectVideoPlayer) {
  // Open modal on project click
  projectLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const videoSrc = link.getAttribute("data-video");
      const videoPoster = link.getAttribute("data-poster");
      if (videoSrc) {
        projectVideoPlayer.src = videoSrc;
        if (videoPoster) {
          projectVideoPlayer.poster = videoPoster;
        } else {
          projectVideoPlayer.removeAttribute("poster");
        }
        videoModalContainer.classList.add("active");
        projectVideoPlayer.play().catch(err => console.log("Autoplay prevented:", err));
        updatePlayPauseIcon();
      }
    });
  });

  // Close modal
  videoModalCloseBtn.addEventListener("click", closeVideoModal);
  videoOverlay.addEventListener("click", closeVideoModal);

  // Play/Pause
  btnPlayPause.addEventListener("click", () => {
    if (projectVideoPlayer.paused) {
      projectVideoPlayer.play();
    } else {
      projectVideoPlayer.pause();
    }
    updatePlayPauseIcon();
  });

  // Click on video to play/pause
  projectVideoPlayer.addEventListener("click", () => {
    if (projectVideoPlayer.paused) {
      projectVideoPlayer.play();
    } else {
      projectVideoPlayer.pause();
    }
    updatePlayPauseIcon();
  });

  projectVideoPlayer.addEventListener("play", updatePlayPauseIcon);
  projectVideoPlayer.addEventListener("pause", updatePlayPauseIcon);

  // Skip buttons (+10s, -10s)
  const feedbackBadge = document.getElementById("feedback-badge");
  const feedbackText = document.getElementById("feedback-text");
  const feedbackOverlay = document.getElementById("video-feedback");
  let feedbackTimeout;

  const showFeedback = (content, position = "center") => {
    if (!feedbackBadge || !feedbackText || !feedbackOverlay) return;
    
    // Reset positions
    feedbackOverlay.className = "video-feedback-overlay";
    if (position === "left") feedbackOverlay.classList.add("pos-left");
    if (position === "right") feedbackOverlay.classList.add("pos-right");

    feedbackText.innerHTML = content;
    feedbackBadge.classList.add("show");
    
    clearTimeout(feedbackTimeout);
    feedbackTimeout = setTimeout(() => {
      feedbackBadge.classList.remove("show");
    }, 800);
  };

  skipBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const skipAmount = parseFloat(btn.getAttribute("data-skip"));
      projectVideoPlayer.currentTime += skipAmount;
      showFeedback(skipAmount > 0 ? `+${skipAmount}s` : `${skipAmount}s`, skipAmount > 0 ? "right" : "left");
    });
  });

  // Volume
  volumeSlider.addEventListener("input", (e) => {
    projectVideoPlayer.volume = e.target.value;
    projectVideoPlayer.muted = e.target.value === "0";
    updateVolumeIcon();
  });

  btnMute.addEventListener("click", () => {
    projectVideoPlayer.muted = !projectVideoPlayer.muted;
    if (projectVideoPlayer.muted) {
      volumeSlider.value = 0;
    } else {
      volumeSlider.value = projectVideoPlayer.volume || 1;
      if (projectVideoPlayer.volume === 0) {
          projectVideoPlayer.volume = 1;
          volumeSlider.value = 1;
      }
    }
    updateVolumeIcon();
  });

  // Fullscreen
  const expandIcon = document.querySelector(".expand-icon");
  const contractIcon = document.querySelector(".contract-icon");

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoWrapper.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  btnFullscreen.addEventListener("click", toggleFullscreen);
  projectVideoPlayer.addEventListener("dblclick", toggleFullscreen);

  document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
      expandIcon.style.display = "none";
      if (contractIcon) contractIcon.style.display = "block";
    } else {
      expandIcon.style.display = "block";
      if (contractIcon) contractIcon.style.display = "none";
    }
  });

  // Timeline logic
  const videoTimeline = document.getElementById("video-timeline");
  const currentTimeElem = document.getElementById("current-time");
  const videoDurationElem = document.getElementById("video-duration");

  const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    sec = sec < 10 ? `0${sec}` : sec;
    return `${min}:${sec}`;
  };

  projectVideoPlayer.addEventListener("loadedmetadata", () => {
    videoTimeline.max = projectVideoPlayer.duration;
    videoDurationElem.textContent = formatTime(projectVideoPlayer.duration);
  });

  projectVideoPlayer.addEventListener("timeupdate", () => {
    videoTimeline.value = projectVideoPlayer.currentTime;
    currentTimeElem.textContent = formatTime(projectVideoPlayer.currentTime);
  });

  videoTimeline.addEventListener("input", (e) => {
    projectVideoPlayer.currentTime = e.target.value;
    currentTimeElem.textContent = formatTime(e.target.value);
  });

  // Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    if (!videoModalContainer.classList.contains("active")) return;
    
    // Prevent default scrolling for space and arrows
    if (["Space", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {
      e.preventDefault();
    }

    switch (e.code) {
      case "Escape":
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          closeVideoModal();
        }
        break;
      case "KeyF":
        toggleFullscreen();
        break;
      case "Space":
        if (projectVideoPlayer.paused) {
          projectVideoPlayer.play();
          showFeedback('<ion-icon name="play" style="font-size:24px; margin-bottom:-4px;"></ion-icon>');
        } else {
          projectVideoPlayer.pause();
          showFeedback('<ion-icon name="pause" style="font-size:24px; margin-bottom:-4px;"></ion-icon>');
        }
        updatePlayPauseIcon();
        break;
      case "ArrowLeft":
        projectVideoPlayer.currentTime -= 10;
        showFeedback("-10s", "left");
        break;
      case "ArrowRight":
        projectVideoPlayer.currentTime += 10;
        showFeedback("+10s", "right");
        break;
      case "ArrowUp":
        projectVideoPlayer.volume = Math.min(1, projectVideoPlayer.volume + 0.1);
        projectVideoPlayer.muted = false;
        volumeSlider.value = projectVideoPlayer.volume;
        showFeedback(`${Math.round(projectVideoPlayer.volume * 100)}%`);
        updateVolumeIcon();
        break;
      case "ArrowDown":
        projectVideoPlayer.volume = Math.max(0, projectVideoPlayer.volume - 0.1);
        if (projectVideoPlayer.volume === 0) projectVideoPlayer.muted = true;
        volumeSlider.value = projectVideoPlayer.volume;
        showFeedback(`${Math.round(projectVideoPlayer.volume * 100)}%`);
        updateVolumeIcon();
        break;
      case "KeyM":
        projectVideoPlayer.muted = !projectVideoPlayer.muted;
        if (projectVideoPlayer.muted) {
          volumeSlider.value = 0;
          showFeedback("Muted");
        } else {
          volumeSlider.value = projectVideoPlayer.volume || 1;
          if (projectVideoPlayer.volume === 0) {
            projectVideoPlayer.volume = 1;
            volumeSlider.value = 1;
          }
          showFeedback(`${Math.round(projectVideoPlayer.volume * 100)}%`);
        }
        updateVolumeIcon();
        break;
    }
  });

}
