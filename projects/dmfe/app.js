// Reposit Hero Interactive Engine

class SolarHeroController {
  constructor() {
    this.houseModel = 'modern'; // Default to Villa (modern)
    this.timePercent = 0; // 0 = morning (9am), 50 = sunset (6pm), 100 = night (11pm)
    this.isPlaying = false;
    this.playSpeed = 0.25;
    this.audioEnabled = false;
    this.audioCtx = null;
    
    // Telemetry state
    this.solarGen = 7.8;
    this.batteryPercent = 94;
    this.totalSaved = 18420000;
    
    this.initDOMElements();
    this.initEventListeners();
    this.initCanvasAnimation();
    this.updateSceneState(0);
    this.initAudioEngine();
    
    // Automatically begin in Auto Cycle mode on every launch
    this.startAutoCycle();
  }

  initDOMElements() {
    // Classic Layers
    this.classicDay = document.getElementById('classic-day');
    this.classicSunset = document.getElementById('classic-sunset');
    this.classicNight = document.getElementById('classic-night');
    
    // Modern Layers
    this.modernDay = document.getElementById('modern-day');
    this.modernSunset = document.getElementById('modern-sunset');
    this.modernNight = document.getElementById('modern-night');

    this.sceneLighting = document.getElementById('scene-lighting');
    
    this.tabMorning = document.getElementById('tab-morning');
    this.tabSunset = document.getElementById('tab-sunset');
    this.tabNight = document.getElementById('tab-night');
    this.sliderPill = document.getElementById('slider-pill');
    
    this.timeSlider = document.getElementById('time-range-slider');
    this.timeLabel = document.getElementById('live-time-label');
    this.cyclePlayBtn = document.getElementById('cycle-play-btn');
    this.audioBtn = document.getElementById('audio-toggle-btn');
    
    this.btnHouseClassic = document.getElementById('btn-house-classic');
    this.btnHouseModern = document.getElementById('btn-house-modern');
    
    // Telemetry Elements
    this.statSolar = document.getElementById('stat-solar');
    this.statSolarStatus = document.getElementById('stat-solar-status');
    this.statBattery = document.getElementById('stat-battery');
    this.statBatteryStatus = document.getElementById('stat-battery-status');
    this.batteryBadge = document.getElementById('battery-mode-badge');
    this.statSavings = document.getElementById('stat-savings');
    
    // Modal & Calculator
    this.quoteModal = document.getElementById('quote-modal');
    this.btnOpenQuote = document.getElementById('btn-open-quote');
    this.btnCloseQuote = document.getElementById('btn-close-quote');
    this.billInput = document.getElementById('monthly-bill-input');
    this.billDisplay = document.getElementById('bill-display');
    this.calcSavingsTotal = document.getElementById('calc-savings-total');
    this.optionPills = document.querySelectorAll('.option-pill');
    this.quoteForm = document.getElementById('quote-form');
    this.quoteSuccess = document.getElementById('quote-success');
    
    this.canvas = document.getElementById('ambient-canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  initEventListeners() {
    // Tab Clicks
    this.tabMorning.addEventListener('click', () => {
      this.stopAutoCycle();
      this.animateTimeTo(0);
      this.playSwitchSound();
    });

    this.tabSunset.addEventListener('click', () => {
      this.stopAutoCycle();
      this.animateTimeTo(50);
      this.playSwitchSound();
    });

    this.tabNight.addEventListener('click', () => {
      this.stopAutoCycle();
      this.animateTimeTo(100);
      this.playSwitchSound();
    });

    // Slider Input
    this.timeSlider.addEventListener('input', (e) => {
      this.stopAutoCycle();
      this.timePercent = parseFloat(e.target.value);
      this.updateSceneState(this.timePercent);
    });

    // Play/Pause Auto Cycle (if button exists)
    if (this.cyclePlayBtn) {
      this.cyclePlayBtn.addEventListener('click', () => {
        if (this.isPlaying) {
          this.stopAutoCycle();
        } else {
          this.startAutoCycle();
        }
      });
    }

    // Audio Toggle (if present)
    if (this.audioBtn) {
      this.audioBtn.addEventListener('click', () => {
        this.toggleAudio();
      });
    }

    // House Model Toggle
    this.btnHouseClassic.addEventListener('click', () => {
      this.setHouseModel('classic');
    });
    this.btnHouseModern.addEventListener('click', () => {
      this.setHouseModel('modern');
    });

    // Modal Events
    this.btnOpenQuote.addEventListener('click', () => {
      this.openModal();
    });
    this.btnCloseQuote.addEventListener('click', () => {
      this.closeModal();
    });
    this.quoteModal.addEventListener('click', (e) => {
      if (e.target === this.quoteModal) this.closeModal();
    });

    // Calculator Inputs
    this.billInput.addEventListener('input', () => this.updateCalculator());
    this.optionPills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.optionPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.updateCalculator();
      });
    });

    // FAQ Accordion Interactivity
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.faq-item');
        const isActive = item.classList.contains('active');
        
        // Close other FAQ items
        document.querySelectorAll('.faq-item').forEach(el => {
          el.classList.remove('active');
          const btn = el.querySelector('.faq-trigger');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.stopAutoCycle();
        this.animateTimeTo(Math.min(100, this.timePercent + 25));
      } else if (e.key === 'ArrowLeft') {
        this.stopAutoCycle();
        this.animateTimeTo(Math.max(0, this.timePercent - 25));
      } else if (e.key === ' ' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        this.isPlaying ? this.stopAutoCycle() : this.startAutoCycle();
      } else if (e.key === 'Escape') {
        this.closeModal();
      }
    });

    // Resize listener
    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
    this.resizeCanvas();
  }

  setHouseModel(model) {
    this.houseModel = model;
    document.body.classList.remove('house-classic', 'house-modern');
    document.body.classList.add(`house-${model}`);

    if (model === 'classic') {
      this.btnHouseClassic.classList.add('active');
      this.btnHouseModern.classList.remove('active');
    } else {
      this.btnHouseModern.classList.add('active');
      this.btnHouseClassic.classList.remove('active');
    }
    this.updateSceneState(this.timePercent);
  }

  animateTimeTo(targetVal) {
    const startVal = this.timePercent;
    const diff = targetVal - startVal;
    const startTime = performance.now();
    const duration = 500; // ms

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      this.timePercent = startVal + diff * ease;
      this.timeSlider.value = this.timePercent;
      this.updateSceneState(this.timePercent);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  startAutoCycle() {
    this.isPlaying = true;
    if (this.cyclePlayBtn) {
      this.cyclePlayBtn.classList.add('playing');
      const cycleText = document.getElementById('cycle-text');
      if (cycleText) cycleText.textContent = 'Pause';
    }
    
    let lastTime = performance.now();
    this.cycleDirection = this.cycleDirection || 1; // 1 = forward to night, -1 = back to morning
    
    const cycle = (now) => {
      if (!this.isPlaying) return;
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      
      // Smooth continuous ping-pong cycle: Morning -> Sunset -> Night -> Sunset -> Morning
      this.timePercent += this.cycleDirection * this.playSpeed * dt * 25;
      
      if (this.timePercent >= 100) {
        this.timePercent = 100;
        this.cycleDirection = -1;
      } else if (this.timePercent <= 0) {
        this.timePercent = 0;
        this.cycleDirection = 1;
      }
      
      this.timeSlider.value = this.timePercent;
      this.updateSceneState(this.timePercent);
      
      this.cycleAnimId = requestAnimationFrame(cycle);
    };
    this.cycleAnimId = requestAnimationFrame(cycle);
  }

  stopAutoCycle() {
    this.isPlaying = false;
    if (this.cyclePlayBtn) {
      this.cyclePlayBtn.classList.remove('playing');
    }
    const cycleText = document.getElementById('cycle-text');
    if (cycleText) {
      cycleText.textContent = 'Auto Cycle';
    }
    if (this.cycleAnimId) cancelAnimationFrame(this.cycleAnimId);
    if (!this.cyclePlayBtn) {
      if (this.resumeCycleTimer) clearTimeout(this.resumeCycleTimer);
      this.resumeCycleTimer = setTimeout(() => this.startAutoCycle(), 4000);
    }
  }

  updateSceneState(p) {
    // p goes from 0 (Morning) to 50 (Sunset) to 100 (Night)
    let dayOpacity = 0;
    let sunsetOpacity = 0;
    let nightOpacity = 0;

    if (p <= 50) {
      // Transition from Day to Sunset
      const t = p / 50;
      dayOpacity = 1 - t;
      sunsetOpacity = t;
      nightOpacity = 0;
    } else {
      // Transition from Sunset to Night
      const t = (p - 50) / 50;
      dayOpacity = 0;
      sunsetOpacity = 1 - t;
      nightOpacity = t;
    }

    if (this.houseModel === 'classic') {
      this.classicDay.style.opacity = dayOpacity;
      this.classicSunset.style.opacity = sunsetOpacity;
      this.classicNight.style.opacity = nightOpacity;
    } else {
      this.modernDay.style.opacity = dayOpacity;
      this.modernSunset.style.opacity = sunsetOpacity;
      this.modernNight.style.opacity = nightOpacity;
    }

    // Update Pill Position & Active Tab
    const tabIndex = p < 30 ? 0 : (p < 70 ? 1 : 2);
    this.sliderPill.style.transform = `translateX(${tabIndex * 100}%)`;
    
    this.tabMorning.classList.toggle('active', tabIndex === 0);
    this.tabSunset.classList.toggle('active', tabIndex === 1);
    this.tabNight.classList.toggle('active', tabIndex === 2);

    // Pill color and glow adaptation
    if (tabIndex === 0) {
      this.sliderPill.style.background = '#f7f9ea';
      this.sliderPill.style.boxShadow = '0 4px 20px rgba(255, 235, 150, 0.45)';
    } else if (tabIndex === 1) {
      this.sliderPill.style.background = '#ffd8ba';
      this.sliderPill.style.boxShadow = '0 4px 20px rgba(255, 107, 74, 0.45)';
    } else {
      this.sliderPill.style.background = '#e2e8f0';
      this.sliderPill.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.5)';
    }

    // Update Live Time Badge & Telemetry
    this.updateTelemetryAndClock(p);
  }

  updateTelemetryAndClock(p) {
    // Map p (0-100) to hours: 0 -> 09:00 AM, 50 -> 06:00 PM (18:00), 100 -> 11:30 PM (23:30)
    let totalMinutes = 9 * 60 + (p / 100) * (14.5 * 60);
    let hours = Math.floor(totalMinutes / 60);
    let mins = Math.floor(totalMinutes % 60);
    let ampm = hours >= 12 ? 'PM' : 'AM';
    let displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
    let timeStr = `${String(displayHours).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${ampm}`;
    if (this.timeLabel) this.timeLabel.textContent = timeStr;

    // Calculate dynamic telemetry based on time of day
    if (p < 40) {
      // Peak morning solar
      const factor = 1 - (p / 40) * 0.2;
      this.solarGen = (8.4 * factor).toFixed(1);
      this.batteryPercent = Math.min(100, Math.floor(82 + (p / 40) * 18));
      if (this.statSolar) this.statSolar.textContent = `${this.solarGen} kW`;
      if (this.statSolarStatus) this.statSolarStatus.textContent = 'Powers Home + Fast Charging Battery';
      if (this.statBattery) this.statBattery.innerHTML = `${this.batteryPercent}% <span class="badge-charging">Charging</span>`;
      if (this.statBatteryStatus) this.statBatteryStatus.textContent = 'Stored: 14.8 kWh (₦0 from Grid)';
    } else if (p <= 70) {
      // Sunset transition
      const factor = 1 - ((p - 40) / 30);
      this.solarGen = Math.max(0, (6.5 * factor).toFixed(1));
      this.batteryPercent = 98;
      if (this.statSolar) this.statSolar.textContent = `${this.solarGen} kW`;
      if (this.statSolarStatus) this.statSolarStatus.textContent = 'Golden Hour Solar Influx';
      if (this.statBattery) this.statBattery.innerHTML = `${this.batteryPercent}% <span class="badge-charging">Full / Standby</span>`;
      if (this.statBatteryStatus) this.statBatteryStatus.textContent = 'Stored: 15.0 kWh Capacity Ready';
    } else {
      // Nighttime
      this.solarGen = (0.0).toFixed(1);
      const drain = ((p - 70) / 30) * 8;
      this.batteryPercent = Math.max(88, Math.floor(98 - drain));
      if (this.statSolar) this.statSolar.textContent = `0.0 kW (Night)`;
      if (this.statSolarStatus) this.statSolarStatus.textContent = 'Zero Grid Reliance';
      if (this.statBattery) this.statBattery.innerHTML = `${this.batteryPercent}% <span class="badge-charging" style="background:rgba(0,180,216,0.2);color:#00b4d8;border-color:#00b4d8;">Discharging</span>`;
      if (this.statBatteryStatus) this.statBatteryStatus.textContent = 'Powering Home Lights & EV at ₦0';
    }
  }

  // Web Audio Synthesis (Morning chirps, night crickets, switch click)
  initAudioEngine() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
    } catch(e) {
      console.warn('Web Audio not supported');
    }
  }

  toggleAudio() {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    this.audioEnabled = !this.audioEnabled;
    this.audioBtn.classList.toggle('muted', !this.audioEnabled);
    
    if (this.audioEnabled) {
      this.playSwitchSound();
      this.startAmbientLoop();
    } else {
      this.stopAmbientLoop();
    }
  }

  playSwitchSound() {
    if (!this.audioEnabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.audioCtx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch (e) {}
  }

  startAmbientLoop() {
    if (this.ambientTimer) clearInterval(this.ambientTimer);
    this.ambientTimer = setInterval(() => {
      if (!this.audioEnabled || !this.audioCtx) return;
      if (this.timePercent < 50) {
        // Morning bird chirp
        if (Math.random() < 0.4) this.synthBirdChirp();
      } else {
        // Evening cricket pulse
        if (Math.random() < 0.6) this.synthCricket();
      }
    }, 1800);
  }

  stopAmbientLoop() {
    if (this.ambientTimer) clearInterval(this.ambientTimer);
  }

  synthBirdChirp() {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2400 + Math.random() * 400, now);
    osc.frequency.exponentialRampToValueAtTime(3200 + Math.random() * 600, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(2600, now + 0.18);
    
    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  synthCricket() {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(4500, now);
    
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  // Canvas Particle & Light Ray Simulation
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initParticles();
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < 45; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3 - 0.2,
        size: Math.random() * 2.5 + 0.8,
        alpha: Math.random() * 0.8 + 0.2,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  initCanvasAnimation() {
    const render = (time) => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const isDay = this.timePercent < 45;
      const isSunset = this.timePercent >= 45 && this.timePercent < 75;
      
      // Solar / Dust / Star Particles
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.03;
        
        if (p.x < 0) p.x = this.canvas.width;
        if (p.x > this.canvas.width) p.x = 0;
        if (p.y < 0) p.y = this.canvas.height;
        if (p.y > this.canvas.height) p.y = 0;

        const dynamicAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.phase));
        
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        if (isDay) {
          // Golden sunbeam photon motes
          this.ctx.fillStyle = `rgba(255, 230, 150, ${dynamicAlpha * 0.6})`;
          this.ctx.shadowBlur = 8;
          this.ctx.shadowColor = 'rgba(255, 220, 100, 0.8)';
        } else if (isSunset) {
          // Warm amber twilight embers
          this.ctx.fillStyle = `rgba(255, 140, 70, ${dynamicAlpha * 0.7})`;
          this.ctx.shadowBlur = 10;
          this.ctx.shadowColor = 'rgba(255, 100, 40, 0.8)';
        } else {
          // Twinkling stars
          this.ctx.fillStyle = `rgba(220, 240, 255, ${dynamicAlpha * 0.85})`;
          this.ctx.shadowBlur = 6;
          this.ctx.shadowColor = 'rgba(100, 200, 255, 0.9)';
        }
        this.ctx.fill();
      });

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  // Modal & Calculator Methods
  openModal() {
    this.quoteModal.classList.add('open');
    this.updateCalculator();
  }

  closeModal() {
    if (this.quoteModal) {
      this.quoteModal.classList.remove('open');
    }
  }

  updateCalculator() {
    if (!this.billInput || !this.billDisplay) return;
    const monthly = parseInt(this.billInput.value, 10);
    this.billDisplay.textContent = `₦${monthly.toLocaleString()} / mo`;
    
    let multiplier = 1.0;
    let propertyType = 'Residential (3-4 Bed)';
    const activePill = document.querySelector('.option-pill.active');
    if (activePill) {
      multiplier = parseFloat(activePill.dataset.multiplier);
      propertyType = activePill.textContent.trim();
    }
    
    // Multi-cycle projection baseline
    const projectedSavings = Math.round(monthly * 84 * multiplier);
    const calcBillSlashed = document.getElementById('calc-bill-slashed');
    if (calcBillSlashed) {
      calcBillSlashed.innerHTML = `<s>₦${projectedSavings.toLocaleString()}</s>`;
    }
    if (this.calcSavingsTotal) {
      this.calcSavingsTotal.textContent = `Potential offset: ₦${projectedSavings.toLocaleString()}`;
    }

    const btnClaimWhatsApp = document.getElementById('btn-claim-whatsapp');
    if (btnClaimWhatsApp) {
      const message = `Hello Miracle Akujobi, I used the DMFE planning calculator to estimate potential grid spend and would like to discuss a suitable system:\n\n⚡ Monthly Power & Fuel Bill: ₦${monthly.toLocaleString()} / mo\n🏠 Property Size: ${propertyType}\n💰 Projected Long-Term Grid Spend Offset: ₦${projectedSavings.toLocaleString()}\n\nPlease provide full setup details.`;
      btnClaimWhatsApp.href = `https://wa.me/2349048518418?text=${encodeURIComponent(message)}`;
    }
  }
}

/**
 * 3D Interactive Services Window Wheel (SynapseX Style)
 * Cylindrical perspective, inertial mouse/touch drag, auto-rotation,
 * card depth scaling, active glowing focus, and dot pagination.
 */
class ServicesWheel3D {
  constructor() {
    this.wrapper = document.getElementById('servicesWheelWrapper');
    this.scene = document.getElementById('servicesWheelScene');
    this.cylinder = document.getElementById('servicesWheelCylinder');
    this.cards = document.querySelectorAll('.wheel-card');
    this.dots = document.querySelectorAll('.wheel-dot');
    this.btnPrev = document.getElementById('btnWheelPrev');
    this.btnNext = document.getElementById('btnWheelNext');

    if (!this.cylinder || this.cards.length === 0) return;

    this.numCards = this.cards.length;
    this.angleStep = 360 / this.numCards;
    this.currentRotation = 0;
    this.targetRotation = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startRotation = 0;
    this.lastX = 0;
    this.velocity = 0;
    this.lastTime = 0;
    this.autoRotateSpeed = 0.035; // subtle continuous idle rotation
    this.isHovered = false;
    this.animId = null;

    this.updateRadius();
    this.initLayout();
    this.bindEvents();
    this.startLoop();
  }

  updateRadius() {
    const w = window.innerWidth;
    const cardWidth = w <= 480 ? 175 : (w <= 768 ? 205 : 215);
    const baseRadius = w <= 480 ? 155 : (w <= 768 ? 185 : 230);
    // Keep adjacent cards spaced as the service wheel grows.
    this.radius = Math.max(baseRadius, Math.ceil((cardWidth / 2) / Math.tan(Math.PI / this.numCards)));
  }

  initLayout() {
    this.cards.forEach((card, i) => {
      const angle = i * this.angleStep;
      card.style.transform = `rotateY(${angle}deg) translateZ(${this.radius}px)`;
    });
    this.updateCardsVisuals(0);
  }

  bindEvents() {
    // Window Resize
    window.addEventListener('resize', () => {
      this.updateRadius();
      this.initLayout();
    });

    // Prev / Next Buttons
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', () => {
        this.targetRotation += this.angleStep;
        this.snapToStep();
      });
    }

    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => {
        this.targetRotation -= this.angleStep;
        this.snapToStep();
      });
    }

    // Homepage service quick links open the matching wheel card.
    document.querySelectorAll('.service-quick-link[data-service-index]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const index = Number(link.dataset.serviceIndex);
        this.rotateToIndex(index);
        this.wrapper.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
      });
    });

        // Dot Clicks
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.rotateToIndex(index);
      });
    });

    // Card Clicks (center clicked card)
    this.cards.forEach((card, index) => {
      card.addEventListener('click', (e) => {
        if (Math.abs(this.velocity) > 0.5) return; // ignore click during fast drag
        if (e.target.closest('.btn-wheel-action')) return; // allow clicking CTA
        this.rotateToIndex(index);
      });
    });

    // Pointer (Mouse / Touch) Drag Events
    if (this.scene) {
      this.scene.addEventListener('pointerdown', (e) => this.onPointerDown(e));
      window.addEventListener('pointermove', (e) => this.onPointerMove(e));
      window.addEventListener('pointerup', () => this.onPointerUp());
      window.addEventListener('pointercancel', () => this.onPointerUp());

      this.scene.addEventListener('mouseenter', () => { this.isHovered = true; });
      this.scene.addEventListener('mouseleave', () => { this.isHovered = false; });
    }
  }

  rotateToIndex(index) {
    // Calculate shortest rotation to bring index to 0 deg front
    const currentNorm = ((-this.targetRotation % 360) + 360) % 360;
    const targetAngle = index * this.angleStep;
    let diff = targetAngle - currentNorm;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    this.targetRotation -= diff;
  }

  snapToStep() {
    this.targetRotation = Math.round(this.targetRotation / this.angleStep) * this.angleStep;
  }

  onPointerDown(e) {
    this.isDragging = true;
    this.startX = e.clientX;
    this.lastX = e.clientX;
    this.startRotation = this.targetRotation;
    this.lastTime = performance.now();
    this.velocity = 0;
    if (this.scene) this.scene.classList.add('grabbing');
  }

  onPointerMove(e) {
    if (!this.isDragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - this.lastTime);
    const deltaX = e.clientX - this.lastX;
    
    // Sensitivity factor
    this.velocity = (deltaX / dt) * 15;
    this.targetRotation += deltaX * 0.35;

    this.lastX = e.clientX;
    this.lastTime = now;
  }

  onPointerUp() {
    if (!this.isDragging) return;
    this.isDragging = false;
    if (this.scene) this.scene.classList.remove('grabbing');

    // Apply inertia and snap to nearest card
    this.targetRotation += this.velocity * 2.5;
    this.snapToStep();
  }

  updateCardsVisuals(currentRot) {
    let closestIndex = 0;
    let minDiff = 999;

    this.cards.forEach((card, i) => {
      const baseAngle = i * this.angleStep;
      // Calculate angular position relative to front viewer (0 deg)
      let relativeAngle = ((baseAngle + currentRot) % 360 + 540) % 360 - 180; // -180 to 180
      const absAngle = Math.abs(relativeAngle);

      if (absAngle < minDiff) {
        minDiff = absAngle;
        closestIndex = i;
      }

      // Depth calculations: front card (0 deg) is 1.0, back card (180 deg) is 0.25
      const cosVal = (Math.cos(relativeAngle * (Math.PI / 180)) + 1) / 2; // 0 to 1
      const opacity = 0.22 + 0.78 * Math.pow(cosVal, 1.3);
      const scale = 0.82 + 0.24 * cosVal;
      const blur = (1 - cosVal) * 5; // px

      card.style.opacity = opacity.toFixed(3);
      card.style.filter = `blur(${blur.toFixed(1)}px)`;
      card.style.transform = `rotateY(${baseAngle}deg) translateZ(${this.radius}px) scale(${scale.toFixed(3)})`;
      
      const isCenter = absAngle < 28;
      card.classList.toggle('active-center', isCenter);
    });

    // Update pagination dots
    this.dots.forEach((dot, idx) => {
      const isActive = idx === closestIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-current', String(isActive));
    });
  }

  startLoop() {
    const loop = () => {
      if (!this.isDragging) {
        if (!this.isHovered && Math.abs(this.velocity) < 0.05) {
          // Slow continuous rotation when idle
          this.targetRotation -= this.autoRotateSpeed;
        }
      }

      // Smooth damping lerp to target
      const lerpFactor = this.isDragging ? 0.35 : 0.085;
      this.currentRotation += (this.targetRotation - this.currentRotation) * lerpFactor;
      this.cylinder.style.transform = `rotateY(${this.currentRotation}deg)`;

      this.updateCardsVisuals(this.currentRotation);

      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.solarHero = new SolarHeroController();
  window.servicesWheel = new ServicesWheel3D();
});
