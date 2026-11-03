# Repository Guidelines

## Run and test

- Run the site: `py server.py`, then open http://localhost:8080. Never start the server yourself; tell the user the command instead.
- Run the tests: `py -m pytest -q` from the repository root.

## Stack

- Python standard library only. `pytest` is the only dependency, for tests. Front end is plain HTML, CSS and JavaScript in `public/`. No frameworks, no npm, no build step.

## Rules

- `data/menu.json` is edited by hand by Lin, the owner. Do not rename its fields or reformat it.
- Money is real. Every amount the server stores or returns is rounded to the cent.
- Before fixing a pricing bug, write a test that fails because of the bug.
- Fix the code, not the test. Never change an expected value to make a test pass.
- Tests must never write to `data/orders.json`. Point the store at a temporary file.

## Definition of done

- The diff touches only the files the task needs.
- `py -m pytest -q` passes, or you say plainly why it could not.
- Tell the user what you verified and what you did not.
