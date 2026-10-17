# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

# Games-Web

The hub at https://games.infinitetoken.com, created 2026-10-17. It lists the Tastic games (Solitaire, Hangman, LightCycles, Snake) and the 6502 cartridges (Snake, Pong, LightCycles), hosts the one privacy policy and support page for all of them, and puts every Tastic game's web version on this one origin at `/<slug>/`. The point of the single origin: localStorage is per origin, so only on one origin can the web games share player profiles the way the iOS apps do through the App Group `group.com.infinitetoken.tastic` (the web side of that lives in `@tastic/profile`). Before this, each game had its own subdomain (`<slug>.infinitetoken.com`); those now redirect here, from each game's own `vercel.json`.

## Commands

```bash
npm run dev        # Nuxt dev server (also `games-web` in ~/Developer/.claude/launch.json)
npm run lint       # eslint .
npm run fix        # eslint . --fix
npm test           # Vitest (src/__tests__)
npm run typecheck  # nuxt typecheck
npm run verify     # lint + test + typecheck + build; CI runs this
npm run release:patch / :minor / :major   # Jay's release flow: bump, tag, push; the tag triggers deploy
```

## Stack and template

- A carbon copy of the `<Name>-Web` sibling template (JayDeaton-Web, GraPDF-Web, SnaPDF-Web, TrimBox, MapFolio): Nuxt 4 with `srcDir: 'src'`, Tailwind v4 through `@tailwindcss/vite`, `@nuxtjs/color-mode`, the same safe-area shell, header, color-mode button, cards, and `max-w-3xl` column, the same eslint, vitest, tsconfig, CI, and deploy files. The accent is Tailwind's **indigo** (the old per-game privacy pages used indigo links). Converge with the siblings rather than diverge.
- **Deliberate differences from the template:** no `@vite-pwa/nuxt` (a service worker scoped to `/` would also control the proxied games and could answer their navigations with this site's cached pages), so no `usePwa` either; and the class strings live in `src/constants/styles.ts` because four pages share them.
- Content is in `src/constants/site.ts` (`SITE`, `TASTIC_GAMES`, `CARTRIDGES`, `EMULATOR`); pages only render it. It is also the single source for the proxy routes and the prerender list in `nuxt.config.ts`, so adding a game is one entry there plus its image.
- Copy rules: Title Case headings, one-word buttons (Play, Source, Home), no em or en dashes anywhere (a test enforces it for `site.ts`).

## Icons (2026-10-17)

The mark is the Infinite Token rings (Jay's call over Expo-Starter's diamond, which is the starters' mark): `public/images/logo.svg` (header) and `public/favicon.svg` (the same art centered in a square), both InfiniteToken-WWW's `public/images/ring.svg` (the official vector ring, path data copied unchanged) stacked three times, one ring `1022 * 19/96 * 0.75` = 152 units below the last, the spacing InfiniteToken-WWW's animated `LogoStack.vue` uses (`SPACING = 0.75`) and its old `logo.png` matches. They replaced that PNG, which the header drew with `dark:invert`: on dark the SVG needs no change (silver rings with dark insides), so the header has no dark-mode filter. `public/favicon.ico` (48px) and `public/images/icon-180.png` (the touch icon, the logo on #FAFAFA) are rendered from the SVGs with headless Chrome (`--default-background-color=00000000` for the ico's transparency, then `sips -s format ico`); re-render both if the SVGs change. InfiniteToken-WWW uses the same three files (2026-10-17); change them in both.

## Coming Soon and the tip card (2026-10-17)

- **Icons:** every Tastic icon (`public/images/tastic/`) is the game's `assets/images/splash-dark.png` at 192px (Jay: transparent, so it reads on light and dark cards, like the favicons), drawn bare at 56px with no tile, rounding or shadow. Re-export from the game when its splash art changes.
- **Coming Soon:** `COMING_SOON` in `site.ts` (BoxHockey, AirHockey, Pong, Jay's pick): icon, a Coming Soon badge, the description and a Source link, never a Play button. When one ships on the web, move it to `TASTIC_GAMES` with its `slug` and `origin` (its project needs the same subpath setup as the others).
- **Tip card:** `src/components/TipCard.vue`, plus a Tip link in the footer and a Tips section in the privacy policy, all shown only while `SITE.tipUrl` is set (empty until Jay makes a Stripe Payment Link with "customers choose what to pay" on Infinite Token's Stripe account). A plain link, never an embedded widget: a widget would load the platform's scripts and break the privacy policy's no-tracking promise. The website only: Apple requires in-app purchase for tips inside an iOS app (guideline 3.1.1), so no tip link goes into the games themselves. The button says Tip, not Support, which is the help page.

## How the games are served

- `src/utils/vercelRoutes.ts` turns `TASTIC_GAMES` into Vercel Build Output API routes: `^/<slug>$` 308s to `/<slug>/` (Expo Router's home under a base URL is `/<slug>/`, and relative asset URLs resolved from the bare path miss the folder), and `^/<slug>/(.*)$` proxies to `<origin>/<slug>/$1`. `nuxt.config.ts` passes them as `nitro.vercel.config.routes`; Nitro's Vercel presets `defu` that config into `.vercel/output/config.json` with ours first (`nitropack/dist/presets/vercel/utils.mjs`, `generateBuildConfig`). Nitro's own `routeRules` can't do this: its Vercel output maps only `redirect` and `headers` rules, not `proxy`.
- Each game builds its Expo web export under `/<slug>/` itself (its `experiments.baseUrl`, set only for web builds, and an output folder of `dist/<slug>`), so its own deployment serves `/<slug>/...` and the hub forwards paths unchanged.
- `origin` is each game's public production alias (`snake-drab-kappa.vercel.app` and so on). The `<project>-infinite-token.vercel.app` aliases answer 302 behind Vercel's login, so they can't be proxied.
- The Tastic game links are plain `<a href="/<slug>/">`, never NuxtLink: they leave this app. `nitro.prerender.ignore` keeps the crawler off them.
- `npm run dev` doesn't proxy the games. To try everything together locally, build the site (`NITRO_PRESET=vercel-static npm run build`) and serve `.vercel/output/static` next to each game's `dist/<slug>` with rewrites that mirror production.

## 6502 cartridges

- `/6502/[slug]` frames `https://acwright.github.io/6502-EMULATOR/embed.html` (A.C. Wright's emulator, MIT, built to be framed; docs in its `docs/EMBEDDING.md`) through `src/utils/embedUrl.ts`: `cart=<url>`, `vdp=tms9918a` (the carts' video card; the emulator's default is changing to the PicoVDP), `muted=1`, `controls=minimal`, `persist=1` (keeps the RTC NVRAM, so Snake's high score survives a reload, in the player's browser).
- The carts load from raw.githubusercontent.com pinned to a commit (it sends `Access-Control-Allow-Origin: *`, which the emulator's cross-origin fetch needs). When a cart changes, update its SHA in `site.ts`. Verified 2026-10-17: all four boot in the hosted embed and LightCycles plays.
- **Wizards Lab** (added 2026-10-17, Jay's call) is A.C. Wright's (Aaron's) game, not Jay's: `acwright/WIZARDSLAB`, MIT, its `AC6502/WizardsLab.crt` (a 32 KB image of the 16 KB game) pinned to commit 59ed3d6. Every game credits its author (2026-10-17, Jay: if Aaron is credited, so is he): `author` is required on all three game types, from `AUTHORS` in `site.ts` (Jay linked to jaydeaton.com, Aaron to acwrightdesign.com, the site his GitHub profile lists), drawn by `src/components/GameByline.vue` under every card's name and every 6502 page's title, and named in the page's About. Infinite Token is shared with Aaron, who made the AC6502 the other carts run on. Never edit his repo from here. The 6502 grid is two columns (four carts, 2 by 2).
- Screenshots in `public/images/6502/` are 320x240 emulator captures scaled 3x with nearest-neighbor (960x720, ~15 KB each), shown with plain smooth scaling. The cards draw them at ~180px on desktop, and `image-rendering: pixelated` dropped whole rows of pixels shrinking a 320px image, which erased LightCycles' 1px trails and Snake's and Pong's score lines; a large, crisp source the browser shrinks smoothly keeps them. Scale any new capture the same way (headless Chrome's canvas with `imageSmoothingEnabled = false`; there's no image library on this Mac). Snake's and Pong's are their repos' screenshots; LightCycles' is a mid-game frame (2026-10-17), taken from the hosted embed's canvas by driving headless Chrome over the DevTools protocol (start a round with Space, steer with WASD, then `canvas.toDataURL()`), because the repo's only capture was the "PLAYER 2 WINS" screen.

## Deploy

`.github/workflows/ci.yml` is the shared `npm-ci.yml` (runs `verify`). `.github/workflows/deploy.yml` is JayDeaton-Web's: it deploys to Vercel on `v*` tags with `NITRO_PRESET: vercel-static`, and needs `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` repo secrets. The Vercel project belongs in the **Infinite Token** team (`team_ZdxoV9u5tL6u8HSoIgNQuw1n`), with the game projects. Never create or change Vercel projects, domains, DNS, or secrets unasked.

A local `vercel build` or `NITRO_PRESET=vercel-static npm run build` leaves minified output in `.vercel/output/`, which ESLint then lints. Delete `.vercel/output` afterwards. Building locally with a different preset than the last build (`npm run build` after `verify`, then `NITRO_PRESET=vercel-static`) can prerender HTML with the previous build's ID while `_nuxt/builds/meta/` holds the new one, and skips the `_payload.json` files, so the pages 404 on them and log `NUXT_E5002`. Delete `.nuxt`, `.output`, and `node_modules/.cache` first. CI always builds fresh, so deploys aren't affected (seen 2026-10-17).

Lockfiles must be accepted by CI's npm 10. After `npm install` with the local npm 11, run `npx -y npm@10 install --package-lock-only`, or `npm ci` on CI fails with "Missing: ... from lock file".
