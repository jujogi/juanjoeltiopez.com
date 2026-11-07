# Frontend Best Practices

Conventions for **juanjoeltiopez.com** — the site of JuanJo El Tío Pez, a
Colombian aquarium creator. Next.js 16 (App Router) + React 19, plain
JavaScript, Chakra UI v2 with Emotion, content kept as data and Markdown in
`src/lib/`. Deployed on AWS Amplify.

Every rule below exists because breaking it cost us something real. Where a rule
has a scar, the scar is named. A rule you can't trace to a consequence is a rule
people quietly stop following.

**What enforces these rules today: almost nothing.** `npm run lint` runs ESLint
with Next's `core-web-vitals` config (`eslint.config.mjs`) — React, hooks,
`next/image` and accessibility basics, none of the project rules below. Neither
lint nor Prettier (`.prettierrc`) runs in the build or in CI. There is no
TypeScript and no test suite. Every rule here is a convention that a reviewer
has to check — see §9 for how.

---

## 1. Colours come from the theme

**Practice — use the tokens in `src/theme/index.js`:** `dark.bg`, `dark.bgAlt`,
`dark.surface`, `dark.surfaceRaised`, `dark.border`, `dark.text`,
`dark.textSecondary`, `dark.textMuted`, `accent.cyan` (the aquatic green
`#3ecf9e`), `accent.sand`, `accent.blue` and `water.950`. Don't write hex
codes or `rgba()` in components.

**Practice — text on an accent background is dark (`water.950`), never white.**
The theme's `solid` button already does this; a hand-styled button with
`bg="accent.cyan"` must set `color="water.950"` itself.

**Why.** The site is dark (`#06171f`). White text on the green accent fails
contrast; a light-theme colour left behind renders as a white slab or invisible
text, and nothing errors.

**Allowed exceptions:** brand colours that must be recognised — WhatsApp green
`#25D366` on the WhatsApp button — and the translucent nav background in
`Navigation.js`. Older widgets on `main` (`FeaturedVideosWidget`,
`RelatedVideosWidget`) still hardcode TikTok/Instagram colours.

```bash
grep -rnoE "#[0-9a-fA-F]{6}\b|rgba\(" src/components app | grep -v src/theme
```

---

## 2. Rendering — content in the first HTML

**Practice — `page.js` and `layout.js` stay Server Components.** They own
`metadata`/`generateMetadata`, `generateStaticParams`, `notFound()` and the
JSON-LD, then render one client "View" from `src/components/<section>/`
(`ArticleView`, `HomeView`, `BlogIndexView`, `AsesoriaView`, `SobreMiView`).
Chakra v2 components need `"use client"`, so the views are client components —
but they are still server-rendered, so the text is in the initial HTML.

**Scar.** Article pages used to be client pages that loaded content after a
fake skeleton. The HTML Google received had no article text in it.

**Practice — structured data is rendered on the server** with
`src/components/JsonLd.js`, never injected from a client effect.

**Practice — the Emotion cache must be the real one.** `Providers.js` wraps
Chakra in `src/components/EmotionRegistry.js` (`useServerInsertedHTML`,
`cache.compat = true`). Don't swap it back for `@chakra-ui/next-js`'s
`CacheProvider`, which in the installed version does nothing.

**Scar.** With the no-op provider, Emotion's styles were inserted in different
places on the server and the client, and every page logged a hydration
mismatch. Bisecting the page found nothing; the cause was the provider.

**Practice — don't put an immutable `Cache-Control` on `/_next/static` in
`next.config.js`.** Next already sets the right headers in production.

**Scar.** In dev, the browser kept running stale JS chunks, so fixed bugs kept
"reappearing" (a `motion()` deprecation warning survived its own fix).

---

## 3. SEO and metadata

- Every route segment sets its own `alternates.canonical`.
- A nested layout's `title` must be `{ default, template }` if pages below it set
  titles; a plain string overrides the root template. The root template also
  applies to a layout's `default`, so don't add the suffix there yourself.
  **Scar:** pages under `/blog` lost "| JuanJo El Tío Pez", then got it twice.
- Site-wide facts (price, followers, author, URLs) live once in
  `src/lib/siteConfig.js`. Metadata, JSON-LD and the UI read from there.
- Every new page or category is added to `app/sitemap.js`.
- The site's `Person`/`Organization` is defined once in `app/layout.js`
  (`@id: SITE_URL/#juanjo`); other pages reference that id.

---

## 4. Content is data — and it is JuanJo's voice

**Practice — copy lives in `src/lib/`** (`blogData.js`, `posts/*.js` Markdown,
`asesoriaData.js`, `categories.js`, `videosData.js`, `testimonialsData.js`), not
inline in components, when it is used in more than one place (page + JSON-LD,
page + sitemap).

**Practice — keep JuanJo's text verbatim** when redesigning. Restructure the
layout, not his words. New copy is Colombian Spanish in his voice: "tú", first
person, his phrases ("Te comparto lo que me ha funcionado (y lo que no)",
"nada de complicarse", "acuariofilia responsable", "gambitas"), "agua de la
llave" over "grifo". Flag any new sentence you wrote so he can reword it.

**Practice — a fact in an article must not contradict another article.** If you
add a parameter (pH, GH, temperature), check the other posts on the same
animal. Today the two shrimp posts disagree on caridina pH.

**Practice — images in `public/` are served as-is.** `next/image` strips
metadata from the optimised copy, but the original file stays public. Strip
GPS EXIF before committing a photo taken at home.

---

## 5. Layout and responsive

**Practice — the theme's `sm` breakpoint is 320px.** It applies on every phone.
For "phone vs. bigger" use `base` and `md`.

**Scars.** `columns={{ base: 1, sm: 2 }}` put two cramped cards side by side on
phones. `direction={{ base: "column", sm: "row" }}` kept two buttons in a row,
and once a label grew ("Asesorías personalizadas") the hero ran off the screen.

**Practice — rows of buttons wrap** (`direction="row" wrap="wrap"`), buttons
with long labels set `whiteSpace="normal" h="auto"`, and a single-column grid
is `minmax(0, 1fr)`, not `1fr`, so one wide child can't push the column wider
than the screen.

**Practice — `overflow-x: clip` on `html`/`body`, never `hidden`.** `hidden`
turns the body into a scroll container and breaks every `position: sticky`.
**Scar:** the article table of contents stopped sticking.

**Practice — the nav is sticky and 64px tall.** Sticky elements use
`top={20}` or more; heading anchors use `scrollMarginTop` ≥ `88px`
(`ArticleBody`), so nothing hides behind the bar.

---

## 6. Accessibility

- One `h1` per page; sections are `<section aria-labelledby>` pointing at an id
  the same component renders.
- Icon-only buttons have a Spanish `aria-label`; toggles set `aria-expanded` and
  `aria-controls` (see the mobile menu in `Navigation.js`).
- Breadcrumbs use `nav aria-label="Ruta de navegación"` and `aria-current="page"`.
- Every `next/image` has a descriptive Spanish `alt`, and never an empty `src`.
- Never `aria-hidden` an element that contains a link or button.

---

## 7. Code organisation

- **Folders:** route files in `app/`; page views and their pieces in
  `src/components/<section>/`; shared pieces in `src/components/` and
  `src/components/ui/`; data and helpers in `src/lib/`. Absolute imports with
  `@/` (→ `src/`).
- **Files:** PascalCase `.js` for a file that exports a component, camelCase for
  everything else. Module-level constants are UPPER_SNAKE_CASE.
- **One job per file.** A view may keep small private presentational sections
  (`Hero`, `Steps`) beside it. A piece with its own state or reused elsewhere
  moves to its own file. Past ~250 lines, look again (`AsesoriaView.js` is the
  largest today).
- **Reuse before writing:** `ui/SectionHeading.js` (`Eyebrow`,
  `SectionHeader`), `PostCard`/`FeaturedPostCard`, `AsesoriaBand`,
  `article/Breadcrumbs`, `article/ArticleFAQ`, `JsonLd`.
- **Delete dead code your change creates.** Version control is the
  just-in-case. Pre-existing dead code is reported, not deleted, unless asked
  (unused on `main` today: `FeaturedProducts`, `FloatingWhatsAppButton`,
  `ShopWidget`, `SubscriptionSidebar`).

---

## 8. Dependencies and deploy

- Amplify runs `npm ci` from **`package-lock.json`** (`amplify.yml`). Any
  dependency change must update that lock file. `pnpm-lock.yaml` is local only
  and untracked.
- After upgrading, run `npm audit` and a production build.

---

## 9. Verification

There are no automated tests, so verification is by running things:

1. `npm run build` — must pass.
1. `npm run lint` — no new problems. (Known on `main`: one error in
   `app/tienda/[slug]/page.js` and warnings for the `export default` template
   strings in `src/lib/posts/` and `src/lib/products/`.)
1. The dev server log (`npm run dev`) shows no new errors or hydration warnings.
1. Look at the running app at desktop width and at **390px and 330px**.
1. Measure overflow, don't eyeball it. Because of `overflow-x: clip`,
   `scrollWidth` hides overflow — check element rects instead:
   ```js
   [...document.body.querySelectorAll("*")].filter(
     e => e.getBoundingClientRect().right > innerWidth + 1
   );
   ```
1. For SEO changes, `curl` the page and check the HTML: text, `<title>`,
   canonical, JSON-LD.
1. `npx prettier --check` on the files you touched.

Report what you verified and how; say plainly what you didn't check.

---

## The shortlist

1. **Theme tokens only;** dark text on the accent.
2. **Server `page.js`, client view;** content and JSON-LD in the first HTML.
3. **`md`, not `sm`,** for phone layouts — and test at 330px.
4. **JuanJo's words, verbatim;** new copy in Colombian Spanish.
5. **One source of truth** for price, followers and content (`src/lib/`).
6. **Delete the dead code you create;** report the rest.
