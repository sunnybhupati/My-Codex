# DD-102 · "I followed the notes and nothing happened"

**From:** Maya · **Priority:** High · **Suggested surface:** Codex CLI

## What happened

> Tried to run the site on my laptop to see the bugs for myself. Followed Jordan's notes exactly. Got an error. Gave up and made tea.
>
> — Maya

Also, every time anyone runs the site, `data/orders.json` changes, and now Git thinks we've all edited the code. There are test orders from Jordan in there that the kitchen keeps seeing.

## What we know

- Jordan's run instructions are in `HANDOFF.md`. They don't seem to match reality.
- The tests need something installed, but nothing in the repo says what.
- There's no `.gitignore`.

## Done when

- [ ] There's a `README.md` that gets a brand-new person from `git clone` to a running site, and it's **actually correct**
- [ ] Anything the project needs installed is listed in `requirements.txt`
- [ ] `data/orders.json` no longer shows up as a change every time someone takes an order, and the repo starts with a clean, empty order list
- [ ] You followed your own README from scratch and it worked

## Hint from Maya

A README that hasn't been tested is just another HANDOFF.md.
