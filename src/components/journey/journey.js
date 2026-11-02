// One continuous take: the name, then a dive through the "o" into each project, and back out to where it began.
import plan from '../../data/floorplan.js'
import { HOSTS, MACHINE, ROWS } from '../../data/machines.js'

export function startJourney(container, text) {
  let raf = 0, stopped = false
  const timers = [], listeners = []
  const on = (type, fn) => { addEventListener(type, fn, { passive: true }); listeners.push([type, fn]) }

  const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }
  const mid = (a, b, u) => a + (b - a) * u
  const clamp01 = x => Math.min(1, Math.max(0, x))
  const NS = 'http://www.w3.org/2000/svg'
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const stage = container.querySelector('#stage')
  const el = (tag, attrs = {}, parent, text) => {
    const n = document.createElementNS(NS, tag)
    for (const k in attrs) n.setAttribute(k, attrs[k])
    if (text !== undefined) n.textContent = text
    if (parent) parent.append(n)
    return n
  }
  const box = (g, x, y, w, h, cls = 'st', r = 12) => el('rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: r, class: `${cls} ns` }, g)
  const line = (g, d, cls = 'st st-dim') => el('path', { d, class: `${cls} ns` }, g)

  // ---- level 1: TPCloud, 1000 x 1000 around the origin ----
  function sceneCloud() {
    const g = el('g')
    const mods = [['login', -345, 140], ['accounts', -115, 140], ['cloud', 115, 140], ['store', 345, 140], ['share', -230, 260], ['tphome', 0, 260], ['admin', 230, 260]]
    line(g, 'M-230 -345 V-300 Q-230 -260 -190 -260 H-80 M230 -345 V-300 Q230 -260 190 -260 H80')
    el('path', { d: 'M0 -205 V-90', class: 'st st-dim ns', 'stroke-dasharray': '3 7' }, g)
    line(g, 'M95 -40 H250')
    line(g, 'M0 10 V70')
    line(g, 'M-345 70 H345 M-345 70 V105 M-115 70 V105 M115 70 V105 M345 70 V105 M0 70 V220 M-230 180 V220 M230 180 V220 M-230 200 H230')
    box(g, -230, -405, 180, 110); line(g, 'M-320 -372 H-140', 'st'); el('text', { x: -230, y: -482, class: 'lab' }, g, 'Browser')
    box(g, 230, -405, 74, 120, 'st', 16); el('text', { x: 230, y: -487, class: 'lab' }, g, 'TPApp')
    el('circle', { cx: 0, cy: -260, r: 44, class: 'st ns' }, g); el('ellipse', { cx: 0, cy: -260, rx: 18, ry: 44, class: 'st st-dim ns' }, g)
    el('text', { x: -62, y: -205, class: 'lab', style: 'text-anchor:end' }, g, 'Internet')
    el('text', { x: 22, y: -150, class: 'lab', style: 'text-anchor:start;font-size:22px' }, g, 'Cloudflare Tunnel')
    box(g, 0, -40, 190, 100, 'st', 14).style.strokeWidth = 2; el('text', { x: 0, y: -40, class: 'lab hi' }, g, 'gateway')
    box(g, 325, -40, 150, 80); el('text', { x: 325, y: -40, class: 'lab' }, g, 'auth')
    mods.forEach(([m, x, y]) => {
      const hot = m === 'tphome'
      box(g, x, y, 200, 76, hot ? 'st st-sig' : 'st st-dim')
      el('text', { x, y, class: `lab ${hot ? 'sig' : ''}` }, g, m)
    })
    const route = el('path', { d: 'M-230 -345 V-300 Q-230 -260 -190 -260 H0 V-40 V70 V260', fill: 'none' }, g)
    const packet = el('circle', { r: 4, fill: 'var(--signal)' }, g)
    const L = route.getTotalLength()
    return { g, anchor: [0, 260], ratio: 200 / 1000, tick(t, S) {
      const p = route.getPointAtLength((t * .16 % 1) * L)
      packet.setAttribute('cx', p.x); packet.setAttribute('cy', p.y); packet.setAttribute('r', 2.6 / S)
    } }
  }

  // ---- level 2: the real floor plan, blinds moving on their own. Its walls are what turns to dust. ----
  const [, , planW, planH] = plan.viewBox.split(' ').map(Number)
  const planK = 1000 / Math.max(planW, planH)
  const planX = -planW * planK / 2, planY = -planH * planK / 2
  function sceneHome() {
    const g = el('g')
    const walls = el('g', {}, g), shutters = el('g', {}, g)
    plan.rooms.forEach(r => el('rect', { x: planX + r.x * planK, y: planY + r.y * planK, width: r.w * planK, height: r.h * planK, class: 'st ns', style: 'stroke:rgba(237,235,230,.5)' }, walls))
    plan.doors.forEach(d => el('line', { x1: planX + d.x1 * planK, y1: planY + d.y1 * planK, x2: planX + d.x2 * planK, y2: planY + d.y2 * planK, stroke: '#000', 'stroke-width': 4, class: 'ns' }, walls))
    const bars = plan.blinds.map(b => {
      const x = planX + b.x * planK, y = planY + b.y * planK, w = b.width * planK, h = b.height * planK
      el('rect', { x, y, width: w, height: h, fill: 'none', stroke: 'var(--signal)', 'stroke-opacity': .4, class: 'ns' }, shutters)
      return { r: el('rect', { x, y, width: w, height: h, class: 'blind' }, shutters), w, h, horizontal: w > h }
    })
    return {
      g,
      out(u) { const o = 1 - smooth(.02, .2, u); walls.style.opacity = o; shutters.style.opacity = o },
      tick(t) {
        bars.forEach((a, i) => {
          const c = .2 + .8 * (reduced ? 1 : smooth(.2, .8, .5 + .5 * Math.sin(t * .7 - i * 1.1)))
          a.horizontal ? a.r.setAttribute('width', a.w * c) : a.r.setAttribute('height', a.h * c)
        })
      },
    }
  }

  // ---- level 4: `update`, and the modules each host really imports falling into its machine ----
  // Rows run bottom to top. A shared module lands on every host at the same moment; the Pi only takes the shell and Neovim subset.
  const WORD_X = -270, WORD_Y = -300, BUS_Y = -128, FLOOR = 422, BLOCK = 62

  // ---- level 5: the same blocks turn into what they configure. Output lines are the real ones from each rebuild. ----
  const narrow = innerWidth < 760
  const SCREEN = narrow ? { x: -490, y: -490, w: 980, h: 770 } : { x: -490, y: -340, w: 980, h: 610 }
  const PANES = narrow ? {
    bar: { x: -470, y: -474, w: 940, h: 44 }, term: { x: -470, y: -416, w: 940, h: 336 },
    info: { x: -470, y: -64, w: 410, h: 328 }, code: { x: -44, y: -64, w: 514, h: 328 }, tabY: 346,
  } : {
    bar: { x: -472, y: -328, w: 944, h: 40 }, term: { x: -472, y: -272, w: 640, h: 300 },
    info: { x: 182, y: -272, w: 290, h: 300 }, code: { x: -472, y: 44, w: 944, h: 210 }, tabY: 322,
  }
  const TERM_FS = narrow ? 27 : 18.5, LINE = TERM_FS * 1.62, TERM_PAD = 20
  const promptOf = host => `migueltaibo@${host} ~ `
  // Baseline of output line i inside the terminal; the prompt is line 0.
  const termY = i => PANES.term.y + TERM_PAD + TERM_FS + i * LINE
  const checkAt = { x: PANES.term.x + TERM_PAD + TERM_FS * .3, y: termY(5) - TERM_FS * .34, size: TERM_FS * 1.25 }

  function sceneDots() {
    const g = el('g')
    const desk = el('g', {}, g)
    const clipId = 'desk-clip'
    const clip = el('clipPath', { id: clipId }, desk)
    el('rect', { x: SCREEN.x, y: SCREEN.y, width: SCREEN.w, height: SCREEN.h, rx: 16 }, clip)
    const wall = el('g', { 'clip-path': `url(#${clipId})` }, desk)
    el('rect', { x: SCREEN.x, y: SCREEN.y, width: SCREEN.w, height: SCREEN.h, fill: '#090908' }, wall)
    el('rect', { x: SCREEN.x, y: SCREEN.y, width: SCREEN.w, height: SCREEN.h, rx: 16, class: 'g-box' }, desk)
    const pane = ({ x, y, w, h }) => el('rect', { x, y, width: w, height: h, rx: 12, class: 'glass' }, desk)
    const text = (x, y, cls, size, value = '', parent = desk) => el('text', { x, y, class: `tt ${cls}`, style: `font-size:${size}px` }, parent, value)
    // Waybar
    const bar = el('g', {}, desk)
    { const b = PANES.bar
      el('rect', { x: b.x, y: b.y, width: b.w, height: b.h, rx: 12, class: 'glass' }, bar)
      text(b.x + 18, b.y + b.h * .67, '', TERM_FS * .82, '1  2  3', bar)
      const c = text(b.x + b.w - 18, b.y + b.h * .67, 'dim', TERM_FS * .82, 'Hyprland', bar); c.style.textAnchor = 'end' }
    pane(PANES.term); pane(PANES.info); pane(PANES.code)
    const prompt = text(PANES.term.x + TERM_PAD, termY(0), 'dim', TERM_FS)
    const out = [1, 2, 3, 4].map(i => text(PANES.term.x + TERM_PAD, termY(i), 'dim', TERM_FS))
    const done = text(PANES.term.x + TERM_PAD + TERM_FS * .95, termY(5), 'sig', TERM_FS)
    const tick5 = text(PANES.term.x + TERM_PAD, termY(5), 'sig', TERM_FS, '✓')
    const infoFS = TERM_FS * (narrow ? .92 : .95), infoLine = infoFS * 1.75
    const infoHead = text(PANES.info.x + 18, PANES.info.y + 22 + infoFS, '', infoFS)
    const infoRows = [0, 1, 2, 3].map(i => text(PANES.info.x + 18, PANES.info.y + 22 + infoFS + (i + 1) * infoLine, 'dim', infoFS))
    const codeFS = TERM_FS * (narrow ? .9 : 1), codeLine = codeFS * 1.75
    const codeHead = text(PANES.code.x + 18, PANES.code.y + 18 + codeFS, 'sig', codeFS * .9, 'flake.nix')
    const codeRows = [0, 1, 2].map(i => text(PANES.code.x + 18, PANES.code.y + 18 + codeFS + (i + 1) * codeLine, '', codeFS))
    // Tabs: one rebuild per machine.
    const tabs = el('g', {}, g)
    const tabW = 290, tabH = narrow ? 70 : 62
    const tabMap = HOSTS.map(([name, x]) => {
      const t = el('g', { class: 'tab', tabindex: 0, role: 'button', 'aria-label': name }, tabs)
      el('rect', { x: x - tabW / 2, y: PANES.tabY - tabH / 2, width: tabW, height: tabH, rx: 10 }, t)
      el('text', { x, y: PANES.tabY, class: 'mono', style: `font-size:${narrow ? 30 : 24}px` }, t, name)
      const pick = () => setHost(name)
      t.addEventListener('click', pick)
      t.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick() } })
      return { name, t, x }
    })

    // The word that started it all.
    const run = el('g', { class: 'run', tabindex: 0, role: 'button', 'aria-label': 'update' }, g)
    const hitRun = el('rect', { x: WORD_X - 20, y: WORD_Y - 130, width: 590, height: 170, fill: 'transparent' }, run)
    const word = el('text', { x: WORD_X, y: WORD_Y, class: 'mono word', style: 'font-size:150px' }, run, 'update')
    const caret = el('rect', { x: WORD_X + 6 * 90 + 8, y: WORD_Y - 108, width: 60, height: 130, fill: 'var(--signal)' }, run)

    // The wiring is drawn from the word down, so `update` visibly sets it off.
    const rig = el('g', {}, g)
    const wire = el('path', { class: 'st st-dim ns' }, rig)
    const floors = el('g', {}, rig)
    const labels = HOSTS.map(([name, x]) => {
      line(floors, `M${x - 145} ${FLOOR + 4} H${x + 145}`, 'st')
      return { t: el('text', { x, y: FLOOR + 40, class: 'lab mono', style: 'font-size:28px' }, floors, name), name }
    })
    const drawWire = p => {
      const stemEnd = mid(WORD_Y + 62, BUS_Y, smooth(0, .4, p))
      const spread = smooth(.35, .75, p) * (HOSTS[2][1])
      const drop = smooth(.7, 1, p) * 18
      let d = `M0 ${WORD_Y + 62} V${stemEnd}`
      if (spread > 0) d += ` M${-spread} ${BUS_Y} H${spread}`
      if (drop > 0) HOSTS.forEach(h => { d += ` M${h[1]} ${BUS_Y} V${BUS_Y + drop}` })
      wire.setAttribute('d', d)
    }

    const blocks = []
    const pile = el('g', {}, g)
    ROWS.forEach((row, r) => row.forEach(([name, ...hosts]) => {
      const own = hosts[hosts.length - 1] === true
      hosts.filter(h => h !== true).forEach(h => {
        const n = el('g', { class: `block${own ? ' own' : ''}` }, pile)
        const rect = el('rect', { rx: 7 }, n)
        const label = el('text', { x: 0, y: 1, class: 'mono' }, n, name)
        blocks.push({ n, rect, label, name, x: HOSTS[h][1], slot: FLOOR - 28 - r * BLOCK, r, h })
      })
    }))
    // Where each block goes on the way to level 5.
    const centre = p => ({ x: p.x + p.w / 2, y: p.y + p.h / 2, w: p.w, h: p.h })
    blocks.forEach(b => {
      if (b.h !== 1) b.to = { x: b.x, y: PANES.tabY, w: tabW, h: tabH }
      else b.to = centre({ hyprland: PANES.bar, neovim: PANES.code, fastfetch: PANES.info }[b.name] || PANES.term)
    })
    const lastRow = HOSTS.map((_, h) => Math.max(...blocks.filter(b => b.h === h).map(b => b.r)))
    const STEP = .24, FALL = .5
    let startedAt = null, enter = 0, morph = 0, leave = 0, host = 'desktop'

    function setHost(name) {
      host = name
      const m = MACHINE[name], isDesktop = name === 'desktop'
      prompt.textContent = promptOf(name)
      out.forEach((t, i) => t.textContent = m.lines[i])
      done.textContent = m.lines[4]
      infoHead.textContent = `╭─ ${name}`
      infoRows.forEach((t, i) => t.textContent = `${i === 3 ? '╰' : '│'} ${m.info[i][0].padEnd(narrow ? 7 : 7)}${m.info[i][1]}`)
      codeRows.forEach((t, i) => t.textContent = m.flake[i])
      bar.style.display = isDesktop ? '' : 'none'
      tabMap.forEach(t => t.t.classList.toggle('on', t.name === name))
      placeWord()
    }
    // The word lands right after the prompt, at terminal size.
    function placeWord() {
      const q = mid(1, TERM_FS / 150, morphE())
      const px = PANES.term.x + TERM_PAD + promptOf(host).length * TERM_FS * .6
      const e = morphE()
      run.setAttribute('transform', `translate(${e * (px - WORD_X * q)} ${e * (termY(0) - WORD_Y * q)}) scale(${q})`)
    }
    const morphE = () => smooth(.28, .72, morph)
    const start = () => { startedAt = performance.now() }
    run.addEventListener('click', start)
    run.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); start() } })
    setHost('desktop')

    return {
      g,
      wordAt() { return { x: WORD_X, y: WORD_Y, size: 150 } },
      in(u) { enter = u },
      morph(u) { morph = u },
      leave(u) { leave = u },
      autorun(s) {
        if (s < 3.55) startedAt = null
        else if (s > 3.96 && startedAt === null) start()
      },
      tick(t, S, now) {
        const clock = morph > 0 || leave > 0 ? 99 : startedAt === null ? -1 : reduced ? 99 : (now - startedAt) / 1000
        word.style.opacity = smooth(.7, .8, enter) * (1 - smooth(.08, .34, leave))
        caret.style.opacity = morph > 0 ? 0 : smooth(.8, .86, enter)
        caret.style.fillOpacity = (t * 1.6 % 1) < .55 || clock < 0 || reduced ? 1 : .15
        run.style.pointerEvents = enter > .95 && morph === 0 ? '' : 'none'
        placeWord()
        drawWire(clamp01((enter - .8) / .2))
        rig.style.opacity = 1 - smooth(0, .24, morph)
        floors.style.opacity = smooth(.92, 1, enter)
        const show = smooth(.42, .78, morph) * (1 - smooth(.08, .36, leave))
        desk.style.opacity = show
        desk.style.display = show < .004 ? 'none' : ''
        tabs.style.opacity = smooth(.5, .82, morph) * (1 - smooth(.04, .24, leave))
        tabs.style.display = morph < .4 || leave > .3 ? 'none' : ''
        blocks.forEach(b => {
          const p = clamp01((clock - b.r * STEP) / FALL)
          if (clock < 0 || p <= 0 || morph >= .86) { b.n.style.display = 'none'; return }
          b.n.style.display = ''
          const e = smooth(.02 + b.r * .012, .56, morph)
          const cx = mid(b.x, b.to.x, e), cy = mid(mid(BUS_Y + 30, b.slot, p * p), b.to.y, e)
          const w = mid(276, b.to.w, e), h = mid(54, b.to.h, e)
          b.n.setAttribute('transform', `translate(${cx} ${cy})`)
          b.rect.setAttribute('x', -w / 2); b.rect.setAttribute('y', -h / 2)
          b.rect.setAttribute('width', w); b.rect.setAttribute('height', h)
          b.rect.style.fillOpacity = 1 - smooth(.5, .78, morph)
          b.label.style.opacity = 1 - smooth(.04, .22, morph)
          b.n.style.opacity = 1 - smooth(.62, .84, morph)
        })
        labels.forEach((l, h) => {
          const done = clock >= lastRow[h] * STEP + FALL
          const text = done ? `✓ ${l.name}` : l.name
          if (l.t.textContent !== text) { l.t.textContent = text; l.t.classList.toggle('sig', done) }
        })
      },
    }
  }

  // ---- levels 6-8: Grade. The last ✓ of the rebuild flies out and turns into the app's icon; the icon opens like
  // an iOS app. Numbers are the app's own engine's output (made-up demo grades on the real UDC template). ----
  const GRADE = { current: [{"n": "Algoritmos", "e": 5, "o": 6}, {"n": "Diseño Software", "e": 1, "o": 2}, {"n": "Estructura de Computadores", "e": 3, "o": 4}, {"n": "Paradigmas de Programación", "e": 2, "o": 3}, {"n": "Sistemas Operativos", "e": 1, "o": 2}] }
  const fmt = (v, d = 2) => v.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: d })
  const GLYPH = {
    code: '<path d="M8 6 2.5 12 8 18M16 6l5.5 6L16 18M14 4l-4 16"/>',
    terminal: '<path d="m4 7 5 5-5 5M12 18h8"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M10 2v4M14 2v4M10 18v4M14 18v4M2 10h4M2 14h4M18 10h4M18 14h4"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    more: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    books: '<path d="M5 4h4v16H5zM10 4h4v16h-4zM15.5 5l3.6-1 3 15.5-3.6 1z"/>',
    person: '<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="10" r="3.4"/><path d="M5.5 19c1.4-3 3.800-4 6.500-4s5.100 1 6.500 4"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
  }
  const glyph = g => `<svg viewBox="0 0 24 24">${GLYPH[g]}</svg>`
  const TILES = [
    ['Algoritmos', 'code', '#5e5ce6,#4240c8'], ['Diseño Software', 'code', '#ff9f0a,#f07800'],
    ['Estructura de Computadores', 'cpu', '#30b0c7,#158da3'], ['Paradigmas de Programación', 'code', '#ff375f,#d9163f'],
    ['Sistemas Operativos', 'terminal', '#007aff,#0058cc'],
  ]
  const STATUS = `<div class="status"><span>9:41</span><svg viewBox="0 0 62 14" fill="#000"><rect x="0" y="9" width="3" height="5" rx=".8"/><rect x="4.500" y="6.500" width="3" height="7.500" rx=".8"/><rect x="9" y="4" width="3" height="10" rx=".8"/><rect x="13.500" y="1" width="3" height="13" rx=".8"/><path d="M28 3.600a10 10 0 0 1 7 2.800l1.200-1.300A11.800 11.800 0 0 0 28 1.700a11.800 11.800 0 0 0-8.200 3.400L21 6.400a10 10 0 0 1 7-2.800zm0 3.700a6.200 6.200 0 0 1 4.300 1.700l1.200-1.300A8 8 0 0 0 28 5.400a8 8 0 0 0-5.500 2.300l1.200 1.300A6.200 6.200 0 0 1 28 7.300zm0 3.600-2.200 1.200L28 14l2.200-1.900z"/><rect x="40" y="1.500" width="20" height="11" rx="3" fill="none" stroke="#000" stroke-opacity=".4"/><rect x="41.500" y="3" width="17" height="8" rx="1.800"/></svg></div><div class="island"></div>`
  const TABS = sel => `<div class="tabbar">${[['Calendario', 'cal'], ['Asignaturas', 'books'], ['Cuenta', 'person']].map(([n, g]) => `<div class="${n === sel ? 'sel' : ''}">${glyph(g)}${n}</div>`).join('')}</div>`
  const homeHTML = () => `<div class="scr home"><div class="topbtns"><div class="gbtn">${glyph('cal').replace('<svg', '<svg fill="none" stroke="currentColor" stroke-width="1.8"')}</div><div class="gbtn">${glyph('more').replace('<svg', '<svg fill="currentColor"')}</div></div>
    <div class="h-year rnd">2º Año</div><div class="h-term rnd">1º Cuatrimestre</div>
    <div class="tiles">${TILES.map(([n, g, c], i) => { const s = GRADE.current.find(x => x.n === n), f = s.e / s.o, C = 2 * Math.PI * 12
      return `<div class="tile${n === 'Sistemas Operativos' ? ' tapped' : ''}"><div class="ic" style="background:linear-gradient(${c})">${glyph(g)}</div><svg class="progress-ring" viewBox="0 0 28 28"><circle cx="14" cy="14" r="12"/><circle class="on" cx="14" cy="14" r="12" stroke-dasharray="${f * C} ${C}"/></svg><div class="tname">${n}</div></div>` }).join('')}</div>${TABS('Asignaturas')}</div>`
  const ICON_PX = 128
  function sceneGrade() {
    const g = el('g')
    const checkG = el('g', {}, g)
    const check = el('path', { d: 'M68 140 L116 186 L190 80', fill: 'none', 'stroke-width': 32, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', transform: 'translate(-128 -130)' }, checkG)
    const root = container.querySelector('#devices')
    const fade = container.querySelector('.grade-fade')
    const phone = (html, extra = '') => { const n = document.createElement('div'); n.className = 'phone'; n.innerHTML = `<div class="phone-in">${html}${STATUS}${extra}</div>`; root.append(n); return n }
    const main = phone(`<div class="under">${homeHTML()}</div>`, '<div class="splash"></div>')
    const under = main.querySelector('.under'), splash = main.querySelector('.splash')
    under.style.cssText = 'position:absolute;inset:0;'

    let ps = 1, pc = [0, 0], narrowNow = false
    const place = (n, x, y, s, rot = 0, o = 1) => {
      n.style.transform = `translate(${x}px, ${y}px) rotateY(${rot}deg) scale(${s})`
      n.style.opacity = o
      n.style.visibility = o < .004 ? 'hidden' : ''
    }
    return {
      g,
      fit(W, H, V, F) {
        narrowNow = W < 760
        ps = narrowNow ? Math.min(W * .76 / 390, H * .6 / 844) : Math.min(H * .86 / 844, W * .5 / 390)
        pc = narrowNow ? [W / 2, H * .045 + 422 * ps] : [V[0], V[1]]
        root.style.left = pc[0] + 'px'; root.style.top = pc[1] + 'px'
        root.style.perspectiveOrigin = '0 0'
        this.vp = V; this.vf = F
      },
      show(on) { root.style.display = on ? 'block' : 'none'; fade.style.display = on && narrowNow ? 'block' : 'none' },
      // k = 5: the check flies, blooms into the icon, and the icon opens as the app.
      open(u) {
        const fly = smooth(.14, .46, u), V = this.vp, f = this.vf
        const tx = (pc[0] - V[0]) / f, ty = (pc[1] - V[1]) / f, end = ICON_PX * .62 / f
        checkG.setAttribute('transform', `translate(${mid(checkAt.x, tx, fly)} ${mid(checkAt.y, ty, fly)}) scale(${mid(checkAt.size, end, fly) / 256})`)
        checkG.style.opacity = smooth(.1, .15, u) * (1 - smooth(.66, .76, u))
        const white = smooth(.44, .56, u)
        check.setAttribute('stroke', `rgb(${mid(191, 0, white)},${mid(208, 0, white)},${mid(219, 0, white)})`)
        const grow = smooth(.62, .98, u), a = ICON_PX / ps, ix = (390 - a) / 2, iy = (844 - a) / 2
        const clip = `inset(${mid(iy, -13, grow)}px ${mid(ix, -13, grow)}px ${mid(iy, -13, grow)}px ${mid(ix, -13, grow)}px round ${mid(a * .225, 67, grow)}px)`
        main.style.clipPath = clip; main.style.webkitClipPath = clip
        place(main, 0, 0, ps * smooth(.42, .56, u), 0, white > .001 ? 1 : 0)
        splash.style.opacity = 1 - smooth(.7, .92, u)
        fade.style.opacity = smooth(.8, 1, u)
      },
      home() {
        main.style.clipPath = main.style.webkitClipPath = 'none'
        splash.style.opacity = 0
        place(main, 0, 0, ps)
      },
      leaving(k, o) { root.style.transform = k; root.style.opacity = o; fade.style.opacity = o > .5 ? 1 : 0 },
      settled() { root.style.transform = ''; root.style.opacity = 1 },
      fadeOut(o) { fade.style.opacity = o },
    }
  }

  // ---- level 3: the embedding space, drawn on canvas. The plan's walls become its points. ----
  const dust = (() => {
    const canvas = container.querySelector('#pts')
    const ctx = canvas.getContext('2d')
    let N = 0, W = 0, H = 0, wasOn = false
    let pos, seed, px, py, rx, ry, wx, wy
    const clusters = Array.from({ length: 10 }, (_, i) => {
      const y = 1 - (i + .5) / 5, r = Math.sqrt(Math.max(0, 1 - y * y)), a = i * 2.399963
      return { x: Math.cos(a) * r * .68, y: y * .68, z: Math.sin(a) * r * .68, spread: .07 + (i * 7 % 10) * .007 }
    })
    const gauss = () => Math.sqrt(-2 * Math.log(Math.random() + 1e-6)) * Math.cos(6.283 * Math.random())
    const query = { x: 0, y: 0, tx: 0, ty: 0, ready: false, target: 0, nextAt: 0, pointerAt: -1e9 }

    function resize(w, h) {
      W = w; H = h
      const d = Math.min(devicePixelRatio || 1, 2)
      canvas.width = W * d; canvas.height = H * d
      ctx.setTransform(d, 0, 0, d, 0, 0)
      if (N) return
      N = W < 760 ? 1400 : 3400
      pos = new Float32Array(N * 3); seed = new Float32Array(N); px = new Float32Array(N); py = new Float32Array(N)
      rx = new Float32Array(N); ry = new Float32Array(N); wx = new Float32Array(N); wy = new Float32Array(N)
      const perim = plan.rooms.map(r => (r.w + r.h) * 2), total = perim.reduce((a, b) => a + b)
      for (let i = 0; i < N; i++) {
        seed[i] = Math.random()
        const c = clusters[i % clusters.length], loose = Math.random() < .08
        pos[i * 3] = loose ? (Math.random() - .5) * 1.8 : c.x + gauss() * c.spread
        pos[i * 3 + 1] = loose ? (Math.random() - .5) * 1.8 : c.y + gauss() * c.spread
        pos[i * 3 + 2] = loose ? (Math.random() - .5) * 1.8 : c.z + gauss() * c.spread
        // A random spot on some wall of the plan, in plan units.
        let side = Math.random() * total, k = 0
        while (side > perim[k]) side -= perim[k++]
        const r = plan.rooms[k]
        let x, y
        if (side < r.w) { x = r.x + side; y = r.y }
        else if (side < r.w + r.h) { x = r.x + r.w; y = r.y + side - r.w }
        else if (side < r.w * 2 + r.h) { x = r.x + side - r.w - r.h; y = r.y + r.h }
        else { x = r.x; y = r.y + side - r.w * 2 - r.h }
        px[i] = planX + x * planK; py[i] = planY + y * planK
      }
    }

    // Every point gets a spot on the pixels of the word, drawn at its final size and place on screen.
    function setWord(x, y, size) {
      const off = document.createElement('canvas')
      off.width = Math.ceil(W); off.height = Math.ceil(innerHeight)
      const c = off.getContext('2d', { willReadFrequently: true })
      c.fillStyle = '#fff'; c.font = `500 ${size}px "JetBrains Mono", monospace`; c.textBaseline = 'alphabetic'
      c.fillText('update', x, y)
      const { data } = c.getImageData(0, 0, off.width, off.height)
      const lit = []
      for (let py2 = 0; py2 < off.height; py2++) for (let px2 = 0; px2 < off.width; px2++) if (data[(px2 + py2 * off.width) * 4 + 3] > 120) lit.push(px2, py2)
      if (!lit.length) return false
      for (let i = 0; i < N; i++) { const k = Math.floor(Math.random() * lit.length / 2) * 2; wx[i] = lit[k]; wy[i] = lit[k + 1] }
      return true
    }

    const aim = e => { query.tx = e.clientX; query.ty = e.clientY; query.pointerAt = performance.now() }
    on('pointermove', aim)
    on('pointerdown', aim)

    // phase 0-1: walls to cloud; 1-2: resting cloud; 2-2.7: collapse onto the caret.
    function draw(phase, now, dt, V, F, R, searchOn) {
      if (phase <= 0 || phase >= 2.7) { if (wasOn) { ctx.clearRect(0, 0, W, H); wasOn = false } return }
      wasOn = true
      ctx.clearRect(0, 0, W, H)
      const t = reduced ? 0 : now / 1000
      const inU = clamp01(phase), outU = clamp01((phase - 2) / .7)
      const a = t * .075 + phase * .9 + outU * outU * 3.2, ca = Math.cos(a), sa = Math.sin(a)
      const cb = Math.cos(.3), sb = Math.sin(.3)
      ctx.fillStyle = '#edebe6'
      const proj = (x, y, z) => {
        const x1 = x * ca - z * sa, z1 = x * sa + z * ca
        const y1 = y * cb - z1 * sb, z2 = y * sb + z1 * cb
        const p = 2.7 / (2.7 + z2)
        return [V[0] + x1 * R * p, V[1] + y1 * R * p, z2]
      }
      for (let i = 0; i < N; i++) {
        const [sx, sy, z] = proj(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2])
        rx[i] = sx; ry[i] = sy
        const depth = clamp01(.62 - z * .62)
        let x = sx, y = sy, alpha = .36 + depth * .64, size = 1.2 + depth * 1.5
        if (inU < 1) {
          const e = smooth(0, 1, (inU - seed[i] * .42) / .58)
          const fx = V[0] + px[i] * F, fy = V[1] + py[i] * F
          const lift = Math.sin(e * Math.PI) * 70 * (seed[i] - .5)
          x = mid(fx, sx, e) + lift; y = mid(fy, sy, e) - lift * .6
          alpha = mid(.8, alpha, e) * smooth(0, .05, inU); size = mid(1.3, size, e)
        }
        if (outU > 0) {
          const e = smooth(0, 1, (outU - seed[i] * .3) / .7)
          const swirl = Math.sin(e * Math.PI) * 60 * (seed[i] - .5)
          x = mid(x, wx[i], e) + swirl; y = mid(y, wy[i], e) - swirl * .5
          alpha = mid(alpha, .95, e) * (1 - smooth(.9, 1, outU)); size = mid(size, 1.25, e)
        }
        ctx.globalAlpha = alpha
        ctx.fillRect(x, y, size, size)
      }
      // The search itself: wherever "tu foto" lands, its nearest points answer, recomputed every frame.
      if (searchOn > .01) {
        if (now - query.pointerAt > 2600) {
          if (now > query.nextAt) { query.target = (query.target + 3) % clusters.length; query.nextAt = now + 3400 }
          const c = clusters[query.target], [cx, cy] = proj(c.x, c.y, c.z)
          query.tx = cx + 26; query.ty = cy - 30
        }
        if (!query.ready) { query.x = query.tx; query.y = query.ty; query.ready = true }
        query.x += (query.tx - query.x) * Math.min(1, dt * 4.5); query.y += (query.ty - query.y) * Math.min(1, dt * 4.5)
        // Nearest point in each of six directions, clear of the photo, so the answers read as a fan and not a clump.
        const best = Array(6).fill(null)
        for (let i = 0; i < N; i++) {
          const dx = rx[i] - query.x, dy = ry[i] - query.y, d = dx * dx + dy * dy
          if (d < 3600) continue
          const sector = Math.floor((Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2) * 6) % 6
          if (!best[sector] || d < best[sector][0]) best[sector] = [d, i]
        }
        const answers = best.filter(Boolean).sort((m, n) => m[0] - n[0])
        ctx.lineWidth = 1
        ctx.strokeStyle = '#bfd0db'
        answers.forEach(([, i], n) => {
          ctx.globalAlpha = searchOn * (.9 - n * .1)
          ctx.beginPath(); ctx.moveTo(query.x, query.y); ctx.lineTo(rx[i], ry[i]); ctx.stroke()
          ctx.globalAlpha = searchOn
          ctx.fillStyle = '#000'; ctx.fillRect(rx[i] - 7, ry[i] - 9, 14, 18)
          ctx.strokeRect(rx[i] - 7, ry[i] - 9, 14, 18)
        })
        ctx.globalAlpha = searchOn
        ctx.fillStyle = '#000'; ctx.fillRect(query.x - 16, query.y - 21, 32, 42)
        ctx.strokeStyle = '#edebe6'; ctx.strokeRect(query.x - 16, query.y - 21, 32, 42)
        ctx.fillStyle = '#edebe6'; ctx.font = '13px Inter, sans-serif'; ctx.textAlign = 'center'
        ctx.fillText(text().photo, query.x, query.y - 30)
      }
      ctx.globalAlpha = 1
    }
    return { resize, draw, setWord }
  })()

  // ---- camera ----
  const name = { g: null, anchor: null, ratio: 0, frameCentre: null, dot: null }
  const cloud = sceneCloud(), home = sceneHome(), flake = sceneDots(), grade = sceneGrade()
  let F, V, Vend, W, H
  const LAST = 7

  function layout() {
    W = innerWidth; H = Math.max(stage.clientHeight, innerHeight) // WebKit can report the default 150 px before 100lvh resolves
    const svgH = innerHeight
    stage.setAttribute('viewBox', `0 0 ${W} ${H}`)
    const portrait = W < 760
    const g = name.g
    g.innerHTML = ''
    const fs = portrait ? W * .29 : Math.min(W * .148, svgH * .34)
    const x = portrait ? 24 : 48
    let oText, oIndex
    if (portrait) {
      el('text', { x, y: svgH * .3, class: 't-name', 'font-size': fs }, g, 'Miguel')
      oText = el('text', { x, y: svgH * .3 + fs * 1.04, class: 't-name', 'font-size': fs }, g, 'Taibo'); oIndex = 4
    } else {
      oText = el('text', { x, y: svgH * .46, class: 't-name', 'font-size': fs }, g, 'Miguel Taibo'); oIndex = 11
    }
    const ext = oText.getExtentOfChar(oIndex)
    const base = parseFloat(oText.getAttribute('y'))
    name.anchor = [ext.x + ext.width / 2 - fs * .004, base - fs * .262]
    name.ratio = fs * .16 * .13 / 500
    name.frameCentre = [W / 2, svgH / 2]
    name.dot = el('circle', { cx: name.anchor[0], cy: name.anchor[1], r: fs * .022, fill: 'var(--signal)' }, g)
    const f = portrait ? Math.min(W * .92, svgH * .52) / 1000 : Math.min(W * .56, svgH * .86) / 1000
    const v = portrait ? [W / 2, svgH * .31] : [W * .67, svgH * .5]
    F = [1, f, f, f, f]; V = [name.frameCentre, v, v, v, v]
    Vend = [W / 2, svgH * (portrait ? .37 : .31)]
    dust.resize(W, H)
    dust.setWord(v[0] + WORD_X * f, v[1] + WORD_Y * f, 150 * f)
    grade.fit(W, svgH, v, f)
  }

  const caps = [...container.querySelectorAll('.cap')]
  const track = container.querySelector('.track')
  let s = null, then = performance.now()

  async function boot() {
    await Promise.all(['600 100px Switzer', '500 100px "JetBrains Mono"'].map(x => document.fonts.load(x))).catch(() => {})
    await document.fonts.ready
    if (stopped) return
    name.g = el('g', {}, stage)
    ;[cloud, home, flake, grade].forEach(sc => stage.append(sc.g))
    layout()
    on('resize', layout)
    // WebKit can measure with the fallback face at first: measure the letter again once it has settled.
    ;[250, 900].forEach(ms => timers.push(setTimeout(layout, ms)))
    raf = requestAnimationFrame(frame)
  }

  function place(sc, S, tx, ty, op) {
    sc.g.setAttribute('transform', `matrix(${S} 0 0 ${S} ${tx} ${ty})`)
    sc.g.style.opacity = op
    sc.g.style.display = op < .004 ? 'none' : ''
    sc.g.style.pointerEvents = op > .6 ? '' : 'none'
  }
  const hide = sc => { sc.g.style.display = 'none' }

  // A dive from a parent scene into the child sitting on its anchor, for u in 0..1.
  function dive(parent, f0, f1, V0, V1, C0, u) {
    const r = parent.ratio, Q = f1 / (r * f0)
    const S = f0 * Math.pow(Q, u)
    const w = (1 - Math.pow(Q, -u)) / (1 - 1 / Q)
    const cx = mid(C0[0], parent.anchor[0], w), cy = mid(C0[1], parent.anchor[1], w)
    const Vx = mid(V0[0], V1[0], u), Vy = mid(V0[1], V1[1], u)
    return { S, tx: Vx - S * cx, ty: Vy - S * cy, cS: S * r, cx: Vx + S * (parent.anchor[0] - cx), cy: Vy + S * (parent.anchor[1] - cy) }
  }

  function frame(now) {
    const dt = Math.max(0, Math.min(.05, (now - then) / 1000)); then = now
    const range = track.offsetHeight - innerHeight
    const raw = clamp01(scrollY / range) * LAST
    const k0 = Math.min(LAST - 1, Math.floor(raw))
    // Each level holds still for a while, then the movement to the next one plays.
    const target = k0 + (raw >= LAST ? 1 : smooth(.34, 1, raw - k0))
    if (s === null) s = target
    s += (target - s) * Math.min(1, dt * (reduced ? 40 : 7))
    if (Math.abs(target - s) < .0004) s = target

    const k = Math.min(LAST - 1, Math.floor(s)), u = s - k
    const t = reduced ? 0 : now / 1000
    ;[name, cloud, home, flake, grade].forEach(hide)

    if (k === 0) {            // through the "o"
      const d = dive(name, F[0], F[1], V[0], V[1], name.frameCentre, u)
      place(name, d.S, d.tx, d.ty, 1 - smooth(.9, 1, u))
      place(cloud, d.cS, d.cx, d.cy, smooth(.6, .92, u))
      name.dot.style.opacity = 1 - smooth(.3, .55, u)
      cloud.tick(t, d.cS)
    } else if (k === 1) {     // through the tphome module
      const d = dive(cloud, F[1], F[2], V[1], V[2], [0, 0], u)
      place(cloud, d.S, d.tx, d.ty, 1 - smooth(.25, .6, u))
      place(home, d.cS, d.cx, d.cy, smooth(.45, .82, u))
      home.out(0)
      cloud.tick(t, d.S); home.tick(t)
    } else if (k === 2) {     // the walls come apart
      place(home, F[2], V[2][0], V[2][1], u > .3 ? 0 : 1)
      home.out(u)
      home.tick(t)
    } else if (k === 3) {     // the cloud spells out the word, and the word wires itself to the machines
      place(flake, F[4], V[4][0], V[4][1], 1)
      flake.in(u); flake.morph(0); flake.leave(0)
      flake.tick(t, F[4], now)
    } else if (k === 4) {     // the full drawers become the machine they configure
      place(flake, F[4], V[4][0], V[4][1], 1)
      flake.in(1); flake.morph(u); flake.leave(0)
      flake.tick(t, F[4], now)
    } else if (k === 5) {     // the rebuild's last check mark leaves and opens Grade
      place(flake, F[4], V[4][0], V[4][1], u > .5 ? 0 : 1)
      flake.in(1); flake.morph(1); flake.leave(u)
      flake.tick(t, F[4], now)
      place(grade, F[4], V[4][0], V[4][1], 1)
      grade.settled(); grade.show(u > .12); grade.open(u)
    } else {                  // pulling back out through the "o": the page ends where it began
      const b = 1 - u
      const d = dive(name, 1, F[4], Vend, V[4], name.frameCentre, b)
      place(name, d.S, d.tx, d.ty, 1 - smooth(.9, 1, b))
      name.dot.style.opacity = 1 - smooth(.3, .55, b)
      grade.show(b > .55); grade.home()
      grade.leaving(`translate(${d.cx - V[4][0]}px, ${d.cy - V[4][1]}px) scale(${d.cS / F[4]})`, smooth(.6, .92, b))
      grade.fadeOut(smooth(.8, 1, b))
    }
    if (k < 5) grade.show(false)
    flake.autorun(s)

    // Dust: 0 at the plan, 1 once the cloud has formed, 2 leaving, 2.7 gone.
    const phase = s <= 2 ? 0 : s < 3 ? s - 2 : s === 3 ? 1.5 : s >= 4 ? 3 : 2 + clamp01((s - 3) / .75) * .7
    const R = Math.min(W * .56, innerHeight * .86) * (W < 760 ? .72 : .66)
    const searchOn = s >= 2 && s <= 4 ? 1 - smooth(.04, .16, Math.abs(s - 3)) : 0
    dust.draw(phase, now, dt, V[3], F[3], R, searchOn)

    caps.forEach(c => {
      const from = +c.dataset.level, to = +(c.dataset.to || from)
      const d = s < from ? from - s : s > to ? s - to : 0
      const o = 1 - smooth(.06, .2, d)
      c.style.opacity = o
      c.classList.toggle('on', o > .02)
      c.style.transform = reduced ? '' : `translateY(${(s < from ? from - s : s > to ? to - s : 0) * 40}px)`
    })
    raf = requestAnimationFrame(frame)
  }
  boot()

  return () => {
    stopped = true
    cancelAnimationFrame(raf)
    timers.forEach(clearTimeout)
    listeners.forEach(([type, fn]) => removeEventListener(type, fn))
  }
}
