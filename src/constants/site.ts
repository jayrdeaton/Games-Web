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

export type TasticGame = StoreLinks & {
  /** The path the game is served at (games.infinitetoken.com/<slug>/), its old subdomain, and its Vercel project's name */
  slug: string
  /** The home-screen and web name */
  name: string
  author: Author
  /** The App Store name, the game's eas.json submit.production.ios.appName: the name plus "Tastic", except
   *  LightCycleTastic (Jay, 2026-10-19) */
  storeName: string
  description: string
  /** The game's splash art (assets/images/splash-dark.png at 192px), transparent, drawn bare on the dark card */
  icon: string
  repo: string
  /** The game's own production deployment, which /<slug>/ is proxied to (see src/utils/vercelRoutes.ts). The
   *  <project>-infinite-token.vercel.app aliases sit behind Vercel's login, so these are the public production aliases. */
  origin: string
}

export const TASTIC_GAMES: TasticGame[] = [
  {
    slug: 'solitaire',
    name: 'Solitaire',
    author: AUTHORS.jay,
    storeName: 'SolitaireTastic',
    description: 'Eleven classic solitaire games in one, from Klondike and FreeCell to Pyramid and Aces Up.',
    icon: '/images/tastic/solitaire.png',
    repo: 'https://github.com/jayrdeaton/Solitaire',
    origin: 'https://solitaire-bay.vercel.app'
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
    slug: 'lightcycles',
    name: 'LightCycles',
    author: AUTHORS.jay,
    storeName: 'LightCycleTastic',
    description: 'A light-cycle duel for two players on one screen, or one player against the CPU. Last rider still riding wins the round.',
    icon: '/images/tastic/lightcycles.png',
    repo: 'https://github.com/jayrdeaton/LightCycles',
    origin: 'https://lightcycles-three.vercel.app'
  },
  {
    slug: 'snake',
    name: 'Snake',
    author: AUTHORS.jay,
    storeName: 'SnakeTastic',
    description: 'Classic Snake, rebuilt for one shared screen: solo, against a CPU, or head-to-head with a friend.',
    icon: '/images/tastic/snake.png',
    repo: 'https://github.com/jayrdeaton/Snake',
    origin: 'https://snake-drab-kappa.vercel.app'
  },
  {
    slug: 'boxhockey',
    name: 'BoxHockey',
    author: AUTHORS.jay,
    storeName: 'BoxHockeyTastic',
    description: "Physics-driven tabletop box hockey. Flick the puck through the gaps and into the other player's goal, against the CPU or a friend across the table.",
    icon: '/images/tastic/boxhockey.png',
    repo: 'https://github.com/jayrdeaton/BoxHockey',
    origin: 'https://boxhockey.vercel.app',
    appStore: 'https://apps.apple.com/app/id6824717751'
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
  {
    name: 'AirHockey',
    author: AUTHORS.jay,
    description: 'Fast-paced air hockey on one screen: play the CPU, or sit face-to-face with a friend on one device.',
    icon: '/images/tastic/airhockey.png',
    repo: 'https://github.com/jayrdeaton/AirHockey'
  },
  {
    name: 'Pong',
    author: AUTHORS.jay,
    description: 'Classic two-paddle Pong on one screen: play the CPU, face a friend on one device, or switch the CPU off and break bricks.',
    icon: '/images/tastic/pong.png',
    repo: 'https://github.com/jayrdeaton/Pong'
  }
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
