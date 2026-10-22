# Games-Web

The home of [Infinite Token Games](https://games.infinitetoken.com): one site for the Tastic games and the 6502 cartridges, with a single privacy policy and support page.

- `/`: every game
- `/solitaire/`, `/hangman/`, `/lightcycles/`, `/snake/`: the Tastic games' web versions. Each one is its own repo and Vercel project, proxied here so all of them share one origin, which lets them share player profiles.
- `/6502/wizardslab`, `/6502/snake`, `/6502/lightcycles`: the 6502 cartridges, running in [A.C. Wright's AC6502 emulator](https://github.com/acwright/6502-EMULATOR)
- `/privacy`, `/support`

## Development

```bash
npm install
npm run dev      # http://localhost:3000 (the game paths aren't proxied in dev)
npm run verify   # lint, test, typecheck, build
```

Built with Nuxt 4 and Tailwind CSS v4, prerendered to static HTML and deployed to Vercel when a `v*` tag is pushed.

## License

The code is released under the MIT License, see [LICENSE](LICENSE). The game names, logos, icons, and artwork are not covered by that license and remain all rights reserved.
