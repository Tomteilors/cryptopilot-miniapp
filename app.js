/* ============================================================
   MOCK — SCREENER SIGNALS
   Структура соответствует будущему /api/screener
   type: volume | oi | funding | whale
   severity: low | medium | high
   direction: buy | sell | null
   ============================================================ */
const MOCK_SCREENER = [
  {
    id: 1, type: "volume", symbol: "BTC", exchange: "Binance",
    title: "Volume Spike",
    body: "$4.2M · 18% of 24h average",
    direction: "buy", severity: "high",
    ts: Math.floor(Date.now() / 1000) - 110,
  },
  {
    id: 2, type: "oi", symbol: "ETH", exchange: "Bybit",
    title: "OI Surge",
    body: "+12.4% open interest in 15 min",
    direction: null, severity: "medium",
    ts: Math.floor(Date.now() / 1000) - 320,
  },
  {
    id: 3, type: "whale", symbol: "USDT", exchange: "ETH chain",
    title: "Whale Move",
    body: "$2.1M — Binance → Unknown wallet",
    direction: null, severity: "medium",
    ts: Math.floor(Date.now() / 1000) - 490,
  },
  {
    id: 4, type: "funding", symbol: "SOL", exchange: "Binance",
    title: "Funding Spike",
    body: "Rate +0.085% · 8.5× average",
    direction: "sell", severity: "high",
    ts: Math.floor(Date.now() / 1000) - 740,
  },
  {
    id: 5, type: "volume", symbol: "SOL", exchange: "OKX",
    title: "Volume Spike",
    body: "$1.8M · 24% of 24h average",
    direction: "sell", severity: "medium",
    ts: Math.floor(Date.now() / 1000) - 920,
  },
  {
    id: 6, type: "oi", symbol: "BTC", exchange: "Binance",
    title: "OI Drop",
    body: "−8.1% open interest in 10 min",
    direction: null, severity: "low",
    ts: Math.floor(Date.now() / 1000) - 1300,
  },
  {
    id: 7, type: "whale", symbol: "BTC", exchange: "BTC chain",
    title: "Whale Move",
    body: "$5.4M — Unknown → Coinbase",
    direction: "sell", severity: "high",
    ts: Math.floor(Date.now() / 1000) - 1800,
  },
];

/* ============================================================
   MOCK RSI DATA
   Структура соответствует будущему /api/rsi?tf=1h
   ============================================================ */
const MOCK_RSI = {
  "15m": [
    { symbol: "BTC",   rsi: 28.4 }, { symbol: "DOGE",  rsi: 22.1 },
    { symbol: "LINK",  rsi: 25.7 }, { symbol: "ETH",   rsi: 31.2 },
    { symbol: "DOT",   rsi: 38.1 }, { symbol: "ADA",   rsi: 55.8 },
    { symbol: "BNB",   rsi: 45.6 }, { symbol: "UNI",   rsi: 61.4 },
    { symbol: "MATIC", rsi: 67.9 }, { symbol: "SOL",   rsi: 74.2 },
    { symbol: "AVAX",  rsi: 79.3 }, { symbol: "LTC",   rsi: 82.5 },
  ],
  "1h": [
    { symbol: "DOGE",  rsi: 27.4 }, { symbol: "LINK",  rsi: 29.3 },
    { symbol: "DOT",   rsi: 35.6 }, { symbol: "ETH",   rsi: 38.9 },
    { symbol: "BTC",   rsi: 42.1 }, { symbol: "ADA",   rsi: 44.2 },
    { symbol: "BNB",   rsi: 52.3 }, { symbol: "UNI",   rsi: 58.1 },
    { symbol: "MATIC", rsi: 63.4 }, { symbol: "SOL",   rsi: 68.7 },
    { symbol: "AVAX",  rsi: 71.8 }, { symbol: "LTC",   rsi: 76.2 },
  ],
  "4h": [
    { symbol: "LINK",  rsi: 37.6 }, { symbol: "DOT",   rsi: 41.3 },
    { symbol: "DOGE",  rsi: 33.8 }, { symbol: "ADA",   rsi: 47.5 },
    { symbol: "ETH",   rsi: 49.2 }, { symbol: "UNI",   rsi: 53.9 },
    { symbol: "BTC",   rsi: 55.3 }, { symbol: "BNB",   rsi: 58.7 },
    { symbol: "MATIC", rsi: 60.8 }, { symbol: "SOL",   rsi: 65.1 },
    { symbol: "AVAX",  rsi: 70.2 }, { symbol: "LTC",   rsi: 68.4 },
  ],
  "1d": [
    { symbol: "ADA",   rsi: 44.7 }, { symbol: "DOT",   rsi: 48.6 },
    { symbol: "ETH",   rsi: 58.1 }, { symbol: "BNB",   rsi: 55.8 },
    { symbol: "BTC",   rsi: 62.4 }, { symbol: "UNI",   rsi: 63.7 },
    { symbol: "MATIC", rsi: 57.4 }, { symbol: "LINK",  rsi: 59.3 },
    { symbol: "DOGE",  rsi: 44.7 }, { symbol: "SOL",   rsi: 72.3 },
    { symbol: "AVAX",  rsi: 68.9 }, { symbol: "LTC",   rsi: 74.8 },
  ],
};

/* ============================================================
   MOCK DATA — DASHBOARD
   В Этапе 3 заменяется на fetch() без изменения renderDashboard
   ============================================================ */
const MOCK = {
  btc_price:        84200,
  btc_change_24h:   2.3,
  eth_price:        1820,
  eth_change_24h:   -1.1,
  funding_rate:     0.0085,   // BTC perp funding rate, %
  total_oi_b:       18.4,     // total open interest, $B
  market_bias:      "Bullish",

  fear_greed:       62,
  fear_greed_label: "Greed",

  btc_dominance:    54.2,
  btc_dom_delta:    0.8,      // 24h change, %

  long_short_ratio: 1.24,

  last_alert: {
    type:  "volume",          // volume | whale | liq | oi
    badge: "Volume Spike",
    title: "⚡ BTC Volume Spike — Binance",
    body:  "$4.2M · 18% of 24h average · Bought",
    time:  "2 min ago"
  }
};

/* ============================================================
   CONFIG
   API_BASE: локально → порт 8001, на проде → api.cryptopilot.se
   ============================================================ */
const API_BASE = (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) ? "http://127.0.0.1:8001" : "https://api.cryptopilot.se";

const APP_VERSION = "v1.0";

/* ============================================================
   DATA LAYER
   getData() — единственная точка получения данных.
   Fallback: если API недоступен — возвращает MOCK.
   ============================================================ */
async function getData() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 7000); // 7s timeout

  try {
    const r = await fetch(`${API_BASE}/api/dashboard`, {
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!r.ok) throw new Error("HTTP " + r.status);
    return await r.json();
  } catch (err) {
    clearTimeout(timer);
    throw err; // пробрасываем — init поймает и покажет fallback
  }
}

/* ============================================================
   UTILS
   ============================================================ */
function fmtPrice(n) {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function fmtPct(pct, decimals = 2) {
  const sign = pct >= 0 ? "+" : "";
  return sign + pct.toFixed(decimals) + "%";
}

function fmtMoney(m) {
  if (Math.abs(m) >= 1000) return "$" + (m / 1000).toFixed(1) + "B";
  if (Math.abs(m) >= 1)    return "$" + m.toFixed(0) + "M";
  return "$" + (m * 1000).toFixed(0) + "K";
}

function applyChange(el, pct) {
  el.textContent = fmtPct(pct);
  el.className = "price-change " + (pct >= 0 ? "up" : "down");
}

function fgIcon(val) {
  if (val >= 75) return "🤑";
  if (val >= 55) return "😀";
  if (val >= 45) return "😐";
  if (val >= 25) return "😨";
  return "😱";
}

/* ============================================================
   RENDER DASHBOARD
   Принимает объект формата /api/dashboard
   ============================================================ */
function renderDashboard(d) {
  /* Prices */
  document.getElementById("btc-price").textContent = fmtPrice(d.btc_price);
  applyChange(document.getElementById("btc-change"), d.btc_change_24h);

  document.getElementById("eth-price").textContent = fmtPrice(d.eth_price);
  applyChange(document.getElementById("eth-change"), d.eth_change_24h);

  /* Stats bar */
  const fundingEl = document.getElementById("funding");
  fundingEl.textContent = fmtPct(d.funding_rate, 4);
  fundingEl.className = "stat-value " + (d.funding_rate >= 0 ? "positive" : "negative");

  document.getElementById("oi").textContent = "$" + d.total_oi_b.toFixed(1) + "B";

  const biasEl = document.getElementById("bias");
  biasEl.textContent = d.market_bias;
  biasEl.className = "stat-value " + (
    d.market_bias === "Bullish" ? "positive" :
    d.market_bias === "Bearish" ? "negative" :
    "bias"
  );

  /* Fear & Greed — direct market state: fear = red, greed = green */
  const fgIconEl = document.querySelector(".metric-card:nth-child(1) .metric-icon");
  if (fgIconEl) fgIconEl.textContent = fgIcon(d.fear_greed);
  const fgValEl = document.getElementById("fear-greed");
  fgValEl.textContent = d.fear_greed;
  fgValEl.className = "metric-value" + (
    d.fear_greed <= 44 ? " down" :
    d.fear_greed >= 60 ? " up" :
    ""
  );
  const fgLabelEl = document.getElementById("fear-greed-label");
  fgLabelEl.textContent = d.fear_greed_label;
  fgLabelEl.className = "metric-sub" + (
    d.fear_greed <= 44 ? " fg-down" :
    d.fear_greed >= 60 ? " fg-up" :
    ""
  );

  /* BTC Dominance */
  const domValEl = document.getElementById("btc-dom");
  domValEl.textContent = d.btc_dominance.toFixed(1) + "%";
  domValEl.className = "metric-value" + (
    d.btc_dom_delta > 0 ? " up" :
    d.btc_dom_delta < 0 ? " down" :
    ""
  );
  const domDelta = document.getElementById("btc-dom-delta");
  domDelta.textContent = (d.btc_dom_delta >= 0 ? "▲ +" : "▼ ") +
    Math.abs(d.btc_dom_delta).toFixed(1) + "% 24h";
  domDelta.className = "metric-sub " + (d.btc_dom_delta >= 0 ? "up" : "down");

  /* Long / Short */
  const lsValEl = document.getElementById("ls-ratio");
  lsValEl.textContent = d.long_short_ratio.toFixed(2);
  lsValEl.className = "metric-value " + (d.long_short_ratio >= 1 ? "up" : "down");
  document.getElementById("ls-label").textContent =
    d.long_short_ratio >= 1 ? "Longs dominate" : "Shorts dominate";

  /* CME Gap — populated separately by loadCmeGap() */

  /* Last Alert */
  const al = d.last_alert;
  const badge = document.getElementById("alert-badge");
  badge.textContent = al.badge;
  badge.className = "alert-badge " + al.type;
  document.getElementById("alert-time").textContent = al.time;
  document.getElementById("alert-title").textContent = al.title;
  document.getElementById("alert-body").textContent = al.body;
}

/* ============================================================
   LOADING STATE
   ============================================================ */
function setLoadingState(on) {
  document.querySelector(".scroll-area").classList.toggle("is-loading", on);
}

/* ============================================================
   MARKET STATUS PILL
   ============================================================ */
function setMarketStatus(online) {
  const pill = document.getElementById("status-pill");
  if (!pill) return;
  if (online) {
    pill.textContent = "ON";
    pill.classList.remove("offline");
  } else {
    pill.textContent = "OFF";
    pill.classList.add("offline");
  }
}

/* ============================================================
   PLACEHOLDER SCREENS (tabs not yet implemented)
   ============================================================ */
function buildPlaceholders() {
  // screener excluded — has its own buildScreener()
  const defs = {};
  for (const [tab, cfg] of Object.entries(defs)) {
    const panel = document.getElementById("tab-" + tab);
    if (!panel) continue;
    panel.innerHTML = `
      <div class="placeholder-screen">
        <div class="ph-icon">${cfg.icon}</div>
        <div class="ph-title">${cfg.title}</div>
        <div class="ph-sub">${cfg.sub}</div>
      </div>`;
  }
}

/* ============================================================
   SCREENER — HELPERS
   ============================================================ */
function timeAgo(ts) {
  const s = Math.floor(Date.now() / 1000) - ts;
  if (s < 60)  return s + "s ago";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  return Math.floor(s / 3600) + "h ago";
}

const SIGNAL_ICONS = {
  vol:     "⚡",
  volume:  "⚡",
  oi:      "📊",
  liq:     "💀",
  funding: "💸",
  whale:   "🐋",
};

const SEVERITY_LABEL = { high: "HIGH", medium: "MED", low: "LOW" };

function signalCardHTML(s) {
  const kind     = s.kind || s.type;
  const icon     = SIGNAL_ICONS[kind] || "•";
  const dirLabel = s.direction === "buy"  ? '<span class="sig-dir buy">↑ BUY</span>'
                 : s.direction === "sell" ? '<span class="sig-dir sell">↓ SELL</span>'
                 : "";
  const sevClass = "sev-" + s.severity;
  const sevLabel = SEVERITY_LABEL[s.severity] || s.severity?.toUpperCase() || "";
  const bodyText = s.subtitle || s.body || "";
  const megaBadge   = s.level === "mega"         ? '<span class="badge-level mega">🚨 MEGA</span>' : "";
  const postedBadge = s.posted_to_channel === true ? '<span class="badge-posted">📢</span>' : "";

  return `
    <div class="signal-card card" data-type="${kind}" data-id="${s.id}">
      <div class="signal-top">
        <span class="signal-icon">${icon}</span>
        <span class="signal-symbol">${s.symbol}</span>
        <span class="signal-badges">
          ${megaBadge}${postedBadge}${dirLabel}
          <span class="signal-sev ${sevClass}">${sevLabel}</span>
        </span>
      </div>
      <div class="signal-type">${s.title}</div>
      <div class="signal-body">${bodyText}</div>
      <div class="signal-meta">
        <span>${s.exchange}</span>
        <span>${timeAgo(s.ts)}</span>
      </div>
    </div>`;
}

/* ============================================================
   CHART & EXCHANGE URL HELPERS
   ============================================================ */
const STABLES = new Set(["USDT", "USDC", "BUSD", "DAI", "TUSD", "FDUSD"]);

function buildChartURL(exchange, symbol) {
  const sym = symbol.toUpperCase();
  if (STABLES.has(sym)) return null;               // no chart for stablecoins
  // TradingView Binance perpetual — works for all exchanges (most liquid data)
  return `https://www.tradingview.com/chart/?symbol=BINANCE:${sym}USDT.P`;
}

function buildExchangeURL(exchange, symbol) {
  const ex  = (exchange || "").toLowerCase().replace(/[\s_-]+/g, "");
  const sym = symbol.toUpperCase();
  if (STABLES.has(sym) && (ex.includes("ethereum") || ex.includes("bnb") || ex.includes("chain"))) {
    return null; // whale on-chain stablecoin — no market page useful
  }
  if (ex.includes("binance"))     return `https://www.binance.com/en/futures/${sym}USDT`;
  if (ex.includes("bybit"))       return `https://www.bybit.com/trade/usdt/${sym}USDT`;
  if (ex.includes("okx"))         return `https://www.okx.com/trade-swap/${sym.toLowerCase()}-usdt-swap`;
  if (ex.includes("hyperliquid")) return `https://app.hyperliquid.xyz/trade/${sym}`;
  return null; // chain or unknown
}

function openExternalLink(url) {
  const tg = window.Telegram?.WebApp;
  if (tg?.openLink) {
    tg.openLink(url);
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

function applyModalBtn(btnId, url, { hide = false } = {}) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.onclick = null;
  if (url) {
    btn.style.display = "";
    btn.disabled = false;
    btn.onclick = () => openExternalLink(url);
  } else if (hide) {
    btn.style.display = "none";
    btn.disabled = true;
  } else {
    btn.style.display = "";
    btn.disabled = true;
  }
}

/* ============================================================
   SIGNAL DETAIL MODAL
   ============================================================ */
function fmtModalTime(ts) {
  const d = new Date(ts * 1000);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    + " · " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function openSignalModal(id) {
  const s = _screenerSignals.find(x => String(x.id) === String(id));
  if (!s) return;

  const kind     = s.kind || s.type;
  const icon     = SIGNAL_ICONS[kind] || "•";
  const dirLabel = s.direction === "buy"  ? '<span class="sig-dir buy">↑ BUY</span>'
                 : s.direction === "sell" ? '<span class="sig-dir sell">↓ SELL</span>'
                 : "";
  const sevClass = "sev-" + s.severity;
  const sevLabel = SEVERITY_LABEL[s.severity] || s.severity?.toUpperCase() || "";

  document.getElementById("modal-icon").textContent   = icon;
  document.getElementById("modal-symbol").textContent = s.symbol;
  document.getElementById("modal-badges").innerHTML   = dirLabel
    + `<span class="signal-sev ${sevClass}">${sevLabel}</span>`;
  document.getElementById("modal-type").textContent     = s.title;
  document.getElementById("modal-exchange").textContent = s.exchange;
  document.getElementById("modal-time").textContent     = fmtModalTime(s.ts);
  document.getElementById("modal-body").textContent     = s.subtitle || s.body || "—";

  applyModalBtn("modal-btn-chart",    buildChartURL(s.exchange, s.symbol));
  applyModalBtn("modal-btn-exchange", buildExchangeURL(s.exchange, s.symbol));
  applyModalBtn("modal-btn-channel",  s.channel_url || null, { hide: true });

  // Status pills
  const statusEl = document.getElementById("modal-status");
  if (statusEl) {
    const pills = [];
    if      (s.level === "mega")   pills.push('<span class="modal-pill sp-mega">🚨 MEGA</span>');
    else if (s.level === "strong") pills.push('<span class="modal-pill sp-strong">🔥 Strong</span>');
    if      (s.posted_to_channel === true)  pills.push('<span class="modal-pill sp-posted">📢 Posted</span>');
    else if (s.posted_to_channel === false) pills.push('<span class="modal-pill sp-not-posted">Not posted</span>');
    if (s.pinned === true) pills.push('<span class="modal-pill sp-pinned">📌 Pinned</span>');
    statusEl.innerHTML = pills.join("");
    statusEl.style.display = pills.length ? "flex" : "none";
  }

  document.getElementById("signal-modal").classList.add("is-open");
}

function closeSignalModal() {
  document.getElementById("signal-modal").classList.remove("is-open");
}

function initModal() {
  const overlay = document.getElementById("signal-modal");
  // Close on overlay tap (outside sheet)
  overlay.addEventListener("click", e => {
    if (e.target === overlay) closeSignalModal();
  });
  // Close button
  document.getElementById("modal-close").addEventListener("click", closeSignalModal);
  // Escape key (desktop / Telegram PC)
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeSignalModal(); _closeCmeModal(); }
  });

  // CME detail modal — close on overlay tap
  const cmeOverlay = document.getElementById("cme-modal");
  if (cmeOverlay) {
    cmeOverlay.addEventListener("click", e => {
      if (e.target === cmeOverlay) _closeCmeModal();
    });
  }
}

/* ============================================================
   SCREENER — BUILD & RENDER
   ============================================================ */
let _userProfile  = null; // shared across getMe() and Settings screen
let _cmeData      = null; // last CME gap API response, used by detail modal
let _activeFilter = "all";
let _activeSort    = "newest";
let _screenerSignals = MOCK_SCREENER;

const SEV_ORDER = { high: 3, medium: 2, low: 1 };

function sortSignals(signals) {
  if (_activeSort === "strongest") {
    return [...signals].sort((a, b) => {
      const diff = (SEV_ORDER[b.severity] || 0) - (SEV_ORDER[a.severity] || 0);
      return diff !== 0 ? diff : b.ts - a.ts;
    });
  }
  return [...signals].sort((a, b) => b.ts - a.ts);
}

function renderSignals(signals) {
  const filtered = _activeFilter === "all"      ? signals
    : _activeFilter === "mega"   ? signals.filter(s => s.level === "mega")
    : _activeFilter === "posted" ? signals.filter(s => s.posted_to_channel === true)
    : signals.filter(s => (s.kind || s.type) === _activeFilter);
  const sorted = sortSignals(filtered);

  const list = document.getElementById("signal-list");
  if (!list) return;

  if (sorted.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <div class="empty-title">No signals</div>
        <div class="empty-sub">Nothing matches the current filter</div>
      </div>`;
    return;
  }

  list.innerHTML = sorted.map(signalCardHTML).join("");
}

function buildScreener() {
  const panel = document.getElementById("tab-screener");
  if (!panel) return;

  const filters = [
    { key: "all",    label: "All" },
    { key: "mega",   label: "🚨 Mega" },
    { key: "posted", label: "📢 Posted" },
    { key: "vol",    label: "⚡ Vol" },
    { key: "oi",     label: "📊 OI" },
    { key: "liq",    label: "💀 Liq" },
    { key: "whale",  label: "🐋 Whale" },
  ];

  const filterHTML = filters.map(f =>
    `<button class="filter-tab${f.key === _activeFilter ? " active" : ""}" data-filter="${f.key}">${f.label}</button>`
  ).join("");

  panel.innerHTML = `
    <div class="screener-header">
      <div class="screener-title-wrap">
        <span class="screener-title">Screener</span>
        <span class="screener-updated" id="screener-updated">Loading…</span>
      </div>
      <div class="screener-sort" id="screener-sort">
        <button class="sort-btn${_activeSort === "newest" ? " active" : ""}" data-sort="newest">Newest</button>
        <button class="sort-btn${_activeSort === "strongest" ? " active" : ""}" data-sort="strongest">Strongest</button>
      </div>
    </div>
    <div class="screener-filters" id="screener-filters">
      ${filterHTML}
    </div>
    <div class="signal-list" id="signal-list"></div>
    <div class="nav-spacer"></div>`;

  // Filter tab click handlers
  document.getElementById("screener-filters").addEventListener("click", e => {
    const btn = e.target.closest(".filter-tab");
    if (!btn) return;
    _activeFilter = btn.dataset.filter;
    document.querySelectorAll(".filter-tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderSignals(_screenerSignals);
  });

  // Sort button click handlers
  document.getElementById("screener-sort").addEventListener("click", e => {
    const btn = e.target.closest(".sort-btn");
    if (!btn) return;
    _activeSort = btn.dataset.sort;
    document.querySelectorAll(".sort-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderSignals(_screenerSignals);
  });

  // Card tap → detail modal (event delegation)
  document.getElementById("signal-list").addEventListener("click", e => {
    const card = e.target.closest(".signal-card");
    if (!card) return;
    openSignalModal(card.dataset.id);
  });

  renderSignals(_screenerSignals);
  loadScreenerData();
}

async function loadScreenerData() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    const r = await fetch(`${API_BASE}/api/screener`, { signal: controller.signal });
    clearTimeout(timer);
    if (!r.ok) throw new Error("HTTP " + r.status);
    const data = await r.json();
    const alerts = data.alerts || [];

    if (alerts.length > 0) {
      _screenerSignals = alerts;
      renderSignals(_screenerSignals);
      const updEl = document.getElementById("screener-updated");
      if (updEl) updEl.textContent = "Live · " + timeAgo(data.updated_at);
    } else {
      _screenerSignals = MOCK_SCREENER;
      renderSignals(_screenerSignals);
      const updEl = document.getElementById("screener-updated");
      if (updEl) updEl.textContent = "No live signals yet";
    }
  } catch (_) {
    _screenerSignals = MOCK_SCREENER;
    renderSignals(_screenerSignals);
    const updEl = document.getElementById("screener-updated");
    if (updEl) updEl.textContent = "Offline · mock data";
  }
}

/* ============================================================
   SETTINGS / PROFILE SCREEN
   ============================================================ */
function buildSettings() {
  const panel = document.getElementById("tab-settings");
  if (!panel) return;

  panel.innerHTML = `
    <div class="settings-screen">

      <!-- PROFILE -->
      <div class="settings-section card">
        <div class="settings-section-title">Profile</div>
        <div class="settings-profile-top">
          <div class="settings-avatar" id="settings-avatar">?</div>
          <div class="settings-user-info">
            <div class="settings-display-name" id="settings-name">Loading…</div>
            <div class="settings-username"     id="settings-username"></div>
          </div>
          <div class="settings-user-badges" id="settings-badges"></div>
        </div>
        <div class="settings-row">
          <span class="settings-label">Telegram ID</span>
          <span class="settings-value" id="settings-tid">—</span>
        </div>
        <div class="settings-row">
          <span class="settings-label">Language</span>
          <span class="settings-value" id="settings-lang">—</span>
        </div>
        <div class="settings-row">
          <span class="settings-label">Member since</span>
          <span class="settings-value" id="settings-since">—</span>
        </div>
      </div>

      <!-- APP STATUS -->
      <div class="settings-section card">
        <div class="settings-section-title">App Status</div>
        <div class="settings-row">
          <span class="settings-label">Version</span>
          <span class="settings-value dim">${APP_VERSION}</span>
        </div>
        <div class="settings-row">
          <span class="settings-label">API</span>
          <span class="settings-value dim" id="settings-api-status">Checking…</span>
        </div>
        <div class="settings-row">
          <span class="settings-label">Dashboard</span>
          <span class="settings-value live">Live</span>
        </div>
        <div class="settings-row">
          <span class="settings-label">Screener</span>
          <span class="settings-value live">Live</span>
        </div>
        <div class="settings-row">
          <span class="settings-label">RSI Data</span>
          <span class="settings-value live">Live</span>
        </div>
      </div>

      <!-- USAGE (admin only, shown dynamically) -->
      <div class="settings-section card" id="settings-usage-section" style="display:none">
        <div class="settings-section-title">Usage</div>
        <div class="settings-row">
          <span class="settings-label">Tokens</span>
          <span class="settings-value dim" id="usage-tokens">—</span>
        </div>
        <div class="settings-row">
          <span class="settings-label">Est. Cost</span>
          <span class="settings-value dim" id="usage-cost">—</span>
        </div>
        <div class="settings-row">
          <span class="settings-label">Entries</span>
          <span class="settings-value dim" id="usage-entries">—</span>
        </div>
      </div>

      <!-- PREFERENCES -->
      <div class="settings-section card">
        <div class="settings-section-title">Preferences</div>
        <div class="settings-row">
          <span class="settings-label">Default tab</span>
          <span class="settings-value dim" id="settings-default-tab">${_getDefaultTabLabel()}</span>
        </div>
        <div class="settings-row">
          <span class="settings-label">Alerts</span>
          <span class="settings-value dim">Coming soon</span>
        </div>
        <div class="settings-row">
          <span class="settings-label">Wallets</span>
          <span class="settings-value dim">Coming soon</span>
        </div>
      </div>

      <!-- ACTIONS -->
      <div class="settings-section card settings-actions">
        <button class="settings-action-btn" id="settings-refresh-btn">🔄 Refresh Profile</button>
        <button class="settings-action-btn" id="settings-support-btn">💬 Support Community</button>
        <button class="settings-action-btn" id="settings-channel-btn">📢 Screener Channel</button>
      </div>

      <div class="nav-spacer"></div>
    </div>`;

  // Load profile (use cached if available)
  loadSettingsProfile();
  checkApiStatus();

  document.getElementById("settings-refresh-btn").addEventListener("click", () => {
    document.getElementById("settings-name").textContent = "Loading…";
    _userProfile = null;
    loadSettingsProfile();
  });

  document.getElementById("settings-support-btn").addEventListener("click", () => {
    openExternalLink("https://t.me/+YDkeY1vXzsllOGVk");
  });

  document.getElementById("settings-channel-btn").addEventListener("click", () => {
    openExternalLink("https://t.me/+MhZkGvxjGXJkMjg0");
  });
}

async function loadSettingsProfile() {
  // Use cached profile if already fetched
  if (_userProfile) {
    renderSettingsProfile(_userProfile);
    return;
  }

  const tg = window.Telegram?.WebApp;
  if (!tg || !tg.initData) {
    renderSettingsProfile(null);
    return;
  }

  try {
    const r = await fetch(`${API_BASE}/api/me`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ init_data: tg.initData }),
    });
    const data = await r.json();
    if (r.ok && data.ok) {
      _userProfile = data;
      renderSettingsProfile(data);
    } else {
      renderSettingsProfile(null);
    }
  } catch (_) {
    renderSettingsProfile(null);
  }
}

function renderSettingsProfile(profile) {
  const avatarEl  = document.getElementById("settings-avatar");
  const nameEl    = document.getElementById("settings-name");
  const userEl    = document.getElementById("settings-username");
  const tidEl     = document.getElementById("settings-tid");
  const langEl    = document.getElementById("settings-lang");
  const sinceEl   = document.getElementById("settings-since");
  const badgesEl  = document.getElementById("settings-badges");
  if (!avatarEl) return; // panel not rendered yet

  if (!profile) {
    avatarEl.textContent = "?";
    nameEl.textContent   = "Not connected";
    userEl.textContent   = "Open in Telegram to see profile";
    tidEl.textContent = langEl.textContent = sinceEl.textContent = "—";
    badgesEl.innerHTML   = "";
    return;
  }

  avatarEl.textContent = (profile.first_name || "?")[0].toUpperCase();
  nameEl.textContent   = profile.first_name || "—";
  userEl.textContent   = profile.username ? "@" + profile.username : "";
  tidEl.textContent    = profile.telegram_id;
  langEl.textContent   = (profile.language_code || "en").toUpperCase();

  const since = profile.first_seen_at
    ? new Date(profile.first_seen_at * 1000).toLocaleDateString("en-GB",
        { day: "2-digit", month: "short", year: "numeric" })
    : "—";
  sinceEl.textContent = since;

  const badges = [];
  if (profile.is_premium) badges.push('<span class="settings-badge gold">Premium</span>');
  else                     badges.push('<span class="settings-badge muted">Free</span>');
  if (profile.is_admin)    badges.push('<span class="settings-badge teal">Admin</span>');
  badgesEl.innerHTML = badges.join("");

  if (profile.is_admin) loadUsageBlock();
}

async function loadUsageBlock() {
  const section = document.getElementById("settings-usage-section");
  if (!section) return;
  section.style.display = "";

  const tg = window.Telegram?.WebApp;
  if (!tg?.initData) return;

  try {
    const r = await fetch(`${API_BASE}/api/usage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ init_data: tg.initData }),
    });
    if (!r.ok) return;
    const d = await r.json();
    document.getElementById("usage-tokens").textContent  = (d.tokens  || 0).toLocaleString("en-US");
    document.getElementById("usage-cost").textContent    = "$" + (d.cost || 0).toFixed(4);
    document.getElementById("usage-entries").textContent = d.entries || 0;
  } catch (_) {
    // leave "—" placeholders
  }
}

async function checkApiStatus() {
  const el = document.getElementById("settings-api-status");
  if (!el) return;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const r = await fetch(`${API_BASE}/health`, { signal: controller.signal });
    clearTimeout(timer);
    el.textContent  = r.ok ? "Connected" : "Error";
    el.className    = "settings-value " + (r.ok ? "live" : "error");
  } catch (_) {
    el.textContent = "Offline";
    el.className   = "settings-value error";
  }
}

/* ============================================================
   RSI SCREEN
   ============================================================ */
function rsiZone(rsi) {
  if (rsi < 30) return "oversold";
  if (rsi > 70) return "overbought";
  return "neutral";
}

function rsiItemHTML(item) {
  const zone  = rsiZone(item.rsi);
  const label = zone === "oversold" ? "Oversold" : zone === "overbought" ? "Overbought" : "Neutral";
  const pct   = Math.min(Math.max(item.rsi, 2), 98); // keep dot inside bar visually

  return `
    <div class="rsi-item card">
      <div class="rsi-item-row">
        <span class="rsi-symbol">${item.symbol}</span>
        <div class="rsi-item-right">
          <span class="rsi-value ${zone}">${item.rsi.toFixed(1)}</span>
          <span class="rsi-badge ${zone}">${label}</span>
        </div>
      </div>
      <div class="rsi-bar">
        <div class="rsi-dot ${zone}" style="left:${pct}%"></div>
      </div>
    </div>`;
}

function buildRSI() {
  const panel = document.getElementById("tab-rsi");
  if (!panel) return;

  const timeframes = ["15m", "1h", "4h", "1d"];
  const zones      = [
    { key: "all",        label: "All" },
    { key: "oversold",   label: "Oversold" },
    { key: "neutral",    label: "Neutral" },
    { key: "overbought", label: "Overbought" },
  ];

  const tfHTML   = timeframes.map(tf =>
    `<button class="rsi-tab${tf === "1h" ? " active" : ""}" data-tf="${tf}">${tf}</button>`
  ).join("");

  const zoneHTML = zones.map(z =>
    `<button class="rsi-tab${z.key === "all" ? " active" : ""}" data-zone="${z.key}">${z.label}</button>`
  ).join("");

  panel.innerHTML = `
    <div class="rsi-screen">
      <div class="rsi-screen-header">
        <div>
          <span class="rsi-screen-title">RSI Scanner</span>
          <span class="rsi-screen-sub">Oversold &amp; overbought signals</span>
        </div>
        <span class="screener-updated" id="rsi-updated">Loading…</span>
      </div>
      <div class="rsi-controls">
        <div class="rsi-tf-row"   id="rsi-tf-row">${tfHTML}</div>
        <div class="rsi-zone-row" id="rsi-zone-row">${zoneHTML}</div>
      </div>
      <div class="rsi-list" id="rsi-list"></div>
      <div class="nav-spacer"></div>
    </div>`;

  let activeTf    = "1h";
  let activeZone  = "all";
  let _rsiData    = {};   // tf → items array (live or mock)

  function renderRSI() {
    const data = _rsiData[activeTf] || MOCK_RSI[activeTf] || [];

    let filtered = activeZone === "all"
      ? data
      : data.filter(item => rsiZone(item.rsi) === activeZone);

    // Sort: oversold ascending, overbought descending, neutral by distance from 50
    if (activeZone === "oversold") {
      filtered = [...filtered].sort((a, b) => a.rsi - b.rsi);
    } else if (activeZone === "overbought") {
      filtered = [...filtered].sort((a, b) => b.rsi - a.rsi);
    } else {
      // All / Neutral: oversold first → neutral → overbought
      filtered = [...filtered].sort((a, b) => {
        const za = rsiZone(a.rsi) === "oversold" ? 0 : rsiZone(a.rsi) === "neutral" ? 1 : 2;
        const zb = rsiZone(b.rsi) === "oversold" ? 0 : rsiZone(b.rsi) === "neutral" ? 1 : 2;
        return za !== zb ? za - zb : a.rsi - b.rsi;
      });
    }

    const list = document.getElementById("rsi-list");
    if (!list) return;

    if (filtered.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📊</div>
          <div class="empty-title">No signals</div>
          <div class="empty-sub">No coins in this zone for ${activeTf}</div>
        </div>`;
      return;
    }

    list.innerHTML = filtered.map(rsiItemHTML).join("");
  }

  // Timeframe click
  document.getElementById("rsi-tf-row").addEventListener("click", e => {
    const btn = e.target.closest(".rsi-tab");
    if (!btn) return;
    activeTf = btn.dataset.tf;
    document.querySelectorAll("#rsi-tf-row .rsi-tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderRSI();
    // Fetch if not cached
    if (!_rsiData[activeTf]) loadRSIData(activeTf);
  });

  // Zone filter click
  document.getElementById("rsi-zone-row").addEventListener("click", e => {
    const btn = e.target.closest(".rsi-tab");
    if (!btn) return;
    activeZone = btn.dataset.zone;
    document.querySelectorAll("#rsi-zone-row .rsi-tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderRSI();
  });

  async function loadRSIData(tf) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      const r = await fetch(`${API_BASE}/api/rsi?tf=${tf}`, { signal: controller.signal });
      clearTimeout(timer);
      if (!r.ok) throw new Error("HTTP " + r.status);
      const data = await r.json();
      if (Array.isArray(data.items) && data.items.length > 0) {
        _rsiData[tf] = data.items;
        if (activeTf === tf) renderRSI();
        const updEl = document.getElementById("rsi-updated");
        if (updEl) updEl.textContent = "Live · " + timeAgo(data.updated_at);
      }
    } catch (_) {
      // fallback: MOCK_RSI already used in renderRSI()
      const updEl = document.getElementById("rsi-updated");
      if (updEl) updEl.textContent = "Offline · mock data";
    }
  }

  renderRSI();
  loadRSIData(activeTf);
}

/* ============================================================
   CALC — FORMATTERS
   ============================================================ */
function calcFmtUSD(n) {
  if (n >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000)     return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return "$" + n.toFixed(2);
}

function calcFmtSize(n) {
  if (n >= 1_000) return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
  if (n >= 1)     return n.toFixed(4);
  if (n >= 0.001) return n.toFixed(6);
  return n.toExponential(3);
}

/* ============================================================
   CALC SCREEN
   ============================================================ */
function buildCalc() {
  const panel = document.getElementById("tab-calc");
  if (!panel) return;

  panel.innerHTML = `
    <div class="calc-screen">

      <!-- Direction -->
      <div class="calc-segment" id="calc-segment">
        <button class="seg-btn active" data-dir="long">↑ Long</button>
        <button class="seg-btn" data-dir="short">↓ Short</button>
      </div>

      <!-- Account & Risk -->
      <div class="calc-group card">
        <div class="calc-group-title">Account & Risk</div>
        <div class="calc-field">
          <label class="calc-label">Deposit</label>
          <div class="calc-input-wrap">
            <span class="calc-prefix">$</span>
            <input class="calc-input" id="c-account" type="number" inputmode="decimal" placeholder="10 000" min="0" step="any"/>
          </div>
        </div>
        <div class="calc-field">
          <label class="calc-label">Risk</label>
          <div class="calc-input-wrap">
            <input class="calc-input" id="c-risk" type="number" inputmode="decimal" placeholder="1" min="0.01" max="100" step="any"/>
            <span class="calc-suffix">%</span>
          </div>
        </div>
        <div class="calc-presets" id="calc-presets">
          <button class="preset-btn" data-val="0.25">0.25%</button>
          <button class="preset-btn" data-val="0.5">0.5%</button>
          <button class="preset-btn" data-val="1">1%</button>
          <button class="preset-btn" data-val="2">2%</button>
        </div>
      </div>

      <!-- Trade -->
      <div class="calc-group card">
        <div class="calc-group-title">Trade</div>
        <div class="calc-field">
          <label class="calc-label">Entry 1</label>
          <div class="calc-input-wrap">
            <span class="calc-prefix">$</span>
            <input class="calc-input" id="c-entry" type="number" inputmode="decimal" placeholder="0.00" min="0" step="any"/>
          </div>
        </div>
        <div class="calc-field" id="entry2-field" style="display:none">
          <label class="calc-label">Entry 2 <span class="calc-optional">avg</span></label>
          <div class="calc-input-wrap">
            <span class="calc-prefix">$</span>
            <input class="calc-input" id="c-entry2" type="number" inputmode="decimal" placeholder="0.00" min="0" step="any"/>
          </div>
        </div>
        <button class="calc-expand-btn" id="entry2-toggle">+ Entry 2</button>

        <div class="calc-field">
          <label class="calc-label">Stop Loss</label>
          <div class="calc-input-wrap" id="c-sl-wrap">
            <span class="calc-prefix">$</span>
            <input class="calc-input" id="c-sl" type="number" inputmode="decimal" placeholder="0.00" min="0" step="any"/>
          </div>
        </div>
        <div class="calc-field">
          <label class="calc-label">Target 1</label>
          <div class="calc-input-wrap">
            <span class="calc-prefix">$</span>
            <input class="calc-input" id="c-tp" type="number" inputmode="decimal" placeholder="0.00" min="0" step="any"/>
          </div>
        </div>
        <div class="calc-field" id="target2-field" style="display:none">
          <label class="calc-label">Target 2</label>
          <div class="calc-input-wrap">
            <span class="calc-prefix">$</span>
            <input class="calc-input" id="c-tp2" type="number" inputmode="decimal" placeholder="0.00" min="0" step="any"/>
          </div>
        </div>
        <button class="calc-expand-btn" id="target2-toggle">+ Target 2</button>

        <!-- Advanced — Leverage -->
        <button class="calc-advanced-toggle" id="adv-toggle">
          <span>Advanced</span>
          <span id="adv-arrow" class="calc-adv-arrow">▾</span>
        </button>
        <div id="adv-panel" style="display:none">
          <div class="calc-field calc-adv-field">
            <label class="calc-label">Leverage <span class="calc-optional">optional</span></label>
            <div class="calc-input-wrap">
              <input class="calc-input" id="c-lev" type="number" inputmode="numeric" placeholder="1" min="1" max="125" step="1"/>
              <span class="calc-suffix">×</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Result -->
      <div class="calc-results card" id="calc-results">
        <div class="calc-result-empty" id="calc-empty">
          <span id="calc-empty-msg">Enter entry and stop loss to calculate</span>
        </div>
        <div class="calc-result-rows" id="calc-rows" style="display:none">
          <div class="calc-result-row">
            <span class="calc-result-label">Risk Amount</span>
            <span class="calc-result-value red" id="r-loss">—</span>
          </div>
          <div class="calc-result-row">
            <span class="calc-result-label">Position Size</span>
            <span class="calc-result-value" id="r-size">—</span>
          </div>
          <div class="calc-result-row" id="r-margin-row" style="display:none">
            <span class="calc-result-label">Margin Req.</span>
            <span class="calc-result-value" id="r-margin">—</span>
          </div>
          <div class="calc-result-row" id="r-reward-row" style="display:none">
            <span class="calc-result-label">Reward T1</span>
            <span class="calc-result-value green" id="r-reward">—</span>
          </div>
          <div class="calc-result-row" id="r-reward2-row" style="display:none">
            <span class="calc-result-label">Reward T2</span>
            <span class="calc-result-value green" id="r-reward2">—</span>
          </div>
          <div class="calc-result-row" id="r-rr-row" style="display:none">
            <span class="calc-result-label">R/R</span>
            <span class="calc-result-value gold" id="r-rr">—</span>
          </div>
        </div>
      </div>

      <button class="calc-reset-btn" id="calc-reset">Reset</button>

      <div class="nav-spacer"></div>
    </div>`;

  let direction = "long";

  // ── Calc logic ────────────────────────────────────────────────
  function calcUpdate() {
    const entry1  = parseFloat(document.getElementById("c-entry").value);
    const entry2v = parseFloat(document.getElementById("c-entry2").value);
    const sl      = parseFloat(document.getElementById("c-sl").value);
    const tp1     = parseFloat(document.getElementById("c-tp").value);
    const tp2v    = parseFloat(document.getElementById("c-tp2").value);
    const account = parseFloat(document.getElementById("c-account").value);
    const riskPct = parseFloat(document.getElementById("c-risk").value);
    const lev     = Math.max(1, parseFloat(document.getElementById("c-lev").value) || 1);

    const empty    = document.getElementById("calc-empty");
    const emptyMsg = document.getElementById("calc-empty-msg");
    const rows     = document.getElementById("calc-rows");
    const slWrap   = document.getElementById("c-sl-wrap");

    function showEmpty(msg) {
      emptyMsg.textContent = msg;
      empty.style.display  = "";
      rows.style.display   = "none";
      slWrap.classList.remove("error");
    }

    if (!entry1 || !sl || !account || !riskPct || entry1 <= 0 || sl <= 0 || account <= 0 || riskPct <= 0) {
      showEmpty("Enter entry and stop loss to calculate");
      return;
    }

    // Effective entry: average of Entry1 + Entry2 if both provided
    const entry = (entry2v > 0) ? (entry1 + entry2v) / 2 : entry1;
    const riskPerUnit = direction === "long" ? entry - sl : sl - entry;

    if (riskPerUnit <= 0) {
      slWrap.classList.add("error");
      showEmpty(direction === "long"
        ? "Stop loss must be below entry for Long"
        : "Stop loss must be above entry for Short");
      return;
    }

    slWrap.classList.remove("error");

    const riskAmount = account * (riskPct / 100);
    const posSize    = riskAmount / riskPerUnit;
    const notional   = posSize * entry;
    const marginReq  = notional / lev;

    document.getElementById("r-loss").textContent = "−" + calcFmtUSD(riskAmount);
    document.getElementById("r-size").textContent = calcFmtSize(posSize) + " units";

    const marginRow = document.getElementById("r-margin-row");
    if (lev > 1) {
      document.getElementById("r-margin").textContent = calcFmtUSD(marginReq);
      marginRow.style.display = "";
    } else {
      marginRow.style.display = "none";
    }

    // Target 1
    const rewardRow = document.getElementById("r-reward-row");
    const rrRow     = document.getElementById("r-rr-row");
    if (tp1 > 0) {
      const rpu1 = direction === "long" ? tp1 - entry : entry - tp1;
      if (rpu1 > 0) {
        document.getElementById("r-reward").textContent = "+" + calcFmtUSD(posSize * rpu1);
        document.getElementById("r-rr").textContent     = "1 : " + (rpu1 / riskPerUnit).toFixed(2);
        rewardRow.style.display = "";
        rrRow.style.display     = "";
      } else {
        rewardRow.style.display = "none";
        rrRow.style.display     = "none";
      }
    } else {
      rewardRow.style.display = "none";
      rrRow.style.display     = "none";
    }

    // Target 2
    const reward2Row = document.getElementById("r-reward2-row");
    if (tp2v > 0) {
      const rpu2 = direction === "long" ? tp2v - entry : entry - tp2v;
      if (rpu2 > 0) {
        document.getElementById("r-reward2").textContent = "+" + calcFmtUSD(posSize * rpu2);
        reward2Row.style.display = "";
      } else {
        reward2Row.style.display = "none";
      }
    } else {
      reward2Row.style.display = "none";
    }

    empty.style.display = "none";
    rows.style.display  = "";
  }

  // Direction toggle
  document.getElementById("calc-segment").addEventListener("click", e => {
    const btn = e.target.closest(".seg-btn");
    if (!btn) return;
    direction = btn.dataset.dir;
    document.querySelectorAll(".seg-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    calcUpdate();
  });

  // Risk % presets
  document.getElementById("calc-presets").addEventListener("click", e => {
    const btn = e.target.closest(".preset-btn");
    if (!btn) return;
    document.getElementById("c-risk").value = btn.dataset.val;
    document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    calcUpdate();
  });

  // Risk input → sync active preset highlight
  document.getElementById("c-risk").addEventListener("input", () => {
    const val = document.getElementById("c-risk").value;
    document.querySelectorAll(".preset-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.val === val);
    });
    calcUpdate();
  });

  // Entry 2 toggle
  document.getElementById("entry2-toggle").addEventListener("click", () => {
    const field = document.getElementById("entry2-field");
    const btn   = document.getElementById("entry2-toggle");
    const show  = field.style.display === "none";
    field.style.display = show ? "" : "none";
    btn.textContent     = show ? "− Entry 2" : "+ Entry 2";
    if (!show) document.getElementById("c-entry2").value = "";
    calcUpdate();
  });

  // Target 2 toggle
  document.getElementById("target2-toggle").addEventListener("click", () => {
    const field = document.getElementById("target2-field");
    const btn   = document.getElementById("target2-toggle");
    const show  = field.style.display === "none";
    field.style.display = show ? "" : "none";
    btn.textContent     = show ? "− Target 2" : "+ Target 2";
    if (!show) document.getElementById("c-tp2").value = "";
    calcUpdate();
  });

  // Advanced (Leverage) toggle
  document.getElementById("adv-toggle").addEventListener("click", () => {
    const panel = document.getElementById("adv-panel");
    const arrow = document.getElementById("adv-arrow");
    const show  = panel.style.display === "none";
    panel.style.display = show ? "" : "none";
    arrow.textContent   = show ? "▴" : "▾";
  });

  // Reset
  document.getElementById("calc-reset").addEventListener("click", () => {
    ["c-account","c-risk","c-entry","c-entry2","c-sl","c-tp","c-tp2","c-lev"].forEach(id => {
      document.getElementById(id).value = "";
    });
    // Collapse optional fields
    document.getElementById("entry2-field").style.display  = "none";
    document.getElementById("entry2-toggle").textContent   = "+ Entry 2";
    document.getElementById("target2-field").style.display = "none";
    document.getElementById("target2-toggle").textContent  = "+ Target 2";
    document.getElementById("adv-panel").style.display     = "none";
    document.getElementById("adv-arrow").textContent       = "▾";
    document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
    document.getElementById("c-sl-wrap").classList.remove("error");
    calcUpdate();
  });

  // Live recalculation
  ["c-entry","c-entry2","c-sl","c-tp","c-tp2","c-account","c-lev"].forEach(id => {
    document.getElementById(id).addEventListener("input", calcUpdate);
  });
}

/* ============================================================
   TAB NAVIGATION
   ============================================================ */
const TAB_LABELS = { dashboard: "Dashboard", screener: "Screener", rsi: "RSI", calc: "Calc", settings: "Settings" };

function _getDefaultTabLabel() {
  const tab = localStorage.getItem("cp_default_tab") || "dashboard";
  return TAB_LABELS[tab] || "Dashboard";
}

function _activateTab(target) {
  const navItems = document.querySelectorAll(".nav-item");
  const panels   = document.querySelectorAll(".tab-panel");
  navItems.forEach(b => b.classList.remove("active"));
  panels.forEach(p => p.classList.remove("active"));
  const btn = document.querySelector(`.nav-item[data-tab="${target}"]`);
  if (btn) btn.classList.add("active");
  const panel = document.getElementById("tab-" + target);
  if (panel) panel.classList.add("active");
}

function initTabs() {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      _activateTab(target);
      localStorage.setItem("cp_default_tab", target);
      // Update settings default tab label if visible
      const dtEl = document.getElementById("settings-default-tab");
      if (dtEl) dtEl.textContent = TAB_LABELS[target] || target;
    });
  });

  // Restore saved tab on startup
  const savedTab = localStorage.getItem("cp_default_tab");
  if (savedTab && savedTab !== "dashboard") {
    _activateTab(savedTab);
  }
}

/* ============================================================
   TELEGRAM WEBAPP INIT
   ============================================================ */
/* Pins --tg-vh to viewportStableHeight so the layout doesn't jump
   when the keyboard opens/closes in Telegram WebView on iOS.
   Falls back gracefully in browser mode (tg or stableHeight absent). */
function _lockAppHeight(tg) {
  const h = tg?.viewportStableHeight;
  if (h && h > 100) {
    document.documentElement.style.setProperty("--tg-vh", h + "px");
  }
}

function initTelegram() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;
  tg.ready();
  tg.expand();
  if (typeof tg.disableVerticalSwipes === "function") tg.disableVerticalSwipes();
  if (typeof tg.requestFullscreen    === "function") tg.requestFullscreen();
  if (typeof tg.setBackgroundColor   === "function") tg.setBackgroundColor("#0d1117");
  if (typeof tg.setHeaderColor       === "function") tg.setHeaderColor("#0d1117");
  // Lock layout height to stable viewport (keyboard-open safe)
  _lockAppHeight(tg);
  tg.onEvent("viewportChanged", () => _lockAppHeight(tg));
}

/* ============================================================
   TELEGRAM AUTH
   Отправляет initData на backend для серверной валидации.
   Результат в console — для отладки и будущего access control.
   Не блокирует загрузку Dashboard.
   ============================================================ */
async function authTelegram() {
  const tg = window.Telegram?.WebApp;
  if (!tg || !tg.initData) {
    console.log("[auth] No initData — browser mode, skipping auth");
    return null;
  }

  try {
    const r = await fetch(`${API_BASE}/api/auth/telegram`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ init_data: tg.initData }),
    });
    const data = await r.json();

    if (r.ok && data.ok) {
      console.log("[auth] ✅ Telegram user verified:", {
        id:       data.telegram_id,
        username: data.username || "(no username)",
        name:     data.first_name,
        lang:     data.language_code,
      });
      return data;
    } else {
      console.warn("[auth] ❌ Auth rejected:", data.detail);
      return null;
    }
  } catch (err) {
    console.warn("[auth] ⚠️ Auth request failed:", err.message);
    return null;
  }
}

async function getMe() {
  const tg = window.Telegram?.WebApp;
  if (!tg || !tg.initData) {
    console.log("[me] No initData — skipping");
    return null;
  }

  try {
    const r = await fetch(`${API_BASE}/api/me`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ init_data: tg.initData }),
    });
    const data = await r.json();

    if (r.ok && data.ok) {
      _userProfile = data;
      console.log("[me] 👤 User profile:", {
        id:          data.telegram_id,
        name:        data.first_name,
        username:    data.username || "(none)",
        lang:        data.language_code,
        first_seen:  new Date(data.first_seen_at * 1000).toLocaleString(),
        last_seen:   new Date(data.last_seen_at  * 1000).toLocaleString(),
        is_premium:  data.is_premium,
        is_admin:    data.is_admin,
      });
      return data;
    } else {
      console.warn("[me] ❌ Failed:", data.detail);
      return null;
    }
  } catch (err) {
    console.warn("[me] ⚠️ Request failed:", err.message);
    return null;
  }
}

/* ============================================================
   DASHBOARD — CME GAP CARD
   Fetches /api/cme_gap independently (not part of /api/dashboard).
   ============================================================ */
function _fmtK(n) {
  // Format price compactly: 66964 → "66,964"
  return Math.round(n).toLocaleString("en-US");
}

async function loadCmeGap() {
  const statusEl = document.getElementById("cme-status");
  const subEl    = document.getElementById("cme-sub");
  if (!statusEl) return;

  // Wire up CME card tap → detail modal (once)
  const cmeCard = document.getElementById("cme-card");
  if (cmeCard && !cmeCard._cmeModalBound) {
    cmeCard._cmeModalBound = true;
    cmeCard.addEventListener("click", _openCmeModal);
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    const r = await fetch(`${API_BASE}/api/cme_gap`, { signal: controller.signal });
    clearTimeout(timer);
    if (!r.ok) throw new Error("HTTP " + r.status);
    const d = await r.json();
    _cmeData = d; // store for modal

    let valueText, subText, colorClass = "";
    const rangeEl  = document.getElementById("cme-range");
    const olderEl  = document.getElementById("cme-older");

    if (d.status === "open") {
      const arrow = d.direction === "up" ? "↑" : "↓";
      valueText  = arrow + " Open";
      colorClass = d.direction === "up" ? " up" : " down";
      const sign = d.direction === "up" ? "+" : "−";
      subText = d.gap_size
        ? sign + "$" + _fmtK(d.gap_size) + (d.gap_pct ? " (" + d.gap_pct + "%)" : "")
        : "—";
      if (rangeEl && d.gap_low != null && d.gap_high != null) {
        rangeEl.textContent = _fmtK(d.gap_low) + " → " + _fmtK(d.gap_high);
        rangeEl.style.display = "";
      }
      if (olderEl) olderEl.style.display = "none";
    } else if (d.status === "closed") {
      valueText = "Closed";
      subText   = "Gap filled ✓";
      if (rangeEl) rangeEl.style.display = "none";
      // Secondary line: older open gaps count
      const olderCount = (d.open_gaps || []).length;
      if (olderEl) {
        if (olderCount > 0) {
          olderEl.textContent = olderCount === 1 ? "1 older open gap ↓" : olderCount + " older open gaps ↓";
          olderEl.style.display = "";
        } else {
          olderEl.style.display = "none";
        }
      }
    } else if (d.status === "no_gap") {
      valueText = "No gap";
      subText   = "< $50 diff";
      if (rangeEl) rangeEl.style.display = "none";
      if (olderEl) olderEl.style.display = "none";
    } else {
      valueText = "—";
      subText   = "No data";
      if (rangeEl) rangeEl.style.display = "none";
      if (olderEl) olderEl.style.display = "none";
    }

    statusEl.textContent = valueText;
    statusEl.className   = "metric-value" + colorClass;
    subEl.textContent    = subText;

    // Historical open gaps section (card below).
    // If current status is "open", skip index 0 (current week already shown in card).
    const historicalGaps = d.status === "open"
      ? (d.open_gaps || []).slice(1)
      : (d.open_gaps || []);
    _renderOpenGaps(historicalGaps, d.status === "closed");
  } catch (_) {
    statusEl.textContent = "—";
    statusEl.className   = "metric-value";
    subEl.textContent    = "Unavailable";
  }
}

function _renderOpenGaps(gaps, currentClosed = false) {
  const section   = document.getElementById("cme-gaps-section");
  const list      = document.getElementById("cme-gaps-list");
  const countEl   = document.getElementById("cme-gaps-count");
  const titleEl   = document.querySelector("#cme-gaps-section .cme-gaps-title");
  if (!section || !list) return;

  const display = gaps.slice(0, 3);

  if (display.length === 0) {
    section.style.display = "none";
    return;
  }

  // Update title: "Older Open Gaps" when current is closed, else "Open CME Gaps"
  if (titleEl) titleEl.textContent = currentClosed ? "Older Open Gaps" : "Open CME Gaps";
  if (countEl) countEl.textContent = gaps.length === 1 ? "1 gap" : gaps.length + " gaps";

  list.innerHTML = display.map(g => {
    const arrow    = g.direction === "up" ? "↑" : "↓";
    const sizeSign = g.direction === "up" ? "+" : "−";
    const sizeClass = g.direction === "up" ? "up" : "down";
    // Week: "2026-03-28" → "Mar 28"
    const dt       = new Date(g.week + "T12:00:00Z");
    const weekLabel = dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    return `
      <div class="cme-gap-row">
        <span class="cme-gap-week">${weekLabel}</span>
        <span class="cme-gap-range">${_fmtK(g.gap_low)} – ${_fmtK(g.gap_high)}</span>
        <span class="cme-gap-size ${sizeClass}">${arrow} ${sizeSign}$${_fmtK(g.gap_size)}</span>
      </div>`;
  }).join("");

  section.style.display = "";
}

function _openCmeModal() {
  const d = _cmeData;
  if (!d) return;

  const overlay = document.getElementById("cme-modal");
  const content = document.getElementById("cme-modal-content");
  if (!overlay || !content) return;

  // ── Current gap section ──
  let statusLabel = "—";
  let rows = [];

  if (d.status === "open") {
    const arrow = d.direction === "up" ? "↑" : "↓";
    const sign  = d.direction === "up" ? "+" : "−";
    statusLabel = arrow + " Open";
    if (d.gap_low != null && d.gap_high != null) {
      rows.push({ label: "Range", value: _fmtK(d.gap_low) + " – " + _fmtK(d.gap_high) });
    }
    if (d.gap_size) {
      const pct = d.gap_pct ? " (" + d.gap_pct + "%)" : "";
      rows.push({ label: "Size", value: sign + "$" + _fmtK(d.gap_size) + pct });
    }
  } else if (d.status === "closed") {
    statusLabel = "Closed ✓";
  } else if (d.status === "no_gap") {
    statusLabel = "No gap";
    rows.push({ label: "Diff", value: "< $50" });
  }

  rows.unshift({ label: "Status", value: statusLabel });

  const currentHTML = rows.map(r =>
    `<div class="cme-modal-row">
      <span class="cme-modal-row-label">${r.label}</span>
      <span class="cme-modal-row-value">${r.value}</span>
    </div>`
  ).join("");

  // ── Older open gaps section ──
  const older = (d.open_gaps || []).slice(d.status === "open" ? 1 : 0, d.status === "open" ? 4 : 3);
  let olderHTML = "";
  if (older.length > 0) {
    const olderTitle = d.status === "open" ? "Other Open Gaps" : "Older Open Gaps";
    const gapRows = older.map(g => {
      const arrow     = g.direction === "up" ? "↑" : "↓";
      const sizeSign  = g.direction === "up" ? "+" : "−";
      const dt        = new Date(g.week + "T12:00:00Z");
      const weekLabel = dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" });
      return `<div class="cme-modal-row">
        <span class="cme-modal-row-label">${weekLabel}</span>
        <span class="cme-modal-row-value">${_fmtK(g.gap_low)}–${_fmtK(g.gap_high)} &nbsp; ${arrow} ${sizeSign}$${_fmtK(g.gap_size)}</span>
      </div>`;
    }).join("");
    olderHTML = `<div class="cme-modal-section-title">${olderTitle}</div>${gapRows}`;
  }

  content.innerHTML = currentHTML + olderHTML;
  overlay.classList.add("open");
}

function _closeCmeModal() {
  document.getElementById("cme-modal")?.classList.remove("open");
}

/* ============================================================
   DASHBOARD — LIVE LAST ALERT
   Перезаписывает захардкоженный last_alert из /api/dashboard
   реальным первым алертом из /api/screener.
   ============================================================ */
async function loadDashboardAlert() {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    const r = await fetch(`${API_BASE}/api/screener`, { signal: controller.signal });
    clearTimeout(timer);
    if (!r.ok) throw new Error("HTTP " + r.status);
    const data = await r.json();
    const alerts = data.alerts || [];
    if (alerts.length === 0) return; // оставляем "No alerts yet"

    const s = alerts[0]; // самый свежий
    const kind = (s.kind || s.type || "").replace("vol", "volume"); // normalize vol → volume

    const badge = document.getElementById("alert-badge");
    if (!badge) return;
    badge.textContent = s.title;
    badge.className   = "alert-badge " + kind;
    document.getElementById("alert-time").textContent  = timeAgo(s.ts);
    document.getElementById("alert-title").textContent = s.symbol + " · " + s.exchange;
    document.getElementById("alert-body").textContent  = s.subtitle || s.body || "—";
  } catch (_) {
    // нет данных — оставляем текущее состояние
  }
}

/* ============================================================
   MAIN INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initTelegram();
  authTelegram(); // non-blocking: validates signature, logs to console
  getMe();        // non-blocking: upserts user in backend, logs profile
  buildPlaceholders();
  buildScreener();
  buildRSI();
  buildCalc();
  buildSettings();
  initModal();
  initTabs();

  setLoadingState(true);

  getData()
    .then(data => {
      renderDashboard(data);
      setMarketStatus(true);
      loadCmeGap();         // CME Gap card (separate endpoint)
      loadDashboardAlert(); // overlay last_alert с живыми данными screener
    })
    .catch(() => {
      // API недоступен — показываем MOCK с индикатором Offline
      renderDashboard(MOCK);
      setMarketStatus(false);
    })
    .finally(() => {
      setLoadingState(false);
    });
});
