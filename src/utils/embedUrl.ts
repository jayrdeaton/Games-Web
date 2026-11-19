import type { VideoCard } from '../constants/site'

// The address of A.C. Wright's embeddable emulator with a cartridge loaded. Its parameters are documented in
// https://github.com/acwright/6502-EMULATOR/blob/main/docs/EMBEDDING.md
export const embedUrl = (embed: string, cart: string, vdp: VideoCard = 'tms9918a') => {
  const url = new URL(embed)
  url.searchParams.set('cart', cart)
  // Always named: most carts are built for the TMS9918A, and the emulator's default is changing to the PicoVDP in a later release
  url.searchParams.set('vdp', vdp)
  url.searchParams.set('muted', '1')
  url.searchParams.set('controls', 'minimal')
  // Keeps the RTC card's NVRAM (Snake's high score) in the player's browser between visits
  url.searchParams.set('persist', '1')
  return url.toString()
}
