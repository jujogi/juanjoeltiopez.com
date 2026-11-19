# juanjoeltiopez.com

Site of JuanJo El Tío Pez, a Colombian aquarium creator: blog, asesorías, shop and
Armonía Acuática (fish and shrimp compatibility tool). Next.js App Router, React,
plain JavaScript, Chakra UI v2. No tests, no TypeScript. Deployed by AWS Amplify from
`main`.

## Before you write code

- Read `.claude/coding-principles.md` and `.claude/frontend-best-practices.md`. They
  cover theme tokens, responsive rules, file size, where copy lives and how to verify.
- This Next.js version has breaking changes. Read the relevant guide in
  `node_modules/next/dist/docs/` before using a Next API.
- Never commit, push or open a pull request without JuanJo's approval. Approval for one
  is not approval for the next.
- Never run `npm run build` while `next dev` is running on port 3000.
- New articles follow `src/lib/posts/README.md`.

## Voice

All site copy is Colombian Spanish in JuanJo's own voice. Take the wording from his
articles in `src/lib/posts/` and his video titles in `src/lib/videosData.js`.

- Talk to the reader with "tú": "Tenlo en grupo", "Dale calentador", "Si estás
  iniciando…".
- His phrases: "no es lo mismo vivir que sobrevivir", "entre más…, mejor", "gambitas",
  "gambario", "acuario plantado", "iniciar", "plan B".
- Articles and most pages use first person singular ("te cuento", "mi recomendación").
- Armonía Acuática uses "nosotros" ("Comparamos…", "No te lo recomendamos",
  "cuéntanos"). The one exception is the shop invitation, which says "Contáctame".
- Avoid lists of adjectives with no verb ("Pacífica, resistente y de cardumen.") and
  stiff or Spain-style wording. Use "agua de la llave", not "grifo".

## Armonía Acuática

Route `/armonia-acuatica`. The page is `app/armonia-acuatica/`, the components are in
`src/components/compatibilidad/`, and all data and rules are in `src/lib/`.

| File                               | What it holds                                                |
| ---------------------------------- | ------------------------------------------------------------ |
| `src/lib/speciesData.js`           | The species: water ranges, size, behaviour flags, intro      |
| `src/lib/speciesPhotos.js`         | One photo per species with author, licence and source        |
| `src/lib/compatibility.js`         | The rules. Pure functions, no React                          |
| `src/lib/speciesShops.js`          | Allied shops per species and the "¿Dónde comprar?" copy      |
| `src/lib/compatibilidadData.js`    | Page copy, FAQ, starter combos, invitation blocks, the path  |
| `src/lib/gtm.js`                   | `trackArmonia(action, params)` for Google Analytics events   |
| `src/lib/speciesDataEn.js`         | English name, intro, `speciesOnly` and group of each species |
| `src/lib/compatibilidadEn.js`      | English page and tool copy, same keys as the Spanish files   |
| `src/lib/compatibilityMessages.js` | The text of every verdict check, Spanish and English         |
| `src/lib/tankUnits.js`             | Litres ↔ US gallons, the presets per unit and `formatVolume` |

The URL is the state: `?l=60&p=tetra-neon:10,neocaridina:10` (tank size, then
`id:quantity` pairs). Species ids are part of shared links, so never rename an id.

### Litres and gallons

Litres are the default. `l` is always the tank in litres (up to 6 decimals); the unit
menu inside the field only adds `&u=gal`, so switching units never changes the tank or
the verdict (`?l=75.708236&u=gal` is a 20 gal tank). Data, rules and Analytics (`litros`)
always work in litres: gallons exist only in the field and in the text. A text that
shows the tank uses `formatTank` (rounds down); one that shows what something needs uses
`formatNeeded` (rounds up, but never above the tank when it fits), so the text never
contradicts the verdict. Never write a bare number with " L". The litres calculator
always measures in centimetres.

For a change to units or volume text, run every pair and trio in the four modes (es/en ×
l/gal) and confirm the verdict is identical, no "needs X, your tank has Y" contradicts
its level, and a typed value comes back unchanged in the field.

### English version

A button at the top switches the tool to English and adds `&lang=en` to the URL. Only
the tool changes: header, footer, blog, metadata, JSON-LD and the asesoría band stay in
Spanish, and the server always renders Spanish (that is what Google indexes).
Components get their copy from `useArmoniaLang()`; no tool text is hardcoded in a
component. Analytics always receives the Spanish species name and combo label. English
copy is written by Claude: tell JuanJo it needs his review.

### Adding a species

1. **Check it is not there already**, under another common name or the same scientific
   name.
2. **Confirm which species is meant** when the name is ambiguous. "Pulcher" can be the
   Kribensis (_Pelvicachromis pulcher_) or the acara azul (_Andinoacara pulcher_). Ask
   JuanJo.
3. **Add the entry to `species` in `speciesData.js`**, inside its `group` block. The
   array order is the order the search suggests them in. The field list is documented
   at the top of that file.
   - `id`: kebab-case, no accents, Spanish common name (`tetra-rubi`).
   - `name`: the name hobbyists use in Colombia. `scientific`: the Latin name, or a
     short description for hybrids.
   - `type`: `"fish"` or `"shrimp"`. Shrimp do not count toward stocking.
   - `temp`, `ph`, `gh`: `[min, max]`. Write pH with one decimal (`7.0`).
   - `minLiters`, `sizeCm` (adult size), `minGroup`.
   - Behaviour flags only when they apply. Leave the rest out.
   - `intro`: one to three sentences in the voice above. No facts that the numbers
     do not support.
   - `postSlug` only if a blog article covers the species.
   - Add its English `name` and `intro` (and `speciesOnly`, if any) to
     `speciesDataEn.js`. Without them the species shows in Spanish in English mode.
4. **Keep the data consistent with the blog.** Betta, Neocaridina and Caridina values
   come from the articles and must match them. For every other species the values are
   reference numbers: tell JuanJo they need his review.
5. **Add a photo** (next section). A species without one shows a fish or shrimp icon.
6. **Check the behaviour** (section "Checking a change").

Nothing else needs editing: the species count in the tool and on the homepage, the
search, the fit badges and the fichas all read from `species`.

### What each flag does

| Flag                        | Effect in the verdict                                                               |
| --------------------------- | ----------------------------------------------------------------------------------- |
| `finNipper`                 | "No" with any fish that has `longFins`                                              |
| `longFins`                  | Victim of fin nippers and of `territorial` fish                                     |
| `territorial`               | Betta macho logic: "no" with `labyrinth` and `longFins` fish, caution with the rest |
| `labyrinth`                 | Two or more non-territorial ones together give a caution                            |
| `bottomTerritory`           | Two or more together give a caution about sharing the bottom                        |
| `speciesOnly` (text)        | "No" with every other fish. The text is shown as the reason                         |
| `colorful`                  | Caution next to a `territorial` fish                                                |
| `eatsUnderCm`               | "No" with any fish whose `sizeCm` is below this number                              |
| `shrimpRisk`                | `"adultas"`: "no" with shrimp. `"crias"`: caution. `"bajo"`: nothing                |
| `breedsInTank: false`       | Shrimp that has no fry to protect (Gamba Amano)                                     |
| `maxCount`                  | "No" above this quantity                                                            |
| `minGroup`                  | Caution below this quantity. Also the default quantity when added                   |
| `unstableGroup: [from, to]` | Caution inside this range (Betta hembra: 2 to 4)                                    |

Other rules: water ranges that do not overlap give "no"; overlapping on a single value
gives a caution, and two such parameters give "no". Stocking is 1 litre per centimetre
of adult fish: over 100% is a caution, over 150% is "no". A tank below a species'
`minLiters` is "no".

If a species needs behaviour none of the flags describe, add a rule in
`compatibility.js`, its text in both languages in `compatibilityMessages.js`, and
document the new field at the top of `speciesData.js`. Each rule must produce one check
per species that names all the affected ones, not one check per pair: the check titles
are React keys and must be unique within a result.

### Photos

Photos come from Wikimedia Commons or from JuanJo. Do not take photos from shops or
other sites, even with a credit line.

1. Search Commons for the scientific name. Accept only CC BY, CC BY-SA, CC0 or public
   domain. Prefer a landscape photo of a live fish in an aquarium.
2. Look at the photo before using it: right species, right sex or variety, no hands or
   buckets if there is a better option.
3. Save it as `public/images/especies/<id>.jpg`, 960 px wide (`sips -Z 960` or the
   960 px Commons thumbnail). Crop portrait photos to landscape.
4. Add the entry to `speciesPhotos.js` with `src`, `author`, `license`, `licenseUrl`
   and `source` (the Commons file page). The licences require all of them.
5. A photo by JuanJo is `{ src, author: "JuanJo El Tío Pez" }`.

Use a generic User-Agent for the Commons API and never send personal details to it.

### Shops ("¿Dónde comprar?")

Every ficha shows this section. With no shops it shows only the invitation for shops
to write on WhatsApp. To add a shop, edit `speciesShops.js`: the shop once in `shops`
(name, logo in `public/images/tiendas/`, url, city), then its id under each species in
`speciesShops`, with an optional direct `url`. Links go out with `rel="sponsored"` and
the "Tiendas aliadas" label, and item 6 of `app/terminos/page.js` describes them. Only
JuanJo decides which shops appear.

### Analytics

Every action in the tool sends `armonia_<acción>` through `trackArmonia` in
`src/lib/gtm.js`, which lists the actions and parameters. A new button or link in the
tool gets its own action there. Send the species `name`, not the id, and nothing the
visitor typed except a search that found no species.

### Checking a change

- `npx prettier --check` and `npx eslint` on the files you touched. The 18
  `import/no-anonymous-default-export` warnings in posts and products are known.
- With the dev server running, open the tool with the new species preloaded, for
  example `/armonia-acuatica?l=100&p=<id>:<minGroup>,betta:1`. Check the photo, the
  ficha and the verdict.
- Try the pairs that matter for that species: with a Betta macho, with Neocaridinas,
  with a fin nipper (`barbo-sumatrano`), with a predator (`escalar`) and with a species
  of its own group.
- In the search, confirm the name and the scientific name both find it, without
  accents too.
- For a rule change, run every pair and trio through `checkCompatibility` in both
  languages (`lang` "es" and "en") and confirm no result has two checks with the same
  title. The files in `src/lib/` import each other without an extension, so to run them
  with plain `node` copy `speciesData`, `speciesDataEn`, `compatibilityMessages` and
  `compatibility` as `.mjs` to a temporary folder and fix those imports.
- Layout changes are checked at desktop, 390 px and 330 px. Anything that depends on
  the phone keyboard (the search field, `useKeyboardReveal.js`) can only be confirmed
  on a real phone: ask JuanJo to test it.
