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
const projectLinks = document.querySelectorAll(".project-item a[data-video], .project-item a[data-multi-video]");
const videoModalContent = document.querySelector(".video-modal-content");
const subVideoPanel = document.getElementById("sub-video-panel");
const subVideoTabs = document.getElementById("sub-video-tabs");
const subVideoPlayer = document.getElementById("sub-video-player");

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
    if (subVideoPlayer) {
      subVideoPlayer.pause();
      subVideoPlayer.currentTime = 0;
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
  
  // Dynamically size modal for vertical videos
  projectVideoPlayer.addEventListener("loadedmetadata", () => {
    if (projectVideoPlayer.videoHeight > projectVideoPlayer.videoWidth) {
      videoModalContent.classList.add("vertical-video");
    } else {
      videoModalContent.classList.remove("vertical-video");
    }
  });

  // Open modal on project click
  projectLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      const isMultiVideo = link.getAttribute("data-multi-video") === "true";
      
      if (isMultiVideo) {
        // Multi-Video Setup
        videoModalContent.classList.add("multi-video-layout");
        subVideoPanel.style.display = "flex";
        const mainTabs = document.getElementById("main-video-tabs");
        if (mainTabs) mainTabs.style.display = "flex";
        
        const mainVideoSrc = link.getAttribute("data-video-main");
        projectVideoPlayer.src = mainVideoSrc;
        projectVideoPlayer.removeAttribute("poster");
        
        // Setup Tabs and Sub-Videos
        subVideoTabs.innerHTML = "";
        const subVideos = [];
        for (let i = 1; i <= 3; i++) {
          const vSrc = link.getAttribute(`data-video-sub-${i}`);
          const vTitle = link.getAttribute(`data-sub-title-${i}`);
          if (vSrc && vTitle) {
            subVideos.push({ src: vSrc, title: vTitle });
          }
        }
        
        if (subVideos.length > 0) {
          subVideoPlayer.src = subVideos[0].src;
          
          subVideos.forEach((vid, index) => {
            const btn = document.createElement("button");
            btn.className = `sub-video-tab ${index === 0 ? "active" : ""}`;
            btn.textContent = vid.title;
            btn.addEventListener("click", () => {
              // Switch tab
              document.querySelectorAll(".sub-video-tab").forEach(t => t.classList.remove("active"));
              btn.classList.add("active");
              // Change video
              subVideoPlayer.src = vid.src;
              subVideoPlayer.play().catch(err => console.log(err));
            });
            subVideoTabs.appendChild(btn);
          });
        }
        
        videoModalContainer.classList.add("active");
        projectVideoPlayer.play().catch(err => console.log("Autoplay prevented:", err));
        updatePlayPauseIcon();
        
      } else {
        // Single Video Setup
        videoModalContent.classList.remove("multi-video-layout");
        subVideoPanel.style.display = "none";
        const mainTabs = document.getElementById("main-video-tabs");
        if (mainTabs) mainTabs.style.display = "none";
        
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
      }
    });
  });


  // Close modal
  videoModalCloseBtn.addEventListener("click", closeVideoModal);
  videoOverlay.addEventListener("click", closeVideoModal);

  let activeVideoPlayer = projectVideoPlayer;

  const setupVideoControls = (wrapper) => {
    const video = wrapper.querySelector("video");
    if (!video) return;

    // Controls
    const btnPlayPause = wrapper.querySelector("[data-play-pause]");
    const playIcon = wrapper.querySelector(".play-icon");
    const pauseIcon = wrapper.querySelector(".pause-icon");
    
    const volumeSlider = wrapper.querySelector("[data-volume]");
    const btnMute = wrapper.querySelector("[data-mute]");
    const volHighIcon = wrapper.querySelector(".vol-high-icon");
    const volMuteIcon = wrapper.querySelector(".vol-mute-icon");
    
    const btnFullscreen = wrapper.querySelector("[data-fullscreen]");
    const expandIcon = wrapper.querySelector(".expand-icon");
    const contractIcon = wrapper.querySelector(".contract-icon");
    
    const skipBtns = wrapper.querySelectorAll("[data-skip]");
    
    const videoTimeline = wrapper.querySelector(".video-timeline");
    const currentTimeElem = wrapper.querySelector(".current-time");
    const videoDurationElem = wrapper.querySelector(".video-duration");

    const feedbackBadge = wrapper.querySelector(".feedback-badge");
    const feedbackText = wrapper.querySelector(".feedback-text");
    const feedbackOverlay = wrapper.querySelector(".video-feedback-overlay");
    let feedbackTimeout;

    // Track active video
    wrapper.addEventListener("mouseenter", () => activeVideoPlayer = video);
    wrapper.addEventListener("click", () => activeVideoPlayer = video);
    video.addEventListener("play", () => activeVideoPlayer = video);

    const updatePlayPauseIcon = () => {
      if (!playIcon || !pauseIcon) return;
      if (video.paused) {
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
      } else {
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
      }
    };

    const updateVolumeIcon = () => {
      if (!volHighIcon || !volMuteIcon) return;
      if (video.muted || video.volume === 0) {
        volHighIcon.style.display = "none";
        volMuteIcon.style.display = "block";
      } else {
        volHighIcon.style.display = "block";
        volMuteIcon.style.display = "none";
      }
    };

    const showFeedback = (content, position = "center") => {
      if (!feedbackBadge || !feedbackText || !feedbackOverlay) return;
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

    if (btnPlayPause) {
      btnPlayPause.addEventListener("click", () => {
        if (video.paused) video.play();
        else video.pause();
        updatePlayPauseIcon();
      });
    }

    video.addEventListener("click", () => {
      if (video.paused) video.play();
      else video.pause();
      updatePlayPauseIcon();
    });

    video.addEventListener("play", updatePlayPauseIcon);
    video.addEventListener("pause", updatePlayPauseIcon);

    skipBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const skipAmount = parseFloat(btn.getAttribute("data-skip"));
        video.currentTime += skipAmount;
        showFeedback(skipAmount > 0 ? `+${skipAmount}s` : `${skipAmount}s`, skipAmount > 0 ? "right" : "left");
      });
    });

    if (volumeSlider) {
      volumeSlider.addEventListener("input", (e) => {
        video.volume = e.target.value;
        video.muted = e.target.value === "0";
        updateVolumeIcon();
      });
    }

    if (btnMute) {
      btnMute.addEventListener("click", () => {
        video.muted = !video.muted;
        if (video.muted) {
          if(volumeSlider) volumeSlider.value = 0;
        } else {
          if(volumeSlider) volumeSlider.value = video.volume || 1;
          if (video.volume === 0) {
              video.volume = 1;
              if(volumeSlider) volumeSlider.value = 1;
          }
        }
        updateVolumeIcon();
      });
    }

    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        wrapper.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    };

    if (btnFullscreen) btnFullscreen.addEventListener("click", toggleFullscreen);
    video.addEventListener("dblclick", toggleFullscreen);

    document.addEventListener("fullscreenchange", () => {
      if (!expandIcon) return;
      if (document.fullscreenElement === wrapper) {
        expandIcon.style.display = "none";
        if (contractIcon) contractIcon.style.display = "block";
      } else {
        expandIcon.style.display = "block";
        if (contractIcon) contractIcon.style.display = "none";
      }
    });

    const formatTime = (time) => {
      let min = Math.floor(time / 60);
      let sec = Math.floor(time % 60);
      sec = sec < 10 ? `0${sec}` : sec;
      return `${min}:${sec}`;
    };

    if (videoTimeline && currentTimeElem && videoDurationElem) {
      video.addEventListener("loadedmetadata", () => {
        videoTimeline.max = video.duration;
        videoDurationElem.textContent = formatTime(video.duration);
      });
      video.addEventListener("timeupdate", () => {
        videoTimeline.value = video.currentTime;
        currentTimeElem.textContent = formatTime(video.currentTime);
      });
      videoTimeline.addEventListener("input", (e) => {
        video.currentTime = e.target.value;
        currentTimeElem.textContent = formatTime(e.target.value);
      });
    }
  };

  const videoWrappers = document.querySelectorAll('.video-wrapper');
  videoWrappers.forEach(setupVideoControls);

  // Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    if (!videoModalContainer.classList.contains("active")) return;
    
    if (["Space", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {
      e.preventDefault();
    }

    const video = activeVideoPlayer;
    if (!video) return;
    const wrapper = video.closest('.video-wrapper');
    const showFeedback = (content, position="center") => {
      const fb = wrapper.querySelector(".feedback-text");
      const badge = wrapper.querySelector(".feedback-badge");
      const overlay = wrapper.querySelector(".video-feedback-overlay");
      if(fb && badge && overlay) {
        overlay.className = "video-feedback-overlay";
        if (position === "left") overlay.classList.add("pos-left");
        if (position === "right") overlay.classList.add("pos-right");
        fb.innerHTML = content;
        badge.classList.add("show");
        setTimeout(() => badge.classList.remove("show"), 800);
      }
    };
    
    const updatePlayIcon = () => {
       const pI = wrapper.querySelector(".play-icon");
       const paI = wrapper.querySelector(".pause-icon");
       if(pI && paI) {
           pI.style.display = video.paused ? "block" : "none";
           paI.style.display = video.paused ? "none" : "block";
       }
    };
    
    const updateVolIcon = () => {
       const vH = wrapper.querySelector(".vol-high-icon");
       const vM = wrapper.querySelector(".vol-mute-icon");
       if(vH && vM) {
           vH.style.display = (video.muted || video.volume === 0) ? "none" : "block";
           vM.style.display = (video.muted || video.volume === 0) ? "block" : "none";
       }
    };

    switch (e.code) {
      case "Escape":
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          closeVideoModal();
        }
        break;
      case "KeyF":
        if (!document.fullscreenElement) wrapper.requestFullscreen();
        else document.exitFullscreen();
        break;
      case "Space":
        if (video.paused) {
          video.play();
          showFeedback('<ion-icon name="play" style="font-size:24px; margin-bottom:-4px;"></ion-icon>');
        } else {
          video.pause();
          showFeedback('<ion-icon name="pause" style="font-size:24px; margin-bottom:-4px;"></ion-icon>');
        }
        updatePlayIcon();
        break;
      case "ArrowLeft":
        video.currentTime -= 10;
        showFeedback("-10s", "left");
        break;
      case "ArrowRight":
        video.currentTime += 10;
        showFeedback("+10s", "right");
        break;
      case "ArrowUp":
        video.volume = Math.min(1, video.volume + 0.1);
        video.muted = false;
        showFeedback(`${Math.round(video.volume * 100)}%`);
        updateVolIcon();
        break;
      case "ArrowDown":
        video.volume = Math.max(0, video.volume - 0.1);
        if (video.volume === 0) video.muted = true;
        showFeedback(`${Math.round(video.volume * 100)}%`);
        updateVolIcon();
        break;
      case "KeyM":
        video.muted = !video.muted;
        if (video.muted) {
          showFeedback("Muted");
        } else {
          if (video.volume === 0) video.volume = 1;
          showFeedback(`${Math.round(video.volume * 100)}%`);
        }
        updateVolIcon();
        break;
    }
  });

}
