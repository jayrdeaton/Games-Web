// Shared Tailwind class strings, matching www.infinitetoken.com's dark cards, buttons, and links in the indigo accent.
// Full strings so Tailwind can see them at build time.
export const card = 'bg-zinc-900 border border-white/5 rounded-2xl p-6'
// A card that lifts on hover, like www's product cards
export const gameCard = `${card} transition-all hover:border-indigo-500/30 hover:-translate-y-1`
export const sectionHeading = 'text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4'
export const primaryButton = 'inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95'
export const secondaryButton = 'inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-sm font-semibold text-zinc-300 transition-all'
export const link = 'text-indigo-400 hover:text-indigo-300 transition-colors'
export const mutedLink = 'text-zinc-600 hover:text-zinc-300 transition-colors'
export const body = 'text-sm text-zinc-400 leading-relaxed'
export const backLink = 'inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors'
export const badge = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border border-indigo-500/20 bg-indigo-500/10 text-indigo-400'
// A home page section's heading block, centered over its cards like www's
export const sectionTitle = 'text-3xl md:text-4xl font-bold text-white mb-4'
export const sectionIntro = 'text-zinc-400 max-w-3xl mx-auto leading-relaxed'
