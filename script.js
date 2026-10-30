/* =========================================================
   El Patio Street Eats — site script
   ========================================================= */

/* ---- CONFIG: change these in one place ---- */
const ORDER_URL = "https://www.elpatioreno.com/s/order"; // swap for the new ordering link when ready

/* ---- Weekly schedule (edit each week) ---- */
const SCHEDULE = [
  { date: "2026-10-30", start: "17:00", end: "21:00", venue: "RED", venueFull: "Reno Experience District", address: "2072 Experience Ave, Reno, NV" },
  { date: "2026-10-31", start: "17:00", end: "21:00", venue: "RED", venueFull: "Reno Experience District", address: "2072 Experience Ave, Reno, NV" },
  { date: "2026-11-01", start: "17:00", end: "21:00", venue: "RED", venueFull: "Reno Experience District", address: "2072 Experience Ave, Reno, NV" },
];

/* ---- Menu ---- */
const MENU = [
  {
    id: "especialidad", tab: "Especialidad", title: "El Patio Specialty", sub: "Rice & beans included",
    layout: "list",
    items: [
      { id: "suizas", num: "#1", name: "Enchiladas Suizas", price: 17, desc: "3 chicken enchiladas rolled in sprouted corn tortillas, creamy mild tomatillo sauce, mozzarella cheese, sour cream drizzle, red onion, cilantro", tag: "House favorite" },
      { id: "chipotle", num: "#2", name: "Chipotle Enchiladas", price: 17, desc: "3 chicken enchiladas rolled in sprouted corn tortillas, creamy chipotle sauce, mozzarella cheese, sour cream drizzle, red onion, cilantro" },
      { id: "verdes", num: "#3", name: "Enchiladas Verdes", price: 16, desc: "3 chicken enchiladas rolled in sprouted corn tortillas, green tomatillo sauce, queso fresco, sour cream, white onion, cilantro" },
    ],
  },
  {
    id: "dorados", tab: "Dorados", title: "Dorados", sub: "Golden & crispy — rice & beans included",
    layout: "list",
    items: [
      { id: "quesadillas", num: "#4", name: "Quesadillas Locas", price: 15, desc: "3 deep fried chicken quesadillas on sprouted corn tortillas, mozzarella, queso fresco, pico de gallo, lettuce, purple onion, creamy house chipotle sauce, sour cream" },
      { id: "tacos", num: "#5", name: "Tacos Dorados", price: 14, desc: "3 fried tacos in sprouted corn tortillas, lettuce, queso fresco, sour cream", options: ["Chicken", "Potato"] },
    ],
  },
  {
    id: "fries", tab: "Fries", title: "Fries", sub: "Seasoned curly fries, loaded",
    layout: "list",
    items: [
      { id: "cheesefries", name: "Cheese Fries", price: 14, desc: "Seasoned curly fries, beer cheese, mozzarella, queso fresco, fresh chives garnish" },
      { id: "baconfries", name: "Cheesy Bacon Curly Fries", price: 16, desc: "Seasoned curly fries, beer cheese, mozzarella, queso fresco, bacon, pico de gallo, sour cream, avocado", tag: "Fan favorite" },
    ],
  },
  {
    id: "bebidas", tab: "Bebidas", title: "Bebidas", sub: "Aguas frescas made in-house",
    layout: "cards",
    items: [
      { id: "jamaica", name: "Agua de Jamaica", desc: "Chilled hibiscus, lightly sweet", img: "assets/img/jamaica.jpg" },
      { id: "horchata", name: "Horchata", desc: "Rice, cinnamon & vanilla", img: "assets/img/horchata.jpg" },
      { id: "sodas", name: "Mexican Sodas & Water", desc: "Coca-Cola, Fanta, Sprite, Tahoe artesian water", img: "assets/img/sodas.jpg" },
    ],
  },
  {
    id: "postres", tab: "Postres", title: "Postres", sub: "Save room for something sweet",
    layout: "cards",
    items: [
      { id: "fresas", name: "El Patio Fresas", price: 8, desc: "Strawberries, chocolate, mazapán crumbs", img: "assets/img/fresas.jpg" },
      { id: "churros", name: "4 Mini Loop Churros", desc: "Dulce de leche or chocolate drizzle", img: "assets/img/churros.jpg" },
    ],
  },
  {
    id: "paletas", tab: "Paletas", title: "Artisan Dipped Paletas", sub: "Made fresh & local by Paletería La Paz — ask about weekly flavors",
    layout: "cards",
    items: [
      { id: "p-mazapan", name: "Mazapán", price: 6, desc: "Chocolate dipped & drizzled", img: "assets/img/paleta-mazapan.jpg" },
      { id: "p-ube", name: "Ube", price: 6, desc: "Chocolate dipped & drizzled", img: "assets/img/paleta-ube.jpg" },
      { id: "p-coconut", name: "Coconut", price: 6, desc: "Chocolate dipped & drizzled", img: "assets/img/paleta-coconut.jpg" },
      { id: "p-strawberry", name: "Strawberry", price: 6, desc: "Chocolate dipped & drizzled", img: "assets/img/paleta-strawberry.jpg" },
    ],
  },
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = (n) => "$" + n.toFixed(2);

/* ---------- String lights ---------- */
function drawLights(svg, { swags = 4, sag = 60, top = 8, spacing = 46 } = {}) {
  if (!svg) return;
  const w = svg.clientWidth || window.innerWidth;
  const h = sag + top + 30;
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  svg.setAttribute("height", h);
  const ns = "http://www.w3.org/2000/svg";
  svg.innerHTML = "";
  const n = Math.max(2, Math.round(swags * Math.min(1, w / 1200)) || 2);
  const seg = w / n;
  let k = 0;
  for (let i = 0; i < n; i++) {
    const x0 = i * seg, x1 = x0 + seg, cx = x0 + seg / 2, cy = top + sag * 2;
    const p = document.createElementNS(ns, "path");
    p.setAttribute("d", `M${x0},${top} Q${cx},${cy} ${x1},${top}`);
    svg.appendChild(p);
    const count = Math.max(3, Math.floor(seg / spacing));
    for (let j = 1; j < count; j++) {
      const t = j / count;
      const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1;
      const y = (1 - t) * (1 - t) * top + 2 * (1 - t) * t * cy + t * t * top;
      const c = document.createElementNS(ns, "ellipse");
      c.setAttribute("cx", x); c.setAttribute("cy", y + 7);
      c.setAttribute("rx", 4); c.setAttribute("ry", 5.5);
      c.setAttribute("class", "bulb");
      c.style.animationDelay = `${(k++ * 0.37) % 4}s`;
      svg.appendChild(c);
    }
  }
}
function allLights() {
  drawLights($("#heroLights"), { swags: 3, sag: 46, top: 78 });
  drawLights($("#menuLights"), { swags: 4, sag: 38, top: 0 });
  drawLights($("#footLights"), { swags: 4, sag: 34, top: 0 });
}

/* ---------- Menu render ---------- */
const tacoChoice = {};
function renderMenu() {
  const tabs = $("#menuTabs"), panels = $("#menuPanels");
  MENU.forEach((cat, i) => {
    const b = document.createElement("button");
    b.className = "menu__tab" + (i === 0 ? " active" : "");
    b.textContent = cat.tab; b.dataset.target = cat.id; b.setAttribute("role", "tab");
    tabs.appendChild(b);

    const panel = document.createElement("div");
    panel.className = "menu__panel" + (i === 0 ? " active" : "");
    panel.id = "panel-" + cat.id;
    let html = `<div class="menu__panel-head"><h3>${cat.title}</h3><p>${cat.sub}</p></div>`;
    if (cat.layout === "list") {
      html += `<div class="menu__grid">` + cat.items.map((it) => `
        <article class="dish">
          <div class="dish__body">
            <div class="dish__top">${it.num ? `<span class="dish__num">${it.num}</span>` : ""}<h4>${it.name}</h4><span class="dish__dots"></span><span class="dish__price">$${it.price}</span></div>
            <p>${it.desc}</p>
            ${it.options ? `<div class="dish__opts" data-for="${it.id}">${it.options.map((o, k) => `<button class="${k === 0 ? "on" : ""}" data-opt="${o}">${o}</button>`).join("")}</div>` : ""}
            ${it.tag ? `<span class="dish__tag">${it.tag}</span>` : ""}
          </div>
          <button class="add" data-add="${it.id}" aria-label="Add ${it.name}">+</button>
        </article>`).join("") + `</div>`;
    } else {
      html += `<div class="menu__grid menu__grid--cards">` + cat.items.map((it) => `
        <article class="card">
          <div class="card__img"><img src="${it.img}" alt="${it.name}" loading="lazy" /></div>
          <div class="card__body">
            <div><h4>${it.name}</h4><p>${it.desc}</p>
              ${it.price ? `<span class="card__price">$${it.price}</span>` : `<span class="card__price ask">Price at the window</span>`}
            </div>
            ${it.price ? `<button class="add" data-add="${it.id}" aria-label="Add ${it.name}">+</button>` : ""}
          </div>
        </article>`).join("") + `</div>`;
      if (cat.id === "paletas") html += `<p class="menu__credit">✦ Made fresh &amp; local: Paletería La Paz ✦</p>`;
    }
    panel.innerHTML = html;
    panels.appendChild(panel);
  });

  tabs.addEventListener("click", (e) => {
    const b = e.target.closest(".menu__tab"); if (!b) return;
    $$(".menu__tab").forEach((t) => t.classList.toggle("active", t === b));
    $$(".menu__panel").forEach((p) => p.classList.toggle("active", p.id === "panel-" + b.dataset.target));
    b.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  });

  panels.addEventListener("click", (e) => {
    const opt = e.target.closest(".dish__opts button");
    if (opt) {
      const wrap = opt.parentElement;
      $$("button", wrap).forEach((x) => x.classList.toggle("on", x === opt));
      tacoChoice[wrap.dataset.for] = opt.dataset.opt;
      return;
    }
    const add = e.target.closest("[data-add]");
    if (add) {
      const item = findItem(add.dataset.add);
      const option = item.options ? (tacoChoice[item.id] || item.options[0]) : null;
      addToCart(item, option);
      add.classList.add("added"); add.textContent = "✓";
      setTimeout(() => { add.classList.remove("added"); add.textContent = "+"; }, 1100);
    }
  });
}
const findItem = (id) => MENU.flatMap((c) => c.items).find((i) => i.id === id);

/* ---------- Cart ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("elpatio-cart") || "[]"); } catch (_) { cart = []; }
const save = () => { try { localStorage.setItem("elpatio-cart", JSON.stringify(cart)); } catch (_) {} };

function addToCart(item, option) {
  const key = item.id + (option ? ":" + option : "");
  const line = cart.find((l) => l.key === key);
  if (line) line.qty++;
  else cart.push({ key, id: item.id, name: item.name, option, price: item.price, qty: 1 });
  save(); renderCart();
  const btn = $("#cartOpen"); btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump");
  toast(`Added ${item.name}${option ? " · " + option : ""}`);
}
function renderCart() {
  const count = cart.reduce((s, l) => s + l.qty, 0);
  const total = cart.reduce((s, l) => s + l.qty * l.price, 0);
  const c = $("#cartCount"); c.textContent = count; c.classList.toggle("show", count > 0);
  $("#cartTotal").textContent = money(total);
  $("#checkoutBtn").classList.toggle("disabled", !count);
  const body = $("#cartItems");
  if (!count) {
    body.innerHTML = `<div class="drawer__empty"><img src="assets/img/logo-sm.png" alt="" /><p>Your order is empty.<br/>Start with our famous enchiladas.</p></div>`;
    return;
  }
  body.innerHTML = cart.map((l) => `
    <div class="line">
      <div class="line__info">
        <div class="line__name">${l.name}</div>
        ${l.option ? `<div class="line__opt">${l.option}</div>` : ""}
        <div class="line__price">${money(l.price)} each</div>
      </div>
      <div class="qty"><button data-dec="${l.key}" aria-label="Less">−</button><span>${l.qty}</span><button data-inc="${l.key}" aria-label="More">+</button></div>
    </div>`).join("");
}
function openCart(open) {
  $("#drawer").classList.toggle("open", open);
  $("#scrim").classList.toggle("open", open);
  $("#drawer").setAttribute("aria-hidden", !open);
}

/* ---------- Schedule ---------- */
function parseLocal(date, time) { const [y, m, d] = date.split("-").map(Number); const [hh, mm] = time.split(":").map(Number); return new Date(y, m - 1, d, hh, mm); }
const fmtTime = (t) => { let [h, m] = t.split(":").map(Number); const ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; return h + (m ? ":" + String(m).padStart(2, "0") : "") + ap; };

function renderSchedule() {
  const now = new Date();
  const grid = $("#scheduleGrid");
  const upcoming = SCHEDULE.filter((s) => parseLocal(s.date, s.end) > now);
  const pin = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`;
  const clock = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;

  if (!upcoming.length) {
    grid.innerHTML = `<div class="stop" style="grid-column:1/-1;text-align:center;padding:40px"><p class="stop__venue">New dates coming soon</p><p style="color:var(--cream-dim)">Follow <a href="https://www.instagram.com/elpatioreno/" target="_blank" rel="noopener" style="color:var(--teal-bright)">@elpatioreno</a> for this week's stops.</p></div>`;
    $("#nextStop .next-stop__text").innerHTML = `Follow <b>@elpatioreno</b> for our next stop`;
    return;
  }
  grid.innerHTML = upcoming.map((s) => {
    const d = parseLocal(s.date, s.start), e = parseLocal(s.date, s.end);
    const isToday = d.toDateString() === now.toDateString();
    const live = now >= d && now <= e;
    const status = live ? "Open now" : isToday ? "Tonight" : "Upcoming";
    const maps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(s.address);
    return `
      <article class="stop reveal">
        <div class="stop__date">
          <span class="stop__day">${d.getDate()}</span>
          <div><span class="stop__dow">${d.toLocaleDateString("en-US", { weekday: "long" })}</span><span class="stop__month">${d.toLocaleDateString("en-US", { month: "long" })}</span></div>
          <span class="stop__status">${status}</span>
        </div>
        <div class="stop__body">
          <h3 class="stop__venue">${s.venue}<small>${s.venueFull}</small></h3>
          <div class="stop__meta">
            <span>${clock}${fmtTime(s.start)} – ${fmtTime(s.end)}</span>
            <span>${pin}${s.address}</span>
          </div>
          <a class="stop__link" href="${maps}" target="_blank" rel="noopener">Get Directions →</a>
        </div>
      </article>`;
  }).join("");

  const n = upcoming[0], nd = parseLocal(n.date, n.start), ne = parseLocal(n.date, n.end);
  const live = now >= nd && now <= ne;
  const when = live ? "Open now" : nd.toDateString() === now.toDateString() ? "Tonight" : nd.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" });
  const el = $("#nextStop");
  el.classList.toggle("live", live);
  $(".next-stop__text", el).innerHTML = `<b>${when}</b> · ${n.venue} Reno · ${fmtTime(n.start)}–${fmtTime(n.end)}`;
}

/* ---------- Reveal on scroll ---------- */
function setupReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));
}

/* ---------- Reels play only in view ---------- */
function setupReels() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const v = en.target;
      if (en.isIntersecting) { v.preload = "auto"; v.play().catch(() => {}); } else v.pause();
    });
  }, { threshold: 0.35 });
  $$(".reel video").forEach((v) => io.observe(v));
}

/* ---------- Toast ---------- */
let toastT;
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2200); }

/* ---------- Catering form ---------- */
function setupForm() {
  $("#cateringForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target, data = Object.fromEntries(new FormData(f));
    let ok = true;
    ["name", "email"].forEach((n) => { const i = f.elements[n]; const bad = !i.value.trim() || (n === "email" && !/^\S+@\S+\.\S+$/.test(i.value)); i.classList.toggle("invalid", bad); if (bad) ok = false; });
    if (!ok) { $("#formMsg").textContent = "Please add your name and a valid email."; return; }
    const body = `Name: ${data.name}\nPhone: ${data.phone || "-"}\nEmail: ${data.email}\nEvent date: ${data.date || "-"}\nGuests: ${data.guests}\nEvent type: ${data.type}\n\n${data.message || ""}`;
    window.location.href = `mailto:elpationv@gmail.com?subject=${encodeURIComponent("Catering request – " + data.name)}&body=${encodeURIComponent(body)}`;
    $("#formMsg").textContent = "Gracias! Your email app is opening with the details — just hit send.";
    f.reset();
  });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();
  $("#checkoutBtn").href = ORDER_URL;
  renderMenu();
  renderCart();
  renderSchedule();
  allLights();
  setupReveal();
  setupReels();
  setupForm();

  $("#cartOpen").addEventListener("click", () => openCart(true));
  $("#cartClose").addEventListener("click", () => openCart(false));
  $("#scrim").addEventListener("click", () => openCart(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") openCart(false); });
  $("#cartItems").addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]"), dec = e.target.closest("[data-dec]");
    if (!inc && !dec) return;
    const key = (inc || dec).dataset[inc ? "inc" : "dec"];
    const l = cart.find((x) => x.key === key);
    l.qty += inc ? 1 : -1;
    if (l.qty <= 0) cart = cart.filter((x) => x !== l);
    save(); renderCart();
  });

  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $("#burger"), links = $("#navLinks");
  burger.addEventListener("click", () => { burger.classList.toggle("open"); links.classList.toggle("open"); });
  $$("a", links).forEach((a) => a.addEventListener("click", () => { burger.classList.remove("open"); links.classList.remove("open"); }));

  let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(allLights, 150); });
});
