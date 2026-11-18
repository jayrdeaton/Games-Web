import { describe, expect, it } from 'vitest'

import { APPLE_TEAM_ID, ONLINE_GAMES, type OnlineGame, TASTIC_GAMES } from '~/constants/site'
import { appleAppSiteAssociation, assetLinks, inviteCode, invitePath } from '~/utils/appLinks'
import { inviteRoutes, vercelRoutes } from '~/utils/vercelRoutes'

const hexfleet = ONLINE_GAMES.find((g) => g.slug === 'hexfleet') as OnlineGame

describe('invite links', () => {
  it("opens each online game's invite links in its iOS app, and nothing else on the site", () => {
    const aasa = appleAppSiteAssociation([hexfleet])
    expect(aasa.applinks.details).toEqual([{ appIDs: [`${APPLE_TEAM_ID}.com.jayrdeaton.HexFleet`], components: [{ '/': '/hexfleet/join/*', comment: 'HexFleet invites' }] }])
  })

  it('lists an Android app only once its signing keys are known', () => {
    expect(assetLinks([{ ...hexfleet, androidFingerprints: [] }])).toEqual([])
    const fingerprint = 'AB:CD'
    expect(assetLinks([{ ...hexfleet, androidFingerprints: [fingerprint] }])).toEqual([{ relation: ['delegate_permission/common.handle_all_urls'], target: { namespace: 'android_app', package_name: 'com.jayrdeaton.HexFleet', sha256_cert_fingerprints: [fingerprint] } }])
  })

  it('shows every invite the one prerendered page, ahead of the game proxies', () => {
    const routes = [...inviteRoutes(ONLINE_GAMES), ...vercelRoutes(TASTIC_GAMES)]
    const first = (path: string) => routes.find((r) => new RegExp(r.src).test(path))
    expect(first('/hexfleet/join/K7Q2PX')).toEqual({ src: expect.any(String), dest: invitePath('hexfleet') })
    expect(first('/hexfleet/join/K7Q2PX/')).toMatchObject({ dest: '/hexfleet/join' })
    // The page itself and anything deeper aren't rewritten
    expect(first('/hexfleet/join')).toBeUndefined()
    expect(first('/hexfleet/join/K7Q2PX/more')).toBeUndefined()
  })

  it('reads the code the way the app does', () => {
    expect(inviteCode('k7q2px')).toBe('K7Q2PX')
    expect(inviteCode(['K7Q2PX'])).toBe('K7Q2PX')
    expect(inviteCode('K7Q-2PX')).toBe('K7Q2PX')
    expect(inviteCode('K7Q2')).toBeNull()
    expect(inviteCode(undefined)).toBeNull()
  })
})
