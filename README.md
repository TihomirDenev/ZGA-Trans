<div align="center">
  <img src="public/icons/icon-192x192.png" alt="ZGA Trans logo — Sagittarius mark" width="120" />

  <h1>⚡ ZGA Trans</h1>

  <h3>
    <em>Straight to your goals.</em><br />
    A cinematic, scroll-driven website for a haulage company working across England.
  </h3>

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![GSAP](https://img.shields.io/badge/GSAP-3.15-0AE448?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com/) [![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-000000?style=for-the-badge)](https://lenis.darkroom.engineering/) [![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/explore/progressive-web-apps) [![ESLint](https://img.shields.io/badge/ESLint-Flat_Config-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/) [![Prettier](https://img.shields.io/badge/Prettier-3-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/)

</div>

---

## 📖 Table of contents

- [About](#-about)
- [Features](#-features)
- [A tour of the page](#-a-tour-of-the-page)
- [Tech stack](#-tech-stack)
- [Getting started](#-getting-started)
- [Scripts](#-scripts)
- [Project structure](#-project-structure)
- [Editing content](#️-editing-content)
- [Design system](#-design-system)
- [How the animations work](#-how-the-animations-work)
- [PWA](#-pwa)
- [SEO](#-seo)
- [Code quality](#-code-quality)
- [Deployment](#-deployment)
- [Pre-launch checklist](#-pre-launch-checklist)
- [Browser support](#-browser-support)
- [License](#-license)

---

## 🚚 About

**ZGA Trans** is a haulage company moving full loads, part loads and express freight **across England**.
The site is a single, cinematic landing page with a night-drive look: deep navy, electric-blue lightning and
amber marker lights, taken straight from the truck's livery. Its job is simple: impress, explain and turn
visitors into quote requests.

The logo is the **Sagittarius ♐ glyph**, the archer's arrow from the truck artwork. It appears as the
favicon, in the PWA icons and in the header, and it draws itself in the intro loader.

---

## ✨ Features

### 🎬 Motion & interaction

- ⚡ **Live lightning**: canvas lightning bolts with side branches strike the hero at random intervals, with a screen flash
- 🏹 **Archer's arrow**: the arrow flies across the screen and hits the word _"goals."_
- 🛣️ **Scroll-driven truck journey**: a pinned night road where scrolling drives the truck. The wheels roll exactly the distance travelled, the suspension bounces and roadside billboards switch on like neon
- 🛞 **Giant rolling tyre**: a detailed SVG tyre with the slogan on its sidewall turns as you scroll
- 🎞️ **Velocity-reactive marquee**: two crossing tapes that speed up, skew and change direction with the scroll
- 🔦 **Mouse spotlight cards**: service cards whose glow and border follow the cursor
- 🔢 **Count-up stats** and **word-by-word manifesto** reveals
- 🧈 **Buttery smooth scrolling** with Lenis, kept in sync with GSAP ScrollTrigger
- 🛤️ **Road progress indicator**: a mini truck drives down a tiny road on the right edge as you read

### 📱 Experience

- 📐 **Fully responsive**: phone (≤599px), tablet (600–1023px) and desktop (≥1024px), each with its own layout
- 🍔 **Full-screen mobile menu** with a circular reveal and staggered links
- 🫥 **Auto-hiding header** that becomes frosted glass once you scroll
- 📨 **Quote form** with validation that opens the visitor's email app with the request already filled in
- ♿ **Accessible**: a skip link, focus styles, ARIA labels, and full support for `prefers-reduced-motion` (all motion off, with a scrollable journey instead)

### 📲 Platform

- 📲 **Installable PWA**: manifest, maskable icons, iOS meta tags, and offline support through the Angular service worker
- 🔄 **"New version" banner**: tells installed users when an update is ready
- 🔤 **Self-hosted fonts**: no requests to Google Fonts, which is better for UK GDPR, offline use and speed
- 🔍 **SEO-ready**: meta tags, Open Graph, Twitter cards, `LocalBusiness` JSON-LD, `robots.txt` and `sitemap.xml`

### 🧹 Developer experience

- 🧭 **ESLint** (angular-eslint flat config, including template accessibility rules) + **Prettier**
- 🐶 **Husky + lint-staged**: staged files are linted and formatted on every commit
- 🤖 **GitHub Actions CI**: lint, format check and production build on every push and PR
- 🧩 **All content in constants**: edit the copy without touching components

---

## 🗺️ A tour of the page

| #   | Section          | Component                                  | What happens                                                                        |
| --- | ---------------- | ------------------------------------------ | ----------------------------------------------------------------------------------- |
| 0   | Intro loader     | `intro-loader`                             | The ♐ mark draws itself, the brand letters rise, then a flash and a curtain reveal |
| 1   | Hero             | `hero`                                     | Truck photo, canvas lightning, split-letter headline, the arrow hits _"goals."_     |
| 2   | Marquee          | `marquee`                                  | Crossing tapes react to scroll speed and direction                                  |
| 3   | Services         | `services`                                 | Six cards with a mouse spotlight, revealed in batches                               |
| 4   | How it works     | `journey` + `truck`                        | **Pinned.** The scroll drives the truck past 4 billboards to a finish line          |
| 5   | Why ZGA          | `why-us` + `tyre`                          | The manifesto lights up word by word, a giant tyre rolls, the stats count up        |
| 6   | Contact          | `contact`                                  | Quote form and phone, email and WhatsApp links                                      |
| 7   | Footer           | `footer`                                   | Giant brand name fills with light, legal details, back-to-top                       |
| ↗   | Always on screen | `header`, `road-progress`, `update-banner` | Navigation, scroll progress road, PWA update prompt                                 |

---

## 🧰 Tech stack

| Area          | Choice                                                                     | Why                                                                   |
| ------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Framework     | **Angular 21**: standalone components, signals, zoneless, new control flow | Modern Angular, no NgModules, no zone.js                              |
| Animation     | **GSAP 3** + ScrollTrigger + SplitText                                     | Industry standard for scroll-driven motion, and fully free since 3.13 |
| Smooth scroll | **Lenis**                                                                  | Lightweight, works with native scroll, so pinning keeps working       |
| Graphics      | Inline **SVG** (truck, tyre, logo) + **Canvas 2D** (lightning)             | Crisp at any size, no heavy 3D library needed                         |
| Styling       | **SCSS** + CSS custom properties                                           | Design tokens in one file, mixins for breakpoints and sections        |
| Icons         | **Bootstrap Icons**                                                        | Same set as our other projects                                        |
| Fonts         | **Fontsource**: Archivo (variable width), Inter, Instrument Serif          | Self-hosted, no third-party requests                                  |
| PWA           | **@angular/service-worker**                                                | Caching, offline support, update detection                            |
| Quality       | ESLint · Prettier · Husky · lint-staged · GitHub Actions                   | Consistent code without thinking about it                             |

> 💡 **Alternatives considered:** Three.js for a real 3D truck (too heavy for a landing page and slow on
> phones), Framer Motion (React only) and the native CSS `animation-timeline: scroll()` (not reliable
> enough across browsers yet for pinning). GSAP + SVG gives the best mix of wow, performance and control.

---

## 🚀 Getting started

### Prerequisites

- **Node.js 20.19+** (see `.nvmrc`; run `nvm use`)
- **npm 10+**

### Install & run

```bash
git clone https://github.com/TihomirDenev/ZGA-Trans.git
cd ZGA-Trans
npm install        # also installs the Husky git hooks
npm start          # → http://localhost:4200
```

> The service worker is **off** in development, so you always see fresh changes. Use `npm run preview` to
> try the real PWA (see below).

---

## 📜 Scripts

| Command                | What it does                                                             |
| ---------------------- | ------------------------------------------------------------------------ |
| `npm start`            | Dev server with live reload on `http://localhost:4200`                   |
| `npm run build`        | Production build + service worker → `dist/zga-trans/browser`             |
| `npm run preview`      | Production build served on `http://localhost:8080` (PWA testing)         |
| `npm run watch`        | Development build in watch mode                                          |
| `npm run lint`         | Lint all `.ts` and `.html` files with ESLint                             |
| `npm run lint:fix`     | Lint and auto-fix what can be fixed                                      |
| `npm run format`       | Format `src/` with Prettier                                              |
| `npm run format:check` | Check formatting without writing (used in CI)                            |
| `npm run check`        | **Everything CI runs**: lint, format check and build. Run before pushing |

---

## 📁 Project structure

```text
ZGA-Trans/
├── .github/workflows/ci.yml        # CI: lint → format check → build
├── .husky/pre-commit               # runs lint-staged before each commit
├── public/                         # copied as-is to the build output
│   ├── icons/                      # PWA icons (72 → 512px, maskable)
│   ├── apple-touch-icon.png        # iOS home-screen icon
│   ├── favicon.svg / favicon-32.png
│   ├── manifest.webmanifest        # PWA manifest
│   ├── robots.txt / sitemap.xml    # SEO
│   └── truck-hero.jpg              # hero photo
├── src/
│   ├── app/                        # root shell: app.ts, app.html, app.config.ts
│   ├── libs/
│   │   ├── components/             # one folder per component (ts + html + scss)
│   │   │   ├── brand-mark/         # ♐ logo
│   │   │   ├── contact/            # quote form + channels
│   │   │   ├── footer/
│   │   │   ├── header/             # nav + mobile menu
│   │   │   ├── hero/               # photo, lightning, headline
│   │   │   ├── intro-loader/
│   │   │   ├── journey/            # pinned road scene
│   │   │   ├── marquee/
│   │   │   ├── road-progress/      # right-edge scroll indicator
│   │   │   ├── services/
│   │   │   ├── truck/              # side-view SVG truck
│   │   │   ├── tyre/               # giant SVG tyre
│   │   │   ├── update-banner/      # PWA "new version" prompt
│   │   │   └── why-us/             # manifesto + stats
│   │   ├── constants/              # ✏️ ALL the content and tuning values live here
│   │   ├── helpers/                # pure functions: animations, lightning, skyline, email link
│   │   ├── models/                 # TypeScript interfaces
│   │   ├── pages/home/             # composes all sections in order
│   │   └── services/               # SmoothScrollService (Lenis + ScrollTrigger)
│   ├── styles/
│   │   ├── _tokens.scss            # 🎨 colours, fonts, spacing, radius, motion
│   │   ├── _breakpoints.scss       # phone / tablet / desktop mixins
│   │   └── _section.scss           # shared section, eyebrow and title mixins
│   ├── styles.scss                 # global reset, buttons, grain, Lenis, a11y
│   └── index.html                  # meta, SEO, JSON-LD
├── ngsw-config.json                # service worker caching rules
├── eslint.config.js
└── .prettierrc
```

Path aliases (see `tsconfig.json`): `@libs/components/*`, `@libs/constants/*`, `@libs/helpers/*`,
`@libs/models/*`, `@libs/pages/*`, `@libs/services/*`.

---

## ✏️ Editing content

Almost everything you'd want to change is a **constant**, so there's no need to dig through templates.

| What                                       | Where                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| 📞 Phone, email, WhatsApp                  | `src/libs/constants/contact.constants.ts`                                      |
| 🏢 Company name, number, registered office | `src/libs/constants/contact.constants.ts`                                      |
| 📦 Load types in the form                  | `src/libs/constants/contact.constants.ts` → `LOAD_TYPES`                       |
| 🚛 Services (title, text, icon, tags)      | `src/libs/constants/services.constants.ts`                                     |
| 🛣️ Journey steps (billboards)              | `src/libs/constants/journey.constants.ts` → `JOURNEY_STEPS`                    |
| 🏙️ Skyline shape                           | `src/libs/constants/journey.constants.ts` → `SKYLINE_*`                        |
| 📊 Stats & manifesto                       | `src/libs/constants/why-us.constants.ts`                                       |
| 🎞️ Marquee text                            | `src/libs/constants/marquee.constants.ts`                                      |
| 🧭 Navigation links                        | `src/libs/constants/navigation.constants.ts`                                   |
| ⏱️ Animation tuning                        | `src/libs/constants/animation.constants.ts`                                    |
| 🖼️ Hero headline & intro text              | `src/libs/components/hero/hero.component.html`                                 |
| 📷 Hero photo                              | replace `public/truck-hero.jpg` (keep the name; **≥ 2400px wide** recommended) |

Icons use [Bootstrap Icons](https://icons.getbootstrap.com/) class names, e.g. `bi-truck-front-fill`.

### 📨 Quote form

The form has **no backend**. On submit it builds a `mailto:` link with the full request
(`src/libs/helpers/contact.helpers.ts`) and opens the visitor's email app. To receive requests directly,
replace `buildQuoteEmailLink` in `ContactComponent.onSubmit()` with a `fetch` POST to one of:

- [Formspree](https://formspree.io/): simplest, free tier
- [EmailJS](https://www.emailjs.com/): sends from the browser
- A serverless function (Vercel / Netlify / Firebase) + an email API such as Resend

### 🖼️ Logo, favicon & PWA icons

The ♐ mark is drawn in SVG in three places, so keep them in sync if you change it:

1. `src/libs/components/brand-mark/brand-mark.component.html`: header and intro
2. `public/favicon.svg`: browser tab
3. `public/icons/*.png`, `public/apple-touch-icon.png`, `public/favicon-32.png`: PNG exports

To regenerate the PNGs, export the SVG at each size with any tool (Figma, [realfavicongenerator.net](https://realfavicongenerator.net/)
or `sharp`). Keep the glyph inside the central ~60% so maskable icons don't crop it.

---

## 🎨 Design system

All tokens live in `src/styles/_tokens.scss` as CSS custom properties.

| Token                 | Value                         | Used for                           |
| --------------------- | ----------------------------- | ---------------------------------- |
| `--surface-0`         | `#03050c`                     | page background (night sky)        |
| `--surface-1/2/3`     | `#070b18` → `#131c3a`         | sections, cards, hover             |
| `--accent`            | `#3d7bff`                     | electric blue: buttons, glows      |
| `--accent-bright`     | `#7fb0ff`                     | outlines, links, neon edges        |
| `--amber`             | `#ff8a1f`                     | marker lights, highlights, numbers |
| `--gradient-electric` | soft blue → electric → bright | accent words, tapes, brand fill    |

**Typography**

- **Archivo Variable** (`--font-display`): headlines. Uses the _width_ axis (`font-stretch: 112–125%`) for the wide, trucking-livery look
- **Inter Variable** (`--font-sans`): body text
- **Instrument Serif Italic** (`--font-serif`): accent words like _goals._ and _with purpose._, echoing the serif slogan on the truck

**Breakpoints** (`_breakpoints.scss`): `@include phone`, `tablet`, `desktop`, `below-desktop`, `above-phone`.

**Conventions:** kebab-case class names (no BEM), nesting with `&`, `// ─── Section ───` banner comments,
`@use` instead of `@import`.

---

## 🎬 How the animations work

### The pattern

Every animated component follows the same three steps:

```ts
constructor() {
  afterNextRender(() => {                         // 1. run in the browser, after the DOM exists
    if (isReducedMotionPreferred()) {             // 2. respect the user's OS setting
      return;
    }

    createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
      gsap.from('.my-element', { ... });          // 3. selectors only match inside this component
    });
  });
}
```

`createScopedAnimations` (in `helpers/animation.helpers.ts`) wraps `gsap.context()`, so selectors are scoped
to the component and **every tween and ScrollTrigger is reverted automatically** when the component is
destroyed. No leaks, no manual cleanup.

### Smooth scroll

`SmoothScrollService` creates one Lenis instance, drives it from GSAP's ticker and forwards every scroll to
`ScrollTrigger.update`. It also exposes `scrollToSection(id)`, `scrollToTop()`, `stop()` and `start()`. The
intro and the mobile menu use the last two to lock scrolling.

### The journey section (the signature piece)

- `.journey` is **pinned** for exactly as long as the road needs to scroll sideways
- One **timeline** with `scrub` moves the road world left, rolls the wheels, pushes the skyline (parallax) and fills the progress bar
- Wheel rotation is **physically correct**: `distance ÷ (2π × wheel radius) × 360°` (`getWheelRotationForDistance`)
- The suspension bounce is a `yoyo` tween **inside** the scrubbed timeline, so it only bounces while you scroll
- Each billboard has its own ScrollTrigger using `containerAnimation`. When it reaches the truck, the `reachedStepCount` signal updates and Angular adds the neon class
- Scroll velocity fades in the speed lines behind the truck

### Lightning

`helpers/lightning.helpers.ts` builds a jagged bolt (a straight line split into segments with random
sideways offsets) plus a few branches, then draws a blurred blue glow and a white core on a `<canvas>`.
A GSAP timeline flickers its opacity, and `gsap.delayedCall` schedules the next strike, but only while the
hero is on screen.

### Adding a new animated section

1. Create `src/libs/components/my-section/` (ts, html, scss)
2. Use `@include section-shell`, `eyebrow` and `section-title` from `_section.scss`
3. Animate with the pattern above, using `revealOnScroll('.my-heading > *', '.my-section')` for a quick fade-up
4. Add `<app-my-section />` to `pages/home/home.component.html`
5. Optionally add it to `NAV_LINKS` (with a matching `id` on the `<section>`)

### Reduced motion

With **"Reduce motion"** on in the OS: no intro, no Lenis, no GSAP animations, and the journey becomes a
normal horizontally scrollable strip with every billboard lit.

---

## 📲 PWA

| Piece                  | File                                                        |
| ---------------------- | ----------------------------------------------------------- |
| Manifest               | `public/manifest.webmanifest`                               |
| Icons (maskable + any) | `public/icons/`                                             |
| iOS support            | `apple-touch-icon.png` + `apple-mobile-web-app-*` meta tags |
| Service worker config  | `ngsw-config.json`                                          |
| Registration           | `src/app/app.config.ts` (`provideServiceWorker`)            |
| Update prompt          | `src/libs/components/update-banner/`                        |

**Caching:** the app shell (HTML, JS, CSS, hero photo, favicon) is **prefetched** on install. Fonts and
other images are cached **lazily** the first time they're used. After that the whole site works
offline.

**Updates:** when a new deploy is detected, installed users see a small _"A new version is ready —
Refresh"_ banner.

### Test it locally

```bash
npm run preview          # build + serve on http://localhost:8080
```

Then in Chrome DevTools go to **Application → Manifest / Service workers**, or click the install icon in
the address bar. On a phone, open the deployed URL, then use **Share → Add to Home Screen** on iOS or
**Install app** on Android.

> ⚠️ Service workers need **HTTPS** (or `localhost`). Every host listed below provides HTTPS
> automatically.

---

## 🔍 SEO

- `<title>`, meta description, canonical URL, `lang="en-GB"`
- Open Graph + Twitter `summary_large_image` cards (uses the hero photo)
- `LocalBusiness` **JSON-LD** with `areaServed: England`, opening hours and contact details
- `robots.txt` + `sitemap.xml`

> 🌐 The domain `https://www.zgatrans.co.uk` is a **placeholder**. Search and replace it in `src/index.html`,
> `public/robots.txt` and `public/sitemap.xml` once the real domain is known. Register the site in
> [Google Search Console](https://search.google.com/search-console) and create a
> [Google Business Profile](https://www.google.com/business/) for local search.

---

## 🧹 Code quality

| Tool            | Config                           | Runs                               |
| --------------- | -------------------------------- | ---------------------------------- |
| **ESLint**      | `eslint.config.js`               | `npm run lint`, on commit, in CI   |
| **Prettier**    | `.prettierrc`, `.prettierignore` | `npm run format`, on commit, in CI |
| **lint-staged** | `package.json` → `lint-staged`   | on commit, staged files only       |
| **Husky**       | `.husky/pre-commit`              | before every `git commit`          |
| **CI**          | `.github/workflows/ci.yml`       | every push to `main` and every PR  |

ESLint uses `typescript-eslint` (recommended + stylistic), `angular-eslint` (TS + templates +
**template accessibility**), and `eslint-config-prettier` so ESLint and Prettier never disagree.

**VS Code:** accept the recommended extensions (ESLint, Prettier, Angular Language Service).
`.vscode/settings.json` turns on format-on-save and ESLint auto-fix on save.

### Coding conventions

- Standalone components, `inject()`, `signal()`, `@if` / `@for` control flow
- Self-descriptive names (`buildDriveTimeline`, `lightUpStopsWhenReached`, `isReducedMotion`), so the code reads like sentences
- Constants in `SCREAMING_SNAKE_CASE` in `constants/*.constants.ts`; interfaces in `models/*.model.ts`
- Pure logic in `helpers/*.helpers.ts`, with no Angular inside
- Imports grouped as `@angular/*` → third-party → `@libs/*`

---

## ☁️ Deployment

The build output is a static folder: **`dist/zga-trans/browser`**.

| Host                 | Settings                                                                          |
| -------------------- | --------------------------------------------------------------------------------- |
| **Vercel**           | Framework: Angular · Build: `npm run build` · Output: `dist/zga-trans/browser`    |
| **Netlify**          | Build: `npm run build` · Publish: `dist/zga-trans/browser`                        |
| **Firebase Hosting** | `firebase init hosting` → public dir `dist/zga-trans/browser` · `firebase deploy` |
| **Cloudflare Pages** | Build: `npm run build` · Output: `dist/zga-trans/browser`                         |

> 💡 For the PWA to update reliably, make sure `ngsw.json`, `ngsw-worker.js` and `index.html` are **not**
> cached long-term by the host. The defaults on the hosts above are fine.

Once the custom domain is connected, update the placeholder domain (see [SEO](#-seo)).

---

## ✅ Pre-launch checklist

- [ ] Real **phone, email, WhatsApp** in `contact.constants.ts`
- [ ] Real **company number** and **registered office**. UK law (Companies Act) requires them on the website
- [ ] **Privacy policy** page or section. The form collects personal data (UK GDPR)
- [ ] Higher-resolution **hero photo** (≥ 2400px wide), ideally compressed to WebP/AVIF
- [ ] Real **domain** in `index.html`, `robots.txt` and `sitemap.xml`
- [ ] Hook the **quote form** to Formspree, EmailJS or similar (optional, `mailto:` works today)
- [ ] Double-check the **stats** and **service** claims with the client
- [ ] Lighthouse run (Performance, Accessibility, Best Practices, SEO, PWA)
- [ ] Test on a real iPhone and Android phone, including **Add to Home Screen**
- [ ] Google Search Console + Google Business Profile

---

## 🌐 Browser support

Latest **Chrome, Edge, Firefox and Safari** (desktop and mobile), plus iOS Safari 16.4+. Older browsers
get the content without some effects (e.g. `backdrop-filter` blur).

---

## 📄 License

**Proprietary. All rights reserved.** The code, the ZGA Trans name, logo, slogan and imagery belong to
ZGA Trans. Not for reuse without permission.

<div align="center">
  <br />
  <sub>Built with ⚡ by <a href="https://github.com/TihomirDenev">Tihomir Denev</a></sub>
</div>
