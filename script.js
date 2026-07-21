/*==================================================
  INSANE HR PORTFOLIO V2 - SCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     AUDIO CONTROLLER
  ========================================= */
  const musicBtn = document.querySelector("#musicToggleBtn");
  const musicText = document.querySelector("#musicText");
  const bgAudio = document.querySelector("#bgAudio");
  let isPlaying = false;

  if (musicBtn && bgAudio) {
    musicBtn.addEventListener("click", () => {
      if (!isPlaying) {
        bgAudio.play().then(() => {
          isPlaying = true;
          musicText.textContent = "Pause Music";
          musicBtn.classList.add("playing");
        }).catch(err => {
          console.warn("Audio play blocked by browser policy:", err);
        });
      } else {
        bgAudio.pause();
        isPlaying = false;
        musicText.textContent = "Play Music";
        musicBtn.classList.remove("playing");
      }
    });
  }

  /* =========================================
     FOLLOW BUTTON TOGGLE
  ========================================= */
  const followBtn = document.querySelector("#followBtn");
  const followText = document.querySelector("#followText");

  if (followBtn && followText) {
    followBtn.addEventListener("click", () => {
      const isFollowing = followBtn.classList.toggle("following");
      followText.textContent = isFollowing ? "Following" : "Follow";
      const icon = followBtn.querySelector("i");
      if (icon) {
        icon.className = isFollowing ? "fa-solid fa-user-check" : "fa-solid fa-user-plus";
      }
    });
  }

  /* =========================================
     COPY EMAIL TO CLIPBOARD
  ========================================= */
  const copyEmailBtn = document.querySelector("#copyEmailBtn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", async () => {
      const email = "himanshuyadav@example.com"; // Replace with your real email address
      try {
        await navigator.clipboard.writeText(email);
        const smallText = copyEmailBtn.querySelector("small");
        const originalText = smallText.textContent;
        
        smallText.textContent = "Copied to clipboard!";
        smallText.style.color = "#32d74b";
        
        setTimeout(() => {
          smallText.textContent = originalText;
          smallText.style.color = "";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy email: ", err);
      }
    });
  }

  /* =========================================
     LIVE PREVIEW MODAL
  ========================================= */
  const modal = document.createElement("div");
  modal.id = "previewModal";
  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-top">
        <h3><i class="fa-solid fa-desktop"></i> Live Preview</h3>
        <button id="closePreview" type="button" aria-label="Close modal">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <iframe id="previewFrame" src="about:blank"></iframe>
    </div>
  `;
  document.body.appendChild(modal);

  const frame = document.querySelector("#previewFrame");
  const closeBtn = document.querySelector("#closePreview");

  document.querySelectorAll(".preview-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.url) {
        frame.src = btn.dataset.url;
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove("show");
    frame.src = "about:blank";
    document.body.style.overflow = "";
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  /* =========================================
     SCROLL REVEAL OBSERVER
  ========================================= */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".glass-card, .project-card, .social-item").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });

  /* =========================================
     CARD 3D TILT EFFECT
  ========================================= */
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((y / rect.height) - 0.5) * -10;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* =========================================
     MOUSE GLOW FOLLOWER
  ========================================= */
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);

  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });

  /* =========================================
     KEYBOARD SHORTCUTS
  ========================================= */
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "m" && musicBtn) {
      musicBtn.click();
    }
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
});
