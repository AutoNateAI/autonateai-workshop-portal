const CHECKOUT_URL = 'https://autonateai.com/services/ai-first-student';
const STORYBOARD_BASE = `${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/img/storyboards/student`;

const abilityCards = [
  {
    icon: 'grid_view',
    tone: 'primary',
    title: 'Daily Time Grid',
    copy: 'When your day feels impossible and your brain is carrying too many tabs at once.',
    image: `${STORYBOARD_BASE}/23-c.png`,
  },
  {
    icon: 'bolt',
    tone: 'secondary',
    title: 'Assignment Sprint Planner',
    copy: 'When a big assignment is too vague to start and you need the first few moves made obvious.',
    image: `${STORYBOARD_BASE}/24-c.png`,
  },
  {
    icon: 'menu_book',
    tone: 'primary',
    title: 'Reading Capture Matrix',
    copy: 'When you keep reading, highlighting, and forgetting what mattered.',
    image: `${STORYBOARD_BASE}/25-b.png`,
  },
  {
    icon: 'leaderboard',
    tone: 'secondary',
    title: 'Study Heatmap Board',
    copy: 'When everything feels urgent and you need to see what deserves attention first.',
    image: `${STORYBOARD_BASE}/26-d.png`,
  },
  {
    icon: 'account_tree',
    tone: 'primary',
    title: 'Paper Source Matrix',
    copy: 'When your sources, claims, and notes are scattered across tabs and documents.',
    image: `${STORYBOARD_BASE}/27-c.png`,
  },
  {
    icon: 'psychology',
    tone: 'secondary',
    title: 'Day Debrief Lab',
    copy: 'When you keep repeating the same bad patterns and need structured reflection that compounds.',
    image: `${STORYBOARD_BASE}/28-d.png`,
  },
];

const workflowFeatures = [
  {
    title: 'Narrated Story Deck',
    copy:
      'A cinematic guided experience that walks students from overload into AI-powered structure with voiceover, visuals, and plot.',
    image: `${STORYBOARD_BASE}/01-c.png`,
  },
  {
    title: 'Portal Thinking Systems',
    copy:
      'Concrete workbook-based systems students can open immediately, run with AI, and use against real school pressure.',
    image: `${STORYBOARD_BASE}/21-f.png`,
  },
];

const pricingItems = [
  'Narrated student transformation deck',
  '6 core Thinking Systems ready to use now',
  'Portal access built around the live student experience',
  'One-time purchase with paid access enforcement',
];

export function renderLandingPage(user = null) {
  const portalAction = user
    ? `<a class="landing-nav-link landing-nav-link--solid" href="#/portal" data-nav="/portal">Open Portal</a>`
    : `<a class="landing-nav-link" href="#/login" data-nav="/login">Sign In</a>`;

  return `
    <section class="landing-shell">
      <header class="landing-topbar">
        <div class="landing-topbar-inner">
          <div class="landing-brand">
            <span class="landing-brand-icon">architecture</span>
            <span>AutoNateAI</span>
          </div>
          <div class="landing-topbar-actions">
            <button class="landing-nav-link" type="button" data-scroll-target="landing-system">The System</button>
            <button class="landing-nav-link" type="button" data-scroll-target="landing-workflows">Workflows</button>
            <button class="landing-nav-link" type="button" data-scroll-target="landing-pricing">Pricing</button>
            ${portalAction}
          </div>
        </div>
      </header>

      <section class="landing-hero">
        <div class="landing-hero-copy">
          <div class="landing-kicker">Architecture For Excellence</div>
          <h1>Stop drowning in school pressure.</h1>
          <p class="landing-hero-highlight">The gap is not intelligence. It is infrastructure.</p>
          <p class="landing-hero-copyline">
            This portal teaches students how to use AI, structured workbooks, and Thinking Systems to turn overload into
            calm execution. It is not a generic AI course. It is a student operating upgrade.
          </p>
          <div class="landing-hero-actions">
            <a class="landing-cta landing-cta--primary" href="${CHECKOUT_URL}" target="_blank" rel="noopener noreferrer">
              Initialize System
            </a>
            <a class="landing-cta landing-cta--ghost" href="#/login" data-nav="/login">Already Bought? Enter Portal</a>
          </div>
          <div class="landing-hero-meta">$129 one time. Instant access after checkout.</div>
        </div>
        <div class="landing-hero-visual">
          <div class="landing-hero-panel">
            <img src="${STORYBOARD_BASE}/07-f.png" alt="Student portal transformation preview" />
          </div>
          <div class="landing-hero-note">
            Smart students are not losing because they lack potential. They are losing because their cognitive workload
            has no system holding it.
          </div>
        </div>
      </section>

      <section class="landing-section landing-section--systems" id="landing-system">
        <div class="landing-section-head">
          <div>
            <div class="landing-kicker">Unlocked Abilities</div>
            <h2>Thinking Systems for real student pressure</h2>
          </div>
          <p>
            Each system is an ability unlock for a specific kind of pain: time collapse, assignment fog, reading
            overload, scattered sources, bad prioritization, and repeated patterns.
          </p>
        </div>
        <div class="landing-ability-grid">
          ${abilityCards
            .map(
              (card) => `
                <article class="landing-ability-card">
                  <div class="landing-ability-icon landing-ability-icon--${card.tone}">
                    <span class="material-symbols-outlined">${card.icon}</span>
                  </div>
                  <div class="landing-ability-copy">
                    <h3>${card.title}</h3>
                    <p>${card.copy}</p>
                  </div>
                  <div class="landing-ability-frame">
                    <img src="${card.image}" alt="${card.title} preview" loading="lazy" decoding="async" />
                  </div>
                </article>`,
            )
            .join('')}
        </div>
      </section>

      <section class="landing-section landing-section--workflows" id="landing-workflows">
        <div class="landing-section-head">
          <div>
            <div class="landing-kicker">Integrated Workflows</div>
            <h2>What students actually get inside</h2>
          </div>
          <p>
            The portal is half cinematic learning experience, half practical system. Students watch the story, install
            the tools, and then run the Thinking Systems against their real life.
          </p>
        </div>
        <div class="landing-workflow-grid">
          ${workflowFeatures
            .map(
              (feature) => `
                <article class="landing-workflow-card">
                  <div class="landing-workflow-copy">
                    <h3>${feature.title}</h3>
                    <p>${feature.copy}</p>
                  </div>
                  <div class="landing-workflow-frame">
                    <img src="${feature.image}" alt="${feature.title}" loading="lazy" decoding="async" />
                  </div>
                </article>`,
            )
            .join('')}
        </div>
      </section>

      <section class="landing-mid-cta">
        <div class="landing-mid-cta-panel">
          <h2>Ready to install leverage instead of more noise?</h2>
          <a class="landing-cta landing-cta--primary" href="${CHECKOUT_URL}" target="_blank" rel="noopener noreferrer">
            Initialize System
          </a>
        </div>
      </section>

      <section class="landing-section landing-section--pricing" id="landing-pricing">
        <div class="landing-section-head landing-section-head--centered">
          <div>
            <div class="landing-kicker">System Ownership</div>
            <h2>One-time student portal access</h2>
          </div>
        </div>
        <div class="landing-pricing-card">
          <div class="landing-price-badge">Lifetime</div>
          <div class="landing-price-row">
            <span class="landing-price-amount">$129</span>
            <span class="landing-price-unit">USD</span>
          </div>
          <ul class="landing-price-list">
            ${pricingItems
              .map(
                (item) => `
                  <li>
                    <span class="material-symbols-outlined">check_circle</span>
                    <span>${item}</span>
                  </li>`,
              )
              .join('')}
          </ul>
          <div class="landing-price-actions">
            <a class="landing-cta landing-cta--primary" href="${CHECKOUT_URL}" target="_blank" rel="noopener noreferrer">
              Buy Student Portal
            </a>
            <a class="landing-cta landing-cta--ghost" href="#/login" data-nav="/login">Sign In To Existing Access</a>
          </div>
          <p class="landing-price-note">No subscription. No extra membership layer. One payment, then enter the portal.</p>
        </div>
      </section>

      <footer class="landing-footer">
        <div class="landing-brand">AutoNateAI</div>
        <div class="landing-footer-links">
          <button type="button" data-scroll-target="landing-system">The System</button>
          <button type="button" data-scroll-target="landing-workflows">Workflows</button>
          <button type="button" data-scroll-target="landing-pricing">Pricing</button>
        </div>
        <div class="landing-footer-copy">Student transformation through AI-powered infrastructure.</div>
      </footer>
    </section>
  `;
}
