// One pinned scene per project page. Each scene has three moments, matching the page's three texts, and the camera moves
// between them the way the home page does: diving into something, so every moment grows out of the last.
import plan from '../../data/floorplan.js'
import { HOSTS, MACHINE, ROWS } from '../../data/machines.js'

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
const box = (g, x, y, w, h, cls = 'st', r = 12) => el('rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: r, class: `${cls} ns` }, g)
const line = (g, d, cls = 'st st-dim') => el('path', { d, class: `${cls} ns` }, g)
const label = (g, x, y, value, cls = '', size = 26) => {
  const t = el('text', { x, y, class: `lab ${cls}` }, g, value)
  t.style.fontSize = `${size}px`
  return t
}
// The next moment grows out of `a`, the current one flies past the camera around it.
function hand(from, to, anchor, u) {
  const [x, y] = anchor
  const s1 = 1 + u * u * 7, s2 = mid(.1, 1, smooth(.1, 1, u))
  from.setAttribute('transform', `translate(${x} ${y}) scale(${s1}) translate(${-x} ${-y})`)
  from.style.opacity = 1 - smooth(.25, .75, u)
  from.style.display = u >= .8 ? 'none' : ''
  to.setAttribute('transform', `translate(${x} ${y}) scale(${s2}) translate(${-x} ${-y})`)
  to.style.opacity = smooth(.4, .85, u)
  to.style.display = u <= .4 ? 'none' : ''
}
// Puts moments on stage for a position `s`; `anchors[i]` is where moment i hands over to moment i + 1.
function choreograph(moments, anchors, s) {
  const k = Math.min(moments.length - 2, Math.floor(s)), u = s - k
  moments.forEach((m, i) => { if (i !== k && i !== k + 1) m.style.display = 'none' })
  hand(moments[k], moments[k + 1], anchors[k], u)
}

// ---- TPHome: the floor plan, a press travelling through every layer, and the switch itself ----
function tphome(root, lang) {
  const es = lang === 'es'
  const [, , pw, ph] = plan.viewBox.split(' ').map(Number)
  const k = 1000 / Math.max(pw, ph), ox = -pw * k / 2, oy = -ph * k / 2
  const house = el('g', {}, root), flow = el('g', {}, root), device = el('g', {}, root)
  plan.rooms.forEach((r) => el('rect', { x: ox + r.x * k, y: oy + r.y * k, width: r.w * k, height: r.h * k, class: 'st ns wall' }, house))
  plan.doors.forEach((d) => el('line', { x1: ox + d.x1 * k, y1: oy + d.y1 * k, x2: ox + d.x2 * k, y2: oy + d.y2 * k, class: 'ns door' }, house))
  const bars = plan.blinds.map((b) => {
    const x = ox + b.x * k, y = oy + b.y * k, w = b.width * k, h = b.height * k
    el('rect', { x, y, width: w, height: h, class: 'ns blind-o' }, house)
    return { r: el('rect', { x, y, width: w, height: h, class: 'blind' }, house), w, h, wide: w > h }
  })
  const b3 = plan.blinds[3]
  const anchorA = [ox + (b3.x + b3.width / 2) * k, oy + (b3.y + b3.height / 2) * k]

  // The press, as the README describes it.
  const ROWS_ = [
    ['frontend', 'POST /commands/B0101/down'],
    ['api', 'tp/B0101/c  ←  0xC1'],
    [es ? 'interruptor' : 'switch', es ? 'cierra el relé, arranca el motor' : 'closes the relay, starts the motor'],
    [es ? 'interruptor' : 'switch', 'tp/B0101/s  →  2 bytes'],
    ['api', 'SQLite + WebSocket'],
    [es ? 'plano' : 'floor plan', es ? 'la persiana se mueve' : 'the blind moves'],
  ]
  const rowY = (i) => -400 + i * 160
  line(flow, `M-430 ${rowY(0)} V${rowY(5)}`)
  const rows = ROWS_.map(([who, what], i) => {
    const g = el('g', {}, flow), y = rowY(i)
    const dot = el('circle', { cx: -430, cy: y, r: 9, class: 'node' }, flow)
    label(g, -385, y - 26, who, 'left', 25)
    el('text', { x: -385, y: y + 22, class: 'mono left code' }, g, what)
    return { g, dot }
  })
  const pulse = el('circle', { cx: -430, r: 14, class: 'pulse' }, flow)
  const anchorB = [-430, rowY(2)]

  // The switch, its window and the two bytes it publishes.
  const blind = { pos: 60, target: 60, motor: es ? 'parado' : 'idle', next: 0, log: [] }
  const words = es ? { idle: 'parado', up: 'subiendo', down: 'bajando' } : { idle: 'idle', up: 'rising', down: 'lowering' }
  const hex = (n) => `0x${Math.round(n).toString(16).toUpperCase().padStart(2, '0')}`
  const say = (l) => { blind.log.unshift(l); blind.log.length = Math.min(blind.log.length, 3); logLines.forEach((t, i) => { t.textContent = blind.log[i] || '' }) }
  box(device, -270, -130, 400, 520, 'st', 4)
  const clipId = `win-${Math.random().toString(36).slice(2)}`
  const clip = el('clipPath', { id: clipId }, device)
  el('rect', { x: -470, y: -390, width: 400, height: 520 }, clip)
  const shutter = el('g', { 'clip-path': `url(#${clipId})` }, device)
  const slats = el('g', {}, shutter)
  for (let i = 0; i < 18; i++) el('line', { x1: -470, x2: -70, y1: 90 - i * 30, y2: 90 - i * 30, class: 'ns slat' }, slats)
  el('rect', { x: -470, y: 102, width: 400, height: 26, class: 'blind' }, slats)
  const pct = el('text', { x: -270, y: 172, class: 'mono center code' }, device, '60 %')
  box(device, 250, -130, 440, 520, 'st', 18)
  const A = 130, cx = 250, cy = -255
  box(device, cx, cy, A, A, 'st st-sig', 6)
  let pins = ''
  for (let i = 0; i < 6; i++) { const o = -A / 2 + 16 + i * (A - 32) / 5; pins += `M${cx + o} ${cy - A / 2}v-20M${cx + o} ${cy + A / 2}v20M${cx - A / 2} ${cy + o}h-20M${cx + A / 2} ${cy + o}h20` }
  line(device, pins, 'st st-sig')
  el('text', { x: cx, y: cy, class: 'mono center code small sig' }, device, 'ESP8266')
  const press = (cmd) => {
    if (cmd === 'down') { blind.target = blind.pos > 20.5 ? 20 : 0; say('tp/B0101/c  ←  0xC1') } else { blind.target = 100; say('tp/B0101/c  ←  0xC0') }
  }
  const key = (x, cmd, path, name) => {
    const g = el('g', { class: 'press', tabindex: 0, role: 'button', 'aria-label': name }, device)
    box(g, x, 40, 170, 130, 'st', 12)
    el('path', { d: path, class: 'st ns' }, g)
    g.addEventListener('click', () => press(cmd))
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); press(cmd) } })
  }
  key(cx - 92, 'up', `M${cx - 120} 54 l28 -28 l28 28`, es ? 'Subir' : 'Up')
  key(cx + 92, 'down', `M${cx + 64} 26 l28 28 l28 -28`, es ? 'Bajar' : 'Down')
  const posByte = el('text', { x: -330, y: 288, class: 'mono big left' }, device, '0x3C')
  const motor = el('text', { x: -330, y: 350, class: 'mono code left dim' }, device, '')
  const logLines = [0, 1, 2].map((i) => el('text', { x: -60, y: 248 + i * 42, class: 'mono code left dim small' }, device, ''))

  return {
    moments: 3,
    controls: [{ label: es ? 'Subir' : 'Up', run: () => press('up') }, { label: es ? 'Bajar' : 'Down', run: () => press('down') }],
    update(s, rs, now, dt) {
      choreograph([house, flow, device], [anchorA, anchorB], s)
      const moving = Math.abs(blind.target - blind.pos) > .01
      if (moving) {
        const step = 16 * dt
        blind.pos += Math.max(-step, Math.min(step, blind.target - blind.pos))
        blind.motor = blind.target > blind.pos ? words.up : words.down
        if (now > blind.next) { blind.next = now + 1000; say(`tp/B0101/s  →  ${hex(blind.pos)} ${blind.motor}`) }
      } else if (blind.motor !== words.idle) { blind.motor = words.idle; say(`tp/B0101/s  →  ${hex(blind.pos)} ${blind.motor}`) }
      const c = 1.14 - (.14 + (blind.pos / 100) * .86)
      bars.forEach((a) => (a.wide ? a.r.setAttribute('width', a.w * c) : a.r.setAttribute('height', a.h * c)))
      slats.setAttribute('transform', `translate(0 ${(1 - blind.pos / 100) * 520 - 520})`)
      pct.textContent = `${Math.round(blind.pos)} %`
      posByte.textContent = hex(blind.pos)
      motor.textContent = `${es ? 'motor' : 'motor'}: ${blind.motor}`
      // The press goes down the layers as you scroll.
      const q = clamp01((rs - 1) / .42) * 5
      rows.forEach((r, i) => { const on = smooth(i - .35, i, q); r.g.style.opacity = .2 + .8 * on; r.dot.style.opacity = .3 + .7 * on })
      pulse.setAttribute('cy', rowY(q))
      pulse.style.opacity = rs > .9 ? 1 : 0
    },
  }
}

// ---- TPCloud: the whole system, a request crossing it, and the two ways in ----
function tpcloud(root, lang) {
  const es = lang === 'es'
  const whole = el('g', {}, root), trip = el('g', {}, root), ways = el('g', {}, root)
  const mods = [['login', -345, 140], ['accounts', -115, 140], ['cloud', 115, 140], ['store', 345, 140], ['share', -230, 260], ['tphome', 0, 260], ['admin', 230, 260]]
  const draw = (g) => {
    line(g, 'M-230 -345 V-300 Q-230 -260 -190 -260 H-80 M230 -345 V-300 Q230 -260 190 -260 H80')
    el('path', { d: 'M0 -205 V-90', class: 'st st-dim ns', 'stroke-dasharray': '3 7' }, g)
    line(g, 'M95 -40 H250 M0 10 V70')
    line(g, 'M-345 70 H345 M-345 70 V105 M-115 70 V105 M115 70 V105 M345 70 V105 M0 70 V220 M-230 180 V220 M230 180 V220 M-230 200 H230')
    box(g, -230, -405, 180, 110); line(g, 'M-320 -372 H-140', 'st'); label(g, -230, -482, 'Browser')
    box(g, 230, -405, 74, 120, 'st', 16); label(g, 230, -487, 'TPApp')
    el('circle', { cx: 0, cy: -260, r: 44, class: 'st ns' }, g); el('ellipse', { cx: 0, cy: -260, rx: 18, ry: 44, class: 'st st-dim ns' }, g)
    label(g, -62, -205, 'Internet', 'end')
    label(g, 22, -150, 'Cloudflare Tunnel', 'start', 22)
    box(g, 0, -40, 190, 100, 'st thick', 14); label(g, 0, -40, 'gateway', 'hi')
    box(g, 325, -40, 150, 80); label(g, 325, -40, 'auth')
    mods.forEach(([m, x, y]) => { box(g, x, y, 200, 76, 'st st-dim'); label(g, x, y, m) })
  }
  draw(whole)
  const seen = mods.map(([, x, y], i) => el('rect', { x: x - 100, y: y - 38, width: 200, height: 76, rx: 12, class: 'lit ns' }, whole))

  draw(trip)
  const route = el('path', { d: 'M-230 -350 V-300 Q-230 -260 -190 -260 H0 V-90 M0 -40 H325 M325 -40 H0 V70 V222', fill: 'none' }, trip)
  const packet = el('circle', { r: 11, class: 'pulse' }, trip)
  const question = label(trip, 325, -118, es ? '¿sesión válida?' : 'valid session?', 'sig', 24)
  const answer = label(trip, 325, 26, '200', 'sig', 26)
  const L = route.getTotalLength()
  const hot = el('rect', { x: -100, y: 222, width: 200, height: 76, rx: 12, class: 'lit ns' }, trip)

  // Browser and native app, one auth service.
  box(ways, -280, -250, 360, 170); label(ways, -280, -285, 'Browser', 'hi', 32); label(ways, -280, -225, 'passkey', 'sig', 30)
  box(ways, 280, -250, 360, 170); label(ways, 280, -285, 'TPApp', 'hi', 32); label(ways, 280, -225, es ? 'contraseña + TOTP' : 'password + TOTP', 'sig', 30)
  line(ways, 'M-280 -165 V-60 Q-280 -10 -230 -10 H-90 M280 -165 V-60 Q280 -10 230 -10 H90')
  box(ways, 0, -10, 180, 110, 'st thick', 14); label(ways, 0, -10, 'auth', 'hi', 34)
  const wA = el('circle', { r: 11, class: 'pulse' }, ways), wB = el('circle', { r: 11, class: 'pulse' }, ways)
  const pathA = el('path', { d: 'M-280 -165 V-60 Q-280 -10 -230 -10 H-90', fill: 'none' }, ways), pathB = el('path', { d: 'M280 -165 V-60 Q280 -10 230 -10 H90', fill: 'none' }, ways)
  line(ways, 'M0 45 V150')
  const out = ['store', 'tphome', 'admin'].map((m, i) => { const x = -340 + i * 340; box(ways, x, 240, 280, 90, 'st st-dim'); label(ways, x, 240, m); return x })
  line(ways, `M${out[0]} 195 V150 H${out[2]} V195 M0 150 V195`)
  const lenA = pathA.getTotalLength(), lenB = pathB.getTotalLength()

  return {
    moments: 3,
    update(s, rs, now) {
      choreograph([whole, trip, ways], [[0, -40], [0, -10]], s)
      // Every module wakes in turn: one login in front of all of them.
      const q0 = clamp01(rs / .42) * mods.length
      seen.forEach((r, i) => { r.style.opacity = smooth(i, i + 1, q0) * .9 })
      const q = clamp01((rs - 1) / .42)
      const p = route.getPointAtLength(q * L)
      packet.setAttribute('cx', p.x); packet.setAttribute('cy', p.y)
      question.style.opacity = smooth(.3, .42, q) * (1 - smooth(.62, .7, q))
      answer.style.opacity = smooth(.5, .58, q) * (1 - smooth(.74, .82, q))
      hot.style.opacity = smooth(.92, 1, q) * .9
      const t = now / 1000
      const a = pathA.getPointAtLength((t * .35 % 1) * lenA), b = pathB.getPointAtLength(((t * .35 + .5) % 1) * lenB)
      wA.setAttribute('cx', a.x); wA.setAttribute('cy', a.y); wB.setAttribute('cx', b.x); wB.setAttribute('cy', b.y)
    },
  }
}

// ---- HackUDC: the catalogue as a space you can search, a photo's way through the model, and what was trained ----
function hackudc(root, lang, canvas, view) {
  const es = lang === 'es'
  const pipe = el('g', {}, root), model = el('g', {}, root), empty = el('g', {}, root)
  const ctx = canvas.getContext('2d')
  const narrow = innerWidth < 760, N = narrow ? 1400 : 3400
  const gauss = () => Math.sqrt(-2 * Math.log(Math.random() + 1e-6)) * Math.cos(6.283 * Math.random())
  const clusters = Array.from({ length: 10 }, (_, i) => {
    const y = 1 - (i + .5) / 5, r = Math.sqrt(Math.max(0, 1 - y * y)), a = i * 2.399963
    return { x: Math.cos(a) * r * .68, y: y * .68, z: Math.sin(a) * r * .68, spread: .07 + (i * 7 % 10) * .007 }
  })
  const pts = new Float32Array(N * 3), sx = new Float32Array(N), sy = new Float32Array(N)
  for (let i = 0; i < N; i++) {
    const c = clusters[i % 10], loose = Math.random() < .08
    pts[i * 3] = loose ? (Math.random() - .5) * 1.8 : c.x + gauss() * c.spread
    pts[i * 3 + 1] = loose ? (Math.random() - .5) * 1.8 : c.y + gauss() * c.spread
    pts[i * 3 + 2] = loose ? (Math.random() - .5) * 1.8 : c.z + gauss() * c.spread
  }
  const q = { x: 0, y: 0, tx: 0, ty: 0, ready: false, target: 0, next: 0, at: -1e9 }
  const aim = (e) => { q.tx = e.clientX; q.ty = e.clientY; q.at = performance.now() }
  addEventListener('pointermove', aim, { passive: true })
  addEventListener('pointerdown', aim, { passive: true })

  function cloud(now, dt, dim, search) {
    const { W, H, V, F } = view()
    ctx.clearRect(0, 0, W, H)
    if (dim <= .01) return
    const t = now / 1000, a = t * .075, ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(.3), sb = Math.sin(.3), R = 1000 * F * .5
    const proj = (x, y, z) => { const x1 = x * ca - z * sa, z1 = x * sa + z * ca, y1 = y * cb - z1 * sb, z2 = y * sb + z1 * cb, p = 2.7 / (2.7 + z2); return [V[0] + x1 * R * p, V[1] + y1 * R * p, z2] }
    ctx.fillStyle = '#edebe6'
    for (let i = 0; i < N; i++) {
      const [x, y, z] = proj(pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2])
      sx[i] = x; sy[i] = y
      const d = clamp01(.62 - z * .62), size = 1.2 + d * 1.5
      ctx.globalAlpha = (.36 + d * .64) * dim
      ctx.fillRect(x, y, size, size)
    }
    if (search > .01) {
      if (now - q.at > 2600) {
        if (now > q.next) { q.target = (q.target + 3) % 10; q.next = now + 3400 }
        const c = clusters[q.target], [cx, cy] = proj(c.x, c.y, c.z)
        q.tx = cx + 26; q.ty = cy - 30
      }
      if (!q.ready) { q.x = q.tx; q.y = q.ty; q.ready = true }
      q.x += (q.tx - q.x) * Math.min(1, dt * 4.5); q.y += (q.ty - q.y) * Math.min(1, dt * 4.5)
      const best = Array(6).fill(null)
      for (let i = 0; i < N; i++) {
        const dx = sx[i] - q.x, dy = sy[i] - q.y, d = dx * dx + dy * dy
        if (d < 3600) continue
        const sec = Math.floor((Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2) * 6) % 6
        if (!best[sec] || d < best[sec][0]) best[sec] = [d, i]
      }
      ctx.lineWidth = 1; ctx.strokeStyle = '#bfd0db'; ctx.globalAlpha = search
      best.filter(Boolean).forEach(([, i]) => {
        ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(sx[i], sy[i]); ctx.stroke()
        ctx.fillStyle = '#000'; ctx.fillRect(sx[i] - 7, sy[i] - 9, 14, 18); ctx.strokeRect(sx[i] - 7, sy[i] - 9, 14, 18)
      })
      ctx.fillStyle = '#000'; ctx.fillRect(q.x - 16, q.y - 21, 32, 42)
      ctx.strokeStyle = '#edebe6'; ctx.strokeRect(q.x - 16, q.y - 21, 32, 42)
      ctx.fillStyle = '#edebe6'; ctx.font = '13px Inter, sans-serif'; ctx.textAlign = 'center'
      ctx.fillText(es ? 'tu foto' : 'your photo', q.x, q.y - 30)
    }
    ctx.globalAlpha = 1
  }

  // Photo, encoder, a vector, FAISS, the closest products.
  const stops = [
    [-400, -320, 'photo'], [-200, -160, 'encoder'], [0, 0, 'vector'], [200, 160, 'faiss'], [400, 320, 'results'],
  ]
  const steps = []
  stops.forEach(([x, y, name], i) => {
    const g = el('g', {}, pipe)
    if (name === 'photo') { box(g, x, y, 130, 170, 'st', 8); label(g, x, y + 120, es ? 'tu foto' : 'your photo') }
    if (name === 'encoder') { box(g, x, y, 240, 110, 'st thick', 12); label(g, x, y - 16, 'OpenCLIP', 'hi', 26); label(g, x, y + 20, 'ViT-B/32', '', 22) }
    if (name === 'vector') { for (let b = 0; b < 12; b++) { const h = 24 + ((b * 37) % 70); el('rect', { x: x - 84 + b * 14, y: y - h / 2, width: 8, height: h, rx: 2, class: 'bar-s' }, g) } label(g, x, y + 80, 'embedding') }
    if (name === 'faiss') { box(g, x, y, 200, 100, 'st thick', 12); label(g, x, y, 'FAISS', 'hi', 28) }
    if (name === 'results') { [0, 1, 2].forEach((n) => box(g, x - 74 + n * 74, y, 60, 78, n ? 'st st-dim' : 'st st-sig', 6)) }
    steps.push(g)
  })
  line(pipe, 'M-320 -256 L-290 -232 M-100 -80 L-70 -56 M90 72 L120 96 M285 228 L315 252')
  const dot = el('circle', { r: 11, class: 'pulse' }, pipe)

  // Twelve blocks in the image encoder; the last four were unfrozen so training fit in a weekend on a CPU.
  const blocks = []
  for (let i = 0; i < 12; i++) {
    const x = -345 + (i % 4) * 230, y = -220 + Math.floor(i / 4) * 170
    const g = el('g', {}, model)
    const r = box(g, x, y, 200, 130, 'st st-dim', 10)
    el('text', { x, y, class: 'mono center code' }, g, String(i + 1))
    blocks.push({ r, g })
  }
  label(model, 0, 300, es ? 'solo los 4 últimos bloques, en CPU' : 'only the last 4 blocks, on a CPU', 'sig', 30)

  return {
    moments: 3,
    stop() { removeEventListener('pointermove', aim); removeEventListener('pointerdown', aim) },
    update(s, rs, now, dt) {
      empty.style.display = 'none'
      // The cloud is the page's ground: it stays behind everything, dimmer once the drawing takes over.
      const k = Math.min(1, Math.floor(s)), u = s - k
      if (s <= 1) { pipe.style.display = u > .4 ? '' : 'none'; pipe.style.opacity = smooth(.4, .85, u); pipe.setAttribute('transform', `scale(${mid(.3, 1, smooth(.2, 1, u))})`); model.style.display = 'none' } else hand(pipe, model, [0, -60], u)
      cloud(now, dt, s < 1 ? 1 - .82 * smooth(.2, .8, s) : .18 - .1 * smooth(1, 2, s), 1 - smooth(.04, .2, s))
      const p = clamp01((rs - 1) / .42) * 4
      steps.forEach((g, i) => { g.style.opacity = .22 + .78 * smooth(i - .5, i, p) })
      const i = Math.min(3, Math.floor(p)), f = p - i
      dot.setAttribute('cx', mid(stops[i][0], stops[i + 1][0], f)); dot.setAttribute('cy', mid(stops[i][1], stops[i + 1][1], f))
      // Frozen blocks stay grey; the last four light up.
      const lit = clamp01((rs - 2) / .36)
      blocks.forEach((b, n) => { b.g.style.opacity = n < 8 ? .4 : 1; b.r.classList.toggle('st-sig', n >= 8 && lit * 4 > n - 8) })
    },
  }
}

// ---- Dotfiles: one flake, what each machine takes from it, and running it ----
function dotfiles(root, lang) {
  const es = lang === 'es'
  const tree = el('g', {}, root), piles = el('g', {}, root), term = el('g', {}, root)
  el('text', { x: 0, y: -300, class: 'mono center huge' }, tree, 'flake.nix')
  const kinds = { macbook: 'nix-darwin', desktop: 'NixOS', tphome: 'Home Manager' }
  const wires = el('path', { class: 'st st-dim ns' }, tree)
  const nodes = HOSTS.map(([name, x]) => {
    const g = el('g', {}, tree)
    box(g, x, 110, 290, 170)
    el('text', { x, y: 85, class: 'mono center code' }, g, name)
    label(g, x, 135, kinds[name], 'sig', 26)
    return g
  })
  label(tree, 0, 290, es ? 'un solo flake, tres máquinas' : 'one flake, three machines', '', 28)

  const BUS = -300, FLOOR = 340, BLOCK = 62
  line(piles, `M${HOSTS[0][1]} ${BUS} H${HOSTS[2][1]} M0 ${BUS - 70} V${BUS}` + HOSTS.map((h) => ` M${h[1]} ${BUS} V${BUS + 18}`).join(''))
  HOSTS.forEach(([name, x]) => { line(piles, `M${x - 145} ${FLOOR + 4} H${x + 145}`, 'st'); el('text', { x, y: FLOOR + 40, class: 'mono center code' }, piles, name) })
  const blocks = []
  ROWS.forEach((row, r) => row.forEach(([name, ...hosts]) => {
    const own = hosts[hosts.length - 1] === true
    hosts.filter((h) => h !== true).forEach((h) => {
      const n = el('g', { class: `block${own ? ' own' : ''}` }, piles)
      el('rect', { x: -138, y: -27, width: 276, height: 54, rx: 7 }, n)
      el('text', { x: 0, y: 1, class: 'mono' }, n, name)
      blocks.push({ n, x: HOSTS[h][1], slot: FLOOR - 28 - r * BLOCK, r })
    })
  }))

  // A terminal per machine, printing what `update` really prints there.
  box(term, 0, -60, 960, 590, 'st', 16)
  const tabs = HOSTS.map(([name], i) => {
    const g = el('g', { class: 'tab', tabindex: 0, role: 'button', 'aria-label': name }, term)
    const x = -320 + i * 320
    el('rect', { x: x - 150, y: 280, width: 300, height: 70, rx: 12 }, g)
    el('text', { x, y: 315, class: 'mono center code' }, g, name)
    const pick = () => { host = name; picked = true }
    g.addEventListener('click', pick)
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick() } })
    return { g, name }
  })
  const lines = Array.from({ length: 7 }, (_, i) => el('text', { x: -445, y: -300 + i * 64, class: 'mono left term' }, term, ''))
  let host = 'desktop', picked = false, shownFor = '', clock = 0

  return {
    moments: 3,
    update(s, rs, now, dt) {
      choreograph([tree, piles, term], [[0, 110], [0, 150]], s)
      const q0 = clamp01(rs / .42)
      const stem = mid(-262, -60, smooth(0, .35, q0)), spread = smooth(.3, .7, q0) * HOSTS[2][1]
      let d = `M0 -262 V${stem}`
      if (spread > 0) d += ` M${-spread} -60 H${spread}`
      if (q0 > .7) HOSTS.forEach((h) => { d += ` M${h[1]} -60 V${mid(-60, 25, smooth(.7, 1, q0))}` })
      wires.setAttribute('d', d)
      nodes.forEach((g, i) => { g.style.opacity = smooth(.62 + i * .08, .8 + i * .08, q0) })
      const q = clamp01((rs - 1) / .42) * (ROWS.length + 1)
      blocks.forEach((b) => {
        const p = clamp01(q - b.r)
        b.n.style.display = p <= 0 ? 'none' : ''
        b.n.setAttribute('transform', `translate(${b.x} ${mid(BUS + 30, b.slot, p * p)})`)
      })
      // The terminal runs `update` as you scroll; tapping a machine runs it there.
      const q2 = clamp01((rs - 2) / .36)
      if (!picked) host = HOSTS[Math.min(2, Math.floor(q2 * 2.999))][0]
      if (shownFor !== host) { shownFor = host; clock = 0 }
      clock += dt
      tabs.forEach((t) => t.g.classList.toggle('on', t.name === host))
      const m = MACHINE[host], typed = Math.min(1, clock * 3)
      lines[0].textContent = `migueltaibo@${host} ~ ${'update'.slice(0, Math.round(typed * 6))}`
      m.lines.forEach((l, i) => {
        const show = clock > .4 + i * .35
        lines[i + 1].textContent = show ? (i === 4 ? `✓ ${l}` : l) : ''
        lines[i + 1].classList.toggle('sig', i === 4)
      })
    },
  }
}

export const SCENES = { tphome, tpcloud, hackudc26: hackudc, dotfiles }
