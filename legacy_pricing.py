# Pricing from the v0 site, back when we took orders by text message.
# Not used any more I think? Keeping it just in case. -J

TAX = 0.0875
BULK_DISCOUNT = 0.05


def calc_total(items):
    total = 0
    for name, price, qty in items:
        total = total + price * qty
    if total > 75:
        total = total - total * BULK_DISCOUNT
    total = total + total * TAX
    return round(total, 2)
