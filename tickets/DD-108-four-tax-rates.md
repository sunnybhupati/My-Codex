# DD-108 · Four tax rates, one truck

**From:** Maya · **Priority:** Medium · **Suggested surface:** Codex CLI

## What happened

While looking into DD-106 I asked "where's our tax rate set?" and got four different answers depending on which file I opened. Lin's accountant says it's 9.5%. The tax office does not accept "close enough."

## What we know

- `HANDOFF.md` says tax is set in one place, `config.py`.
- There's also a `legacy_pricing.py` that may or may not be used by anything.
- There might be other numbers copied around too, like the discount rate and threshold.

## Done when

- [ ] Tax rate, discount rate and discount threshold are each defined in **exactly one place**
- [ ] The front end gets those numbers from the server instead of keeping its own copies
- [ ] Any file that nothing uses has been removed, and you've proved nothing uses it before deleting it
- [ ] All tests still pass, and the site behaves exactly the same as before for customers

## Hint from Maya

This is a refactor: the site should look and act the same afterwards. Make sure the tests from DD-106 are green **before** you start, so you'll know if you break something.
