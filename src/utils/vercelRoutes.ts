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
    { src: `^/${slug}/(.*)$`, dest: `${origin}/${slug}/$1` }
  ])
