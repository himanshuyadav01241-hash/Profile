document.addEventListener('DOMContentLoaded', () => {

  // 1. Follow Button State Toggle
  const followBtn = document.getElementById('followBtn');
  const followText = document.getElementById('followText');

  if (followBtn && followText) {
    followBtn.addEventListener('click', () => {
      const isFollowing = followBtn.classList.toggle('following');
      
      if (isFollowing) {
        followText.textContent = 'Following';
        followBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        followBtn.style.color = '#cbd5e1';
        followBtn.style.boxShadow = 'none';
      } else {
        followText.textContent = 'Follow';
        followBtn.style.background = '#5865f2';
        followBtn.style.color = '#fff';
        followBtn.style.boxShadow = '0 4px 15px rgba(88, 101, 242, 0.3)';
      }
    });
  }

  // 2. Background Music Play/Pause Handler
  const musicBtn = document.getElementById('musicToggleBtn');
  const musicText = document.getElementById('musicText');
  const bgAudio = document.getElementById('bgAudio');

  if (musicBtn && bgAudio && musicText) {
    musicBtn.addEventListener('click', () => {
      if (bgAudio.paused) {
        bgAudio.play().then(() => {
          musicText.textContent = 'Pause Music';
          musicBtn.style.borderColor = '#818cf8';
        }).catch((err) => {
          console.warn('Audio playback was prevented by browser policy:', err);
        });
      } else {
        bgAudio.pause();
        musicText.textContent = 'Play Music';
        musicBtn.style.borderColor = 'rgba(255, 255, 255, 0.12)';
      }
    });
  }

  // 3. Copy Email to Clipboard Feature
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'himanshu.yadav01241@gmail.com'; // Adjust email if needed
      
      navigator.clipboard.writeText(email).then(() => {
        const subText = copyEmailBtn.querySelector('.social-sub');
        if (subText) {
          const originalText = subText.textContent;
          subText.textContent = 'Copied!';
          subText.style.color = '#818cf8';

          setTimeout(() => {
            subText.textContent = originalText;
            subText.style.color = '#94a3b8';
          }, 2000);
        }
      });
    });
  }

  // 4. Quick View Live Preview Overlay Handler
  const modal = document.createElement('div');
  modal.id = 'quickViewModal';
  modal.style.cssText = `
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    z-index: 1000;
    justify-content: center;
    align-items: center;
    padding: 20px;
  `;

  modal.innerHTML = `
    <div style="
      width: min(100%, 850px);
      height: 80vh;
      background: #121624;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
    ">
      <div style="
        padding: 12px 18px;
        background: rgba(255, 255, 255, 0.05);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 13px;
        font-weight: 600;
      ">
        <span><i class="fa-solid fa-desktop"></i> Live Preview</span>
        <button id="closeModalBtn" style="
          background: none;
          border: none;
          color: #fff;
          font-size: 20px;
          cursor: pointer;
        ">&times;</button>
      </div>
      <iframe id="modalIframe" src="" style="width: 100%; height: 100%; border: none;"></iframe>
    </div>
  `;

  document.body.appendChild(modal);

  const iframe = document.getElementById('modalIframe');
  const closeModalBtn = document.getElementById('closeModalBtn');

  document.querySelectorAll('.preview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const url = e.currentTarget.getAttribute('data-url');
      if (url && iframe) {
        iframe.src = url;
        modal.style.display = 'flex';
      }
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      if (iframe) iframe.src = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      if (iframe) iframe.src = '';
    }
  });

});
