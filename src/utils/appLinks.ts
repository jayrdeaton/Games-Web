import { APPLE_TEAM_ID, type OnlineGame } from '../constants/site'

/** An invite's path under a game's slug: /<slug>/join/<code> */
export const invitePath = (slug: string) => `/${slug}/join`

/** Where an invite's Play in Your Browser goes: the game's own Online screen under /<slug>/, with the code filled in */
export const browserJoinPath = (slug: string, code: string) => `/${slug}/online?code=${encodeURIComponent(code)}`

/** /.well-known/apple-app-site-association: each online game's iOS app opens its invite links (a universal link), so a
 *  tap on one goes straight to the match where the game is installed. Apple's CDN reads it when the app is installed, so
 *  it has to be live before friends install. Everything else on the site stays in the browser */
export const appleAppSiteAssociation = (games: OnlineGame[]) => ({
  applinks: {
    details: games.map((g) => ({
      appIDs: [`${APPLE_TEAM_ID}.${g.bundleId}`],
      components: [{ '/': `${invitePath(g.slug)}/*`, comment: `${g.name} invites` }]
    }))
  }
})

/** /.well-known/assetlinks.json: each online game's Android app may open links on this site (its intent filter narrows it
 *  to the invite paths). A game is left out until its signing keys' fingerprints are known */
export const assetLinks = (games: OnlineGame[]) =>
  games
    .filter((g) => g.androidFingerprints.length > 0)
    .map((g) => ({
      relation: ['delegate_permission/common.handle_all_urls'],
      target: { namespace: 'android_app', package_name: g.androidPackage, sha256_cert_fingerprints: g.androidFingerprints }
    }))

/** The code in an invite's path, cleaned up the way the app reads it: letters and digits, upper case, six of them. Null
 *  when there's no code there */
export const inviteCode = (param: unknown) => {
  const code =
    (Array.isArray(param) ? param[0] : param)
      ?.toString()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '') ?? ''
  return code.length === 6 ? code : null
}
