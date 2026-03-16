<script>
  import { onMount } from 'svelte';
  import { getT } from '$lib/i18n.js';

  let T = {};
  let booting = true;
  let bootProgress = 0;
  let bootLines = [];
  let visible = false;
  let glitchTitle = false;
  let activeWindow = 'about';

  const BOOT_MESSAGES_NL = [
    'MILAN OS v2.6 initialiseren...',
    'RAM controleren: 640K gevonden. Meer dan genoeg.',
    'I/O-apparaten detecteren...',
    'Netwerk: ✓',
    'Koffiemodule: ✓',
    'Curiositeitsdriver: ✓',
    'Welkom, gebruiker.',
  ];
  const BOOT_MESSAGES_EN = [
    'Initializing MILAN OS v2.6...',
    'Checking RAM: 640K found. More than enough.',
    'Detecting I/O devices...',
    'Network: ✓',
    'Coffee module: ✓',
    'Curiosity driver: ✓',
    'Welcome, user.',
  ];

  const skills = [
    { name: 'Linux / Bash',   pct: 88 },
    { name: 'Docker',         pct: 82 },
    { name: 'Svelte / JS',    pct: 78 },
    { name: 'Proxmox',        pct: 75 },
    { name: 'Node.js',        pct: 72 },
    { name: 'IoT / Hardware', pct: 65 },
  ];

  // Projects placeholder — hidden until Milan fills them in
  const projects = []; // add { title, desc, url, tags[] } objects here

  onMount(async () => {
    T = getT();
    const isNL = (navigator.language || '').toLowerCase().startsWith('nl');
    const msgs = isNL ? BOOT_MESSAGES_NL : BOOT_MESSAGES_EN;

    for (let i = 0; i < msgs.length; i++) {
      await sleep(320 + Math.random() * 200);
      bootLines = [...bootLines, msgs[i]];
      bootProgress = Math.round(((i + 1) / msgs.length) * 100);
    }

    await sleep(500);
    booting = false;
    await sleep(80);
    visible = true;

    setInterval(() => {
      glitchTitle = true;
      setTimeout(() => (glitchTitle = false), 600);
    }, 6000);
  });

  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  function setWindow(w) {
    activeWindow = w;
  }
</script>

{#if booting}
  <div class="boot-screen">
    <pre class="boot-logo">
 __  __ _ _
|  \/  (_) |__ _ _ _
| |\/| | | / _` | ' \
|_|  |_|_|_\__,_|_||_|
    </pre>
    <div class="boot-lines">
      {#each bootLines as line}
        <div class="boot-line">› {line}</div>
      {/each}
      <span class="blink">█</span>
    </div>
    <div class="boot-bar-wrap">
      <div class="boot-bar" style="width:{bootProgress}%"></div>
    </div>
    <div class="boot-pct">{bootProgress}%</div>
  </div>
{/if}

{#if !booting}
  <div class="desktop" class:visible>

    <div class="taskbar">
      <button class="start-btn btn95">
        <img src="https://avatars.githubusercontent.com/u/67167142?v=4"
             alt="Milan" width="16" height="16"
             style="border-radius:2px; image-rendering:pixelated;" />
        Start
      </button>
      <div class="taskbar-mid">
        {#each ['about','skills','projects','contact'] as tab}
          <button
            class="taskbar-tab btn95"
            class:active={activeWindow === tab}
            on:click={() => setWindow(tab)}
          >
            {#if tab === 'about'}📋{/if}
            {#if tab === 'skills'}⚙️{/if}
            {#if tab === 'projects'}💾{/if}
            {#if tab === 'contact'}📡{/if}
            {T['about_title'] && tab === 'about' ? T.about_title : ''}
            {T['skills_title'] && tab === 'skills' ? T.skills_title : ''}
            {T['projects_title'] && tab === 'projects' ? T.projects_title : ''}
            {T['contact_title'] && tab === 'contact' ? T.contact_title : ''}
          </button>
        {/each}
      </div>
      <div class="taskbar-clock">
        {new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}
      </div>
    </div>

    <div class="marquee-wrap">
      <div class="marquee-inner">
        ★ MILAN DEWAELE ★ MILAN OS v2.6 ★ IoT STUDENT ★ TECH NERD ★ DAMME, BE ★ ALLES EENS GEPROBEERD ★ &nbsp;&nbsp;
        ★ MILAN DEWAELE ★ MILAN OS v2.6 ★ IoT STUDENT ★ TECH NERD ★ DAMME, BE ★ ALLES EENS GEPROBEERD ★
      </div>
    </div>

    <div class="hero-window win95">
      <div class="titlebar">
        <span>📁 Milan Dewaele — {T.welcome}</span>
        <div class="titlebar-btns">
          <div class="titlebar-btn">_</div>
          <div class="titlebar-btn">□</div>
          <div class="titlebar-btn">✕</div>
        </div>
      </div>
      <div class="win-content hero-content">
        <div class="hero-avatar-wrap">
          <img
            src="https://avatars.githubusercontent.com/u/67167142?v=4"
            alt="Milan Dewaele"
            class="hero-avatar"
          />
          <div class="avatar-glow"></div>
        </div>
        <div class="hero-text">
          <h1 class:glitch={glitchTitle} data-text="Milan Dewaele">Milan Dewaele</h1>
          <p class="tagline">{T.tagline}</p>
          <div class="hero-badges">
            <span class="badge">IoT</span>
            <span class="badge">Linux</span>
            <span class="badge">Docker</span>
            <span class="badge">Svelte</span>
            <span class="badge">Node.js</span>
          </div>
        </div>
      </div>
    </div>

    <div class="windows-grid">

      {#if activeWindow === 'about'}
        <div class="content-window win95 anim-in">
          <div class="titlebar">
            <span>📋 {T.about_title}</span>
            <div class="titlebar-btns">
              <div class="titlebar-btn">_</div>
              <div class="titlebar-btn">□</div>
              <div class="titlebar-btn" on:click={() => setWindow('')}>✕</div>
            </div>
          </div>
          <div class="win-content">
            <p class="about-text">{T.about_text}</p>
            <div class="about-stats">
              <div class="stat-box win95">
                <span class="stat-num">11+</span>
                <span class="stat-label">Public repos</span>
              </div>
              <div class="stat-box win95">
                <span class="stat-num">27+</span>
                <span class="stat-label">Total projecten</span>
              </div>
              <div class="stat-box win95">
                <span class="stat-num">∞</span>
                <span class="stat-label">Ideeën</span>
              </div>
            </div>
          </div>
        </div>
      {/if}

      {#if activeWindow === 'skills'}
        <div class="content-window win95 anim-in">
          <div class="titlebar">
            <span>⚙️ {T.skills_title}</span>
            <div class="titlebar-btns">
              <div class="titlebar-btn">_</div>
              <div class="titlebar-btn">□</div>
              <div class="titlebar-btn" on:click={() => setWindow('')}>✕</div>
            </div>
          </div>
          <div class="win-content">
            {#each skills as s, i}
              <div class="skill-row" style="animation-delay:{i * 80}ms">
                <span class="skill-name">{s.name}</span>
                <div class="skill-bar-bg win95">
                  <div
                    class="skill-bar-fill"
                    style="--target-w:{s.pct}%; animation-delay:{i * 80 + 200}ms"
                  ></div>
                </div>
                <span class="skill-pct">{s.pct}%</span>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      {#if activeWindow === 'projects'}
        <div class="content-window win95 anim-in">
          <div class="titlebar">
            <span>💾 {T.projects_title}</span>
            <div class="titlebar-btns">
              <div class="titlebar-btn">_</div>
              <div class="titlebar-btn">□</div>
              <div class="titlebar-btn" on:click={() => setWindow('')}>✕</div>
            </div>
          </div>
          <div class="win-content">
            {#if projects.length === 0}
              <p class="projects-soon">{T.projects_soon} <span class="blink">█</span></p>
            {:else}
              <div class="projects-grid">
                {#each projects as p}
                  <a href={p.url} target="_blank" rel="noopener" class="project-card win95">
                    <div class="project-title">{p.title}</div>
                    <p class="project-desc">{p.desc}</p>
                    <div class="project-tags">
                      {#each p.tags as tag}
                        <span class="badge">{tag}</span>
                      {/each}
                    </div>
                  </a>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      {/if}

      {#if activeWindow === 'contact'}
        <div class="content-window win95 anim-in">
          <div class="titlebar">
            <span>📡 {T.contact_title}</span>
            <div class="titlebar-btns">
              <div class="titlebar-btn">_</div>
              <div class="titlebar-btn">□</div>
              <div class="titlebar-btn" on:click={() => setWindow('')}>✕</div>
            </div>
          </div>
          <div class="win-content contact-links">
            <a href="https://github.com/milanwdewaele" target="_blank" rel="noopener" class="btn95 contact-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              {T.github}
            </a>
            <a href="https://www.instagram.com/milanwdewaele" target="_blank" rel="noopener" class="btn95 contact-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.31.975.976 1.248 2.243 1.31 3.609.058 1.265.069 1.645.069 4.849s-.011 3.584-.069 4.849c-.062 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.069-4.85.069s-3.584-.011-4.849-.069c-1.366-.062-2.633-.335-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.335-2.633 1.31-3.608C4.518 2.499 5.785 2.225 7.151 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
              {T.instagram}
            </a>
          </div>
        </div>
      {/if}

    </div>
  </div>
{/if}

<style>
.boot-screen {
  position: fixed;
  inset: 0;
  background: #000;
  color: #00ff41;
  font-family: 'Share Tech Mono', monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 1000;
}

.boot-logo {
  font-size: clamp(10px, 2vw, 16px);
  color: #00ff41;
  text-shadow: 0 0 10px #00ff41;
  line-height: 1.2;
}

.boot-lines {
  font-size: 13px;
  text-align: left;
  width: min(480px, 90vw);
  min-height: 120px;
}

.boot-line {
  animation: floatUp 0.2s ease both;
}

.boot-bar-wrap {
  width: min(480px, 90vw);
  height: 16px;
  border: 2px solid #00ff41;
  background: #001a00;
}

.boot-bar {
  height: 100%;
  background: #00ff41;
  transition: width 0.3s ease;
  box-shadow: 0 0 8px #00ff41;
}

.boot-pct {
  font-size: 13px;
  color: #00ff41;
}

.desktop {
  min-height: 100vh;
  padding: 8px 12px 70px;
  opacity: 0;
  transform: scale(0.98);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.desktop.visible {
  opacity: 1;
  transform: scale(1);
}

.taskbar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 36px;
  background: var(--win-bg);
  border-top: 2px solid var(--win-border-light);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 6px;
  z-index: 100;
  box-shadow: 0 -1px 0 var(--win-border-darker);
}

.start-btn {
  font-weight: bold;
  white-space: nowrap;
}

.taskbar-mid {
  flex: 1;
  display: flex;
  gap: 4px;
  overflow-x: auto;
}

.taskbar-tab {
  font-size: 12px;
  white-space: nowrap;
}

.taskbar-tab.active {
  border-top: 2px solid var(--win-border-darker);
  border-left: 2px solid var(--win-border-darker);
  border-right: 2px solid var(--win-border-light);
  border-bottom: 2px solid var(--win-border-light);
  background: #b0b0b0;
}

.taskbar-clock {
  font-family: var(--font-main);
  font-size: 12px;
  padding: 2px 8px;
  border: 1px inset #808080;
  white-space: nowrap;
}

.marquee-wrap {
  overflow: hidden;
  background: var(--titlebar-bg);
  color: #fff;
  font-family: var(--font-display);
  font-size: 18px;
  padding: 4px 0;
  margin-bottom: 10px;
  letter-spacing: 2px;
  border-top: 2px solid var(--win-border-light);
  border-bottom: 2px solid var(--win-border-darker);
}

.marquee-inner {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 22s linear infinite;
}

.hero-window {
  margin-bottom: 10px;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.hero-avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.hero-avatar {
  width: 90px;
  height: 90px;
  border: 4px solid var(--win-border-darker);
  image-rendering: pixelated;
  display: block;
  animation: shake 8s ease-in-out infinite;
}

.avatar-glow {
  position: absolute;
  inset: -6px;
  border: 2px dashed var(--accent);
  animation: spin 12s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.hero-text h1 {
  font-family: var(--font-display);
  font-size: clamp(32px, 6vw, 56px);
  color: var(--accent);
  line-height: 1;
  position: relative;
  letter-spacing: 2px;
}

.hero-text h1.glitch::before,
.hero-text h1.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  width: 100%;
}

.hero-text h1.glitch::before {
  color: #ff0000;
  animation: glitch 0.5s steps(1) forwards;
  z-index: 1;
}

.hero-text h1.glitch::after {
  color: #00ffff;
  animation: glitch 0.5s steps(1) 0.05s forwards;
  z-index: 2;
}

.tagline {
  font-family: var(--font-main);
  font-size: 13px;
  margin: 6px 0 10px;
  color: #333;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.badge {
  background: var(--accent);
  color: #fff;
  font-family: var(--font-main);
  font-size: 11px;
  padding: 2px 8px;
  border: 1px solid #000;
  letter-spacing: 1px;
}

.windows-grid {
  display: grid;
  gap: 10px;
}

.content-window {
  animation: floatUp 0.3s ease both;
}

.anim-in {
  animation: floatUp 0.25s ease both;
}

.about-text {
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 14px;
}

.about-stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.stat-box {
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 90px;
}

.stat-num {
  font-family: var(--font-display);
  font-size: 32px;
  color: var(--accent);
  line-height: 1;
}

.stat-label {
  font-size: 10px;
  text-align: center;
  margin-top: 2px;
}

.skill-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  animation: floatUp 0.3s ease both;
}

.skill-name {
  font-size: 12px;
  width: 120px;
  flex-shrink: 0;
}

.skill-bar-bg {
  flex: 1;
  height: 16px;
  overflow: hidden;
  background: #fff;
}

.skill-bar-fill {
  height: 100%;
  background: var(--accent);
  width: 0%;
  animation: fillBar 1s ease forwards;
}

.skill-pct {
  font-size: 12px;
  width: 36px;
  text-align: right;
}

.projects-soon {
  font-family: var(--font-display);
  font-size: 22px;
  color: var(--accent);
  padding: 20px 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
}

.project-card {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s;
}

.project-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--accent);
}

.project-title {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--accent);
  margin-bottom: 4px;
}

.project-desc {
  font-size: 12px;
  margin-bottom: 8px;
  line-height: 1.4;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.contact-btn {
  text-decoration: none;
  font-size: 13px;
  padding: 8px 16px;
}

@media (max-width: 500px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  .hero-badges { justify-content: center; }
  .about-stats { justify-content: center; }
  .skill-name { width: 80px; font-size: 11px; }
}
</style>
