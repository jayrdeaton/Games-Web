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

/** Who made each game: every game card and 6502 page shows its author's byline, linked to their site */
export const AUTHORS = {
  jay: { name: 'Jay Deaton', url: 'https://jaydeaton.com' },
  aaron: { name: 'A.C. Wright', url: 'https://acwrightdesign.com' }
} satisfies Record<string, Author>

export type TasticGame = {
  /** The path the game is served at (games.infinitetoken.com/<slug>/), its old subdomain, and its Vercel project's name */
  slug: string
  /** The home-screen and web name */
  name: string
  author: Author
  /** The App Store name: always the name plus "Tastic" */
  storeName: string
  description: string
  /** The game's splash art (assets/images/splash-dark.png at 192px): transparent, so it reads on light and dark cards */
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
    description: 'The classic word-guessing game. 19,700 puzzles across 58 packs, hand-drawn art, and Pass & Play with friends.',
    icon: '/images/tastic/hangman.png',
    repo: 'https://github.com/jayrdeaton/Hangman',
    origin: 'https://hangman-teal-psi.vercel.app'
  },
  {
    slug: 'lightcycles',
    name: 'LightCycles',
    author: AUTHORS.jay,
    storeName: 'LightCyclesTastic',
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
    name: 'BoxHockey',
    author: AUTHORS.jay,
    description: "Physics-driven tabletop box hockey. Flick the puck through the gaps and into the other player's goal, against the CPU or a friend across the table.",
    icon: '/images/tastic/boxhockey.png',
    repo: 'https://github.com/jayrdeaton/BoxHockey'
  },
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
}

export const CARTRIDGES: Cartridge[] = [
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
    ]
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
  },
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
  }
]

/** A.C. Wright's AC6502 emulator, served from his GitHub Pages and built to be framed on other sites */
export const EMULATOR = {
  name: 'AC6502 Emulator',
  author: 'A.C. Wright',
  embed: 'https://acwright.github.io/6502-EMULATOR/embed.html',
  repo: 'https://github.com/acwright/6502-EMULATOR',
  computer: 'https://github.com/acwright/6502-ACE'
}
