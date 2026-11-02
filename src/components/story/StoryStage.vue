<template>
  <section ref="track" class="story-stage" :style="{ height: `${entries.length * 125}svh` }">
    <div class="story-pin">
      <svg ref="svg" role="img" :aria-label="heading"></svg>
      <div ref="railBox" class="story-rail" aria-hidden="true"><i v-for="(_, i) in entries" :key="i" :ref="(el) => (rail[i] = el)"></i></div>
      <article v-for="(entry, i) in entries" :key="i" class="story-say" :ref="(el) => (says[i] = el)">
        <p class="story-era">{{ entry.era }}</p>
        <h2 class="display">{{ entry.title }}</h2>
        <p class="story-body">{{ entry.body }}</p>
        <router-link v-if="LINKS[i]" class="link story-more" :to="LINKS[i]">{{ more }}</router-link>
      </article>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useLanguage } from '../../composables/useLanguage.js'
import { clamp01, smooth, startStory } from './blocks.js'

const props = defineProps({
  entries: { type: Array, required: true },
  heading: { type: String, default: '' },
  more: { type: String, default: '' },
})
// TPHome and TPCloud are the two moments with a page of their own.
const LINKS = { 6: '/tphome', 7: '/tpcloud' }
const { lang } = useLanguage()
const track = ref(null), svg = ref(null), railBox = ref(null)
const says = [], rail = []
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

let story, raf = 0, s = 0, rs = 0, then = performance.now()
function layout() {
  const W = innerWidth, H = innerHeight, narrow = W < 760
  const F = narrow ? Math.min(W * .92, H * .5) / 1000 : Math.min(W * .54, H * .84) / 1000
  svg.value.setAttribute('viewBox', `0 0 ${W} ${H}`)
  story?.place(F, narrow ? [W / 2, H * .33] : [W * .67, H * .5])
}
function build() {
  story = startStory(svg.value, props.entries.length, lang.value)
  layout()
}
function frame(now) {
  const dt = Math.max(0, Math.min(.05, (now - then) / 1000)); then = now
  const r = track.value.getBoundingClientRect(), n = props.entries.length - 1
  if (r.bottom > -100 && r.top < innerHeight + 100) {
    const raw = clamp01(-r.top / (r.height - innerHeight)) * n
    const k = Math.min(n - 1, Math.floor(raw))
    // Each moment holds while it's read, then the blocks move on.
    const target = raw >= n ? n : k + smooth(.45, 1, raw - k)
    const ease = Math.min(1, dt * (reduced ? 40 : 6))
    s += (target - s) * ease; rs += (raw - rs) * ease
    // The bricks are already going up as the page arrives, and finish while the first text is read.
    const arrival = clamp01(1 - r.top / innerHeight)
    story.update(s, reduced ? 1 : clamp01(arrival * .55 + rs / .45 * .45))
    says.forEach((el, i) => {
      if (!el) return
      const d = Math.abs(s - i), o = 1 - smooth(.08, .26, d)
      el.style.opacity = o
      el.style.visibility = o < .02 ? 'hidden' : 'visible'
      el.style.transform = reduced ? '' : `translateY(${(i - s) * 34}px)`
    })
    rail.forEach((el, i) => { if (el) el.style.opacity = .22 + .78 * smooth(i - .5, i, s) })
    if (railBox.value) railBox.value.style.opacity = 1 - smooth(-40, 40, r.top)
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
})
watch(lang, build)
</script>

<style>
.story-stage { position: relative; }
.story-pin { position: sticky; top: 0; height: 100svh; overflow: clip; }
.story-pin svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.story-rail { position: absolute; z-index: 3; top: 40px; left: 48px; display: flex; gap: 6px; }
.story-rail i { display: block; width: 26px; height: 2px; background: var(--color-bone); opacity: .22; }
.story-say { position: absolute; z-index: 3; left: 48px; bottom: 56px; width: 30vw; min-width: 340px; opacity: 0; visibility: hidden; }
.story-era { font-size: 15px; color: var(--color-signal); }
.story-say h2 { margin-top: 8px; font-size: clamp(38px, 4.8vw, 74px); line-height: 1; color: var(--color-bone); }
.story-body { margin-top: 14px; font-size: 18px; line-height: 1.55; color: var(--color-ash); }
.story-more { display: inline-block; margin-top: 18px; font-size: 14px; color: var(--color-bone); }
.sb-b { fill: var(--color-bone); stroke: var(--color-bone); stroke-width: 1.25; vector-effect: non-scaling-stroke; }
.sb-b.sig { fill: var(--color-signal); stroke: var(--color-signal); }
.sb-stud { fill: var(--color-bone); fill-opacity: .55; }
.sb-wire { fill: none; stroke: var(--color-ash); stroke-width: 1.25; vector-effect: non-scaling-stroke; }
.sb-t { fill: var(--color-bone); font-family: var(--font-sans); font-size: 30px; dominant-baseline: central; white-space: pre; }
.sb-t.mono { font-family: var(--font-mono); font-weight: 500; }
.sb-t.big { font-size: 46px; }
.sb-t.dim { fill: var(--color-ash); }
.sb-t.mid { text-anchor: middle; }
.sb-t.end { text-anchor: end; font-size: 72px; font-weight: 500; }
.sb-t.ink { fill: #000; }
.sb-t.sig { fill: var(--color-signal); }
@media (max-width: 760px) {
  .story-rail { left: 24px; top: 28px; gap: 4px; }
  .story-rail i { width: 18px; }
  .story-say { left: 24px; right: 24px; bottom: 28px; width: auto; min-width: 0; }
  .story-era { font-size: 13px; }
  .story-say h2 { font-size: 36px; margin-top: 4px; }
  .story-body { font-size: 15.5px; line-height: 1.45; margin-top: 8px; }
  .sb-t { font-size: 38px; }
}
</style>
