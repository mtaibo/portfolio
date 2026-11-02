// The story's one idea: it starts with LEGO, and the same pile of blocks keeps being rebuilt into whatever came next.
// Every scene is a list of rectangles in a 1000 x 1000 space around the origin, plus whatever only that scene draws on top.
import plan from '../../data/floorplan.js'

const NS = 'http://www.w3.org/2000/svg'
export const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }
export const clamp01 = (x) => Math.min(1, Math.max(0, x))
const mid = (a, b, u) => a + (b - a) * u
const el = (tag, attrs = {}, parent, text) => {
  const n = document.createElementNS(NS, tag)
  for (const k in attrs) n.setAttribute(k, attrs[k])
  if (text !== undefined) n.textContent = text
  if (parent) parent.append(n)
  return n
}
const COUNT = 46
const b = (x, y, w, h, r = 6, fill = .08, extra = {}) => ({ x, y, w, h, r, fill, line: 1, on: 1, sig: false, stud: 0, ...extra })

function lego() {
  const rows = [7, 6, 6, 5, 4, 3, 2, 1], W = 124, H = 76, out = []
  rows.forEach((n, row) => {
    const shift = (row % 2) * 0
    for (let i = 0; i < n; i++) out.push(b((i - (n - 1) / 2) * W + shift, 410 - row * H, W - 6, H - 6, 5, .12, { stud: 1 }))
  })
  return { blocks: out.slice(0, COUNT), draw() {} }
}

function scratch(lang) {
  const es = lang === 'es'
  const T = es ? ['al hacer clic', 'repetir 10', 'mover 10 pasos', 'girar 15 grados', 'decir hola'] : ['when clicked', 'repeat 10', 'move 10 steps', 'turn 15 degrees', 'say hello']
  const x = -480, w = 500, h = 76
  const blocks = [
    b(x + w / 2, -290, w, h, 20, .18),
    b(x + w / 2, -210, w, h, 8, .18),
    b(x + 30 + (w - 40) / 2 + 10, -130, w - 40, h, 8, .08),
    b(x + 30 + (w - 40) / 2 + 10, -50, w - 40, h, 8, .08),
    b(x + 15, -88, 30, 168, 0, .18),
    b(x + w / 2, 18, w, 44, 8, .18),
    b(x + w / 2, 90, w, h, 8, .08),
  ]
  // The robot from the robotics classes.
  const rx = 300
  blocks.push(
    b(rx, -240, 200, 150, 22, .1), b(rx - 45, -250, 36, 36, 18, .9), b(rx + 45, -250, 36, 36, 18, .9), b(rx, -345, 10, 60, 3, .9), b(rx, -385, 28, 28, 14, .9, { sig: true }),
    b(rx, -60, 260, 190, 16, .1), b(rx - 165, -70, 40, 150, 14, .1), b(rx + 165, -70, 40, 150, 14, .1), b(rx - 75, 90, 90, 90, 45, .1), b(rx + 75, 90, 90, 90, 45, .1),
  )
  return {
    blocks,
    draw(g) {
      ;[[-290, 0], [-210, 1], [-130, 2, 50], [-50, 3, 50], [90, 4]].forEach(([y, i, indent = 0]) => {
        el('text', { x: x + 26 + indent, y, class: 'sb-t' }, g, T[i])
      })
    },
  }
}

function python() {
  const shape = [[0, 60], [0, 44], [0, 0], [0, 66], [1, 50], [1, 74], [2, 46], [2, 60], [1, 30], [0, 0], [0, 52], [1, 70], [1, 40], [2, 56], [2, 66], [2, 34], [1, 48], [0, 0], [0, 62], [1, 44], [1, 58]]
  const blocks = shape.filter(([, n]) => n).map(([depth, n], i) => {
    const w = n * 9, row = shape.findIndex((_, j) => shape.slice(0, j + 1).filter(([, m]) => m).length === i + 1)
    return b(-440 + depth * 60 + w / 2, -100 + row * 28, w, 12, 6, .55, { line: 0 })
  })
  return {
    blocks,
    draw(g) {
      ;['for i in range(10):', '    print("hola", i)'].forEach((l, i) => el('text', { x: -440, y: -340 + i * 70, class: 'sb-t mono big' }, g, l))
      el('text', { x: -440, y: -200, class: 'sb-t mono dim' }, g, '>>>')
    },
  }
}

function linux() {
  const blocks = [b(0, 0, 980, 760, 16, .03), b(0, -350, 980, 60, 16, .08)]
  ;[-290, -240, -190].forEach((y, i) => blocks.push(b(-470 + [230, 340, 170][i] / 2 + 150, y, [230, 340, 170][i], 16, 8, .5, { line: 0 })))
  const vm = [-310, 0, 310]
  vm.forEach((x) => {
    blocks.push(b(x, 100, 270, 320, 12, .05))
    blocks.push(b(x, -30, 270, 44, 10, .12))
    ;[40, 80, 120, 160, 200].forEach((y, i) => blocks.push(b(x - 30 + (i % 2) * 20, y + 0, [150, 110, 170, 90, 130][i], 12, 6, .45, { line: 0 })))
  })
  return {
    blocks,
    draw(g) {
      ;[-290, -240, -190].forEach((y, i) => el('text', { x: -470, y, class: 'sb-t mono' }, g, '$'))
      vm.forEach((x, i) => el('text', { x, y: -30, class: 'sb-t mono mid' }, g, `vm${i + 1}`))
      el('path', { d: 'M-175 100 H-135 M135 100 H175', class: 'sb-wire' }, g)
    },
  }
}

function web() {
  const cx = -210, keys = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', ',', '=', '+']
  const blocks = [b(cx, 0, 470, 800, 40, .04), b(cx, -280, 400, 130, 16, .12)]
  keys.forEach((k, i) => blocks.push(b(cx - 150 + (i % 4) * 100, -130 + Math.floor(i / 4) * 110, 86, 96, 22, k === '=' ? .9 : .1, { sig: k === '=' })))
  ;[150, 110, 190, 90, 150].forEach((w, i) => blocks.push(b(240 + w / 2, -190 + i * 96, w, 14, 7, .5, { line: 0 })))
  return {
    blocks,
    draw(g) {
      keys.forEach((k, i) => el('text', { x: cx - 150 + (i % 4) * 100, y: -130 + Math.floor(i / 4) * 110, class: `sb-t mid${k === '=' ? ' ink' : ''}` }, g, k))
      el('text', { x: cx + 180, y: -280, class: 'sb-t end big' }, g, '1.024')
      ;['<div>', '<script>', '.css {', 'fetch()', '</div>'].forEach((l, i) => el('text', { x: 240, y: -230 + i * 96, class: 'sb-t mono dim' }, g, l))
    },
  }
}

function exams() {
  // A single sheet: the only quiet screen on the way.
  const blocks = [b(0, 0, 620, 840, 6, .04)]
  for (let i = 0; i < 14; i++) blocks.push(b(-270 + [500, 440, 520, 300, 480, 410, 520, 360, 500, 460, 240, 500, 420, 310][i] / 2, -340 + i * 50, [500, 440, 520, 300, 480, 410, 520, 360, 500, 460, 240, 500, 420, 310][i], 8, 4, .4, { line: 0 }))
  return { blocks, draw() {} }
}

function home() {
  const [, , pw, ph] = plan.viewBox.split(' ').map(Number)
  const k = 1000 / Math.max(pw, ph), ox = -pw * k / 2, oy = -ph * k / 2
  const blocks = plan.rooms.map((r) => b(ox + (r.x + r.w / 2) * k, oy + (r.y + r.h / 2) * k, r.w * k, r.h * k, 1, .02))
  plan.blinds.forEach((x) => blocks.push(b(ox + (x.x + x.width / 2) * k, oy + (x.y + x.height / 2) * k, x.width * k, x.height * k, 2, .95, { sig: true })))
  return { blocks, draw() {} }
}

function cloud() {
  const mods = [['login', -345, 140], ['accounts', -115, 140], ['cloud', 115, 140], ['store', 345, 140], ['share', -230, 260], ['tphome', 0, 260], ['admin', 230, 260]]
  const blocks = [b(-230, -405, 180, 110, 12, .06), b(230, -405, 74, 120, 16, .06), b(0, -260, 88, 88, 44, .05), b(0, -40, 190, 100, 14, .14), b(325, -40, 150, 80, 12, .06)]
  mods.forEach(([m, x, y]) => blocks.push(b(x, y, 200, 76, 12, m === 'tphome' ? .2 : .06, { sig: m === 'tphome' })))
  return {
    blocks,
    draw(g) {
      el('path', { d: 'M-230 -350 V-300 Q-230 -260 -190 -260 H-44 M230 -345 V-300 Q230 -260 190 -260 H44 M0 -216 V-90 M95 -40 H250 M0 10 V70 M-345 70 H345 M-345 70 V102 M-115 70 V102 M115 70 V102 M345 70 V102 M0 70 V222 M-230 178 V200 M230 178 V200 M-230 200 H230 M-230 200 V222 M230 200 V222', class: 'sb-wire' }, g)
      ;[['Browser', -230, -482], ['TPApp', 230, -487], ['gateway', 0, -40], ['auth', 325, -40]].forEach(([t, x, y]) => el('text', { x, y, class: 'sb-t mid' }, g, t))
      mods.forEach(([m, x, y]) => el('text', { x, y, class: `sb-t mid${m === 'tphome' ? ' sig' : ''}` }, g, m))
    },
  }
}

export function startStory(svg, count, lang) {
  const defs = [lego(), scratch(lang), python(), linux(), web(), exams(), home(), cloud()].slice(0, count)
  const scenes = defs.map((d) => {
    const list = d.blocks.slice(0, COUNT)
    while (list.length < COUNT) list.push({ ...list[list.length % Math.max(1, d.blocks.length)], on: 0 })
    return list
  })
  svg.innerHTML = ''
  const root = el('g', {}, svg)
  const nodes = Array.from({ length: COUNT }, (_, i) => {
    const g = el('g', {}, root)
    return { g, rect: el('rect', { class: 'sb-b' }, g), a: el('rect', { class: 'sb-stud', rx: 3 }, g), c: el('rect', { class: 'sb-stud', rx: 3 }, g), seed: ((i * 37) % COUNT) / COUNT }
  })
  const layers = defs.map((d) => { const g = el('g', { class: 'sb-layer' }, root); d.draw(g); return g })

  return {
    place(F, V) { root.setAttribute('transform', `matrix(${F} 0 0 ${F} ${V[0]} ${V[1]})`) },
    // s moves between scenes; `built` is how much of the first scene has been stacked so far.
    update(s, built) {
      const last = scenes.length - 1, k = Math.min(last - 1, Math.floor(s)), u = s - k
      const A = scenes[k], B = scenes[k + 1]
      nodes.forEach((n, i) => {
        const e = smooth(0, 1, (u - n.seed * .34) / .66), p = A[i], q = B[i]
        const lift = Math.sin(e * Math.PI) * 90 * (n.seed - .5)
        let y = mid(p.y, q.y, e) - lift, on = mid(p.on, q.on, e)
        const x = mid(p.x, q.x, e) + lift * .6, w = mid(p.w, q.w, e), h = mid(p.h, q.h, e)
        // In the first scene the bricks are still being put together, one on top of the last.
        if (k === 0 && p.on) { const drop = clamp01(built * COUNT - i * .92); const fall = 1 - drop; y -= fall * fall * (1 - e) * 240; on *= mid(drop, 1, e) }
        n.rect.setAttribute('x', x - w / 2); n.rect.setAttribute('y', y - h / 2)
        n.rect.setAttribute('width', w); n.rect.setAttribute('height', h)
        n.rect.setAttribute('rx', mid(p.r, q.r, e))
        n.rect.style.fillOpacity = mid(p.fill, q.fill, e)
        n.rect.style.strokeOpacity = mid(p.line, q.line, e)
        n.rect.classList.toggle('sig', e < .5 ? p.sig : q.sig)
        n.g.style.opacity = on
        n.g.style.display = on < .004 ? 'none' : ''
        const stud = mid(p.stud, q.stud, smooth(0, .3, e))
        ;[[n.a, -.25], [n.c, .25]].forEach(([r, o]) => {
          r.setAttribute('x', x + w * o - 16); r.setAttribute('y', y - h / 2 - 11)
          r.setAttribute('width', 32); r.setAttribute('height', 11)
          r.style.opacity = stud
        })
      })
      layers.forEach((g, i) => {
        const o = 1 - smooth(.03, .15, Math.abs(s - i))
        g.style.opacity = o
        g.style.display = o < .01 ? 'none' : ''
      })
    },
  }
}
