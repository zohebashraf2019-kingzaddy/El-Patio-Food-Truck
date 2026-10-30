# El Patio Food Truck — Demo Website

Demo site for **El Patio Street Eats** (food truck & cantina, Reno NV) — built by [Nexora Digital](https://www.nexoradigital.live).

Static HTML/CSS/JS — no build step. Deploy on Vercel as-is (Framework preset: **Other**, output directory: root).

## Quick edits (all in `script.js`)
- `ORDER_URL` — the online-ordering checkout link (currently `https://www.elpatioreno.com/s/order`).
- `SCHEDULE` — the weekly stops (date, start/end time, venue, address). Past dates hide automatically; the hero "next stop" pill updates itself.
- `MENU` — every menu category & item. Items without a `price` show "Price at the window" and no add button.

## Structure
```
index.html      page markup
styles.css      theme (agave teal, cream, terracotta, string-light gold)
script.js       menu, cart drawer, schedule, animations, catering form
assets/img      logo (transparent), photos, menu item crops
assets/video    compressed web videos + poster frames
```

## Notes
- Catering form opens the visitor's email app addressed to elpationv@gmail.com (swap for a form backend later if wanted).
- Cart is a front-end preview; checkout sends the guest to the ordering page set in `ORDER_URL`.
