<script>
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { getT } from '$lib/i18n.js';

  let T = {};
  let booting = true;
  let bootProgress = 0;
  let bootLines = [];
  let visible = false;
  let glitchTitle = false;
  let activeSection = 'about';
  let prevSection = 'about';

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

  const projects = [];

  const whatIDo = [
    {
      icon: '🖥️',
      title: 'Systems & Infra',
      desc: 'Linux servers, Proxmox, LXC containers en self-hosted diensten. Als het draait, optimaliseer ik het.'
    },
    {
      icon: '🔧',
      title: 'IoT & Hardware',
      desc: 'Van sensor tot dashboard. Microcontrollers, protocollen en alles daartussen.'
    },
    {
      icon: '💻',
      title: 'Dev & Automatisering',
      desc: 'Node.js bots, Svelte frontends, bash scripts. Repetitief werk hoort geautomatiseerd te worden.'
    },
  ];

  onMount(async () => {
    T = getT();
    const isNL = (navigator.language || '').toLowerCase().startsWith('nl');
    const msgs = isNL ? BOOT_MESSAGES_NL : BOOT_MESSAGES_EN;
    for (let i = 0; i < msgs.length; i++) {
      await sleep(260 + Math.random() * 160);
      bootLines = [...bootLines, msgs[i]];
      bootProgress = Math.round(((i + 1) / msgs.length) * 100);
    }
    await sleep(400);
    booting = false;
    await sleep(60);
    visible = true;
    setInterval(() => {
      glitchTitle = true;
      setTimeout(() => (glitchTitle = false), 600);
    }, 7000);
  });

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
  function setSection(s) { prevSection = activeSection; activeSection = s; }
</script>

{#if booting}
  <div class="boot" transition:fade={{ duration: 300 }}>
    <pre class="boot-logo">
 __  __ _ _
|  \/  (_) |__ _ _ _
| |\/| | | / _` | ' \
|_|  |_|_|_\__,_|_||_|
    </pre>
    <div class="boot-lines">
      {#each bootLines as line (line)}
        <div class="boot-line" in:fly={{ y: 10, duration: 200 }}>› {line}</div>
      {/each}
      <span class="blink">█</span>
    </div>
    <div class="boot-bar-outer">
      <div class="boot-bar-inner" style="width:{bootProgress}%"></div>
    </div>
    <div class="boot-pct">{bootProgress}%</div>
  </div>
{/if}

{#if !booting}
  <div class="site" class:visible>

    <!-- NAV -->
    <nav in:fly={{ y: -20, duration: 400, delay: 100 }}>
      <span class="nav-logo">MD</span>
      <div class="nav-links">
        {#each ['about','skills','projects','contact'] as s}
          <button
            class="nav-btn"
            class:active={activeSection === s}
            on:click={() => setSection(s)}
          >{s.toUpperCase()}</button>
        {/each}
      </div>
    </nav>

    <!-- HERO -->
    <header class="hero">
      <div class="hero-left" in:fly={{ x: -40, duration: 500, delay: 200 }}>
        <p class="hero-eyebrow">// IoT STUDENT — GENT, OOST-VLAANDEREN</p>
        <h1 class:glitch={glitchTitle} data-text="Milan Dewaele">Milan<br>Dewaele</h1>
        <p class="hero-sub">{T.tagline}</p>
        <button class="btn hero-cta" on:click={() => setSection('about')}>Meer over mij →</button>
      </div>
      <div class="hero-right" in:fly={{ x: 40, duration: 500, delay: 300 }}>
        <div class="avatar-frame">
          <img
            src="https://avatars.githubusercontent.com/u/67167142?v=4"
            alt="Milan Dewaele"
            class="avatar"
          />
        </div>
      </div>
    </header>

    <!-- HIGHLIGHT BAR -->
    <div class="highlight-bar" in:fly={{ y: 20, duration: 400, delay: 400 }}>
      <div class="highlight-item">
        <span class="hl-num">11+</span>
        <span class="hl-label">GitHub repos</span>
      </div>
      <div class="hl-divider"></div>
      <div class="highlight-item">
        <span class="hl-num">24/7</span>
        <span class="hl-label">Self-hosted infra</span>
      </div>
      <div class="hl-divider"></div>
      <div class="highlight-item">
        <span class="hl-num">IoT</span>
        <span class="hl-label">Student @ Gent</span>
      </div>
      <div class="hl-divider"></div>
      <div class="highlight-item">
        <span class="hl-num">∞</span>
        <span class="hl-label">Ideeën</span>
      </div>
    </div>

    <!-- WAT IK DOE -->
    <div class="wat-ik-doe" in:fly={{ y: 24, duration: 400, delay: 500 }}>
      <div class="wid-header">WAT IK DOE</div>
      <div class="wid-grid">
        {#each whatIDo as item, i}
          <div class="wid-card panel" in:fly={{ y: 20, duration: 300, delay: 600 + i * 100 }}>
            <span class="wid-icon">{item.icon}</span>
            <div class="wid-title">{item.title}</div>
            <p class="wid-desc">{item.desc}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- CONTENT -->
    <main>

      {#if activeSection === 'about'}
        <section class="section" in:fly={{ y: 24, duration: 300 }} out:fade={{ duration: 150 }}>
          <div class="section-label">01 — OVER MIJ</div>
          <p class="body-text">{T.about_text}</p>
          <div class="stats-row">
            {#each [{num:'11+',label:'Public repos'},{num:'27+',label:'Total projecten'},{num:'∞',label:'Ideeën'}] as s, i}
              <div class="stat panel" in:fly={{ y: 16, duration: 260, delay: i * 80 }}>
                <span class="stat-num">{s.num}</span>
                <span class="stat-label">{s.label}</span>
              </div>
            {/each}
          </div>
        </section>
      {/if}

      {#if activeSection === 'skills'}
        <section class="section" in:fly={{ y: 24, duration: 300 }} out:fade={{ duration: 150 }}>
          <div class="section-label">02 — SKILLS</div>
          {#each skills as s, i}
            <div class="skill-row" in:fly={{ x: -20, duration: 260, delay: i * 70 }}>
              <span class="skill-name">{s.name}</span>
              <div class="skill-track">
                <div class="skill-fill" style="--target-w:{s.pct}%; animation-delay:{i * 70 + 150}ms"></div>
              </div>
              <span class="skill-pct">{s.pct}%</span>
            </div>
          {/each}
        </section>
      {/if}

      {#if activeSection === 'projects'}
        <section class="section" in:fly={{ y: 24, duration: 300 }} out:fade={{ duration: 150 }}>
          <div class="section-label">03 — PROJECTEN</div>
          {#if projects.length === 0}
            <p class="soon" in:fade={{ duration: 400 }}>COMING SOON <span class="blink">█</span></p>
          {:else}
            <div class="projects-grid">
              {#each projects as p, i}
                <a href={p.url} target="_blank" rel="noopener" class="project-card panel"
                   in:fly={{ y: 16, duration: 260, delay: i * 80 }}>
                  <div class="project-title">{p.title}</div>
                  <p class="project-desc">{p.desc}</p>
                  <div class="project-tags">
                    {#each p.tags as tag}<span class="tag">{tag}</span>{/each}
                  </div>
                </a>
              {/each}
            </div>
          {/if}
        </section>
      {/if}

      {#if activeSection === 'contact'}
        <section class="section" in:fly={{ y: 24, duration: 300 }} out:fade={{ duration: 150 }}>
          <div class="section-label">04 — CONTACT</div>
          <div class="contact-row">
            <a href="https://github.com/milanwdewaele" target="_blank" rel="noopener" class="btn"
               in:fly={{ y: 12, duration: 260, delay: 80 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
            <a href="https://www.instagram.com/milanwdewaele" target="_blank" rel="noopener" class="btn-outline"
               in:fly={{ y: 12, duration: 260, delay: 160 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.31.975.976 1.248 2.243 1.31 3.609.058 1.265.069 1.645.069 4.849s-.011 3.584-.069 4.849c-.062 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.069-4.85.069s-3.584-.011-4.849-.069c-1.366-.062-2.633-.335-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.335-2.633 1.31-3.608C4.518 2.499 5.785 2.225 7.151 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              Instagram
            </a>
          </div>
        </section>
      {/if}

    </main>

    <!-- FOOTER -->
    <footer in:fade={{ duration: 400, delay: 600 }}>
      <span>© {new Date().getFullYear()} Milan Dewaele — Gent, Oost-Vlaanderen</span>
      <span class="footer-mono">MILAN OS v2.6</span>
    </footer>

  </div>
{/if}

<style>
.boot {
  position: fixed;
  inset: 0;
  background: #0a0a0a;
  color: #f5f0e8;
  font-family: 'Space Mono', monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  z-index: 1000;
}

.boot-logo {
  font-size: clamp(10px, 2vw, 15px);
  line-height: 1.3;
  color: #0047ff;
}

.boot-lines {
  font-size: 13px;
  text-align: left;
  width: min(480px, 90vw);
  min-height: 120px;
}

.boot-line { opacity: 0.85; }

.boot-bar-outer {
  width: min(480px, 90vw);
  height: 6px;
  background: #1a1a2e;
  border: 1px solid #333;
}

.boot-bar-inner {
  height: 100%;
  background: #0047ff;
  transition: width 0.3s ease;
  box-shadow: 0 0 8px #0047ff88;
}

.boot-pct { font-size: 12px; color: #666; }

.site {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.site.visible { opacity: 1; }

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  border-bottom: 3px solid #0a0a0a;
  background: #f5f0e8;
  position: sticky;
  top: 0;
  z-index: 50;
}

.nav-logo {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -1px;
  color: #0a0a0a;
  transition: color 0.2s;
}

.nav-logo:hover { color: #0047ff; }
.nav-links { display: flex; gap: 4px; }

.nav-btn {
  background: transparent;
  border: 2px solid transparent;
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 14px;
  cursor: pointer;
  letter-spacing: 1px;
  color: #0a0a0a;
  transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;
}

.nav-btn:hover { background: #0a0a0a; color: #f5f0e8; transform: translateY(-1px); }
.nav-btn.active { background: #0047ff; color: #fff; border-color: #0a0a0a; }

/* HERO */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 64px 32px 56px;
  gap: 40px;
  flex-wrap: wrap;
  border-bottom: 3px solid #0a0a0a;
}

.hero-eyebrow {
  font-size: 12px;
  letter-spacing: 2px;
  color: #0047ff;
  margin-bottom: 16px;
  font-weight: 700;
}

h1 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(56px, 9vw, 100px);
  font-weight: 900;
  line-height: 0.92;
  letter-spacing: -3px;
  color: #0a0a0a;
  position: relative;
  margin-bottom: 20px;
}

h1.glitch::before, h1.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  width: 100%;
}

h1.glitch::before { color: #0047ff; animation: glitch 0.5s steps(1) forwards; z-index: 1; }
h1.glitch::after  { color: #ff3c00; animation: glitch 0.5s steps(1) 0.05s forwards; z-index: 2; }

.hero-sub {
  font-size: 15px;
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 28px;
  color: #333;
}

.hero-cta { margin-top: 4px; }

.avatar-frame {
  border: 3px solid #0a0a0a;
  box-shadow: 8px 8px 0 #0047ff;
  flex-shrink: 0;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.avatar-frame:hover { transform: translate(-3px,-3px); box-shadow: 11px 11px 0 #0047ff; }

.avatar {
  width: 200px;
  height: 200px;
  display: block;
  filter: grayscale(15%);
  transition: filter 0.3s ease;
}

.avatar-frame:hover .avatar { filter: grayscale(0%); }

/* HIGHLIGHT BAR */
.highlight-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  background: #0a0a0a;
  border-bottom: 3px solid #0a0a0a;
  flex-wrap: wrap;
}

.highlight-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
  gap: 4px;
  transition: background 0.15s ease;
}

.highlight-item:hover { background: #0047ff; }

.hl-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 28px;
  font-weight: 900;
  color: #f5f0e8;
  line-height: 1;
}

.hl-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #888;
}

.highlight-item:hover .hl-label { color: #fff; }

.hl-divider {
  width: 1px;
  height: 40px;
  background: #333;
  flex-shrink: 0;
}

/* WAT IK DOE */
.wat-ik-doe {
  padding: 48px 32px;
  border-bottom: 3px solid #0a0a0a;
}

.wid-header {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 4px;
  color: #0047ff;
  margin-bottom: 24px;
  border-left: 4px solid #0047ff;
  padding-left: 10px;
}

.wid-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  max-width: 860px;
  margin: 0 auto;
}

.wid-card {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wid-icon { font-size: 28px; }

.wid-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: -0.5px;
}

.wid-desc {
  font-size: 13px;
  line-height: 1.7;
  color: #444;
}

/* MAIN */
main {
  flex: 1;
  padding: 52px 32px;
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
}

.section-label {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #0047ff;
  margin-bottom: 28px;
  border-left: 4px solid #0047ff;
  padding-left: 10px;
}

.body-text { font-size: 15px; line-height: 1.8; margin-bottom: 36px; max-width: 640px; }
.stats-row { display: flex; gap: 16px; flex-wrap: wrap; }

.stat {
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  min-width: 110px;
}

.stat-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 40px;
  font-weight: 900;
  line-height: 1;
  color: #0047ff;
  transition: color 0.2s;
}

.stat:hover .stat-num { color: #0a0a0a; }
.stat-label { font-size: 11px; margin-top: 4px; letter-spacing: 1px; text-transform: uppercase; }

.skill-row { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }

.skill-name {
  font-size: 12px;
  font-weight: 700;
  width: 130px;
  flex-shrink: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.skill-track {
  flex: 1;
  height: 14px;
  background: #e8eeff;
  border: 2px solid #0a0a0a;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: #0047ff;
  width: 0%;
  animation: fillBar 1.1s cubic-bezier(0.4,0,0.2,1) forwards;
}

.skill-pct { font-size: 12px; font-weight: 700; width: 38px; text-align: right; color: #0047ff; }

.soon {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 28px;
  font-weight: 900;
  color: #0a0a0a;
  padding: 32px 0;
  letter-spacing: -1px;
}

.projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px,1fr)); gap: 16px; }

.project-card { display: block; padding: 20px; text-decoration: none; color: inherit; }

.project-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 6px;
  transition: color 0.15s;
}

.project-card:hover .project-title { color: #0047ff; }
.project-desc { font-size: 12px; line-height: 1.5; margin-bottom: 12px; color: #444; }
.project-tags { display: flex; flex-wrap: wrap; gap: 6px; }

.tag {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border: 2px solid #0a0a0a;
  background: transparent;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: background 0.15s, color 0.15s, transform 0.1s;
}

.tag:hover { background: #0047ff; color: #fff; border-color: #0047ff; transform: translateY(-2px); }

.contact-row { display: flex; flex-wrap: wrap; gap: 14px; padding-top: 8px; }

footer {
  border-top: 3px solid #0a0a0a;
  padding: 18px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  background: #0a0a0a;
  color: #f5f0e8;
}

.footer-mono { font-weight: 700; letter-spacing: 2px; color: #0047ff; }

@media (max-width: 600px) {
  nav { padding: 14px 16px; }
  .hero { padding: 36px 16px 32px; flex-direction: column; }
  .avatar { width: 140px; height: 140px; }
  main { padding: 32px 16px; }
  footer { padding: 14px 16px; flex-direction: column; gap: 6px; text-align: center; }
  .skill-name { width: 90px; font-size: 11px; }
  .wat-ik-doe { padding: 32px 16px; }
  .highlight-item { padding: 16px 20px; }
  .hl-divider { display: none; }
}
</style>
