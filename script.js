const GITHUB_USERNAME = 'himanshuyadav01241-hash';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Follow Button Toggle
  const followBtn = document.getElementById('followBtn');
  if (followBtn) {
    followBtn.addEventListener('click', () => {
      const isFollowing = followBtn.classList.toggle('following');
      followBtn.textContent = isFollowing ? 'Following' : 'Follow';
    });
  }

  // 2. Music Player Toggle
  const musicBtn = document.getElementById('musicToggleBtn');
  const bgAudio = document.getElementById('bgAudio');
  const musicText = document.getElementById('musicText');
  const equalizer = document.getElementById('equalizer');

  if (musicBtn && bgAudio) {
    musicBtn.addEventListener('click', () => {
      if (bgAudio.paused) {
        bgAudio.play().then(() => {
          musicText.textContent = 'Pause';
          equalizer.classList.add('active');
        }).catch((err) => console.log('Autoplay blocked or audio failed:', err));
      } else {
        bgAudio.pause();
        musicText.textContent = 'Play Music';
        equalizer.classList.remove('active');
      }
    });
  }

  // 3. Theme Switcher
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      themeBtn.innerHTML = isLight 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
    });
  }

  // 4. Live Preview Modal
  const modal = document.getElementById('projectModal');
  const iframe = document.getElementById('previewIframe');
  const closeModal = document.getElementById('closeModal');

  document.querySelectorAll('.preview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const url = e.currentTarget.getAttribute('data-url');
      if (iframe && modal) {
        iframe.src = url;
        modal.classList.add('active');
      }
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.remove('active');
      iframe.src = '';
    });
  }

  // 5. Copy Email to Clipboard
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('himanshu.yadav01241@gmail.com').then(() => {
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 2000);
        }
      });
    });
  }

  // 6. Number Counter Animation
  function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target / 40;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count) + (target === 900 ? '+' : '');
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + (target === 900 ? '+' : '');
        }
      };
      updateCount();
    });
  }

  // 7. Fetch GitHub Profile Info
  async function fetchGitHubProfile() {
    const profileImg = document.getElementById('profileImg');
    const repoVal = document.getElementById('repo-count-val');

    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      if (profileImg && data.avatar_url) {
        profileImg.style.backgroundImage = `url('${data.avatar_url}')`;
      }
      if (repoVal && data.public_repos !== undefined) {
        repoVal.setAttribute('data-target', data.public_repos);
      }
    } catch (e) {
      console.warn('GitHub API offline or rate limited.');
    } finally {
      animateCounters();
    }
  }

  fetchGitHubProfile();

  // 8. Background Canvas Animation
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.8;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = 'rgba(129, 140, 248, 0.45)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 40; i++) particles.push(new Particle());

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }
});
