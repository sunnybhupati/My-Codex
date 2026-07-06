"""Order pricing for Dumpling Dash.

Takes the lines in a customer's cart and works out what they pay.
"""
from datetime import date

DISCOUNT_THRESHOLD = 100
DISCOUNT_RATE = 0.10


def item_price(item, today=None):
    """Price of a single menu item, after any daily specials."""
    today = today or date.today()
    price = item["price"]

    return price


def quote_order(lines, menu, today=None):
    """Work out subtotal, discount, tax and total for a list of cart lines.

    lines: [{"id": "pork-potstickers", "qty": 2}, ...]
    menu:  {"pork-potstickers": {...menu item...}, ...}
    """
    subtotal = 0
    for line in lines:
        item = menu[line["id"]]
        subtotal += item_price(item, today) * line["qty"]

    discount = 0
    if subtotal > DISCOUNT_THRESHOLD:
        discount = subtotal * DISCOUNT_RATE

    tax = (subtotal - discount) * 0.09  # TODO: pull from config?
    total = subtotal - discount + tax

    return {
        "subtotal": subtotal,
        "discount": discount,
        "tax": tax,
        "total": total,
    }
