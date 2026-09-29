# DD-107 · "My receipt says $111.83399999999999"

**From:** Lin · **Priority:** High · **Suggested surface:** Codex CLI

## What happened

> A customer showed me their phone. The receipt page said the total was $111.83399999999999. She asked if we charge in fractions of a cent. I didn't know what to say.
>
> — Lin

## What we know

- It's the order confirmation page, the one customers see right after they pay.
- The cart page looks fine. It's only the receipt.
- Some amounts on the receipt show no cents at all, like `$114` and `−$11.4`.

## Done when

- [ ] Every amount on the receipt shows dollars and exactly two decimal places, like `$111.83`
- [ ] The amounts the **server stores** are rounded to the cent too, not just prettied up on screen
- [ ] It looks right in the browser. Put it side by side with the cart and check.

## Hint from Maya

There are two problems hiding here: what's stored and what's shown. Fixing one without the other just moves the bug. Someone may have already written a helper for this and never used it.
