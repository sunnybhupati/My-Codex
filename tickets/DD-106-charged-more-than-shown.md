# DD-106 · "Checkout said $106.59. My card said $111.83."

**From:** A customer email · **Priority:** 🔥 Urgent · **Suggested surface:** Codex CLI

## What happened

> I ordered 12 pork potstickers for my office. The checkout page clearly said $106.59 total. My bank shows a charge of $111.83. That's not a rounding error. Is your website scamming people?
>
> — Dana R.

Lin is furious, and she's right to be. Her flyer promises **15% off orders of $100 or more**. Our tax rate is **9.5%**. Lin confirmed both with me this morning.

## What we know

- The number on the checkout page and the number we charge are worked out in two different places.
- There's a test for the big-order discount. It's been switched off.
- Orders of exactly $100 might be affected too. Nobody's checked.

## Done when

- [ ] What the customer sees at checkout is exactly what they're charged, to the cent
- [ ] The discount is 15% on orders of **$100 or more**, and the tax is 9.5%
- [ ] The skipped test is switched back on and passes, and there are tests for an order just under $100, exactly $100, and over $100
- [ ] You can explain to Lin, in one sentence, why this happened

## Hint from Maya

Before anyone fixes anything, get a failing test that proves the bug. Then fix it. Then watch the test go green.
