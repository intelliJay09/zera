# Zera logo files

Every Zera logo file lives here, once. The print-ready files for the Zera Seal and the ZERA
lockup are in `seal/`, `lockup/` and `merch/`. Hand this file to the print shop along with
the artwork.

`icons/` holds the five website icons. They are links to the real files in `public/`, which
the site serves, so there is still only one copy of each.

Every SVG and PDF is **vector**, with all type converted to outlines, so no fonts are
required to open or output these. Nothing here is screen artwork that has been scaled up.

The mark is the **Solid Seal**: a copper disc with the Z cut out of it. It is the same
object as `public/favicon.png`, drawn from one shared geometry, so the printed mark and the
digital mark cannot drift apart.

---

## 1. Colour

| Name | Hex | RGB | CMYK (uncalibrated) |
|---|---|---|---|
| Copper (primary) | `#B87333` | 184, 115, 51 | 0 / 38 / 72 / 28 |
| Cream | `#F3E9DC` | 243, 233, 220 | 0 / 4 / 9 / 5 |
| Near-black | `#050505` | 5, 5, 5 | 0 / 0 / 0 / 98 |

**Screen printing:** copper is a spot colour. Match it to `#B87333` against a physical
draw-down, and pull the nearest chip from the **Pantone Solid Coated** guide by eye. Do not
accept a purely numeric hex-to-Pantone conversion, it will drift warm or muddy.

The CMYK figures are a plain arithmetic conversion, not a colour-managed one. For any CMYK
process work, colour-manage from the hex.

Metallic copper ink roughly doubles the minimum feature sizes. Say so before proceeding and
the artwork will be re-cut.

---

## 2. What to send the shop

- **Screen printing:** the `.pdf` (or `.svg`). Plates are in each `separations/` folder.
- **DTG:** the `@300dpi.png`. Transparent, sRGB. Do not convert to CMYK, the RIP handles it.

---

## 3. The Seal

`seal/`

| File | Use |
|---|---|
| `zera-seal-2col-180mm-centre-chest` | Centre chest, 180 mm (7.1 in) disc |
| `zera-seal-2col-80mm-left-chest` | Left chest, 80 mm (3.15 in) disc |
| `zera-seal-1col-*` | One-ink version, Z knocks out to the garment |

**Two-colour** is copper disc plus a cream Z. **One-colour** is copper only, with the Z left
as bare fabric. Cheaper, and it works on any garment colour.

**180 mm is deliberate.** An earlier 216 mm version was rejected: at that size a copper disc
stops reading as a mark and becomes a plate. Do not scale this up.

### Plates, two-colour on a dark garment (3 screens)

1. `plate-underbase` — white, printed first for opacity. Skip on cream or white garments.
2. `plate-copper` — copper `#B87333`. The Z is already knocked out of this plate.
3. `plate-cream` — cream `#F3E9DC`, the Z itself.

On a cream or white garment the one-colour file prints in a single pass, since the Z is just
the fabric showing through.

### Placement
- **Centre chest:** top edge of the disc **76 mm (3 in)** below the **bottom edge of the
  collar band**, measured at centre front. Horizontally centred.
- **Left chest:** horizontal centre of the disc **89 mm (3.5 in)** left of centre front, top
  edge **130 mm (5.1 in)** below the **high point of shoulder (HPS)**. Keep a minimum
  **50 mm (2 in)** clear of the armhole seam.

"Left chest" means the **wearer's left**, which appears on the right-hand side of the
garment when you are looking at the front of it.

---

## 4. The lockup

`lockup/`

ZERA wordmark in cream, tagline in copper directly beneath. No rule between them.

The tagline is set **`REVENUE, REALIZED`** with a comma and **no full stop**. Do not add one.

| File | Size | Placement |
|---|---|---|
| `zera-lockup-280mm-across-chest-*` | 280 x 116.6 mm (11 x 4.59 in) | Across the chest, centred |
| `zera-lockup-95mm-left-chest-*` | 95 x 39.6 mm (3.74 x 1.56 in) | Left chest |

`-dark-garment` has a cream wordmark, for charcoal, black and heather.
`-light-garment` has a near-black wordmark, for cream, white and natural.

Plates in `separations/`: `plate-wordmark`, `plate-copper` (the tagline), `plate-underbase`.

### Placement
- **Across chest, 280 mm:** top edge **110 mm (4.33 in)** below the **bottom edge of the
  collar band**, centred. That puts the artwork's vertical centre 167 mm below the collar.

  **Do not apply the usual "3 in below the collar" rule to this one.** That rule positions a
  top edge and assumes a tall graphic, 10 to 14 in, whose mass then falls across the chest.
  This lockup is only 4.59 in tall, so a 3 in top edge leaves the whole block sitting in the
  yoke, close to the neck.

- **Left chest, 95 mm:** horizontal centre **89 mm (3.5 in)** left of centre front, top edge
  **160 mm (6.3 in)** below HPS, minimum **50 mm (2 in)** clear of the armhole seam.

### Type sizes, checked against screen-print minimums

| | Across chest 280 mm | Left chest 95 mm |
|---|---|---|
| Wordmark cap height | 69.1 mm | 23.4 mm |
| Tagline point size | 61.4 pt | 20.8 pt |
| Tagline cap height | 15.52 mm | 5.27 mm |

Both clear the 8 pt minimum for positive type. Tracking is **0.15em on both**, and the tagline is set to **92% of the wordmark width**.
Those two values reproduce the proportions of the brand's own lockup in
`public/images/og-zera-primary.png`, measured at wordmark cap 160px, tagline cap 37.8px,
tagline width 645px against a 700px wordmark. Do not set the tagline to the footer's
0.20em: at that tracking it cannot reach the brand's cap ratio without running wider than
the wordmark.

---

## 5. Merch variant

`merch/` — supplied at 25 mm (1 in) but vector, so it scales freely.

The Z bar is **57 units instead of 52**, roughly 10% thicker than the main mark. On small
work the copper spreads inward under squeegee pressure and thins a knocked-out shape, so
this version starts fatter and lands correct. Use it for pens, caps, embroidery and labels,
anything under about 40 mm.

**Do not use the merch variant above 40 mm**, and do not use the main mark below 25 mm.

Minimum reproduction size is **19 mm (0.75 in)**, verified by simulating up to 0.8 mm of ink
spread with the Z still fully open.

---

## 6. Things that will go wrong if nobody says them

**Measure from the stated datum.** "3 in down" means three different positions depending on
whether it is measured from the collar bottom, the shoulder seam, or the HPS. The datum for
each placement is named above. Confirm which one the shop uses before they print.

**One screen size across the run.** These are sized for adult S to XXL. Left chest artwork
does **not** scale, it stays 80 mm or 95 mm on every size. If youth sizes are included, ask
and a reduced file will be cut.

**Print the smallest garment first** as the test pull.

**PDF page sizes** land within 0.18 mm of nominal, which is Chrome's rounding to 1/96 in.
That is far inside garment print tolerance. The **`.svg` is the dimensional master**.

**Do not re-draw, re-trace or "clean up" the artwork.** The knockouts are already boolean
compound paths with the correct fill rule.

---

## 7. Regenerating

Artwork is generated, not hand-drawn. Sources live in the session scratchpad:
`build_print.py` (geometry and type outlining), `make_outputs.js` (PDF and PNG), and
`build-icons.js` (the five favicon files). Geometry is defined once in a 512-unit icon space
and shared by both, so the printed mark and the favicon are the same object.
