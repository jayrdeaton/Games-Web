export const SITE = {
  name: 'Infinite Token Games',
  url: 'https://games.infinitetoken.com',
  tagline: 'Free games with no ads, no accounts, and no tracking. Play them right here in your browser.',
  email: 'support@infinitetoken.com',
  company: { name: 'Infinite Token', url: 'https://infinitetoken.com' },
  /** A Stripe Payment Link (customers choose what to pay) on Infinite Token's account. The tip card, the footer's Tip
   *  link and the privacy policy's Tips section only appear once it is set. */
  tipUrl: ''
}

export type Author = { name: string; url: string }

/** The home page's sections in page order: the headings over their cards, and the header's tabs (`short` below lg, so
 *  the four fit beside the logo on a phone) */
export const SECTIONS = [
  { id: 'tastic', label: 'Tastic Games', short: 'Tastic' },
  { id: 'coming-soon', label: 'Coming Soon', short: 'Coming Soon' },
  { id: '6502', label: '6502 Cartridges', short: '6502' },
  // Last (Jay, 2026-10-22): not Tastic games, each on its own site
  { id: 'more', label: 'More to Play', short: 'More' }
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

/** Who made each game: every game card and 6502 page shows its author's byline, linked to their site */
export const AUTHORS = {
  jay: { name: 'Jay Deaton', url: 'https://jaydeaton.com' },
  aaron: { name: 'A.C. Wright', url: 'https://acwrightdesign.com' }
} satisfies Record<string, Author>

/** A game's store listings, each set only once it's live, so its card shows a button for it. The App Store link is
 *  https://apps.apple.com/app/id<the app's Apple ID>, the Google Play one https://play.google.com/store/apps/details?id=<its
 *  android.package>. The site-alignment check looks each game up by bundle ID and flags one that's live but not linked. */
export type StoreLinks = {
  appStore?: string
  googlePlay?: string
}

/** One game inside a pack: its name and the page the pack's Home opens for it, relative to the pack's /<slug>/.
 *  `formerSlug` is the path it had as an app of its own: /<formerSlug> and everything under it 308 to this page
 *  (src/utils/vercelRoutes.ts), since its old pages have no counterpart in the pack. */
export type PackGame = { name: string; path: string; formerSlug?: string }

export type TasticGame = StoreLinks & {
  /** The path the game is served at (games.infinitetoken.com/<slug>/) and its Vercel project's name */
  slug: string
  /** The home-screen and web name */
  name: string
  author: Author
  /** The App Store name, the game's eas.json submit.production.ios.appName: the name plus "Tastic", or the name itself
   *  for a pack, whose name already ends in Tastic, except CardTastic's "CardTastic: Solitaire & More" ("CardTastic"
   *  alone was taken) */
  storeName: string
  description: string
  /** The game's splash art (assets/images/splash-dark.png at 192px), transparent, drawn bare on the dark card */
  icon: string
  repo: string
  /** The game's own production deployment, which /<slug>/ is proxied to (see src/utils/vercelRoutes.ts). The
   *  <project>-infinite-token.vercel.app aliases sit behind Vercel's login, so these are the public production aliases. */
  origin: string
  /** Paths the game was served at before a rename, each redirected to /<slug>/ with the rest of the path kept */
  formerSlugs?: string[]
  /** A pack's games, in its Home's order: the card links each one, and the sitemap lists them */
  games?: PackGame[]
}

export const TASTIC_GAMES: TasticGame[] = [
  {
    slug: 'cardtastic',
    name: 'CardTastic',
    author: AUTHORS.jay,
    storeName: 'CardTastic: Solitaire & More',
    description: 'Twenty card games in one: eleven solitaire games and nine to play together, from Klondike and FreeCell to Gin Rummy and Crazy Eights.',
    icon: '/images/tastic/cardtastic.png',
    repo: 'https://github.com/jayrdeaton/CardTastic',
    origin: 'https://cardtastic-web.vercel.app',
    // Solitaire until 2026-11-11
    formerSlugs: ['solitaire']
  },
  {
    slug: 'hangman',
    name: 'Hangman',
    author: AUTHORS.jay,
    storeName: 'HangmanTastic',
    description: 'The classic word-guessing game. 19k+ puzzles across 50+ packs, hand-drawn art, and Pass & Play with friends.',
    icon: '/images/tastic/hangman.png',
    repo: 'https://github.com/jayrdeaton/Hangman',
    origin: 'https://hangman-teal-psi.vercel.app'
  },
  {
    slug: 'dueltastic',
    name: 'DuelTastic',
    author: AUTHORS.jay,
    storeName: 'DuelTastic',
    description: 'Four duel games in one: Trap, Turf, Tag and Snake. Take on the CPU, or face a friend on one shared screen.',
    icon: '/images/tastic/dueltastic.png',
    repo: 'https://github.com/jayrdeaton/DuelTastic',
    origin: 'https://dueltastic.vercel.app',
    // LightCycles (as Trap) and Snake were apps of their own until 2026-11-11
    games: [
      { name: 'Trap', path: 'loadout/trap', formerSlug: 'lightcycles' },
      { name: 'Turf', path: 'loadout/turf' },
      { name: 'Tag', path: 'loadout/tag' },
      { name: 'Snake', path: 'loadout/snake', formerSlug: 'snake' }
    ]
  },
  {
    slug: 'pucktastic',
    name: 'PuckTastic',
    author: AUTHORS.jay,
    storeName: 'PuckTastic',
    description: 'Four tabletop puck games in one: Box Hockey, Air Hockey, Paddles and Breaker. Take on the CPU, or a friend across the table.',
    icon: '/images/tastic/pucktastic.png',
    repo: 'https://github.com/jayrdeaton/PuckTastic',
    origin: 'https://pucktastic.vercel.app',
    // The BoxHockey app grown into four games (2026-11-11), so it keeps BoxHockey's App Store listing
    appStore: 'https://apps.apple.com/app/id6824717751',
    // Box Hockey was an app of its own until 2026-11-11; Air Hockey and Paddles (Pong's successor) were coming soon
    games: [
      { name: 'Box Hockey', path: 'loadout/boxhockey', formerSlug: 'boxhockey' },
      { name: 'Air Hockey', path: 'loadout/airhockey' },
      { name: 'Paddles', path: 'loadout/paddles' },
      { name: 'Breaker', path: 'loadout/breaker' }
    ]
  }
]

export type OtherApp = StoreLinks & {
  name: string
  author: Author
  description: string
  /** Its splash art at 192px, like the Tastic icons */
  icon: string
  /** Its own site: these aren't proxied under /<slug>/ */
  url: string
  repo: string
}

/** Infinite Token apps that aren't Tastic games. They don't share player profiles, and each has its own site, privacy
 *  policy and support page, so their cards link out and the privacy and support pages here leave them out. */
export const MORE_TO_PLAY: OtherApp[] = [
  {
    name: 'Swirlio',
    author: AUTHORS.jay,
    description: "A hands-on kaleidoscope you can push, pinch, and twist. Fill it with colors and bouncing beads and mirror it up to twelve ways. There's nothing to win, just a pattern to play with.",
    icon: '/images/swirlio.png',
    url: 'https://swirlio.infinitetoken.com',
    repo: 'https://github.com/jayrdeaton/Swirlio',
    appStore: 'https://apps.apple.com/app/id6824430243'
  }
]

export type UpcomingGame = {
  name: string
  author: Author
  description: string
  /** The game's splash art (transparent), like the Tastic icons */
  icon: string
  repo: string
}

/** Tastic games on the way: shown with a Coming Soon badge and no Play button, and moved to TASTIC_GAMES when they ship */
export const COMING_SOON: UpcomingGame[] = [
  // AirHockey and Pong went into PuckTastic (2026-11-11), Pong as Paddles and Breaker
]

export type Cartridge = {
  /** The page's path: games.infinitetoken.com/6502/<slug> */
  slug: string
  name: string
  author: Author
  description: string
  /** A 320x240 emulator capture, scaled 3x with nearest-neighbor (see CLAUDE.md, 6502 cartridges) */
  screenshot: string
  repo: string
  /** The ROM image, pinned to a commit so a push to the cartridge's main branch never changes the live page.
   *  raw.githubusercontent.com sends Access-Control-Allow-Origin: *, which the emulator's cross-origin fetch needs. */
  cart: string
  controls: { keys: string; action: string }[]
  /** Kept off the site for now (no card, page, or support line); drop the flag to bring it back */
  hidden?: boolean
}

const ALL_CARTRIDGES: Cartridge[] = [
  {
    slug: 'wizardslab',
    name: 'Wizards Lab',
    author: AUTHORS.aaron,
    description: 'Potions rain down in vials of six colors. Line up three or more to make them react and vanish, and set off the arcane reagents for chain reactions.',
    screenshot: '/images/6502/wizardslab.png',
    repo: 'https://github.com/acwright/WIZARDSLAB',
    cart: 'https://raw.githubusercontent.com/acwright/WIZARDSLAB/59ed3d64f4efa5b0977fe264be3cf0b228e6a7dc/AC6502/WizardsLab.crt',
    controls: [
      { keys: 'Space or Return', action: 'Start' },
      { keys: 'Arrow keys or A, D', action: 'Move' },
      { keys: 'Up arrow or W', action: 'Rotate' },
      { keys: 'Space or Q', action: 'Rotate back' },
      { keys: 'Down arrow or S', action: 'Drop faster' },
      { keys: 'P', action: 'Pause' }
    ]
  },
  {
    slug: 'snake',
    name: 'Snake',
    author: AUTHORS.jay,
    description: 'Grow by eating the food, and stay clear of the walls and your own tail. The title screen remembers your high score.',
    screenshot: '/images/6502/snake.png',
    repo: 'https://github.com/jayrdeaton/6502-Snake',
    cart: 'https://raw.githubusercontent.com/jayrdeaton/6502-Snake/48f6a2afa2ee209cea7c96148f6e29f3d365ebd6/Snake.crt',
    controls: [
      { keys: 'Arrow keys or WASD', action: 'Move' },
      { keys: 'Space', action: 'Start, pause, and resume' }
    ]
  },
  {
    slug: 'pong',
    name: 'Pong',
    author: AUTHORS.jay,
    description: 'Classic Pong against a CPU paddle, or two players on one keyboard. First to 11 wins.',
    screenshot: '/images/6502/pong.png',
    repo: 'https://github.com/jayrdeaton/6502-Pong',
    cart: 'https://raw.githubusercontent.com/jayrdeaton/6502-Pong/92262c05eb1551bb4ecfba0d825156b926b5f7d5/Pong.crt',
    controls: [
      { keys: 'W and S', action: 'Move the left paddle' },
      { keys: 'Up and Down arrows', action: 'Move the right paddle' },
      { keys: 'Space', action: 'Choose a mode, pause, and resume' }
    ],
    // Hidden 2026-10-22 (Jay): not fully fleshed out yet
    hidden: true
  },
  {
    slug: 'lightcycles',
    name: 'LightCycles',
    author: AUTHORS.jay,
    description: 'A light-cycle duel for one or two players. Turn sharply, stay off every trail, and be the last one riding.',
    screenshot: '/images/6502/lightcycles.png',
    repo: 'https://github.com/jayrdeaton/6502-LightCycles',
    cart: 'https://raw.githubusercontent.com/jayrdeaton/6502-LightCycles/9e0ef7c52c663cd5187317d1b8b30119e486fb56/LightCycles.crt',
    controls: [
      { keys: 'W, A, S, D', action: 'Steer the first cycle' },
      { keys: 'Arrow keys', action: 'Steer the second cycle' },
      { keys: 'Space', action: 'Start, pause, and resume' }
    ]
  }
]

/** The carts on the site, in order: Wizards Lab first (Jay, 2026-10-22) */
export const CARTRIDGES = ALL_CARTRIDGES.filter((c) => !c.hidden)

/** A.C. Wright's AC6502 emulator, served from his GitHub Pages and built to be framed on other sites */
export const EMULATOR = {
  name: 'AC6502 Emulator',
  author: 'A.C. Wright',
  embed: 'https://acwright.github.io/6502-EMULATOR/embed.html',
  repo: 'https://github.com/acwright/6502-EMULATOR',
  computer: 'https://github.com/acwright/6502-ACE'
}
