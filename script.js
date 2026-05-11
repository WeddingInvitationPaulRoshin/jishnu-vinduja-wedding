/* ============================================
   Jishnu & Vinduja — Wedding Reception
   Interaction: Open transition + falling petals
   ============================================ */

(function () {
  'use strict';

  const entry = document.getElementById('entry');
  const invite = document.getElementById('invite');
  const openBtn = document.getElementById('openBtn');
  const fallingBg = document.getElementById('fallingBg');
  const scrollTopBtn = document.getElementById('scrollTop');
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  /* ---------- Music ---------- */
  // Start at gentle volume; fade in smoothly
  bgMusic.volume = 0;
  const TARGET_VOLUME = 0.55;
  let isMuted = false;

  function fadeAudio(audio, from, to, duration) {
    const steps = 30;
    const stepTime = duration / steps;
    const stepValue = (to - from) / steps;
    let current = from;
    let i = 0;
    const interval = setInterval(function () {
      i++;
      current += stepValue;
      audio.volume = Math.max(0, Math.min(1, current));
      if (i >= steps) clearInterval(interval);
    }, stepTime);
  }

  function playMusic() {
    if (isMuted) return;
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise
        .then(function () {
          fadeAudio(bgMusic, 0, TARGET_VOLUME, 1200);
        })
        .catch(function () {
          // Autoplay blocked — show muted state, user can tap to start
          musicToggle.classList.add('muted');
          musicToggle.setAttribute('aria-pressed', 'true');
          isMuted = true;
        });
    }
  }

  musicToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    if (isMuted) {
      // Unmute → play
      isMuted = false;
      musicToggle.classList.remove('muted');
      musicToggle.setAttribute('aria-pressed', 'false');
      musicToggle.setAttribute('aria-label', 'Mute music');
      bgMusic.volume = 0;
      bgMusic.play().then(function () {
        fadeAudio(bgMusic, 0, TARGET_VOLUME, 800);
      }).catch(function () {});
    } else {
      // Mute → fade out and pause
      isMuted = true;
      musicToggle.classList.add('muted');
      musicToggle.setAttribute('aria-pressed', 'true');
      musicToggle.setAttribute('aria-label', 'Play music');
      fadeAudio(bgMusic, bgMusic.volume, 0, 500);
      setTimeout(function () {
        if (isMuted) bgMusic.pause();
      }, 600);
    }
  });

  /* ---------- Open the invitation ---------- */
  function openInvitation() {
    entry.classList.add('hidden');
    invite.classList.add('revealed');
    invite.setAttribute('aria-hidden', 'false');

    // Start the petals
    startPetals();

    // Start the music
    playMusic();

    // Allow body scroll
    document.body.style.overflowY = 'auto';

    // Optional: a quick burst of extra petals on first open
    burstPetals();
  }

  // Whole entry section is tappable, plus the button
  entry.addEventListener('click', function (e) {
    // any click anywhere on entry opens it
    if (!entry.classList.contains('hidden')) {
      openInvitation();
    }
  });

  openBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    openInvitation();
  });

  // Keyboard accessibility
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && !entry.classList.contains('hidden')) {
      e.preventDefault();
      openInvitation();
    }
  });

  /* ---------- Falling petals and leaves ---------- */
  // Pastel palette for petals — matches the invitation card
  const PETAL_GLYPHS = [
    { char: '❀', colors: ['#e8b8b5', '#f3dcd8', '#c89bb0'] },  // flower – blush/rose
    { char: '✿', colors: ['#d6cfe2', '#b3b8d8', '#c4b8d8'] },  // flower – lilac
    { char: '❁', colors: ['#f3dcd8', '#e8b8b5'] },              // flower – pink
    { char: '✾', colors: ['#c8d3bf', '#d9e4d4'] },              // flower – sage
    { char: '❋', colors: ['#b89968', '#d4b88a'] },              // mini gold
    { char: '⚘', colors: ['#c8d3bf', '#a7b59a'] },              // leaf-like
    { char: '❦', colors: ['#c8d3bf', '#9ab38a'] }               // leaf
  ];

  function randBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function createPetal(extraFast) {
    const petal = document.createElement('span');
    petal.className = 'petal';

    const glyphSet = pick(PETAL_GLYPHS);
    petal.textContent = glyphSet.char;

    const color = pick(glyphSet.colors);
    petal.style.color = color;

    // Random horizontal position
    const leftPercent = randBetween(0, 100);
    petal.style.left = leftPercent + 'vw';

    // Random size
    const size = randBetween(14, 26);
    petal.style.fontSize = size + 'px';

    // Random drift across screen
    const drift = randBetween(-120, 120);
    petal.style.setProperty('--drift', drift + 'px');

    // Random opacity
    const opacity = randBetween(0.45, 0.85);
    petal.style.setProperty('--petal-opacity', opacity);

    // Duration of fall
    const duration = extraFast
      ? randBetween(5, 9)
      : randBetween(9, 16);
    petal.style.animationDuration = duration + 's';

    // Negative delay for variety so first batch doesn't all start at top
    const delay = extraFast ? 0 : randBetween(-duration, 0);
    petal.style.animationDelay = delay + 's';

    fallingBg.appendChild(petal);

    // Cleanup after a couple full cycles
    setTimeout(function () {
      if (petal.parentNode) petal.parentNode.removeChild(petal);
    }, (duration + Math.abs(delay) + 1) * 1000);
  }

  let petalInterval = null;
  function startPetals() {
    // Initial seeding so the screen isn't empty on reveal
    const initialCount = window.innerWidth < 480 ? 14 : 22;
    for (let i = 0; i < initialCount; i++) {
      createPetal(false);
    }

    // Continual replenishment
    const intervalMs = window.innerWidth < 480 ? 900 : 600;
    petalInterval = setInterval(function () {
      createPetal(false);
    }, intervalMs);
  }

  function burstPetals() {
    // A burst of extra petals on first opening for a celebratory feel
    const burstCount = window.innerWidth < 480 ? 12 : 20;
    for (let i = 0; i < burstCount; i++) {
      setTimeout(function () {
        createPetal(true);
      }, i * 80);
    }
  }

  /* ---------- Scroll to top button ---------- */
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400 && invite.classList.contains('revealed')) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Prevent initial page scroll while entry is up ---------- */
  document.body.style.overflowY = 'hidden';

  /* ---------- Reduce motion support ---------- */
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Slower, fewer petals
    const original = createPetal;
    createPetal = function (extraFast) {
      // Only occasionally create a petal
      if (Math.random() > 0.5) original(extraFast);
    };
  }

})();
