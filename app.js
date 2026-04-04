/* ============================================================
   MOCK DATA — структура соответствует ответу /api/dashboard
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
  const defs = {
    screener: { icon: "📡", title: "Screener",    sub: "Live alerts feed — coming soon" },
    rsi:      { icon: "📈", title: "RSI Scanner", sub: "Oversold / overbought signals — coming soon" },
    calc:     { icon: "🧮", title: "Calculator",  sub: "Position size & risk calc — coming soon" },
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
