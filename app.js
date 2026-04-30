/* ============================================================
   Dezerv UI Reference Library — app.js
   ============================================================ */

'use strict';

/* ── Password Gate ─────────────────────────────────────────────
   HOW TO SET YOUR PASSWORD
   ─────────────────────────────────────────────────────────────
   1. Open any browser tab (can be any website or about:blank)
   2. Open DevTools console  →  F12  or  Cmd+Option+J  (Mac)
   3. Paste and run the command below, replacing MyPassword with
      your chosen password (keep the quotes):

      crypto.subtle.digest('SHA-256', new TextEncoder().encode('MyPassword'))
        .then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2,'0')).join('')))

   4. Copy the 64-character hash that appears in the console
   5. Replace the value of PASS_HASH below with your hash
   6. Save the file and push to GitHub
   ─────────────────────────────────────────────────────────── */

const PASS_HASH = 'REPLACE_WITH_YOUR_64_CHAR_HASH_HERE';
const SESSION_KEY = 'dezerv_ui_lib_auth';

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2, '0')).join('');
}

async function initPasswordGate() {
  /* Already authenticated in this tab session — skip the gate */
  if (sessionStorage.getItem(SESSION_KEY) === '1') {
    showApp();
    return;
  }

  const gate   = document.getElementById('passwordGate');
  const form   = document.getElementById('passwordForm');
  const input  = document.getElementById('passwordInput');
  const error  = document.getElementById('passwordError');
  const btn    = document.getElementById('passwordSubmit');

  /* Show the gate */
  gate.style.display = 'flex';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!input.value.trim()) return;

    btn.disabled    = true;
    btn.textContent = 'Checking…';
    error.style.display = 'none';

    const hash = await sha256(input.value);

    if (hash === PASS_HASH) {
      sessionStorage.setItem(SESSION_KEY, '1');
      gate.style.display = 'none';
      showApp();
    } else {
      error.style.display = 'block';
      input.value = '';
      input.focus();
      btn.disabled    = false;
      btn.textContent = 'Access Library';
    }
  });

  /* Allow Enter key on the input */
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); form.requestSubmit(); }
  });
}

function showApp() {
  document.getElementById('appContent').style.display = 'block';
}

/* ──────────────────────────────────────────────────────────── */

/* ── Category data ───────────────────────────────────────────
   Each category maps to a folder inside /Screens/.
   "folder" is the exact directory name (including spaces/special chars).
   "files" is the sorted list of image filenames inside that folder.
   ──────────────────────────────────────────────────────────── */

const UI_COMPONENTS = [
  {
    id: 'listing-view', name: 'Listing View', folder: 'Listing View',
    files: ['Listing View - 1.png','Listing View - 2.png','Listing View - 3.png','Listing View - 4.png','Listing View - 5.png','Listing View - 6.png','Listing View - 7.png','Listing View - 8.png','Listing View - 9.png','Listing View - 10.png','Listing View - 11.png','Listing View - 12.png','Listing View - 13.png','Listing View - 14.png','Listing View - 15.png','Listing View - 16.png']
  },
  {
    id: 'toggle', name: 'Toggle', folder: 'Toggle',
    files: ['Toggle - 1.png']
  },
  {
    id: 'accordion', name: 'Accordion', folder: 'Accordion',
    files: ['Accordion - 1.png']
  },
  {
    id: 'checkbox', name: 'Checkbox', folder: 'Checkbox',
    files: ['Checkbox - 1.png']
  },
  {
    id: 'radio-button', name: 'Radio Button', folder: 'Radio Button',
    files: ['Radio Button - 1.png','Radio Button - 2.png','Radio Button - 3.png']
  },
  {
    id: 'switch', name: 'Switch', folder: 'Switch',
    files: ['Switch - 1.png','Switch - 2.png']
  },
  {
    id: 'segmented-control', name: 'Segmented Control', folder: 'Segmented Control',
    files: ['Segmented Control - 1.png','Segmented Control - 2.png','Segmented Control - 3.png','Segmented Control - 4.png','Segmented Control - 5.png','Segmented Control - 6.png','Segmented Control - 7.png','Segmented Control - 8.png','Segmented Control - 9.png','Segmented Control - 10.png']
  },
  {
    id: 'chips', name: 'Chips', folder: 'Chips',
    files: ['Chips - 1.png','Chips - 2.png']
  },
  {
    id: 'progress-indicator', name: 'Progress Indicator', folder: 'Progress Indicator',
    files: ['Progress indicator - 1.png','Progress indicator - 2.png','Progress indicator - 3.png','Progress indicator - 4.png','Progress indicator - 5.png','Progress indicator - 6.png','Progress indicator - 7.png','Progress indicator - 8.png','Progress indicator - 9.png','Progress indicator - 10.png','Progress indicator - 11.png','Progress indicator - 12.png','Progress indicator - 13.png','Progress indicator - 14.png','Progress indicator - 15.png','Progress indicator - 16.png']
  },
  {
    id: 'stepper', name: 'Stepper', folder: 'Stepper',
    files: ['Stepper - 1.png','Stepper - 2.png','Stepper - 3.png','Stepper - 4.png','Stepper - 5.png','Stepper - 6.png']
  },
  {
    id: 'slider', name: 'Slider', folder: 'Slider',
    files: ['Slider - 1.png']
  },
  {
    id: 'sliding-ruler', name: 'Sliding Ruler', folder: 'Sliding Ruler',
    files: ['Sliding Ruler - 1.png','Sliding Ruler - 2.png','Sliding Ruler - 3.png','Sliding Ruler - 4.png']
  },
  {
    id: 'tabs', name: 'Tabs', folder: 'Tabs',
    files: ['Tabs - 1.png','Tabs - 2.png','Tabs - 3.png']
  },
  {
    id: 'rating-control', name: 'Rating Control', folder: 'Rating Control',
    files: ['Rating Control - 1.png']
  },
  {
    id: 'story', name: 'Story', folder: 'Story',
    files: ['Story - 1.png','Story - 2.png','Story - 3.png','Story - 4.png','Story - 5.png','Story - 6.png','Story - 7.png','Story - 8.png','Story - 9.png','Story - 10.png','Story - 11.png','Story - 12.png','Story - 13.png']
  },
  {
    id: 'floating-button', name: 'Floating Button', folder: 'Floating button',
    files: ['Floating button - 1.png','Floating button - 2.png']
  },
  {
    id: 'steps', name: 'Steps', folder: 'Steps',
    files: ['Steps - 1.png','Steps - 2.png','Steps - 3.png','Steps - 4.png','Steps - 5.png','Steps - 6.png']
  },
  {
    id: 'banking-cards', name: 'Banking Cards', folder: 'Banking Cards',
    files: ['Banking Cards - 1.png','Banking Cards - 2.png','Banking Cards - 3.png','Banking Cards - 4.png']
  },
  { id: 'asset-info-cards',  name: 'Asset Info Cards',  folder: null, files: [] },
  { id: 'input-fields',      name: 'Input Fields',      folder: null, files: [] },
  { id: 'help-button',       name: 'Help Button',       folder: null, files: [] },
  { id: 'buttons',           name: 'Buttons',           folder: null, files: [] },
  { id: 'link-button',       name: 'Link Button',       folder: null, files: [] },
  { id: 'tool-tip',          name: 'Tool Tip',          folder: null, files: [] },
];

const SCREEN_CATEGORIES = [
  { id: 'app-landing-pages', name: 'App Landing Pages', folder: null, files: [] },
  {
    id: 'bottom-sheets', name: 'Bottom Sheets', folder: 'Bottom Sheets',
    files: ['Bottom Sheets - 1.png','Bottom Sheets - 2.png','Bottom Sheets - 3.png','Bottom Sheets - 4.png','Bottom Sheets - 5.png','Bottom Sheets - 6.png','Bottom Sheets - 7.png','Bottom Sheets - 8.png','Bottom Sheets - 9.png','Bottom Sheets - 10.png','Bottom Sheets - 11.png','Bottom Sheets - 12.png','Bottom Sheets - 13.png','Bottom Sheets - 14.png','Bottom Sheets - 15.png','Bottom Sheets - 16.png','Bottom Sheets - 17.png','Bottom Sheets - 18.png','Bottom Sheets - 19.png','Bottom Sheets - 20.png','Bottom Sheets - 21.png','Bottom Sheets - 22.png','Bottom Sheets - 23.png','Bottom Sheets - 24.png','Bottom Sheets - 25.png','Bottom Sheets - 26.png','Bottom Sheets - 27.png','Bottom Sheets - 28.png','Bottom Sheets - 29.png','Bottom Sheets - 30.png','Bottom Sheets - 31.png','Bottom Sheets - 32.png','Bottom Sheets - 33.png','Bottom Sheets - 34.png','Bottom Sheets - 35.png','Bottom Sheets - 36.png','Bottom Sheets - 37.png','Bottom Sheets - 38.png','Bottom Sheets - 39.png','Bottom Sheets - 40.png','Bottom Sheets - 41.png','Bottom Sheets - 42.png','Bottom Sheets - 43.png','Bottom Sheets - 44.png','Bottom Sheets - 45.png','Bottom Sheets - 46.png','Bottom Sheets - 47.png','Bottom Sheets - 48.png','Bottom Sheets - 49.png','Bottom Sheets - 50.png','Bottom Sheets - 51.png','Bottom Sheets - 52.png','Bottom Sheets - 53.png','Bottom Sheets - 54.png','Bottom Sheets - 55.png','Bottom Sheets - 56.png','Bottom Sheets - 57.png','Bottom Sheets - 58.png','Bottom Sheets - 59.png','Bottom Sheets - 60.png','Bottom Sheets - 61.png','Bottom Sheets - 62.png','Bottom Sheets - 63.png','Bottom Sheets - 64.png','Bottom Sheets - 65.png','Bottom Sheets - 66.png','Bottom Sheets - 67.png','Bottom Sheets - 68.png','Bottom Sheets - 69.png','Bottom Sheets - 70.png']
  },
  {
    id: 'charts-data-viz', name: 'Charts & Data Visualisation', folder: 'Charts and Data viz',
    files: ['Data Visualisation - 1.png','Data Visualisation - 2.png','Data Visualisation - 3.png','Data Visualisation - 4.png','Data Visualisation - 5.png','Data Visualisation - 6.png','Data Visualisation - 7.png','Data Visualisation - 8.png','Data Visualisation - 9.png','Data Visualisation - 10.png','Data Visualisation - 11.png','Data Visualisation - 12.png','Data Visualisation - 13.png','Data Visualisation - 14.png','Data Visualisation - 15.png','Data Visualisation - 16.png','Data Visualisation - 17.png','Data Visualisation - 18.png','Data Visualisation - 19.png','Data Visualisation - 20.png','Data Visualisation - 21.png','Data Visualisation - 22.png','Data Visualisation - 23.png','Data Visualisation - 24.png','Data Visualisation - 25.png','Data Visualisation - 26.png','Data Visualisation - 27.png']
  },
  {
    id: 'chat-interface', name: 'Chat Interface', folder: 'Chat Interface',
    files: ['Chat Interface - 1.png','Chat Interface - 2.png','Chat Interface - 3.png','Chat Interface - 4.png','Chat Interface - 5.png','Chat Interface - 6.png','Chat Interface - 7.png','Chat Interface - 8.png','Chat Interface - 9.png','Chat Interface - 10.png','Chat Interface - 11.png','Chat Interface - 12.png','Chat Interface - 12-1.png','Chat Interface - 13.png','Chat Interface - 14.png','Chat Interface - 15.png','Chat Interface - 16.png','Chat Interface - 17.png','Chat Interface - 18.png','Chat Interface - 19.png','Chat Interface - 20.png']
  },
  {
    id: 'errors-warnings', name: 'Errors & Warnings', folder: 'Error & Warnings',
    files: ['Errors & Warnings - 1.png','Errors & Warnings - 2.png','Errors & Warnings - 3.png','Errors & Warnings - 4.png','Errors & Warnings - 5.png','Errors & Warnings - 6.png','Errors & Warnings - 7.png','Errors & Warnings - 8.png','Errors & Warnings - 9.png','Errors & Warnings - 10.png','Errors & Warnings - 11.png','Errors & Warnings - 12.png','Errors & Warnings - 13.png','Errors & Warnings - 14.png','Errors & Warnings - 15.png','Errors & Warnings - 16.png','Errors & Warnings - 17.png','Errors & Warnings - 18.png','Errors & Warnings - 19.png','Errors & Warnings - 20.png','Errors & Warnings - 21.png','Errors & Warnings - 22.png','Errors & Warnings - 23.png','Errors & Warnings - 24.png','Errors & Warnings - 25.png','Errors & Warnings - 26.png','Errors & Warnings - 27.png','Errors & Warnings - 28.png','Errors & Warnings - 30.png','Errors & Warnings - 31.png','Errors & Warnings - 32.png','Errors & Warnings - 33.png','Errors & Warnings - 34.png','Errors & Warnings - 35.png','Errors & Warnings - 36.png','Errors & Warnings - 37.png','Errors & Warnings - 38.png','Errors & Warnings - 39.png','Errors & Warnings - 46.png','Errors & Warnings - 47.png','Errors & Warnings - 48.png']
  },
  { id: 'empty-states',  name: 'Empty States',  folder: null, files: [] },
  { id: 'feature-intro', name: 'Feature Intro',  folder: null, files: [] },
  {
    id: 'success-acknowledgement', name: 'Success & Acknowledgement', folder: 'Success & Acknowledgement ',
    files: ['Success - 1.png','Success - 2.png','Success - 3.png','Success - 4.png','Success - 6.png','Success - 7.png','Success - 8.png','Success - 9.png','Success - 10.png','Success - 11.png','Success - 12.png','Success - 13.png','Success - 14.png','Success - 15.png']
  },
];

/* ── Helpers ─────────────────────────────────────────────── */

/** Build a URL-safe relative path for an image */
function imgPath(folderName, fileName) {
  return 'Screens/' + encodeURIComponent(folderName) + '/' + encodeURIComponent(fileName);
}

/** Strip .png extension for display */
function displayName(fileName) {
  return fileName.replace(/\.png$/i, '');
}

/** Get all screens across all categories (flat list) */
function getAllScreens() {
  const all = [];
  [...UI_COMPONENTS, ...SCREEN_CATEGORIES].forEach(cat => {
    if (!cat.folder || cat.files.length === 0) return;
    cat.files.forEach(f => all.push({ cat, file: f }));
  });
  return all;
}

/** Get screens for a specific category */
function getScreensForCategory(catId) {
  const cat = [...UI_COMPONENTS, ...SCREEN_CATEGORIES].find(c => c.id === catId);
  if (!cat || !cat.folder || cat.files.length === 0) return [];
  return cat.files.map(f => ({ cat, file: f }));
}

/* Total screen count per category */
const totalScreens = getAllScreens().length;

/* ── App state ───────────────────────────────────────────── */
const state = {
  activeCategoryId: null,        // null = show all
  searchQuery: '',
  searchTab: 'ui',               // active left-nav tab: 'ui' | 'screens'
  recentCategories: [],          // recently viewed category IDs
  detailScreens: [],             // current flat list shown in grid
  detailIndex: 0,                // index of currently shown screen in detail modal
  searchOpen: false,
  detailOpen: false,
};

/* ── DOM refs ────────────────────────────────────────────── */
const $ = id => document.getElementById(id);

let dom = {};

function initDom() {
  dom = {
    searchBar:        $('searchBar'),
    screenGrid:       $('screenGrid'),
    resultsLabel:     $('resultsLabel'),
    resultsCount:     $('resultsCount'),
    sidebarAll:       $('sidebarAll'),
    uiList:           $('uiComponentsList'),
    screenList:       $('screenCategoriesList'),
    searchOverlay:       $('searchOverlay'),
    searchInput:         $('searchInput'),
    searchClose:         $('searchModalClose'),
    recentTagsWrap:      $('recentTagsWrap'),
    recentSection:       $('recentSection'),
    searchTabUi:         $('searchTabUi'),
    searchTabScreens:    $('searchTabScreens'),
    searchNavUiCount:    $('searchNavUiCount'),
    searchNavScreensCount: $('searchNavScreensCount'),
    searchCatList:       $('searchCatList'),
    detailOverlay:       $('detailOverlay'),
    detailBody:       $('detailBody'),
    detailTitle:      $('detailTitle'),
    detailImage:      $('detailImage'),
    detailClose:      $('detailClose'),
    detailPrev:       $('detailPrev'),
    detailNext:       $('detailNext'),
    btnSave:          $('btnSave'),
    btnCopy:          $('btnCopy'),
    btnCopyLabel:     $('btnCopyLabel'),
    toast:            $('toast'),
  };
}

/* ── Sidebar rendering ───────────────────────────────────── */

function renderSidebar() {
  // Update "All" badge
  $('sidebarAllCount').textContent = totalScreens;

  // UI Components list
  dom.uiList.innerHTML = UI_COMPONENTS.map(cat => `
    <li>
      <button class="sidebar-item ${cat.files.length === 0 ? 'empty' : ''} ${state.activeCategoryId === cat.id ? 'active' : ''}"
              data-cat="${cat.id}" ${cat.files.length === 0 ? 'title="No screens yet"' : ''}>
        <span class="item-name">${cat.name}</span>
        <span class="item-count">${cat.files.length || ''}</span>
      </button>
    </li>
  `).join('');

  // Screens list
  dom.screenList.innerHTML = SCREEN_CATEGORIES.map(cat => `
    <li>
      <button class="sidebar-item ${cat.files.length === 0 ? 'empty' : ''} ${state.activeCategoryId === cat.id ? 'active' : ''}"
              data-cat="${cat.id}" ${cat.files.length === 0 ? 'title="No screens yet"' : ''}>
        <span class="item-name">${cat.name}</span>
        <span class="item-count">${cat.files.length || ''}</span>
      </button>
    </li>
  `).join('');

  // "All" button active state
  dom.sidebarAll.classList.toggle('active', state.activeCategoryId === null);
}

/* ── Grid rendering ──────────────────────────────────────── */

function renderGrid() {
  const screens = state.activeCategoryId
    ? getScreensForCategory(state.activeCategoryId)
    : getAllScreens();

  state.detailScreens = screens;

  // Results bar
  const cat = state.activeCategoryId
    ? [...UI_COMPONENTS, ...SCREEN_CATEGORIES].find(c => c.id === state.activeCategoryId)
    : null;

  dom.resultsLabel.textContent = cat ? cat.name : 'All Screens';
  dom.resultsCount.textContent = screens.length === 0
    ? 'No screens'
    : screens.length === 1 ? '1 screen' : `${screens.length} screens`;

  if (screens.length === 0) {
    dom.screenGrid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon">🖼️</div>
        <div class="empty-state-title">No screens yet</div>
        <div class="empty-state-desc">Screens for this category will appear here once added.</div>
      </div>`;
    return;
  }

  dom.screenGrid.innerHTML = screens.map((item, idx) => {
    const src = imgPath(item.cat.folder, item.file);
    const label = displayName(item.file);
    return `
      <div class="screen-card" data-index="${idx}" role="button" tabindex="0" aria-label="${label}">
        <img src="${src}" alt="${label}" loading="lazy" class="loading"
             onload="this.classList.remove('loading');this.classList.add('loaded')"
             onerror="this.outerHTML='<div class=&quot;screen-card-placeholder&quot;>No preview</div>'">
      </div>`;
  }).join('');

  // Attach click handlers
  dom.screenGrid.querySelectorAll('.screen-card').forEach(card => {
    card.addEventListener('click', () => openDetailModal(Number(card.dataset.index)));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDetailModal(Number(card.dataset.index));
      }
    });
  });
}

/* ── Category selection ──────────────────────────────────── */

function selectCategory(catId) {
  state.activeCategoryId = catId;
  renderSidebar();
  renderGrid();
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Search modal ────────────────────────────────────────── */

/** Switch active left-nav tab and refresh the right panel */
function setSearchTab(tab) {
  state.searchTab = tab;
  dom.searchTabUi.classList.toggle('active', tab === 'ui');
  dom.searchTabScreens.classList.toggle('active', tab === 'screens');
  buildSearchCategories(state.searchQuery);
}

/** Render a single category row */
function renderCatItem(cat) {
  const isEmpty = cat.files.length === 0;
  return `
    <div class="search-cat-item ${isEmpty ? 'empty' : ''}"
         data-cat="${cat.id}" role="button" tabindex="0">
      <span class="search-cat-item-name">${cat.name}</span>
      <span class="search-cat-item-count">${cat.files.length}</span>
    </div>`;
}

/** Populate the right panel based on current tab + search query */
function buildSearchCategories(query) {
  const q = query.trim().toLowerCase();
  let html = '';

  if (!q) {
    // No query → show subcategories for the active tab
    const cats = state.searchTab === 'ui' ? UI_COMPONENTS : SCREEN_CATEGORIES;
    html = cats.map(renderCatItem).join('');
    $('searchNoResults').style.display = 'none';
  } else {
    // Searching → show matches from BOTH sections with section headers
    const uiMatches    = UI_COMPONENTS.filter(c => c.name.toLowerCase().includes(q));
    const scrMatches   = SCREEN_CATEGORIES.filter(c => c.name.toLowerCase().includes(q));

    if (uiMatches.length) {
      html += `<div class="search-results-section-label">UI Components</div>`;
      html += uiMatches.map(renderCatItem).join('');
    }
    if (scrMatches.length) {
      html += `<div class="search-results-section-label">Screens</div>`;
      html += scrMatches.map(renderCatItem).join('');
    }

    const noMatch = !uiMatches.length && !scrMatches.length;
    $('searchNoResults').style.display = noMatch ? 'block' : 'none';
  }

  dom.searchCatList.innerHTML = html;

  // Attach click handlers to all rendered rows
  dom.searchCatList.querySelectorAll('.search-cat-item').forEach(item => {
    const handler = () => {
      const catId = item.dataset.cat;
      closeSearch();
      selectCategory(catId);
      addRecentCategory(catId);
    };
    item.addEventListener('click', handler);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); handler(); }
    });
  });
}

function renderRecentTags() {
  if (state.recentCategories.length === 0) {
    dom.recentSection.style.display = 'none';
    return;
  }
  dom.recentSection.style.display = 'block';
  const allCats = [...UI_COMPONENTS, ...SCREEN_CATEGORIES];
  dom.recentTagsWrap.innerHTML = state.recentCategories
    .map(id => {
      const cat = allCats.find(c => c.id === id);
      if (!cat) return '';
      return `<button class="recent-tag" data-cat="${cat.id}">${cat.name}</button>`;
    })
    .filter(Boolean)
    .join('');

  dom.recentTagsWrap.querySelectorAll('.recent-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      closeSearch();
      selectCategory(tag.dataset.cat);
    });
  });
}

function addRecentCategory(catId) {
  state.recentCategories = [catId, ...state.recentCategories.filter(id => id !== catId)].slice(0, 5);
}

function openSearch() {
  state.searchOpen = true;
  state.searchQuery = '';
  dom.searchInput.value = '';

  // Seed counts in left nav
  const uiTotal  = UI_COMPONENTS.reduce((n, c) => n + c.files.length, 0);
  const scrTotal = SCREEN_CATEGORIES.reduce((n, c) => n + c.files.length, 0);
  dom.searchNavUiCount.textContent      = uiTotal;
  dom.searchNavScreensCount.textContent = scrTotal;

  dom.searchOverlay.classList.add('open');
  renderRecentTags();
  setSearchTab(state.searchTab);       // paint active tab + right panel
  setTimeout(() => dom.searchInput.focus(), 80);
}

function closeSearch() {
  state.searchOpen = false;
  dom.searchOverlay.classList.remove('open');
  dom.searchInput.value = '';
  state.searchQuery = '';
}

/* ── Screen detail modal ─────────────────────────────────── */

function openDetailModal(index) {
  const screens = state.detailScreens;
  if (!screens.length) return;

  state.detailIndex = Math.max(0, Math.min(index, screens.length - 1));
  state.detailOpen = true;
  dom.detailOverlay.classList.add('open');
  updateDetailModal();
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  state.detailOpen = false;
  dom.detailOverlay.classList.remove('open');
  document.body.style.overflow = '';
  resetCopyBtn();
}

function updateDetailModal() {
  const screens = state.detailScreens;
  const idx = state.detailIndex;
  const item = screens[idx];
  if (!item) return;

  const src = imgPath(item.cat.folder, item.file);
  dom.detailTitle.textContent = displayName(item.file);
  dom.detailImage.src = src;

  // Navigation arrows
  dom.detailPrev.classList.toggle('disabled', idx === 0);
  dom.detailNext.classList.toggle('disabled', idx === screens.length - 1);

  resetCopyBtn();
}

function navigateDetail(dir) {
  const newIdx = state.detailIndex + dir;
  if (newIdx < 0 || newIdx >= state.detailScreens.length) return;
  state.detailIndex = newIdx;
  updateDetailModal();
}

/* ── Save / Copy ─────────────────────────────────────────── */

function resetCopyBtn() {
  dom.btnCopy.classList.remove('copied');
  dom.btnCopyLabel.textContent = 'Copy';
}

function saveCurrentImage() {
  const item = state.detailScreens[state.detailIndex];
  if (!item) return;
  const src = imgPath(item.cat.folder, item.file);
  const filename = item.file;
  const a = document.createElement('a');
  a.href = src;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  showToast('Saved to downloads');
}

async function copyCurrentImage() {
  const item = state.detailScreens[state.detailIndex];
  if (!item) return;
  const src = imgPath(item.cat.folder, item.file);

  try {
    // Fetch the image as a blob
    const response = await fetch(src);
    const blob = await response.blob();
    // Determine type (prefer png)
    const type = blob.type || 'image/png';
    const clipItem = new ClipboardItem({ [type]: blob });
    await navigator.clipboard.write([clipItem]);
    dom.btnCopy.classList.add('copied');
    dom.btnCopyLabel.textContent = 'Copied!';
    showToast('Copied to clipboard');
    setTimeout(() => resetCopyBtn(), 2000);
  } catch (err) {
    console.warn('Clipboard write failed:', err);
    showToast('Copy not supported in this browser — use Save instead');
  }
}

/* ── Toast ───────────────────────────────────────────────── */

let toastTimer = null;

function showToast(msg) {
  dom.toast.textContent = msg;
  dom.toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => dom.toast.classList.remove('show'), 2400);
}

/* ── Event binding ───────────────────────────────────────── */

function bindEvents() {
  // Open search (click + keyboard)
  dom.searchBar.addEventListener('click', openSearch);
  dom.searchBar.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSearch(); }
  });

  // Close search by clicking outside modal
  dom.searchOverlay.addEventListener('click', e => {
    if (e.target === dom.searchOverlay) closeSearch();
  });

  // Search close button
  dom.searchClose.addEventListener('click', closeSearch);

  // Search input: filter categories
  dom.searchInput.addEventListener('input', e => {
    state.searchQuery = e.target.value;
    buildSearchCategories(state.searchQuery);
  });

  // Left-nav tab clicks (UI Components / Screens)
  const tabHandler = (tab) => (e) => {
    setSearchTab(tab);
  };
  dom.searchTabUi.addEventListener('click', tabHandler('ui'));
  dom.searchTabUi.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSearchTab('ui'); }
  });
  dom.searchTabScreens.addEventListener('click', tabHandler('screens'));
  dom.searchTabScreens.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSearchTab('screens'); }
  });

  // Sidebar "All" button
  dom.sidebarAll.addEventListener('click', () => selectCategory(null));

  // Sidebar category items (delegated)
  [dom.uiList, dom.screenList].forEach(list => {
    list.addEventListener('click', e => {
      const btn = e.target.closest('.sidebar-item');
      if (!btn) return;
      const catId = btn.dataset.cat;
      const cat = [...UI_COMPONENTS, ...SCREEN_CATEGORIES].find(c => c.id === catId);
      if (!cat || cat.files.length === 0) return; // skip empty
      selectCategory(catId);
      addRecentCategory(catId);
    });
  });

  // Detail modal close
  dom.detailClose.addEventListener('click', closeDetailModal);
  // Close when clicking the dark backdrop (outside the modal card)
  dom.detailOverlay.addEventListener('click', e => {
    if (e.target === dom.detailOverlay) closeDetailModal();
  });

  // Detail navigation
  dom.detailPrev.addEventListener('click', () => navigateDetail(-1));
  dom.detailNext.addEventListener('click', () => navigateDetail(1));

  // Save / Copy
  dom.btnSave.addEventListener('click', saveCurrentImage);
  dom.btnCopy.addEventListener('click', copyCurrentImage);

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (state.detailOpen) {
      if (e.key === 'Escape') { closeDetailModal(); return; }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); navigateDetail(-1); return; }
      if (e.key === 'ArrowRight') { e.preventDefault(); navigateDetail(1);  return; }
    }
    if (state.searchOpen) {
      if (e.key === 'Escape') { closeSearch(); return; }
    }
    // Open search with Cmd/Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });
}

/* ── Init ────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initPasswordGate();   /* show gate first; showApp() reveals the rest */
  initDom();
  renderSidebar();
  renderGrid();
  bindEvents();
});
