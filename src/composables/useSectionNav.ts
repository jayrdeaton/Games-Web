// The pinned nav's state for sections on the page, given their element ids in page order: which one is in view, and a
// jump to one. Copied from InfiniteToken-WWW's useSectionNav (itself adapted from JayDeaton-Web's): the hero comes
// before the first section, so nothing is current until a section reaches the nav, and every link scrolls to its own
// section. Keep the copies in step.
export const useSectionNav = (ids: string[]) => {
  // Nothing until the page measures, so the prerendered nav marks no section
  const current = ref<string | undefined>()

  // What scrolls the page: the window here, but a scrolling ancestor of the sections if a template ever adds one
  const scroller = () => {
    for (let el = document.getElementById(ids[0] ?? '')?.parentElement; el; el = el.parentElement) {
      if (/auto|scroll/.test(getComputedStyle(el).overflowY)) return el
    }
    return document.scrollingElement ?? document.documentElement
  }

  // The last section whose top has scrolled up to where a jump would land it (its scroll-margin-top, just under the nav).
  // The last sections can be too short to get there, so at the bottom of the page the last one is current. On a page
  // without the sections (privacy, support, the 6502 pages) nothing is.
  const update = () => {
    if (!ids.some((id) => document.getElementById(id))) {
      current.value = undefined
      return
    }
    const page = scroller()
    if (page.scrollTop + page.clientHeight >= page.scrollHeight - 1) {
      current.value = ids[ids.length - 1]
      return
    }
    let inView: string | undefined
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= parseFloat(getComputedStyle(el).scrollMarginTop || '0') + 1) inView = id
    }
    current.value = inView
  }

  // Smooth unless the visitor asks for reduced motion
  const behavior = (): ScrollBehavior => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth')
  const toTop = () => scroller().scrollTo({ top: 0, behavior: behavior() })
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: behavior() })

  // Scroll events don't bubble, so catch the scroller's on the way down
  onMounted(() => {
    update()
    document.addEventListener('scroll', update, { capture: true, passive: true })
    window.addEventListener('resize', update)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('scroll', update, { capture: true })
    window.removeEventListener('resize', update)
  })

  return { current, jump, toTop, update }
}
