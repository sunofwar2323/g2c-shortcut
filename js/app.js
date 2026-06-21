// Configure your Google Apps Script Web App URL here
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL';

const STORAGE_KEY = 'g2c_user';

const state = {
  user: null,
  searchQuery: '',
  activeCategory: 'all',
  youtubeInterest: true,
  followsAIGS: true,
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function init() {
  bindOnboarding();
  bindDashboard();
  checkExistingUser();
}

function checkExistingUser() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      state.user = JSON.parse(stored);
      showDashboard();
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}

function bindOnboarding() {
  const form = $('#onboarding-form');

  $$('.toggle-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const field = btn.dataset.field;
      const group = btn.closest('.toggle-group');
      group.querySelectorAll('.toggle-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      if (field === 'youtube') {
        state.youtubeInterest = btn.dataset.value === 'yes';
      } else if (field === 'ai-gs') {
        state.followsAIGS = btn.dataset.value === 'yes';
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const btn = $('#get-started-btn');
    btn.disabled = true;
    btn.textContent = 'Saving…';

    const payload = {
      timestamp: new Date().toISOString(),
      name: $('#full-name').value.trim(),
      email: $('#email').value.trim(),
      youtube_interest: state.youtubeInterest ? 'Yes' : 'No',
      follows_ai_gs: state.followsAIGS ? 'Yes' : 'No',
      source: 'G2C Portal',
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    state.user = payload;

    if (APPS_SCRIPT_URL !== 'YOUR_APPS_SCRIPT_WEB_APP_URL') {
      try {
        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        // Offline or CORS — data is saved locally
      }
    }

    showDashboard();
    btn.disabled = false;
    btn.innerHTML = '<span class="cta-arrow" aria-hidden="true">→</span> Get started — explore services';
  });
}

function validateForm() {
  let valid = true;
  const name = $('#full-name');
  const email = $('#email');
  const nameError = $('#name-error');
  const emailError = $('#email-error');

  name.classList.remove('error');
  email.classList.remove('error');
  nameError.textContent = '';
  emailError.textContent = '';

  if (!name.value.trim()) {
    name.classList.add('error');
    nameError.textContent = 'Please enter your full name.';
    valid = false;
  }

  const emailVal = email.value.trim();
  if (!emailVal) {
    email.classList.add('error');
    emailError.textContent = 'Please enter your email address.';
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    email.classList.add('error');
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  return valid;
}

function showDashboard() {
  $('#onboarding').classList.add('hidden');
  const dashboard = $('#dashboard');
  dashboard.classList.remove('hidden');
  dashboard.setAttribute('aria-hidden', 'false');

  const firstName = state.user.name.split(' ')[0];
  $('#welcome-text').textContent = `Welcome, ${firstName}`;
  $('#hero-greeting').textContent = `Hello, ${firstName}!`;

  renderFilterChips();
  renderTopServices();
  renderServices();
}

function bindDashboard() {
  const searchInput = $('#search-input');
  const searchClear = $('#search-clear');

  searchInput.addEventListener('input', () => {
    state.searchQuery = searchInput.value.trim().toLowerCase();
    searchClear.classList.toggle('hidden', !state.searchQuery);
    renderServices();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    searchClear.classList.add('hidden');
    renderServices();
    searchInput.focus();
  });

  $('#nav-search-btn').addEventListener('click', () => {
    searchInput.focus();
    searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  $('#reset-filters').addEventListener('click', () => {
    state.searchQuery = '';
    state.activeCategory = 'all';
    searchInput.value = '';
    searchClear.classList.add('hidden');
    $$('.chip').forEach((c) => c.classList.toggle('active', c.dataset.category === 'all'));
    renderServices();
  });

  $('#export-btn').addEventListener('click', exportJSON);
}

function renderFilterChips() {
  const container = $('#filter-chips');
  const chips = [{ label: 'All', value: 'all' }, ...CATEGORIES.map((c) => ({ label: c, value: c }))];

  container.innerHTML = chips
    .map(
      (chip) =>
        `<button type="button" class="chip${chip.value === 'all' ? ' active' : ''}" data-category="${chip.value}">${chip.label}</button>`
    )
    .join('');

  container.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      state.activeCategory = chip.dataset.category;
      container.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      renderServices();
    });
  });
}

function getFilteredServices() {
  return SERVICES.filter((service) => {
    const matchesCategory = state.activeCategory === 'all' || service.category === state.activeCategory;
    if (!matchesCategory) return false;

    if (!state.searchQuery) return true;

    const haystack = `${service.name} ${service.category} ${service.agency} ${service.description}`.toLowerCase();
    return haystack.includes(state.searchQuery);
  });
}

function renderTopServices() {
  const topServices = SERVICES.filter((s) => s.topRank !== null).sort((a, b) => a.topRank - b.topRank);
  const grid = $('#top-services-grid');

  grid.innerHTML = topServices
    .map(
      (s) => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="top-service-card">
      <span class="rank-badge">${s.topRank}</span>
      <div class="top-service-info">
        <h3>${s.name}</h3>
        <span>${s.agency}</span>
      </div>
    </a>`
    )
    .join('');
}

function renderServices() {
  const filtered = getFilteredServices();
  const grid = $('#services-grid');
  const emptyState = $('#empty-state');
  const countEl = $('#results-count');

  countEl.textContent = `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`;

  renderTopServices();
  const showTop = state.activeCategory === 'all' && !state.searchQuery;
  $('#top-services-section').classList.toggle('hidden', !showTop);

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  grid.innerHTML = filtered
    .map(
      (s, i) => `
    <article class="service-card" style="animation-delay: ${Math.min(i * 40, 600)}ms">
      <div class="card-header">
        <h3>${s.name}</h3>
        <span class="category-badge" style="background:${CATEGORY_COLORS[s.category]}">${shortCategory(s.category)}</span>
      </div>
      <p class="card-agency">${s.agency}</p>
      <p class="card-description">${s.description}</p>
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="card-link">
        Open service
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
      </a>
    </article>`
    )
    .join('');
}

function shortCategory(category) {
  const shorts = {
    'Identity & Citizenship': 'Identity',
    'Security & Verification': 'Security',
    'Marriage & Family': 'Family',
    'Business & Licensing': 'Business',
    'Tax & Finance': 'Tax',
    'Transport & Vehicle': 'Transport',
    'Passport & Immigration': 'Immigration',
    'Land & Property': 'Land',
    'Pension & Social Security': 'Pension',
    'Housing & Construction': 'Housing',
    'Agriculture & Livestock': 'Agriculture',
    'Justice & Legal': 'Legal',
    'Tourism & Culture': 'Tourism',
  };
  return shorts[category] || category;
}

function exportJSON() {
  const filtered = getFilteredServices();
  const exportData = {
    exportedAt: new Date().toISOString(),
    totalResults: filtered.length,
    filters: {
      search: state.searchQuery || null,
      category: state.activeCategory,
    },
    services: filtered,
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `g2c-services-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', init);
