# DD-105 · "They sold me truffle dumplings they didn't have"

**From:** A customer review, 2 stars · **Priority:** High · **Suggested surface:** Codex desktop app

## What happened

> Ordered and paid for the truffle mushroom dumplings online. Got to the window and they said they'd been sold out since morning. Got a refund but I'd walked 20 minutes for those. Why let me order them??
>
> ★★☆☆☆

Lin was mortified.

## What we know

- Lin marks dishes as sold out in `data/menu.json`. She swears she did it that morning.
- Jordan's notes say sold-out items are "handled end to end."
- The site has styles for a "Sold out" badge. I've never once seen it appear.
- Right now the Truffle Mushroom Dumplings and Mango Mochi are both marked unavailable.

## Done when

- [ ] Sold-out dishes show a "Sold out" badge, look greyed out, and their **Add** button is disabled
- [ ] Even if someone gets around the button (an old open tab, a sneaky customer), the server refuses to take an order for a sold-out dish and says why
- [ ] Lin does **not** have to change how she edits the menu file

## Hint from Maya

Follow the data. Start at the menu file, then find every place that decides whether something is sold out. Do they all agree on what to look for? The Git history might tell you how this broke.
