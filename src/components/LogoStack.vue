<template>
  <canvas ref="canvasEl" :style="{ width: W + 'px', height: H + 'px', opacity: ready ? '1' : '0' }" aria-hidden="true" />
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasEl = ref(null)
const ready = ref(false)
let animId = null
let holdId = null

// Drawn width in px; everything else scales from it. The games site's shorter hero draws it smaller.
const props = defineProps({ width: { type: Number, default: 160 } })
const W = props.width
const RING_H = Math.round((W * 419) / 1022)
const ABOVE = RING_H
const SPACING = 0.75 // multiplier - 1 = design default, higher = more gap between slots
const STEP = Math.round(((W * 19) / 96) * SPACING) // proportional to original design
const STACK_H = RING_H + 2 * STEP
const H = ABOVE + STACK_H + RING_H

// ── knobs ───────────────────────────────────────────────────
const SPEED = 1.2 // multiplier - 1 = default, higher = faster overall (scales both velocities)
const V_ENTRY = 0.1 * SPEED // px/ms - entry & exit speed
const V_DROP = 0.04 * SPEED // px/ms - inter-slot drop speed (lower = slower middle rings)
const N_RINGS = 5 // rings - more = shorter slot holds
const T_PAUSE = 500 // ms - extra still time added to each slot hold
const T_LAND = Math.round(120 / SPEED) // ms - how early the ripple cascade starts before entering ring fully lands (0 = simultaneous, higher = earlier)
const STATIC_HOLD = 800 // ms - how long to show static 3 rings before animation begins
// ────────────────────────────────────────────────────────────

const T_ENTRY = Math.round(ABOVE / V_ENTRY)
const T_DROP = Math.round(STEP / V_DROP)
const T_EXIT = T_ENTRY
const T_LEAD = Math.round(T_DROP * 0.75)

// T_PAUSE folded into T_HOLD so stagger (CYCLE/N_RINGS) stays equal to T_HOLD
const T_HOLD = Math.round((T_ENTRY + 2 * T_DROP + T_EXIT) / (N_RINGS - 3)) + T_PAUSE
const CYCLE = N_RINGS * T_HOLD

const F = (ms) => ms / CYCLE

const A0 = T_ENTRY
const D0 = A0 + T_HOLD - T_LAND // ripple starts T_LAND ms before entering ring fully lands
const A1 = D0 + T_DROP
const D1 = A1 + T_HOLD - T_LEAD
const A2 = D1 + T_DROP
const D2 = A2 + T_HOLD - T_LEAD
const CL = D2 + T_EXIT

const KEYFRAMES = [
  [F(0), 0],
  [F(A0), ABOVE],
  [F(D0), ABOVE],
  [F(A1), ABOVE + STEP],
  [F(D1), ABOVE + STEP],
  [F(A2), ABOVE + STEP * 2],
  [F(D2), ABOVE + STEP * 2],
  [F(CL), ABOVE + STACK_H],
  [1.0, ABOVE + STACK_H]
]

function getY(t) {
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const [t0, y0] = KEYFRAMES[i]
    const [t1, y1] = KEYFRAMES[i + 1]
    if (t >= t0 && t <= t1) {
      let p = t1 === t0 ? 0 : (t - t0) / (t1 - t0)
      if (y1 - y0 === STEP) p = 1 - Math.pow(1 - p, 3)
      return y0 + (y1 - y0) * p
    }
  }
  return H
}

function getAlpha(t) {
  const tIn = F(A0)
  const tOut = F(D2)
  const tEnd = F(CL)
  if (t < tIn) return t / tIn
  if (t > tOut) return Math.max(0, (tEnd - t) / (tEnd - tOut))
  return 1
}

onMounted(() => {
  const el = canvasEl.value
  const dpr = window.devicePixelRatio || 1
  el.width = W * dpr
  el.height = H * dpr
  const ctx = el.getContext('2d')
  // No 2D canvas (blocked by the browser, or a test DOM): leave the logo out rather than throw
  if (!ctx) return
  ctx.scale(dpr, dpr)

  const img = new Image()

  img.onload = () => {
    // Draw static 3 rings in correct z-order (bottom ring first, top ring last)
    // At elapsed=T_HOLD the animated frame is identical to this - no crossfade needed
    ctx.drawImage(img, 0, ABOVE + STEP * 2, W, RING_H)
    ctx.drawImage(img, 0, ABOVE + STEP, W, RING_H)
    ctx.drawImage(img, 0, ABOVE, W, RING_H)
    ready.value = true

    holdId = setTimeout(() => {
      // Offset startTime by T_HOLD so first frame matches static display exactly,
      // and ring 4 (at y=0, alpha=0) immediately begins entering from the top
      const startTime = performance.now() - T_HOLD

      function frame(ts) {
        const elapsed = ts - startTime

        ctx.clearRect(0, 0, W, H)

        const rings = Array.from({ length: N_RINGS }, (_, i) => {
          const t = ((elapsed + (i * CYCLE) / N_RINGS) % CYCLE) / CYCLE
          return { y: getY(t), alpha: getAlpha(t) }
        })

        const drawOrder = [...rings.keys()].sort((a, b) => rings[b].y - rings[a].y)
        for (const i of drawOrder) {
          const { y, alpha } = rings[i]
          ctx.globalAlpha = alpha
          ctx.drawImage(img, 0, y, W, RING_H)
          ctx.globalAlpha = 1
        }

        animId = requestAnimationFrame(frame)
      }
      animId = requestAnimationFrame(frame)
    }, STATIC_HOLD)
  }

  img.src = '/images/ring.svg'
})

onUnmounted(() => {
  clearTimeout(holdId)
  if (animId) cancelAnimationFrame(animId)
})
</script>

<style scoped>
canvas {
  transition:
    opacity 0.4s ease,
    transform 0.3s ease;
}
canvas:hover {
  transform: scale(1.08);
}
</style>
