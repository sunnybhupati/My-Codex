// Order confirmation page. Shows exactly what the server charged. -J

async function loadOrder() {
  const id = new URLSearchParams(window.location.search).get("id");
  const box = document.getElementById("receipt");

  const res = await fetch(`/api/orders/${id}`);
  if (!res.ok) {
    box.innerHTML = `<p class="error">We couldn't find that order.</p>`;
    return;
  }
  const order = await res.json();

  const lines = order.items
    .map((i) => `<li><span>${i.qty} × ${i.name}</span></li>`)
    .join("");

  box.innerHTML = `
    <p class="eyebrow">Order ${order.id}</p>
    <h2>Thanks, ${order.customer}! 🎉</h2>
    <p>Your dumplings are being folded. Listen for your name at the window in about 15 minutes.</p>
    <ul class="receipt-lines">${lines}</ul>
    <dl class="totals">
      <div><dt>Subtotal</dt><dd>$${order.subtotal}</dd></div>
      <div><dt>Discount</dt><dd>−$${order.discount}</dd></div>
      <div><dt>Tax</dt><dd>$${order.tax}</dd></div>
      <div class="grand"><dt>Total charged</dt><dd>$${order.total}</dd></div>
    </dl>`;
}

loadOrder();
