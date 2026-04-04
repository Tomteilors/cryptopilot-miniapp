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

  etf_flow_m:       312,      // BTC ETF net flow today, $M

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
  document.getElementById("bias").textContent = d.market_bias;

  /* Fear & Greed */
  const fgIconEl = document.querySelector(".metric-card:nth-child(1) .metric-icon");
  if (fgIconEl) fgIconEl.textContent = fgIcon(d.fear_greed);
  document.getElementById("fear-greed").textContent = d.fear_greed;
  document.getElementById("fear-greed-label").textContent = d.fear_greed_label;

  /* BTC Dominance */
  document.getElementById("btc-dom").textContent = d.btc_dominance.toFixed(1) + "%";
  const domDelta = document.getElementById("btc-dom-delta");
  domDelta.textContent = (d.btc_dom_delta >= 0 ? "▲ +" : "▼ ") +
    Math.abs(d.btc_dom_delta).toFixed(1) + "% 24h";
  domDelta.className = "metric-sub " + (d.btc_dom_delta >= 0 ? "up" : "down");

  /* Long / Short */
  document.getElementById("ls-ratio").textContent = d.long_short_ratio.toFixed(2);
  document.getElementById("ls-label").textContent =
    d.long_short_ratio >= 1 ? "Longs dominate" : "Shorts dominate";

  /* ETF Flow */
  const flow = d.etf_flow_m;
  document.getElementById("etf-flow").textContent =
    (flow >= 0 ? "+" : "") + fmtMoney(flow);
  document.getElementById("etf-sub").textContent = "Net inflow today";

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
  if (on) document.getElementById("status-label").textContent = "Loading…";
}

/* ============================================================
   MARKET STATUS DOT
   ============================================================ */
function setMarketStatus(online) {
  const label = document.getElementById("status-label");
  const dot   = document.querySelector(".status-dot");
  if (online) {
    label.textContent  = "Live";
    dot.style.background = "var(--green)";
    dot.style.boxShadow  = "0 0 5px var(--green)";
  } else {
    label.textContent  = "Offline";
    dot.style.background = "var(--red)";
    dot.style.boxShadow  = "0 0 5px var(--red)";
  }
}

/* ============================================================
   PLACEHOLDER SCREENS (tabs not yet implemented)
   ============================================================ */
function buildPlaceholders() {
  // screener excluded — has its own buildScreener()
  const defs = {
    rsi:      { icon: "📈", title: "RSI Scanner", sub: "Oversold / overbought signals — coming soon" },
    settings: { icon: "⚙️", title: "Settings",    sub: "Wallets & thresholds — coming soon" }
  };
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

  return `
    <div class="signal-card card" data-type="${kind}" data-id="${s.id}">
      <div class="signal-top">
        <span class="signal-icon">${icon}</span>
        <span class="signal-symbol">${s.symbol}</span>
        <span class="signal-badges">
          ${dirLabel}
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

function applyModalBtn(btnId, url) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.onclick = null;
  if (url) {
    btn.disabled = false;
    btn.onclick = () => openExternalLink(url);
  } else {
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
    if (e.key === "Escape") closeSignalModal();
  });
}

/* ============================================================
   SCREENER — BUILD & RENDER
   ============================================================ */
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
  const filtered = _activeFilter === "all"
    ? signals
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
    { key: "all",   label: "All" },
    { key: "vol",   label: "⚡ Volume" },
    { key: "oi",    label: "📊 OI" },
    { key: "liq",   label: "💀 Liq" },
    { key: "whale", label: "🐋 Whale" },
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
      <div class="calc-header">
        <span class="calc-title">Position Calc</span>
        <span class="calc-subtitle">Size your trade by risk</span>
      </div>

      <div class="calc-segment" id="calc-segment">
        <button class="seg-btn active" data-dir="long">↑ Long</button>
        <button class="seg-btn" data-dir="short">↓ Short</button>
      </div>

      <div class="calc-inputs card">
        <div class="calc-field">
          <label class="calc-label">Entry Price</label>
          <div class="calc-input-wrap">
            <span class="calc-prefix">$</span>
            <input class="calc-input" id="c-entry" type="number" inputmode="decimal" placeholder="0.00" min="0" step="any"/>
          </div>
        </div>
        <div class="calc-field">
          <label class="calc-label">Stop Loss</label>
          <div class="calc-input-wrap" id="c-sl-wrap">
            <span class="calc-prefix">$</span>
            <input class="calc-input" id="c-sl" type="number" inputmode="decimal" placeholder="0.00" min="0" step="any"/>
          </div>
        </div>
        <div class="calc-field">
          <label class="calc-label">Take Profit <span class="calc-optional">optional</span></label>
          <div class="calc-input-wrap">
            <span class="calc-prefix">$</span>
            <input class="calc-input" id="c-tp" type="number" inputmode="decimal" placeholder="0.00" min="0" step="any"/>
          </div>
        </div>
        <div class="calc-divider"></div>
        <div class="calc-field">
          <label class="calc-label">Account Size</label>
          <div class="calc-input-wrap">
            <span class="calc-prefix">$</span>
            <input class="calc-input" id="c-account" type="number" inputmode="decimal" placeholder="10 000" min="0" step="any"/>
          </div>
        </div>
        <div class="calc-row-2">
          <div class="calc-field">
            <label class="calc-label">Risk</label>
            <div class="calc-input-wrap">
              <input class="calc-input" id="c-risk" type="number" inputmode="decimal" placeholder="1" min="0.01" max="100" step="any"/>
              <span class="calc-suffix">%</span>
            </div>
          </div>
          <div class="calc-field">
            <label class="calc-label">Leverage <span class="calc-optional">optional</span></label>
            <div class="calc-input-wrap">
              <input class="calc-input" id="c-lev" type="number" inputmode="numeric" placeholder="1" min="1" max="125" step="1"/>
              <span class="calc-suffix">×</span>
            </div>
          </div>
        </div>
      </div>

      <div class="calc-results card" id="calc-results">
        <div class="calc-result-empty" id="calc-empty">
          <span id="calc-empty-msg">Enter entry price and stop loss to calculate</span>
        </div>
        <div class="calc-result-rows" id="calc-rows" style="display:none">
          <div class="calc-result-row">
            <span class="calc-result-label">Position Size</span>
            <span class="calc-result-value" id="r-size">—</span>
          </div>
          <div class="calc-result-row">
            <span class="calc-result-label">Notional Value</span>
            <span class="calc-result-value" id="r-notional">—</span>
          </div>
          <div class="calc-result-row">
            <span class="calc-result-label">Max Loss</span>
            <span class="calc-result-value red" id="r-loss">—</span>
          </div>
          <div class="calc-result-row" id="r-margin-row" style="display:none">
            <span class="calc-result-label">Margin Req.</span>
            <span class="calc-result-value" id="r-margin">—</span>
          </div>
          <div class="calc-result-row" id="r-reward-row" style="display:none">
            <span class="calc-result-label">Reward</span>
            <span class="calc-result-value green" id="r-reward">—</span>
          </div>
          <div class="calc-result-row" id="r-rr-row" style="display:none">
            <span class="calc-result-label">Risk / Reward</span>
            <span class="calc-result-value gold" id="r-rr">—</span>
          </div>
        </div>
      </div>

      <div class="nav-spacer"></div>
    </div>`;

  let direction = "long";

  function calcUpdate() {
    const entry   = parseFloat(document.getElementById("c-entry").value);
    const sl      = parseFloat(document.getElementById("c-sl").value);
    const tp      = parseFloat(document.getElementById("c-tp").value);
    const account = parseFloat(document.getElementById("c-account").value);
    const riskPct = parseFloat(document.getElementById("c-risk").value);
    const lev     = Math.max(1, parseFloat(document.getElementById("c-lev").value) || 1);

    const empty    = document.getElementById("calc-empty");
    const emptyMsg = document.getElementById("calc-empty-msg");
    const rows     = document.getElementById("calc-rows");
    const slWrap   = document.getElementById("c-sl-wrap");

    function showEmpty(msg) {
      emptyMsg.textContent    = msg;
      empty.style.display     = "";
      rows.style.display      = "none";
      slWrap.classList.remove("error");
    }

    if (!entry || !sl || !account || !riskPct || entry <= 0 || sl <= 0 || account <= 0 || riskPct <= 0) {
      showEmpty("Enter entry price and stop loss to calculate");
      return;
    }

    const riskPerUnit = direction === "long" ? entry - sl : sl - entry;

    if (riskPerUnit <= 0) {
      slWrap.classList.add("error");
      showEmpty(direction === "long"
        ? "Stop loss must be below entry for Long"
        : "Stop loss must be above entry for Short");
      return;
    }

    slWrap.classList.remove("error");

    // ── Core calculations ──────────────────────────────────────────
    const riskAmount = account * (riskPct / 100);
    const posSize    = riskAmount / riskPerUnit;        // units
    const notional   = posSize * entry;                 // USD notional
    const marginReq  = notional / lev;                  // USD margin

    document.getElementById("r-size").textContent    = calcFmtSize(posSize) + " units";
    document.getElementById("r-notional").textContent = calcFmtUSD(notional);
    document.getElementById("r-loss").textContent    = "−" + calcFmtUSD(riskAmount);

    const marginRow = document.getElementById("r-margin-row");
    if (lev > 1) {
      document.getElementById("r-margin").textContent = calcFmtUSD(marginReq);
      marginRow.style.display = "";
    } else {
      marginRow.style.display = "none";
    }

    // ── TP / Reward ───────────────────────────────────────────────
    const rewardRow = document.getElementById("r-reward-row");
    const rrRow     = document.getElementById("r-rr-row");

    if (tp && tp > 0) {
      const rewardPerUnit = direction === "long" ? tp - entry : entry - tp;
      if (rewardPerUnit > 0) {
        const rewardAmt = posSize * rewardPerUnit;
        const rrRatio   = rewardPerUnit / riskPerUnit;
        document.getElementById("r-reward").textContent = "+" + calcFmtUSD(rewardAmt);
        document.getElementById("r-rr").textContent     = "1 : " + rrRatio.toFixed(2);
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

  // Live recalculation on every input
  ["c-entry", "c-sl", "c-tp", "c-account", "c-risk", "c-lev"].forEach(id => {
    document.getElementById(id).addEventListener("input", calcUpdate);
  });
}

/* ============================================================
   TAB NAVIGATION
   ============================================================ */
function initTabs() {
  const navItems = document.querySelectorAll(".nav-item");
  const panels   = document.querySelectorAll(".tab-panel");

  navItems.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      navItems.forEach(b => b.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const panel = document.getElementById("tab-" + target);
      if (panel) panel.classList.add("active");
    });
  });
}

/* ============================================================
   TELEGRAM WEBAPP INIT
   ============================================================ */
function initTelegram() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;
  tg.ready();
  tg.expand();
  tg.setBackgroundColor("#0d1117");
  tg.setHeaderColor("#0d1117");
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
   MAIN INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initTelegram();
  authTelegram(); // non-blocking: validates signature, logs to console
  getMe();        // non-blocking: upserts user in backend, logs profile
  buildPlaceholders();
  buildScreener();
  buildCalc();
  initModal();
  initTabs();

  setLoadingState(true);

  getData()
    .then(data => {
      renderDashboard(data);
      setMarketStatus(true);
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
