// Dumpling Dash front end. Vanilla JS, no build step. -J

const TAX_RATE = 0.1;           // close enough
const DISCOUNT_RATE = 0.10;     // 10% off big orders
const DISCOUNT_THRESHOLD = 100;

let menu = [];
const cart = {}; // item id -> quantity

function money(amount) {
  return "$" + amount.toFixed(2);
}

async function loadMenu() {
  const res = await fetch("/api/menu");
  menu = await res.json();
  renderMenu();
  renderCart();
}

function renderMenu() {
  const query = document.getElementById("search").value.trim();
  const grid = document.getElementById("menu");
  grid.innerHTML = "";

  const visible = menu.filter(
    (item) => item.name.includes(query) || item.description.includes(query)
  );

  if (visible.length === 0) {
    grid.innerHTML = `<p class="muted">No dishes match “${query}”.</p>`;
    return;
  }

  for (const item of visible) {
    const card = document.createElement("article");
    card.className = "card" + (item.soldOut ? " sold-out" : "");
    card.innerHTML = `
      <div class="card-art" style="background:${item.color}">${item.emoji}</div>
      <div class="card-body">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="tags">${item.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="card-foot">
          <span class="price">${money(item.price)}</span>
          ${item.soldOut ? '<span class="badge">Sold out</span>' : ""}
          <button class="btn add" data-id="${item.id}" ${item.soldOut ? "disabled" : ""}>Add</button>
        </div>
      </div>`;
    grid.appendChild(card);
  }
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
}

function setQuantity(id, value) {
  const qty = parseInt(value, 10);
  if (!qty) {
    delete cart[id];
  } else {
    cart[id] = qty;
  }
  renderCart();
}

// TODO: ask the server via /api/quote instead? Truck wifi is slow though. -J
function estimate() {
  let subtotal = 0;
  for (const [id, qty] of Object.entries(cart)) {
    const item = menu.find((m) => m.id === id);
    subtotal += item.price * qty;
  }
  const discount = subtotal >= DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0;
  const tax = (subtotal - discount) * TAX_RATE;
  return { subtotal, discount, tax, total: subtotal - discount + tax };
}

function renderCart() {
  const list = document.getElementById("cart-lines");
  list.innerHTML = "";
  const ids = Object.keys(cart);
  document.getElementById("cart-empty").hidden = ids.length > 0;

  for (const id of ids) {
    const item = menu.find((m) => m.id === id);
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="line-name">${item.name}</span>
      <input class="qty" type="number" value="${cart[id]}" data-id="${id}" aria-label="Quantity of ${item.name}">
      <span class="line-price">${money(item.price * cart[id])}</span>
      <button class="remove" data-id="${id}" aria-label="Remove ${item.name}">×</button>`;
    list.appendChild(li);
  }

  const q = estimate();
  document.getElementById("subtotal").textContent = money(q.subtotal);
  document.getElementById("discount").textContent = "−" + money(q.discount);
  document.getElementById("tax").textContent = money(q.tax);
  document.getElementById("total").textContent = money(q.total);
}

async function checkout() {
  const error = document.getElementById("error");
  error.textContent = "";

  const lines = Object.entries(cart).map(([id, qty]) => ({ id, qty }));
  if (lines.length === 0) {
    error.textContent = "Your order is empty.";
    return;
  }

  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customer: document.getElementById("customer").value.trim() || "Guest",
      lines,
    }),
  });
  const data = await res.json();

  if (!res.ok) {
    error.textContent = data.error || "Something went wrong.";
    return;
  }
  window.location.href = `confirm.html?id=${data.id}`;
}

document.getElementById("search").addEventListener("input", renderMenu);

document.getElementById("menu").addEventListener("click", (e) => {
  const btn = e.target.closest("button.add");
  if (btn && !btn.disabled) addToCart(btn.dataset.id);
});

document.getElementById("cart-lines").addEventListener("change", (e) => {
  if (e.target.classList.contains("qty")) setQuantity(e.target.dataset.id, e.target.value);
});

document.getElementById("cart-lines").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) setQuantity(e.target.dataset.id, 0);
});

document.getElementById("checkout").addEventListener("click", checkout);

if (new Date().getDay() === 2) {
  document.getElementById("tuesday").hidden = false;
}

loadMenu();
