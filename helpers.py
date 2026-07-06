"""Little utilities. -J"""
from decimal import ROUND_HALF_UP, Decimal


def round_money(amount):
    """Round a dollar amount to cents the way a cash register does."""
    return float(Decimal(str(amount)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))


def format_money(amount):
    return f"${round_money(amount):,.2f}"


def slugify(name):
    return "-".join(name.lower().replace("&", "and").split())
