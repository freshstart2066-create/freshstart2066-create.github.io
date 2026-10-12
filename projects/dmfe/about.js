/**
 * DMFE ABOUT PAGE — 4K Full Background Solar Farm Experience
 * Interactive Day/Sunset transitions, 3D mouse parallax tilt,
 * hotspot tooltips, assembly modal, and Web Audio SFX.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const body = document.body;
  const farmContainer = document.getElementById('farmSceneContainer');
  const farmLayerDay = document.getElementById('farmLayerDay');
  const farmLayerSunset = document.getElementById('farmLayerSunset');
  const btnFarmDay = document.getElementById('btn-farm-day');
  const btnFarmSunset = document.getElementById('btn-farm-sunset');
  const btnOpenAssembly = document.getElementById('btn-open-assembly-modal');
  const btnCloseAssembly = document.getElementById('btnCloseAssemblyModal');
  const assemblyModal = document.getElementById('assemblyModal');
  const audioBtn = document.getElementById('about-audio-btn');
  const solarVal = document.getElementById('farm-solar-val');

  let currentMode = 'day'; // 'day' | 'sunset'
  let isAudioMuted = false;

  // Web Audio Context for SFX & Ambient Solar Hum
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    return audioCtx;
  }

  function playSFX(type) {
    try {
      const actx = getAudioCtx();
      if (!actx || isAudioMuted) return;
      if (actx.state === 'suspended') actx.resume();

      const now = actx.currentTime;
      const osc = actx.createOscillator();
      const gain = actx.createGain();

      osc.connect(gain);
      gain.connect(actx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'sunset') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.35);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'modal') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.2);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch (e) {}
  }

  // Time of Day Transitions (Day <-> Sunset)
  function setTimeMode(mode) {
    if (currentMode === mode) return;
    currentMode = mode;

    if (mode === 'day') {
      body.classList.remove('theme-farm-sunset');
      body.classList.add('theme-farm-day');

      if (farmLayerSunset) farmLayerSunset.classList.remove('active');
      if (farmLayerDay) farmLayerDay.classList.add('active');

      if (btnFarmSunset) btnFarmSunset.classList.remove('active');
      if (btnFarmDay) btnFarmDay.classList.add('active');

      if (solarVal) solarVal.textContent = '248.6 kW';
      playSFX('click');
    } else {
      body.classList.remove('theme-farm-day');
      body.classList.add('theme-farm-sunset');

      if (farmLayerDay) farmLayerDay.classList.remove('active');
      if (farmLayerSunset) farmLayerSunset.classList.add('active');

      if (btnFarmDay) btnFarmDay.classList.remove('active');
      if (btnFarmSunset) btnFarmSunset.classList.add('active');

      if (solarVal) solarVal.textContent = '194.2 kW';
      playSFX('sunset');
    }
  }

  if (btnFarmDay) btnFarmDay.addEventListener('click', () => setTimeMode('day'));
  if (btnFarmSunset) btnFarmSunset.addEventListener('click', () => setTimeMode('sunset'));

  // 3D Mouse Parallax Tilt across 4K Farm Landscape
  let targetTiltX = 0;
  let targetTiltY = 0;
  let currentTiltX = 0;
  let currentTiltY = 0;

  window.addEventListener('mousemove', (e) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const relX = (e.clientX / width) - 0.5; // -0.5 to 0.5
    const relY = (e.clientY / height) - 0.5;

    targetTiltY = relX * 10; // deg
    targetTiltX = -relY * 6; // deg
  });

  function animateFarmParallax() {
    currentTiltX += (targetTiltX - currentTiltX) * 0.08;
    currentTiltY += (targetTiltY - currentTiltY) * 0.08;

    const activeLayer = document.querySelector('.farm-layer.active');
    if (activeLayer) {
      activeLayer.style.transform = `scale(1.06) rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg) translateZ(0)`;
    }

    requestAnimationFrame(animateFarmParallax);
  }
  animateFarmParallax();

  // Assembly Modal Handlers
  if (btnOpenAssembly && assemblyModal) {
    btnOpenAssembly.addEventListener('click', () => {
      assemblyModal.classList.add('active');
      assemblyModal.setAttribute('aria-hidden', 'false');
      playSFX('modal');
    });
  }

  if (btnCloseAssembly && assemblyModal) {
    btnCloseAssembly.addEventListener('click', () => {
      assemblyModal.classList.remove('active');
      assemblyModal.setAttribute('aria-hidden', 'true');
      playSFX('click');
    });

    assemblyModal.addEventListener('click', (e) => {
      if (e.target === assemblyModal) {
        assemblyModal.classList.remove('active');
        assemblyModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Keyboard shortcut (Escape closes modal)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && assemblyModal.classList.contains('active')) {
      assemblyModal.classList.remove('active');
      assemblyModal.setAttribute('aria-hidden', 'true');
    }
  });

  // Audio Toggle
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      isAudioMuted = !isAudioMuted;
      audioBtn.style.opacity = isAudioMuted ? '0.5' : '1';
      playSFX('click');
    });
  }

  // Ambient Solar Particles Canvas
  const ambientCanvas = document.getElementById('about-ambient-canvas');
  const ambCtx = ambientCanvas.getContext('2d');
  const particles = [];
  const maxParticles = 45;

  function resizeAmbient() {
    const dpr = window.devicePixelRatio || 1;
    ambientCanvas.width = window.innerWidth * dpr;
    ambientCanvas.height = window.innerHeight * dpr;
    ambCtx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resizeAmbient);
  resizeAmbient();

  for (let i = 0; i < maxParticles; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 1 + Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -0.2 - Math.random() * 0.5,
      alpha: 0.1 + Math.random() * 0.4
    });
  }

  function renderAmbient() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    ambCtx.clearRect(0, 0, w, h);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < -10) {
        p.y = h + 10;
        p.x = Math.random() * w;
      }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      const pColor = currentMode === 'day' ? `rgba(255, 230, 120, ${p.alpha})` : `rgba(255, 120, 40, ${p.alpha})`;
      ambCtx.fillStyle = pColor;
      ambCtx.beginPath();
      ambCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ambCtx.fill();
    });

    requestAnimationFrame(renderAmbient);
  }
  renderAmbient();

  // Unlock Audio
  document.addEventListener('pointerdown', getAudioCtx, { once: true });
});
