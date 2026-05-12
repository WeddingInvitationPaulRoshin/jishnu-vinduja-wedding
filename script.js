/* ============================================
   Jishnu & Vinduja — Wedding Reception
   v2: Scroll reveals, countdown, music, petals
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
  const progressDots = document.getElementById('progressDots');

  /* ---------- MUSIC ---------- */
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
          musicToggle.classList.add('muted');
          musicToggle.setAttribute('aria-pressed', 'true');
          isMuted = true;
        });
    }
  }

  musicToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    if (isMuted) {
      isMuted = false;
      musicToggle.classList.remove('muted');
      musicToggle.setAttribute('aria-pressed', 'false');
      musicToggle.setAttribute('aria-label', 'Mute music');
      bgMusic.volume = 0;
      bgMusic.play().then(function () {
        fadeAudio(bgMusic, 0, TARGET_VOLUME, 800);
      }).catch(function () {});
    } else {
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

  /* ---------- OPEN INVITATION ---------- */
  function openInvitation() {
    entry.classList.add('hidden');
    invite.classList.add('revealed');
    invite.setAttribute('aria-hidden', 'false');

    startPetals();
    playMusic();
    burstPetals();
    startCountdown();

    document.body.style.overflowY = 'auto';

    // Kick off scroll observers after content reveals
    setTimeout(setupScrollReveal, 300);
  }

  entry.addEventListener('click', function () {
    if (!entry.classList.contains('hidden')) openInvitation();
  });

  openBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    openInvitation();
  });

  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && !entry.classList.contains('hidden')) {
      e.preventDefault();
      openInvitation();
    }
  });

  /* ---------- FALLING PETALS ---------- */
  const PETAL_GLYPHS = [
    { char: '❀', colors: ['#e8b8b5', '#f3dcd8', '#c89bb0'] },
    { char: '✿', colors: ['#d6cfe2', '#b3b8d8', '#c4b8d8'] },
    { char: '❁', colors: ['#f3dcd8', '#e8b8b5'] },
    { char: '✾', colors: ['#c8d3bf', '#d9e4d4'] },
    { char: '❋', colors: ['#b89968', '#d4b88a'] },
    { char: '⚘', colors: ['#c8d3bf', '#a7b59a'] },
    { char: '❦', colors: ['#c8d3bf', '#9ab38a'] }
  ];

  function randBetween(min, max) { return Math.random() * (max - min) + min; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function createPetal(extraFast) {
    const petal = document.createElement('span');
    petal.className = 'petal';

    const glyphSet = pick(PETAL_GLYPHS);
    petal.textContent = glyphSet.char;
    petal.style.color = pick(glyphSet.colors);

    petal.style.left = randBetween(0, 100) + 'vw';
    petal.style.fontSize = randBetween(14, 26) + 'px';
    petal.style.setProperty('--drift', randBetween(-120, 120) + 'px');
    petal.style.setProperty('--petal-opacity', randBetween(0.45, 0.85));

    const duration = extraFast ? randBetween(5, 9) : randBetween(9, 16);
    petal.style.animationDuration = duration + 's';

    const delay = extraFast ? 0 : randBetween(-duration, 0);
    petal.style.animationDelay = delay + 's';

    fallingBg.appendChild(petal);

    setTimeout(function () {
      if (petal.parentNode) petal.parentNode.removeChild(petal);
    }, (duration + Math.abs(delay) + 1) * 1000);
  }

  let petalInterval = null;
  function startPetals() {
    const initialCount = window.innerWidth < 480 ? 12 : 20;
    for (let i = 0; i < initialCount; i++) createPetal(false);

    const intervalMs = window.innerWidth < 480 ? 1100 : 700;
    petalInterval = setInterval(function () {
      createPetal(false);
    }, intervalMs);
  }

  function burstPetals() {
    const burstCount = window.innerWidth < 480 ? 10 : 18;
    for (let i = 0; i < burstCount; i++) {
      setTimeout(function () { createPetal(true); }, i * 90);
    }
  }

  /* ---------- COUNTDOWN ---------- */
  // June 1, 2026, 6:00 PM IST (UTC+5:30) = 12:30 UTC
  const RECEPTION_TS = new Date('2026-06-01T18:00:00+05:30').getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = RECEPTION_TS - now;
    if (diff <= 0) {
      document.querySelectorAll('[data-cd]').forEach(function (el) { el.textContent = '0'; });
      return false;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    setCdValue('days', days);
    setCdValue('hours', hours);
    setCdValue('mins', mins);
    setCdValue('secs', secs);
    return true;
  }

  function setCdValue(key, value) {
    const el = document.querySelector('[data-cd="' + key + '"]');
    if (el) el.textContent = String(value).padStart(2, '0');
  }

  function startCountdown() {
    if (updateCountdown()) {
      setInterval(updateCountdown, 1000);
    }
  }

  /* ---------- SCROLL REVEAL ---------- */
  function setupScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      // Fallback — just show everything
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('in-view');
      });
      document.querySelectorAll('.sketch-card, .photo-card').forEach(function (el) {
        el.classList.add('in-view');
      });
      return;
    }

    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
    // Also observe cards for their special animations
    document.querySelectorAll('.sketch-card, .photo-card').forEach(function (el) { obs.observe(el); });

    // Section tracker for progress dots
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.pd');

    const sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const idx = Array.from(sections).indexOf(entry.target);
          dots.forEach(function (d, i) {
            d.classList.toggle('active', i === idx);
          });
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(function (s) { sectionObs.observe(s); });

    // Clicking a dot scrolls to its section
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () {
        if (sections[i]) {
          sections[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ---------- SCROLL TO TOP ---------- */
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400 && invite.classList.contains('revealed')) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- INIT ---------- */
  document.body.style.overflowY = 'hidden';

  // Reduce motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const originalCreate = createPetal;
    window.createPetal = function (extraFast) {
      if (Math.random() > 0.5) originalCreate(extraFast);
    };
  }

})();
