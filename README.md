# 🛰️ Emmanuel Oyewole — Systems Engineering & AI Architecture Portfolio

> **High-Performance Multi-Page Showcase**: Autonomous Aerospace Command & Control (**Project SERAPH**) and Air-Gapped On-Device Edge AI Intelligence (**Project ELYRA**).

[![Status](https://img.shields.io/badge/Status-Production%20Ready-00e5ff?style=flat-square)](#)
[![Zero Build Tools](https://img.shields.io/badge/Architecture-Zero%20Build%20Step%20%7C%20Self--Contained-22c55e?style=flat-square)](#)
[![Live Preview](https://img.shields.io/badge/Local%20Server-Port%208080-blue?style=flat-square)](#)
[![Sync](https://img.shields.io/badge/Multi--Target-Dual%20Directory%20Synchronized-purple?style=flat-square)](#)

---

## 📌 Executive Summary for Incoming AI Agents

This repository houses the professional engineering portfolio of **Emmanuel Oyewole**, Systems Architect and Autonomous Software Engineer. The portfolio is engineered to pitch and demonstrate mastery in **aerospace command and control (C2)**, **applied orbital mechanics (SGP4/SDP4)**, **resilient distributed systems**, and **quantized edge AI computing**.

The site is built across three primary, highly optimized, self-contained web experiences designed for instant deployment on GitHub Pages without bundler or transpile steps:

1. **[`index.html`](file:///C:/Users/Archangel/.gemini/antigravity/scratch/freshstart2066-create.github.io/index.html)** — **Cinematic Landing Gateway**: High-impact portal introducing Emmanuel Oyewole, featuring dual planetary switching between SERAPH and ELYRA with dynamic background video streaming and responsive typography.
2. **[`project-seraph.html`](file:///C:/Users/Archangel/.gemini/antigravity/scratch/freshstart2066-create.github.io/project-seraph.html)** — **Project SERAPH (Flagship Space C2 Experience)**: Single-page immersive "Planet Jumping" experience with a canvas-driven 3D parallax portal, pointer tilt physics, video preloader sequence, logo flight docking, and an in-depth **Architectural Briefing & Telemetry HUD Drawer** ("The Biggest Pitch").
3. **[`main.html`](file:///C:/Users/Archangel/.gemini/antigravity/scratch/freshstart2066-create.github.io/main.html)** — **Project ELYRA (Autonomous Edge AI Command Center)**: Dedicated entirely to Project ELYRA, featuring 5 interactive subsystem avatars, live $z$-score hardware telemetry triage simulator, quantized local LLM router benchmarks, 2,048-token sliding memory buffer, and a `Cmd+K` diagnostic command palette.

---

## 🧭 Project Architecture & Directory Map

```
scratch/
├── freshstart2066-create.github.io/    # PRIMARY PRODUCTION GITHUB PAGES ROOT
│   ├── index.html                      # Landing Gateway & Project Switcher
│   ├── project-seraph.html             # Project SERAPH (Planet Jumping 3D C2 Portal)
│   ├── main.html                       # Project ELYRA (Autonomous Edge AI Command Center)
│   ├── .nojekyll                       # Prevents GitHub Pages Jekyll preprocessing
│   └── README.md                       # This document
│
├── portfolio-v3/                       # MIRROR WORKSPACE
│   ├── index.html                      # Synchronized with freshstart2066 root
│   ├── project-seraph.html             # Synchronized with freshstart2066 root
│   ├── main.html                       # Synchronized with freshstart2066 root
│   └── README.md                       # Synchronized with freshstart2066 root
│
├── build_seraph_page.py                # Automated Generator for project-seraph.html
├── audit_buttons.py                    # Automated Interactivity & Button Audit Script
└── README.md                           # Scratch root documentation
```

> [!IMPORTANT]
> **Dual-Directory Synchronization Contract**:
> Whenever you modify `index.html`, `main.html`, or `project-seraph.html`, **both** `freshstart2066-create.github.io/` and `portfolio-v3/` must remain bit-for-bit identical. Use [`build_seraph_page.py`](file:///C:/Users/Archangel/.gemini/antigravity/scratch/build_seraph_page.py) to generate and sync `project-seraph.html` to both targets automatically.

---

## 🌌 Flagship 1: Project SERAPH (`project-seraph.html`)

### 1. Vision & Architectural Pitch
**SERAPH** (*Spacecraft Ephemeris Real-Time Autonomous Propagation & Hazard-Avoidance*) represents an autonomous aerospace C2 platform designed for sovereign satellite constellations, space traffic management (STM), and interplanetary communications.

### 2. Core Technical Pillars
- **SGP4/SDP4 Analytical Orbital Propagation**:
  - Continuous trajectory computation for $100,000+$ resident space objects (RSOs).
  - WGS-84 gravitational constants, Earth oblateness zonal harmonics ($J_2, J_3, J_4$), atmospheric drag decay (Jacchia-Roberts model), and third-body lunisolar perturbations with SIMD vectorization.
- **Conjunction Assessment & Automated Avoidance Matrix**:
  - Ingests two-line element (TLE) catalogs and Orbit Ephemeris Messages (OEM).
  - 3D covariance ellipsoid projection across Radial, In-Track, and Cross-Track ($R, T, N$) frames.
  - Autonomous collision hazard screening with an avoidance maneuver floor of $P_c < 10^{-4}$, computing impulsive $\Delta v$ thrust vectors.
- **Interplanetary Delay-Tolerant Telemetry Mesh**:
  - Relativistic Doppler shift compensation and delay-tolerant networking (DTN) handling 4 to 20 minute light-time transmission latencies over Mars-Earth-Venus links.
  - CCSDS Space Packet Protocol streaming over Ka-band DSN carriers and Optical Inter-Satellite Laser links (OISL).

### 3. Visual & Interactive Implementation
- **3D Canvas "Window" Portal**: 44-point perspective-projected rounded rectangle drawn onto an HTML5 `<canvas>` at 60 FPS, with dynamic pointer tilt ($\text{rotX} \approx \pm 16.5^\circ$, $\text{rotY} \approx \pm 18.7^\circ$).
- **Video Preloader**: Sequential Mars transit video with percentage counter ($0 \rightarrow 100\%$) and an SVG logo that ascends into the navigation bar via cubic bezier easing.
- **Interplanetary State Transitions**: Smooth camera zooms and video transitions chaining `Mars` $\rightarrow$ `Earth` $\rightarrow$ `Venus` at $1.3\times$ speed.
- **Sidebar Planet Jump List**: All 8 solar system planets (`Mercury`, `Venus`, `Earth`, `Mars`, `Jupiter`, `Saturn`, `Uranus`, `Neptune`) are interactive via click or keyboard (`Enter`/`Space`), with HUD toast feedback.
- **Pitch Drawer (`#seraph-modal`)**: Modal sheet displaying live telemetry figures:
  - *Orbital Velocity*: `7.66 km/s` (LEO Nominal Vector)
  - *Apogee / Perigee*: `540 × 525 km` (Circularity: 99.8%)
  - *Conjunction Risk ($P_c$)*: `2.1 × 10⁻⁷` (Avoidance floor $< 10^{-4}$)
  - *DSN Link Margin*: `+14.2 dB` (Ka-Band Carrier Lock)

### 4. Remote CDN Assets (Do Not Modify / Substitute)
```javascript
BASE = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P";
MARS_BG   = `${BASE}/3c83091e-4046-4fd6-adbb-2edb728be79a.mp4`;
TO_EARTH  = `${BASE}/fc3ded42-e845-41f3-a830-5cab512d79cd.mp4`;
TO_VENUS  = `${BASE}/b30f64d9-1637-477a-83df-d0fc6461a422.mp4`;
TO_MARS   = `${BASE}/5fc5651c-3b5d-4171-b507-87f7e635d1b4.mp4`;
MERCURY   = `${BASE}/d6fb8b6b-c15e-4aaa-9cf7-45bbb5e33372.jpg`;
LOGO      = `${BASE}/eb7e0f53-50cd-4af5-abc4-8b9a52cdc01b.svg`;
```

---

## ⚡ Flagship 2: Project ELYRA (`main.html`)

### 1. Vision & Architecture
**ELYRA** is a private, air-gapped on-device Edge AI Companion designed for tactical Android devices, field terminals, and embedded edge nodes operating under constrained power and zero cloud connectivity.

### 2. Core Technical Pillars
- **Local Quantized Model Router**:
  - Dynamically routes prompts between **Qwen 2.5 3B** (`Q4_K_M`, ~28.4 tok/s) and **Llama 3.2 1B** (`Q8_0`, ~42.1 tok/s).
  - Operates strictly under a 2.0 GB memory ceiling on ARM64 / Snapdragon mobile chipsets.
- **Sliding-Window Memory Buffer**:
  - Fixed 2,048-token context window with pinned system instructions and strict FIFO turn eviction to prevent mobile OOM crashes.
- **Real-Time Sensor Telemetry & Anomaly Engine**:
  - High-frequency sampling of CPU load, RAM allocation, battery temperature, and network round-trip time.
  - Rolling $z$-score calculation flags sensor anomalies before thermal throttling or link degradation occurs.
- **Autonomous Tool Registry**:
  - Deterministic JSON-schema based tool execution for offline device control, offline geofencing, and tactical hardware queries.
- **Native Android APK Deployment**:
  - Compiled using React Native and Expo SDK 51 with hermes engine optimizations for standalone offline APK packaging.

### 3. Interactive Features
- **5 Subsystem Avatars**: Interactive gallery that alters stage CSS variables (`--hero-hue`, `--hero-sat`) and opens specialized drawers.
- **Action Dock (5 Buttons)**: Quick triggers for *Pipeline*, *Telemetry*, *Models*, *APK Build*, and *Terminal*.
- **Live Device Triage Simulator**: Button (`⚡ Run Live Device Triage`) generates simulated real-time metric samples and refreshes animated gauge bars and log consoles.
- **Web Audio Pulse Synthesizer**: Synthesizes authentic tactical audio chirps and sensor pulses (880 Hz / 587 Hz) via Web Audio API oscillators.
- **Diagnostic Command Terminal (`Cmd+K`)**: Interactive CLI terminal supporting commands: `triage`, `models`, `memory`, `apk`, `arch`, `specs`, `help`, `clear`.

---

## 🌐 Gateway: Landing Page (`index.html`)

- **Interactive Carousel Switching**: Alternates smoothly between Project SERAPH and Project ELYRA.
- **Dynamic CTA**: Automatically updates text and destination (`EXPLORE SERAPH` $\rightarrow$ `project-seraph.html` or `ENTER ELYRA AI` $\rightarrow$ `main.html`).
- **Responsive Layout Formulas**: Mathematical clamp formulas (`--u`, `--vshift`) ensure pixel-perfect rendering across small mobile screens, tablets, and widescreen 4K displays.
- **Accessible Navigation**: Keyboard-accessible hamburger drawer, skip navigation, and focus trapping.

---

## 🛠️ Verification & Quality Assurance Suite

We have instituted rigorous automated audits to ensure that the site never regresses. Incoming agents should run these tools before committing any changes.

### 1. Button & Interactivity Audit
Run the automated button audit script:
```powershell
python audit_buttons.py
```
**Expected Output**:
- `index.html`: 4 buttons + 8 links — **All OK**
- `main.html`: 31 buttons + 15 links — **All OK**
- `project-seraph.html`: 5 buttons + 7 links + 8 planet items — **All OK**
- **0 Dead links (`#` without event handlers)**.

### 2. JavaScript Syntax Validation
Verify that embedded scripts in `project-seraph.html` and `main.html` pass syntax checking without errors:
```powershell
python -c "
import subprocess, tempfile, os, re
for name in ['project-seraph.html', 'main.html']:
    c = open(f'freshstart2066-create.github.io\\{name}', encoding='utf-8').read()
    scripts = re.findall(r'<script>(.*?)</script>', c, re.DOTALL)
    for i, s in enumerate(scripts):
        with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as f:
            f.write(s)
            tmp = f.name
        try:
            res = subprocess.run(['node', '--check', tmp], capture_output=True, text=True)
            assert res.returncode == 0, f'{name} script {i} error: {res.stderr}'
            print(f'{name} script #{i+1}: Syntax OK')
        finally:
            os.remove(tmp)
"
```

### 3. Local Development Server
To serve the site locally:
```powershell
python -m http.server 8080 --directory "freshstart2066-create.github.io"
```
Endpoints:
- Landing Gateway: `http://localhost:8080/index.html`
- Project SERAPH: `http://localhost:8080/project-seraph.html`
  - Direct modal link: `http://localhost:8080/project-seraph.html?skip_preload=1&modal=1`
- Project ELYRA: `http://localhost:8080/main.html`

---

## 📋 Strict Guidelines for Future AI Agents

When working on this codebase, you **MUST** adhere to the following rules:

1. **Self-Contained Architecture (No Build Dependencies)**:
   - Do NOT add Webpack, Vite, Parcel, Babel, Tailwind, or complex npm build pipelines to the production pages (`freshstart2066-create.github.io`).
   - All styles and logic must remain self-contained inline `<style>` and `<script>` blocks so they run natively in any modern browser and GitHub Pages without CI/CD build failures.
2. **Preserve Exact Asset URLs**:
   - Remote CloudFront video and SVG assets are immutable. Do not alter their filenames, hashes, or CDN domain.
3. **Typography & Layout Integrity**:
   - SF Pro, Aalto, and JetBrains Mono are the signature typography stacks. Maintain proportional leading, tracking, and letter-spacing.
   - Avoid overlapping elements (`margin-left: 48px` on `.project-badge` prevents collision with the docked logo).
4. **All Buttons Must Be Functional**:
   - Every `<button>` or `<a>` must either perform an interactive action (open a panel, trigger an animation, play audio) or route to a valid URL.
   - Never leave unattached buttons or empty `href="#"` dead ends.
5. **Mirror Synchronization**:
   - Every change made in `freshstart2066-create.github.io/` must also be mirrored in `portfolio-v3/`. If modifying `project-seraph.html`, update [`build_seraph_page.py`](file:///C:/Users/Archangel/.gemini/antigravity/scratch/build_seraph_page.py) and execute it.
6. **No Placeholder Words**:
   - Keep all technical descriptions authentic to aerospace C2 and edge AI systems. Never inject generic placeholder lorem ipsum.

---

## 🚀 Roadmap & High-Priority Next Tasks

For AI agents taking over this repository, here are recommended enhancements to explore:

- [ ] **Live SGP4 Satellite Integration**: Integrate a lightweight, vanilla WebAssembly or pure JS SGP4 propagator to calculate real-time ISS / Starlink coordinates in `project-seraph.html`.
- [ ] **Interactive 3D Orbit Canvas**: Expand the 3D portal in `project-seraph.html` with a Three.js / WebGL toggle showing orbital inclination ($i$), eccentricity ($e$), and true anomaly ($\nu$).
- [ ] **Deep Space Phase 2 Planets**: Add animated transition videos and fact sheets for Jupiter and Saturn in `project-seraph.html`.
- [ ] **WebAssembly LLM Inference Demo**: In `main.html`, explore an optional in-browser ONNX Runtime / WebGPU micro-model demo for local text generation in the ELYRA terminal.
- [ ] **PWA Offline Manifest**: Add a service worker (`sw.js`) and `manifest.json` for full air-gapped offline caching of the entire portfolio.

---

**Maintained by Emmanuel Oyewole**  
*Aerospace C2, Applied Cryptography, Edge AI, and Resilient Distributed Systems.*
