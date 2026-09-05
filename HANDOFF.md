# HANDOFF NOTES

hey! jordan here. sorry this is rushed, last day today. everything you need should be here.

## running it

```
python app.py
```

then open http://localhost:5000 and you're good. no installs, it's all standard library python.

## how it works

- python server, serves the pages in `public/` and a little JSON API
- front end is vanilla JS, no build step, no frameworks. on purpose!!
- menu lives in `data/menu.json`. Lin edits this herself sometimes (carefully)
- orders get saved to `data/orders.json`. kitchen screen reads from there
- kitchen screen is at `/kitchen.html`, Lin keeps it open on the truck laptop

## things to know

- **tax** is set in `config.py`. one place, easy to change.
- **discount** is 15% on orders of $100 or more, matches Lin's flyer. updated everywhere back in august.
- **sold out** items are handled end to end. Lin just flips the flag in the menu file and the site greys them out and blocks ordering.
- **tests**: all passing ✅ run `pytest`
- `legacy_pricing.py` is old, probably safe to delete? not 100% sure nothing uses it

## stuff I didn't get to

- a README (sorry)
- the site's a bit squished on phones? haven't looked properly. most people order on laptops I think
- Lin mentioned something about Tuesdays once. probably nothing.

it's a good little codebase. treat it nice. 🥟

— J
