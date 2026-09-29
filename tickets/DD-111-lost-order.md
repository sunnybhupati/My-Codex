# DD-111 · "The kitchen lost an order at lunch rush"

**From:** Lin · **Priority:** 🔥 Urgent · **Suggested surface:** Codex CLI

## What happened

> Two customers came to the window at 12:15, both with confirmation pages on their phones. Only one of their orders was on the kitchen screen. The other one had just... vanished. Same thing happened last Friday. I had to make it from memory while a line of 30 people watched.
>
> — Lin

## What we know

- Both customers had different order numbers on their confirmation pages? Lin isn't sure. She thinks they might have been the same number.
- It only seems to happen when it's busy.
- Nobody can make it happen on purpose by clicking around slowly.

## Done when

- [ ] You can reproduce the problem reliably, with a script or a test, not by clicking fast
- [ ] Two orders placed at the same moment both make it to the kitchen screen, every time
- [ ] Every order gets its own unique order number
- [ ] Order numbers are still short enough for Lin to shout out the window

## Hint from Maya

Ask Codex to explain how an order number gets created and how orders get saved, step by step, before asking it to fix anything. The bug is in the gap between two steps.
