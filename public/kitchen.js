// Kitchen screen: lists every order so Lin knows what to fold. -J

async function loadOrders() {
  const res = await fetch("/api/orders");
  const orders = await res.json();

  document.getElementById("count").textContent =
    `${orders.length} order${orders.length === 1 ? "" : "s"} on the board`;

  document.getElementById("tickets").innerHTML = orders
    .map(
      (o) => `
      <article class="ticket">
        <header><strong>${o.id}</strong><span>${o.placed_at}</span></header>
        <p class="ticket-name">${o.customer}</p>
        <ul>${o.items.map((i) => `<li><b>${i.qty}×</b> ${i.name}</li>`).join("")}</ul>
      </article>`
    )
    .join("");
}

loadOrders();
setInterval(loadOrders, 5000);
