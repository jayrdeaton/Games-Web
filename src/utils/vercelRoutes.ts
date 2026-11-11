// Vercel Build Output API routes that put each Tastic game under games.infinitetoken.com/<slug>/. Every game keeps its
// own Vercel project and deploys on its own, building its Expo web export under /<slug>/ (its experiments.baseUrl), so
// the hub only has to forward the path unchanged. nuxt.config.ts hands these to nitro.vercel.config.routes, which
// Nitro places ahead of its own routes in .vercel/output/config.json.
export type VercelRoute = { src: string; dest: string } | { src: string; status: number; headers: Record<string, string> }

export const vercelRoutes = (games: { slug: string; origin: string; formerSlugs?: string[]; games?: { path: string; formerSlug?: string }[] }[]): VercelRoute[] =>
  games.flatMap(({ slug, origin, formerSlugs = [], games: packGames = [] }) => [
    // A game's old path after a rename (Solitaire became CardTastic, 2026-11-11) goes to the same page under its new one
    ...formerSlugs.map((former) => ({ src: `^/${former}(?:/(.*))?$`, status: 308, headers: { Location: `/${slug}/$1` } })),
    // A game that was an app of its own and is now in a pack (LightCycles and Snake went into DuelTastic, 2026-11-11):
    // its old path and everything under it go to its page in the pack, since its old pages have no counterpart there
    ...packGames.flatMap(({ path, formerSlug }) => (formerSlug ? [{ src: `^/${formerSlug}(?:/.*)?$`, status: 308, headers: { Location: `/${slug}/${path}` } }] : [])),
    // Expo Router's home route under a base URL is /<slug>/, and a relative asset URL resolved from /<slug> would
    // miss the game's folder, so the bare path redirects first
    { src: `^/${slug}$`, status: 308, headers: { Location: `/${slug}/` } },
    // The home page itself goes to the game's bare /<slug>: a game built with cleanUrls (static output) serves its
    // home there and answers 404 at /<slug>/, which its /:game/:path* catch-all doesn't match (live on Snake,
    // LightCycles and BoxHockey, 2026-10-18). Every game serves the same page at the bare path, so this is safe for all.
    { src: `^/${slug}/$`, dest: `${origin}/${slug}` },
    { src: `^/${slug}/(.*)$`, dest: `${origin}/${slug}/$1` }
  ])
