// Vercel Build Output API routes that put each Tastic game under games.infinitetoken.com/<slug>/. Every game keeps its
// own Vercel project and deploys on its own, building its Expo web export under /<slug>/ (its experiments.baseUrl), so
// the hub only has to forward the path unchanged. nuxt.config.ts hands these to nitro.vercel.config.routes, which
// Nitro places ahead of its own routes in .vercel/output/config.json.
export type VercelRoute = { src: string; dest: string } | { src: string; status: number; headers: Record<string, string> }

export const vercelRoutes = (games: { slug: string; origin: string }[]): VercelRoute[] =>
  games.flatMap(({ slug, origin }) => [
    // Expo Router's home route under a base URL is /<slug>/, and a relative asset URL resolved from /<slug> would
    // miss the game's folder, so the bare path redirects first
    { src: `^/${slug}$`, status: 308, headers: { Location: `/${slug}/` } },
    // The home page itself goes to the game's bare /<slug>: a game built with cleanUrls (static output) serves its
    // home there and answers 404 at /<slug>/, which its /:game/:path* catch-all doesn't match (live on Snake,
    // LightCycles and BoxHockey, 2026-10-18). Every game serves the same page at the bare path, so this is safe for all.
    { src: `^/${slug}/$`, dest: `${origin}/${slug}` },
    { src: `^/${slug}/(.*)$`, dest: `${origin}/${slug}/$1` }
  ])
