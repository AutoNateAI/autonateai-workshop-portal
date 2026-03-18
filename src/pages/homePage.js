import {renderTrackCard} from '../components/TrackCard.js';
import {tracks} from '../data/tracks.js';

export function renderHomePage(user) {
  const firstName = user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'Builder';

  return `
    <section class="dashboard-page">
      <div class="container-xl">
        <div class="dashboard-hero">
          <div class="hero-copy-wrap">
            <div class="kicker">Dashboard</div>
            <h1 class="dashboard-title">Welcome back, ${firstName}.</h1>
            <p class="dashboard-subtitle">Open your track, grab the right sheet, and run the prompt pack straight into ChatGPT.</p>
          </div>
          <div class="hero-actions-grid">
            <a class="quick-card" href="#/tracks/student" data-nav="/tracks/student">
              <span class="quick-label">Student OS</span>
              <strong>Time grid, assignment sprints, study heatmaps</strong>
            </a>
            <a class="quick-card" href="#/tracks/researcher" data-nav="/tracks/researcher">
              <span class="quick-label">Research OS</span>
              <strong>Source intake, claim graphs, gap radar</strong>
            </a>
            <a class="quick-card" href="#/setup" data-nav="/setup">
              <span class="quick-label">Setup</span>
              <strong>Connector checklist for ChatGPT, Sheets, and Figma</strong>
            </a>
          </div>
        </div>

        <div class="stat-row">
          <div class="stat-panel">
            <div class="stat-heading">2</div>
            <div class="stat-caption">Tracks unlocked</div>
          </div>
          <div class="stat-panel">
            <div class="stat-heading">12</div>
            <div class="stat-caption">Sheet kits live</div>
          </div>
          <div class="stat-panel">
            <div class="stat-heading">36</div>
            <div class="stat-caption">Prompt blocks ready</div>
          </div>
        </div>

        <section class="dashboard-section">
          <div class="section-heading-row">
            <div>
              <div class="kicker">Your tracks</div>
              <h2 class="section-title">Pick the system you need right now</h2>
            </div>
          </div>
          <div class="track-grid">
            ${Object.values(tracks)
              .map((track) => renderTrackCard(track))
              .join('')}
          </div>
        </section>
      </div>
    </section>
  `;
}
