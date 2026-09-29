# DD-110 · "Someone ordered −3 potstickers and we owe them money"

**From:** Lin · **Priority:** 🔥 Urgent · **Suggested surface:** Codex CLI

## What happened

> There's an order on the kitchen screen from "kev" for MINUS THREE potstickers. Jordan's order log says the total was negative thirty-one dollars. Is the website trying to pay this person?? Do I make him negative dumplings??
>
> — Lin

It's still on the kitchen screen. Go and look.

## What we know

- The quantity boxes in the cart let you type anything.
- I tried typing `-3` in the cart. The site happily showed a negative total and let me place the order.
- If the front end allows it, I'm guessing the server does too.

## Done when

- [ ] Customers can't enter a quantity below 1 in the cart
- [ ] The server rejects bad quantities (negative, zero, decimals, text, absurdly large) with a clear message, **even if someone bypasses the website entirely**
- [ ] There are tests proving the server rejects each kind of bad quantity
- [ ] Normal orders still work exactly as before

## Hint from Maya

Never trust the browser. Anything the website checks, a determined person can skip. The server is the last line of defence.
