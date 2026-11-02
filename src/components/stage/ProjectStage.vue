<template>
  <section ref="track" class="pstage" :style="{ height: `${texts.length * 150}svh` }">
    <div class="pin">
      <canvas ref="canvas" aria-hidden="true"></canvas>
      <svg ref="svg" role="img" :aria-label="name"></svg>
      <div v-for="(text, i) in texts" :key="text.title" class="say" :class="{ on: i === active }" :ref="(el) => (says[i] = el)">
        <h2 class="display">{{ text.title }}</h2>
        <p>{{ text.body }}</p>
        <div v-if="i === texts.length - 1 && controls.length" class="ctl">
          <button v-for="c in controls" :key="c.label" type="button" @click="c.run">{{ c.label }}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useLanguage } from '../../composables/useLanguage.js'
import { SCENES, clamp01, smooth } from './scenes.js'

const props = defineProps({
  projectId: { type: String, required: true },
  name: { type: String, default: '' },
  texts: { type: Array, required: true },
})
const { lang } = useLanguage()
const track = ref(null), svg = ref(null), canvas = ref(null), active = ref(0)
const says = []
const controls = shallowRef([])
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

let raf = 0, scene = null, root = null, view = null
function layout() {
  const W = innerWidth, H = innerHeight, narrow = W < 760
  const F = narrow ? Math.min(W * .92, H * .46) / 1000 : Math.min(W * .56, H * .86) / 1000
  const V = narrow ? [W / 2, H * .28] : [W * .67, H * .5]
  view = { W, H, F, V }
  const d = Math.min(devicePixelRatio || 1, 2)
  canvas.value.width = W * d; canvas.value.height = H * d
  canvas.value.getContext('2d').setTransform(d, 0, 0, d, 0, 0)
  svg.value.setAttribute('viewBox', `0 0 ${W} ${H}`)
  root?.setAttribute('transform', `matrix(${F} 0 0 ${F} ${V[0]} ${V[1]})`)
}
function build() {
  scene?.stop?.()
  svg.value.innerHTML = ''
  root = document.createElementNS('http://www.w3.org/2000/svg', 'g')
  svg.value.append(root)
  layout()
  scene = SCENES[props.projectId](root, lang.value, canvas.value, () => view)
  controls.value = scene.controls || []
}

let s = 0, rs = 0, then = performance.now()
function frame(now) {
  const dt = Math.max(0, Math.min(.05, (now - then) / 1000)); then = now
  const r = track.value.getBoundingClientRect(), n = props.texts.length - 1
  if (r.bottom > -100 && r.top < innerHeight + 100) {
    const raw = clamp01(-r.top / (r.height - innerHeight)) * n
    const k = Math.min(n - 1, Math.floor(raw))
    // Each moment holds while its text is read; what happens inside it follows the scroll.
    const target = raw >= n ? n : k + smooth(.5, 1, raw - k)
    const ease = Math.min(1, dt * (reduced ? 40 : 7))
    s += (target - s) * ease; rs += (raw - rs) * ease
    scene.update(s, rs, now, dt)
    says.forEach((el, i) => {
      if (!el) return
      const d = Math.abs(s - i), o = 1 - smooth(.08, .28, d)
      el.style.opacity = o
      el.style.visibility = o < .02 ? 'hidden' : ''
      el.style.transform = reduced ? '' : `translateY(${(i - s) * 34}px)`
    })
    active.value = Math.round(s)
  }
  raf = requestAnimationFrame(frame)
}
onMounted(() => {
  build()
  addEventListener('resize', layout)
  raf = requestAnimationFrame(frame)
})
onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  removeEventListener('resize', layout)
  scene?.stop?.()
})
// The same component serves every project page, and the scene's labels are language-bound.
watch(() => [props.projectId, lang.value], () => build())
</script>

<style>
.pstage { position: relative; --ink: var(--color-ink); }
.pstage .pin { position: sticky; top: 0; height: 100svh; overflow: clip; }
.pstage canvas, .pstage svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.pstage canvas { pointer-events: none; }
.pstage .say { position: absolute; z-index: 3; left: 48px; bottom: 56px; width: 30vw; min-width: 340px; opacity: 0; }
.pstage .say h2 { font-size: clamp(36px, 4.4vw, 68px); line-height: 1; color: var(--color-bone); }
.pstage .say p { margin-top: 14px; font-size: 18px; line-height: 1.55; color: var(--color-ash); }
.pstage .ctl { display: flex; gap: 8px; margin-top: 18px; }
.pstage .ctl button { font-size: 14px; font-weight: 500; color: var(--color-bone); background: #161615; border: 1px solid #33322f; border-radius: 8px; padding: 10px 18px; cursor: pointer; transition: background-color .2s ease, transform .12s ease; }
.pstage .ctl button:hover { background: #262624; }
.pstage .ctl button:active { transform: translateY(1px); }
.pstage .ns { vector-effect: non-scaling-stroke; }
.pstage .st { fill: none; stroke: var(--color-bone); stroke-width: 1.25; stroke-linecap: round; stroke-linejoin: round; }
.pstage .st-dim { stroke: var(--color-ash); }
.pstage .st-sig { stroke: var(--color-signal); }
.pstage .thick { stroke-width: 2; }
.pstage .wall { stroke: rgba(237, 235, 230, .5); }
.pstage .door { stroke: #000; stroke-width: 4; }
.pstage .blind { fill: var(--color-signal); }
.pstage .blind-o { fill: none; stroke: var(--color-signal); stroke-opacity: .4; }
.pstage .slat { stroke: rgba(191, 208, 219, .5); stroke-width: 1.25; }
.pstage .lit { fill: rgba(191, 208, 219, .1); stroke: var(--color-signal); stroke-width: 1.25; }
.pstage .node { fill: var(--color-bone); }
.pstage .pulse { fill: var(--color-signal); }
.pstage .bar-s { fill: var(--color-signal); }
.pstage text { font-family: var(--font-sans); }
.pstage .lab { fill: var(--color-ash); text-anchor: middle; dominant-baseline: central; }
.pstage .lab.hi { fill: var(--color-bone); }
.pstage .lab.sig { fill: var(--color-signal); }
.pstage .lab.left, .pstage .lab.start { text-anchor: start; }
.pstage .lab.end { text-anchor: end; }
.pstage text.mono { font-family: var(--font-mono); font-weight: 500; white-space: pre; fill: var(--color-bone); dominant-baseline: central; }
.pstage text.center { text-anchor: middle; }
.pstage text.left { text-anchor: start; }
.pstage text.code { font-size: 30px; }
.pstage text.small { font-size: 24px; }
.pstage text.dim { fill: var(--color-ash); }
.pstage text.sig { fill: var(--color-signal); }
.pstage text.big { font-size: 74px; }
.pstage text.huge { font-size: 118px; }
.pstage text.term { font-size: 26px; fill: var(--color-ash); }
.pstage .press, .pstage .tab { cursor: pointer; outline: none; }
.pstage .press rect { fill: transparent; transition: fill .2s ease; }
.pstage .press:hover rect, .pstage .press:focus-visible rect { fill: rgba(237, 235, 230, .1); }
.pstage .tab rect { fill: rgba(237, 235, 230, .04); stroke: rgba(237, 235, 230, .28); stroke-width: 1; vector-effect: non-scaling-stroke; transition: fill .2s ease; }
.pstage .tab:hover rect { fill: rgba(237, 235, 230, .12); }
.pstage .tab:focus-visible rect { stroke: var(--color-signal); }
.pstage .tab text { fill: var(--color-ash); }
.pstage .tab.on rect { fill: var(--color-bone); }
.pstage .tab.on text { fill: #000; }
.pstage .block rect { fill: #0b0b0a; stroke: rgba(237, 235, 230, .55); stroke-width: 1; vector-effect: non-scaling-stroke; }
.pstage .block.own rect { stroke: var(--color-signal); }
.pstage .block text { fill: var(--color-bone); font-size: 28px; text-anchor: middle; dominant-baseline: central; }
.pstage .block.own text { fill: var(--color-signal); }
@media (max-width: 760px) {
  .pstage .say { left: 24px; right: 24px; bottom: 26px; width: auto; min-width: 0; }
  .pstage .say h2 { font-size: 34px; }
  .pstage .say p { font-size: 15.5px; line-height: 1.45; margin-top: 8px; }
}
</style>
