# Simpana Technologies — website

A static marketing site: Next.js builds it to plain HTML/CSS/JS, so it can be
served from any web server, S3 bucket, or CDN. There is no Node runtime in
production and no backend.

- **Framework:** Next.js 16 (App Router, JavaScript), static export
- **Styling:** Tailwind CSS 4, tokens defined in `src/styles/globals.css`
- **State:** Zustand · **Forms:** Formik + Yup
- **Fonts:** Manrope (headings) + Inter (body), self-hosted via `next/font`

```bash
npm run dev      # http://localhost:3000
npm run build    # writes the site to out/
npm run lint

# preview the real static output
npx serve out    # or: cd out && python -m http.server 4300
```

Deploy by uploading `out/` anywhere. Nothing else is required.

## Folder structure

```
src/
  app/          one folder per route, nothing else
  components/
    ui/         building blocks — Button, Card, Section, Badge, Icon…
    layout/     Header, Footer, Logo
    sections/   whole page sections — Hero, ProductsGrid, CTABand…
    forms/      ContactForm, ApplicationForm, and their field wrapper
  data/         all site copy — site.js (nav, contact) and content.js
  lib/          small helpers — validation schemas, date formatting, form POST
  store/        Zustand stores
  styles/       globals.css — the entire design system
```

Copy lives in `src/data/`, never inside components, so text changes never mean
touching layout code.

## Design system

The palette is taken from the logo: navy `#1B3A5C`, brand blue `#2B6CA3`, light
blue `#8DBBD8`, green `#A9C97E`. Everything is defined as Tailwind theme tokens
at the top of `src/styles/globals.css` — `brand-*`, `leaf-*`, `ink-*`, plus
surface and line colours. No component hardcodes a colour.

Contrast was checked against WCAG AA: body text is 7.1:1 or better on white,
`brand-600` links 5.6:1, white on navy 14.6:1. Two tokens (`ink-400`,
`leaf-600`) sit below 4.5:1 and are marked decorative-only in the CSS — do not
use them for body copy.

Repeated patterns are component classes in the same file (`.btn`, `.eyebrow`,
`.prose-simpana`); everything used once is a Tailwind utility at the call site.

### Hero backdrop

Every navy hero band renders `components/ui/HeroBackdrop.jsx`: drifting colour
orbs and a light sweep, with one signature graphic on top. **Each page has its
own motif**, defined in `components/ui/heroFields.jsx` and chosen with the
`backdrop` prop on `PageHero`:

| Page | Motif | What it shows |
|---|---|---|
| Home | `aisle` | Warehouse racking in one-point perspective, ribs travelling out of the vanishing point |
| Products | `conveyor` | Cartons running along belts over rollers |
| Product detail | `scan` | A barcode under a sweeping scanner beam |
| Services | `flow` | An order moving through six stages of the stack |
| About | `network` | A constellation of connected nodes |
| Careers | `orbit` | Figures circling a centre |
| Case studies | `radar` | A rotating sweep picking up blips |
| Case study detail | `contours` | Layered terrain lines drifting |
| Blog | `waveform` | Throughput bars rising and falling |
| Blog post | `pulse` | A dot matrix rippling diagonally |
| Contact | `beacon` | Rings going out from a signal point |

All eleven are hand-authored SVG animated with CSS — no randomness, so server
and client markup always agree, and no JavaScript to load.

Three rules keep the decoration from fighting the copy. All are load-bearing:

- **The scrim.** `.hero-scrim` holds near-solid navy across the left **86%** of
  the band. The hero copy box reaches roughly 73% of the viewport at desktop
  widths, so a shorter veil lets bright motif details land inside the text box —
  that is exactly how the green accent dots ended up at 2.4:1 before.
- **Emitter placement.** The orbit, radar and beacon centres sit at x≈950–995 in
  the 1200-unit canvas, to the right of where copy can reach.
- **The mobile rule.** Below `lg` the copy spans the full width, so the graphic
  sits underneath it. The field drops to 42% opacity and the scrim thickens.

Travelling motifs (aisle, conveyor, radar, beacon) use **negative** animation
delays so the band is fully populated on the first frame. With positive delays
a visitor watches a near-empty hero fill in over a whole cycle.

Contrast is measured behind the actual copy box, not the whole band — bright
decoration in empty space does not affect legibility. Worst case across all 11
heroes at desktop and mobile is **8.35:1**; most are 11–14:1.

## Forms

Both forms validate in the browser with Formik + Yup (`src/lib/validation.js`)
and POST as JSON to `NEXT_PUBLIC_FORM_ENDPOINT` — see `.env.example`. Set it to
a form service (Formspree, Basin, Web3Forms) or any API of your own with CORS enabled.

With no endpoint configured the forms still validate, then tell the visitor the
form is not connected and give them the email address. They never report a
success that did not happen.

The careers form takes a **CV upload** (`components/forms/FileField.jsx`) with
a click-or-drag drop zone, validated for type and size before it leaves the
browser: PDF/DOC/DOCX, 5 MB max. When a file is attached the request switches
from JSON to `multipart/form-data`, so the endpoint you choose has to accept
file uploads — Formspree, Basin and Web3Forms all do. The contact form carries
no file and stays JSON.

Both carry a honeypot field, and the enquiry form keeps a draft in
`sessionStorage` so a half-written message survives a detour to another page.

## Static export: things to remember

`output: "export"` is set in `next.config.mjs`. That rules out route handlers,
middleware, rewrites, redirects, ISR, and server actions. Every dynamic route
needs `generateStaticParams()`, and `next/image` optimisation is off — images
are served as authored. `trailingSlash: true` emits `about/index.html` so hosts
that do not rewrite extensionless URLs still resolve every route.

## Verified

30 routes prerender to 28 HTML files plus `robots.txt` and `sitemap.xml`. Checks
run against the built output served as static files: zero horizontal overflow at
390–1440px, mobile drawer opens/closes and locks scroll, Yup rejects bad input
without sending, the unconfigured-endpoint path reports honestly, the Zustand
draft survives navigation, and every page still renders with JavaScript
disabled.

## Before launch

- [ ] Replace the logo mark with the official artwork
- [ ] Set `NEXT_PUBLIC_FORM_ENDPOINT` and send a real test submission
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain
- [ ] Replace the seven sample blog posts with real articles
- [ ] Confirm the four job listings — they are placeholders
- [ ] Confirm "10+ years in supply chain"
- [ ] Case-study write-ups need client permission
- [ ] Add an Open Graph image (`src/app/opengraph-image.png`)
