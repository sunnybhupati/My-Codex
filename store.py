"""Menu and order storage. Plain JSON files in data/ -- the truck doesn't need a database."""
import json
import time
from pathlib import Path

from pricing import quote_order

DATA_DIR = Path(__file__).parent / "data"
MENU_FILE = DATA_DIR / "menu.json"
ORDERS_FILE = DATA_DIR / "orders.json"


def load_menu():
    """Return the menu as a dict keyed by item id."""
    with open(MENU_FILE, encoding="utf-8") as f:
        items = json.load(f)
    return {item["id"]: item for item in items}


def _load_orders():
    if not ORDERS_FILE.exists():
        return {}
    with open(ORDERS_FILE, encoding="utf-8") as f:
        return json.load(f)


def _save_orders(orders):
    with open(ORDERS_FILE, "w", encoding="utf-8") as f:
        json.dump(orders, f, indent=2)


def place_order(customer, lines):
    """Validate a cart, price it, and save it for the kitchen."""
    menu = load_menu()

    for line in lines:
        item = menu.get(line["id"])
        if item is None:
            raise ValueError(f"We don't have anything called {line['id']}")
        if item.get("sold_out"):
            raise ValueError(f"Sorry, {item['name']} is sold out")

    quote = quote_order(lines, menu)

    order_id = "DD-" + str(int(time.time()))
    order = {
        "id": order_id,
        "customer": customer,
        "items": [
            {"id": line["id"], "name": menu[line["id"]]["name"], "qty": line["qty"]}
            for line in lines
        ],
        **quote,
        "placed_at": time.strftime("%H:%M:%S"),
        "status": "new",
    }

    orders = _load_orders()
    orders[order_id] = order
    _save_orders(orders)
    return order


def get_order(order_id):
    return _load_orders().get(order_id)


def all_orders():
    """Newest first, for the kitchen screen."""
    return sorted(_load_orders().values(), key=lambda o: o["id"], reverse=True)
