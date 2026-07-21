document.addEventListener('DOMContentLoaded', () => {

  // Universal Touch/Click Handler for Mobile Reliability
  function bindEvent(element, handler) {
    if (!element) return;
    element.addEventListener('click', handler);
  }

  // 1. Follow Button
  const followBtn = document.getElementById('followBtn');
  const followText = document.getElementById('followText');

  bindEvent(followBtn, (e) => {
    e.preventDefault();
    const isFollowing = followBtn.classList.toggle('following');
    
    if (isFollowing) {
      followText.textContent = 'Following';
      followBtn.style.background = 'rgba(255, 255, 255, 0.12)';
      followBtn.style.color = '#cbd5e1';
      followBtn.style.boxShadow = 'none';
    } else {
      followText.textContent = 'Follow';
      followBtn.style.background = '#5865f2';
      followBtn.style.color = '#fff';
      followBtn.style.boxShadow = '0 4px 15px rgba(88, 101, 242, 0.3)';
    }
  });

  // 2. Audio Player with Online Streaming Fallback
  const musicBtn = document.getElementById('musicToggleBtn');
  const musicText = document.getElementById('musicText');
  const bgAudio = document.getElementById('bgAudio');

  // Streaming backup in case music.mp3 fails locally
  const streamFallback = "https://stream.zeno.fm/f3wvbbqmdg8uv"; 

  bindEvent(musicBtn, (e) => {
    e.preventDefault();
    
    if (bgAudio.paused) {
      // Check if local file exists or load fallback
      let playPromise = bgAudio.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
          musicText.textContent = 'Pause Music';
          musicBtn.style.borderColor = '#818cf8';
        }).catch(() => {
          // Fallback stream if music.mp3 is missing
          bgAudio.src = streamFallback;
          bgAudio.play().then(() => {
            musicText.textContent = 'Pause Music';
            musicBtn.style.borderColor = '#818cf8';
          }).catch(err => alert("Tap screen once first to allow audio playback!"));
        });
      }
    } else {
      bgAudio.pause();
      musicText.textContent = 'Play Music';
      musicBtn.style.borderColor = 'rgba(255, 255, 255, 0.12)';
    }
  });

  // 3. Copy Email
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  bindEvent(copyEmailBtn, (e) => {
    e.preventDefault();
    const email = 'himanshu.yadav01241@gmail.com';
    
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
    }).catch(() => {
      alert("Email copied: " + email);
    });
  });

  // 4. Quick View Modal
  const modal = document.createElement('div');
  modal.id = 'quickViewModal';
  modal.style.cssText = `
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    z-index: 9999;
    justify-content: center;
    align-items: center;
    padding: 15px;
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
        color: #fff;
      ">
        <span><i class="fa-solid fa-desktop"></i> Live Preview</span>
        <button id="closeModalBtn" style="
          background: none;
          border: none;
          color: #fff;
          font-size: 22px;
          cursor: pointer;
          padding: 0 5px;
        ">&times;</button>
      </div>
      <iframe id="modalIframe" src="" style="width: 100%; height: 100%; border: none;"></iframe>
    </div>
  `;

  document.body.appendChild(modal);

  const iframe = document.getElementById('modalIframe');
  const closeModalBtn = document.getElementById('closeModalBtn');

  document.querySelectorAll('.preview-btn').forEach(btn => {
    bindEvent(btn, (e) => {
      e.preventDefault();
      const url = btn.getAttribute('data-url');
      if (url && iframe) {
        iframe.src = url;
        modal.style.display = 'flex';
      }
    });
  });

  if (closeModalBtn) {
    bindEvent(closeModalBtn, () => {
      modal.style.display = 'none';
      if (iframe) iframe.src = '';
    });
  }

});
