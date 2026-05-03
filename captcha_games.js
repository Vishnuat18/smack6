/**
 * SMACK Beta Download Captcha Games
 * Each game exposes: { render(container), verify() → boolean }
 */

// ─── Utility ──────────────────────────────────────────────────────────────────
const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// ─── Game 1: Shape Equality ───────────────────────────────────────────────────
// Uses SVG shape pairs — no emoji
export function imageEqualityGame() {
    // Will use SVG_ICONS & SHAPE_COLORS defined later in file
    // We build pairs lazily inside render so the library is available
    let userAnswer = null;
    let isEqual = false;
    let pairA = null, pairB = null;

    return {
        title: 'Are these two shapes the same?',
        render(container) {
            const shapeKeys = Object.keys(SVG_ICONS);
            const colors    = SHAPE_COLORS;
            const sA = rnd(shapeKeys), cA = rnd(colors);
            // 50% chance same shape+color, 50% chance different
            isEqual = Math.random() > 0.5;
            const sB = isEqual ? sA : rnd(shapeKeys.filter(k => k !== sA));
            const cB = isEqual ? cA : rnd(colors.filter(c => c.hex !== cA.hex));
            pairA = { s: sA, c: cA };
            pairB = { s: sB, c: cB };

            const icon = (s, c, size=64) =>
                `<div style="color:${c.hex};display:flex;align-items:center;justify-content:center;
                    filter:drop-shadow(0 0 8px ${c.hex}66);">
                    ${SVG_ICONS[s].replace('width="48" height="48"', `width="${size}" height="${size}"`)}
                </div>`;

            container.innerHTML = `
                <div style="display:flex;align-items:center;gap:1.5rem;">
                    <div style="padding:1rem;border-radius:14px;background:rgba(255,255,255,0.05);
                        border:1.5px solid rgba(255,255,255,0.1);">${icon(sA,cA)}</div>
                    <span class="cg-eq-vs">vs</span>
                    <div style="padding:1rem;border-radius:14px;background:rgba(255,255,255,0.05);
                        border:1.5px solid rgba(255,255,255,0.1);">${icon(sB,cB)}</div>
                </div>
                <div class="cg-btn-row">
                    <button class="cg-choice-btn" data-val="equal">Same</button>
                    <button class="cg-choice-btn" data-val="notequal">Different</button>
                </div>`;
            container.querySelectorAll('.cg-choice-btn').forEach(btn => {
                btn.onclick = () => {
                    container.querySelectorAll('.cg-choice-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    userAnswer = btn.dataset.val;
                };
            });
        },
        verify() {
            if (!userAnswer) return false;
            return isEqual ? userAnswer === 'equal' : userAnswer === 'notequal';
        }
    };
}

// ─── Game 2: Color Word ───────────────────────────────────────────────────────
export function colorWordGame() {
    const colorDefs = [
        { name: 'Red',    hex: '#ef4444' },
        { name: 'Blue',   hex: '#3b82f6' },
        { name: 'Green',  hex: '#22c55e' },
        { name: 'Yellow', hex: '#eab308' },
        { name: 'Purple', hex: '#a855f7' },
        { name: 'Orange', hex: '#f97316' },
    ];

    // Pick 4 colors for words, shuffle ink colors
    const wordColors = shuffle(colorDefs).slice(0, 4);
    // Assign ink colors that don't match the word name
    const inkColors = shuffle(colorDefs).slice(0, 4);
    
    // Find the one where name === ink (the correct answer)
    // First, make one intentionally match
    const correctIdx = Math.floor(Math.random() * 4);
    const correctColor = wordColors[correctIdx];
    inkColors[correctIdx] = correctColor; // make ink match name for this one

    // Ensure others DON'T match
    for (let i = 0; i < 4; i++) {
        if (i === correctIdx) continue;
        if (inkColors[i].name === wordColors[i].name) {
            // swap ink with next slot
            const next = (i + 1) % 4 === correctIdx ? (i + 2) % 4 : (i + 1) % 4;
            [inkColors[i], inkColors[next]] = [inkColors[next], inkColors[i]];
        }
    }

    let userAnswer = null;
    const words = wordColors.map((w, i) => ({ name: w.name, ink: inkColors[i].hex, idx: i }));

    return {
        title: 'Pick the word whose ink matches its own color name',
        render(container) {
            container.innerHTML = `
                <div class="cg-color-grid">
                    ${words.map(w => `
                        <button class="cg-color-btn" data-idx="${w.idx}" style="color: ${w.ink};">
                            ${w.name}
                        </button>
                    `).join('')}
                </div>
            `;
            container.querySelectorAll('.cg-color-btn').forEach(btn => {
                btn.onclick = () => {
                    container.querySelectorAll('.cg-color-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    userAnswer = parseInt(btn.dataset.idx);
                };
            });
        },
        verify() {
            return userAnswer === correctIdx;
        }
    };
}

// ─── Game 3: Number Comparison ────────────────────────────────────────────────
export function numberComparisonGame() {
    // Numbers within 30 of each other for harder comparison
    const base = Math.floor(Math.random() * 800) + 100;
    const diff = Math.floor(Math.random() * 30) + 1;
    const a = base;
    let b = Math.random() > 0.5 ? base + diff : base - diff;
    if (b < 1) b = base + diff;
    // Occasionally make them equal
    if (Math.random() < 0.15) b = a;

    const correctAnswer = a > b ? 'left' : b > a ? 'right' : 'equal';
    let userAnswer = null;

    return {
        title: 'Which number is larger?',
        render(container) {
            container.innerHTML = `
                <div class="cg-num-pair">
                    <button class="cg-num-btn" data-val="left">${a}</button>
                    <span class="cg-eq-vs">?</span>
                    <button class="cg-num-btn" data-val="right">${b}</button>
                </div>
                <div class="cg-btn-row" style="margin-top:0.5rem;">
                    <button class="cg-choice-btn" data-val="equal">= Equal</button>
                </div>
            `;
            container.querySelectorAll('.cg-num-btn, .cg-choice-btn').forEach(btn => {
                btn.onclick = () => {
                    container.querySelectorAll('.cg-num-btn, .cg-choice-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    userAnswer = btn.dataset.val;
                };
            });
        },
        verify() {
            return userAnswer === correctAnswer;
        }
    };
}

// ─── Game 4: Visual Memory ────────────────────────────────────────────────────
export function visualMemoryGame() {
    const GRID = 4;
    const HIGHLIGHT_COUNT = 6;  // was 5 — one more cell to remember
    const MEMORIZE_TIME = 4000; // was 5000 — 4s to memorize

    const totalCells = GRID * GRID;
    const highlighted = new Set();
    while (highlighted.size < HIGHLIGHT_COUNT) {
        highlighted.add(Math.floor(Math.random() * totalCells));
    }

    const userSelected = new Set();
    let revealed = true;

    return {
        title: `Memorize the highlighted cells — you have 4 seconds!`,
        render(container) {
            const buildGrid = (showHighlights) => {
                container.innerHTML = `
                    <div class="cg-mem-status" id="cg-mem-status">
                        ${showHighlights ? '⏳ Memorize these cells...' : '✏️ Now click the cells you saw'}
                    </div>
                    <div class="cg-mem-grid" id="cg-mem-grid">
                        ${Array.from({ length: totalCells }, (_, i) => `
                            <div class="cg-mem-cell ${showHighlights && highlighted.has(i) ? 'lit' : ''}" data-idx="${i}"></div>
                        `).join('')}
                    </div>
                `;

                if (!showHighlights) {
                    container.querySelectorAll('.cg-mem-cell').forEach(cell => {
                        cell.onclick = () => {
                            const idx = parseInt(cell.dataset.idx);
                            if (userSelected.has(idx)) {
                                userSelected.delete(idx);
                                cell.classList.remove('selected');
                            } else {
                                userSelected.add(idx);
                                cell.classList.add('selected');
                            }
                        };
                    });
                }
            };

            buildGrid(true);
            let countdown = MEMORIZE_TIME / 1000;
            const statusEl = () => container.querySelector('#cg-mem-status');
            const timer = setInterval(() => {
                countdown--;
                const s = statusEl();
                if (s) s.textContent = countdown > 0
                    ? `⏳ ${countdown}s — Memorize fast!`
                    : '✏️ Now click the cells you saw';
                if (countdown <= 0) clearInterval(timer);
            }, 1000);

            setTimeout(() => {
                revealed = false;
                buildGrid(false);
            }, MEMORIZE_TIME);
        },
        verify() {
            if (userSelected.size !== highlighted.size) return false;
            for (const idx of highlighted) {
                if (!userSelected.has(idx)) return false;
            }
            return true;
        }
    };
}

// ─── Game 5: SVG Odd One Out ──────────────────────────────────────────────────
// Pure SVG shapes — no emoji
export function oddOneOutGame() {
    const GRID_SIZE = 9;
    const oddIndex  = Math.floor(Math.random() * GRID_SIZE);
    let userAnswer  = null;
    // Visually SIMILAR pairs to make it harder
    const svgPairs = [
        ['circle','ring'],      // filled vs hollow circle
        ['star','hexagon'],     // both pointy
        ['triangle','play'],    // both triangular
        ['square','pause'],     // both rectangular
        ['shield','heart'],     // both rounded-top
        ['ring','target'],      // both ring-like
        ['cross','pause'],      // both blocky
        ['arrow_r','arrow_u'],  // same arrow, different direction
        ['crescent','heart'],   // both curved
        ['diamond','star'],     // both pointed
    ];
    const [commonKey, oddKey] = rnd(svgPairs);
    const color = rnd(SHAPE_COLORS);

    const cell = (shapeKey) =>
        `<div style="color:${color.hex};display:flex;align-items:center;justify-content:center;width:100%;height:100%;">
            ${SVG_ICONS[shapeKey].replace('width="48" height="48"','width="36" height="36"')}
        </div>`;

    return {
        title: 'Click the shape that is different from the rest',
        render(container) {
            container.innerHTML = `
                <div class="cg-odd-grid">
                    ${Array.from({ length: GRID_SIZE }, (_, i) => `
                        <button class="cg-odd-cell" data-idx="${i}">
                            ${cell(i === oddIndex ? oddKey : commonKey)}
                        </button>`).join('')}
                </div>`;
            container.querySelectorAll('.cg-odd-cell').forEach(btn => {
                btn.onclick = () => {
                    container.querySelectorAll('.cg-odd-cell').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    userAnswer = parseInt(btn.dataset.idx);
                };
            });
        },
        verify() { return userAnswer === oddIndex; }
    };
}

// ─── SVG Icon Library ────────────────────────────────────────────────────────
const SVG_ICONS = {
    circle:   `<svg viewBox="0 0 48 48" width="48" height="48"><circle cx="24" cy="24" r="20" fill="currentColor"/></svg>`,
    square:   `<svg viewBox="0 0 48 48" width="48" height="48"><rect x="6" y="6" width="36" height="36" rx="4" fill="currentColor"/></svg>`,
    triangle: `<svg viewBox="0 0 48 48" width="48" height="48"><polygon points="24,4 44,44 4,44" fill="currentColor"/></svg>`,
    diamond:  `<svg viewBox="0 0 48 48" width="48" height="48"><polygon points="24,2 46,24 24,46 2,24" fill="currentColor"/></svg>`,
    star:     `<svg viewBox="0 0 48 48" width="48" height="48"><polygon points="24,2 29,18 46,18 33,29 38,46 24,36 10,46 15,29 2,18 19,18" fill="currentColor"/></svg>`,
    hexagon:  `<svg viewBox="0 0 48 48" width="48" height="48"><polygon points="24,2 43,13 43,35 24,46 5,35 5,13" fill="currentColor"/></svg>`,
    cross:    `<svg viewBox="0 0 48 48" width="48" height="48"><rect x="19" y="2" width="10" height="44" rx="3" fill="currentColor"/><rect x="2" y="19" width="44" height="10" rx="3" fill="currentColor"/></svg>`,
    arrow_r:  `<svg viewBox="0 0 48 48" width="48" height="48"><polygon points="2,16 30,16 30,6 46,24 30,42 30,32 2,32" fill="currentColor"/></svg>`,
    arrow_l:  `<svg viewBox="0 0 48 48" width="48" height="48"><polygon points="46,16 18,16 18,6 2,24 18,42 18,32 46,32" fill="currentColor"/></svg>`,
    arrow_u:  `<svg viewBox="0 0 48 48" width="48" height="48"><polygon points="16,46 16,18 6,18 24,2 42,18 32,18 32,46" fill="currentColor"/></svg>`,
    arrow_d:  `<svg viewBox="0 0 48 48" width="48" height="48"><polygon points="16,2 16,30 6,30 24,46 42,30 32,30 32,2" fill="currentColor"/></svg>`,
    shield:   `<svg viewBox="0 0 48 48" width="48" height="48"><path d="M24 2 L42 10 L42 24 C42 34 34 42 24 46 C14 42 6 34 6 24 L6 10 Z" fill="currentColor"/></svg>`,
    heart:    `<svg viewBox="0 0 48 48" width="48" height="48"><path d="M24 42 C24 42 4 28 4 16 C4 9 9 4 16 6 C19 7 22 10 24 13 C26 10 29 7 32 6 C39 4 44 9 44 16 C44 28 24 42 24 42 Z" fill="currentColor"/></svg>`,
    crescent: `<svg viewBox="0 0 48 48" width="48" height="48"><path d="M32 6 A20 20 0 1 0 32 42 A14 14 0 1 1 32 6 Z" fill="currentColor"/></svg>`,
    lightning:`<svg viewBox="0 0 48 48" width="48" height="48"><polygon points="28,2 10,26 22,26 20,46 38,22 26,22" fill="currentColor"/></svg>`,
    ring:     `<svg viewBox="0 0 48 48" width="48" height="48"><circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" stroke-width="8"/></svg>`,
    play:     `<svg viewBox="0 0 48 48" width="48" height="48"><polygon points="8,4 44,24 8,44" fill="currentColor"/></svg>`,
    pause:    `<svg viewBox="0 0 48 48" width="48" height="48"><rect x="6" y="4" width="14" height="40" rx="3" fill="currentColor"/><rect x="28" y="4" width="14" height="40" rx="3" fill="currentColor"/></svg>`,
    spiral:   `<svg viewBox="0 0 48 48" width="48" height="48"><path d="M24 24 m0-18 a18 18 0 0 1 18 18 a14 14 0 0 1-14 14 a10 10 0 0 1-10-10 a6 6 0 0 1 6-6" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>`,
    target:   `<svg viewBox="0 0 48 48" width="48" height="48"><circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="24" cy="24" r="4" fill="currentColor"/></svg>`,
};

const SHAPE_COLORS = [
    { name: 'Indigo',  hex: '#6366f1' },
    { name: 'Rose',    hex: '#f43f5e' },
    { name: 'Emerald', hex: '#10b981' },
    { name: 'Amber',   hex: '#f59e0b' },
    { name: 'Cyan',    hex: '#06b6d4' },
    { name: 'Violet',  hex: '#8b5cf6' },
];

// ─── Game 6: Shape Silhouette Match ──────────────────────────────────────────
export function shapeSilhouetteGame() {
    const shapeKeys = Object.keys(SVG_ICONS);
    const targetKey = rnd(shapeKeys);
    // Pick 3 wrong shapes (different from target)
    const others = shuffle(shapeKeys.filter(k => k !== targetKey)).slice(0, 3);
    const options = shuffle([targetKey, ...others]);
    const correctIdx = options.indexOf(targetKey);
    let userAnswer = null;

    const color = rnd(SHAPE_COLORS);

    return {
        title: 'Pick the shape that matches the silhouette',
        render(container) {
            container.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;gap:1.2rem;width:100%;">
                    <div style="
                        width:90px;height:90px;
                        display:flex;align-items:center;justify-content:center;
                        background:rgba(255,255,255,0.04);
                        border:1.5px solid rgba(255,255,255,0.12);
                        border-radius:16px;
                        color:${color.hex};
                        filter:drop-shadow(0 0 12px ${color.hex}88);
                    ">${SVG_ICONS[targetKey]}</div>
                    <div style="font-size:0.7rem;color:rgba(255,255,255,0.35);letter-spacing:1px;text-transform:uppercase;">choose the same shape</div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;width:100%;">
                        ${options.map((k, i) => `
                            <button class="cg-shape-opt" data-idx="${i}" style="
                                display:flex;align-items:center;justify-content:center;
                                padding:0.8rem;
                                border-radius:12px;
                                background:rgba(255,255,255,0.05);
                                border:1.5px solid rgba(255,255,255,0.1);
                                color:rgba(255,255,255,0.7);
                                cursor:pointer;
                                transition:all 0.2s;
                                width:100%;
                            ">${SVG_ICONS[k]}</button>
                        `).join('')}
                    </div>
                </div>
            `;
            container.querySelectorAll('.cg-shape-opt').forEach(btn => {
                btn.onmouseover = () => { if (!btn.classList.contains('selected')) btn.style.background = 'rgba(99,102,241,0.15)'; };
                btn.onmouseout  = () => { if (!btn.classList.contains('selected')) btn.style.background = 'rgba(255,255,255,0.05)'; };
                btn.onclick = () => {
                    container.querySelectorAll('.cg-shape-opt').forEach(b => {
                        b.classList.remove('selected');
                        b.style.background = 'rgba(255,255,255,0.05)';
                        b.style.borderColor = 'rgba(255,255,255,0.1)';
                        b.style.color = 'rgba(255,255,255,0.7)';
                    });
                    btn.classList.add('selected');
                    btn.style.background = 'rgba(99,102,241,0.3)';
                    btn.style.borderColor = '#818cf8';
                    btn.style.color = '#c7d2fe';
                    userAnswer = parseInt(btn.dataset.idx);
                };
            });
        },
        verify() { return userAnswer === correctIdx; }
    };
}

// ─── Game 7: Dot Counter ──────────────────────────────────────────────────────
export function dotCounterGame() {
    const count = Math.floor(Math.random() * 9) + 8; // 8–16 dots — harder to count
    // Mix two sizes to make dots harder to distinguish
    const dots = [];
    for (let i = 0; i < count; i++) {
        dots.push({
            cx: 5 + Math.random() * 90,
            cy: 5 + Math.random() * 90,
            r:  1.8 + Math.random() * 2.2  // smaller, varying
        });
    }
    const color = rnd(SHAPE_COLORS);
    // Wrong options: only ±1 and ±2 (not ±3) — closer guesses
    const offsets = shuffle([-2,-1,1,2]);
    const wrongs = [];
    for (const o of offsets) {
        const v = count + o;
        if (v > 0 && v < 25 && !wrongs.includes(v)) wrongs.push(v);
        if (wrongs.length === 3) break;
    }
    const options = shuffle([count, ...wrongs]);
    const correctIdx = options.indexOf(count);
    let userAnswer = null;

    return {
        title: 'Count the dots and pick the correct number',
        render(container) {
            container.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;width:100%;">
                    <div style="
                        width:100%;max-width:200px;
                        border-radius:14px;
                        border:1.5px solid rgba(255,255,255,0.1);
                        background:rgba(255,255,255,0.04);
                        overflow:hidden;
                    ">
                        <svg viewBox="0 0 100 100" width="100%" style="display:block;">
                            ${dots.map(d => `<circle cx="${d.cx.toFixed(1)}" cy="${d.cy.toFixed(1)}" r="${d.r.toFixed(1)}" fill="${color.hex}"/>`).join('')}
                        </svg>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;width:100%;">
                        ${options.map((v, i) => `
                            <button class="cg-num-btn cg-dot-opt" data-idx="${i}" style="min-width:unset;font-size:1.2rem;padding:0.7rem;">${v}</button>
                        `).join('')}
                    </div>
                </div>
            `;
            container.querySelectorAll('.cg-dot-opt').forEach(btn => {
                btn.onclick = () => {
                    container.querySelectorAll('.cg-dot-opt').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    userAnswer = parseInt(btn.dataset.idx);
                };
            });
        },
        verify() { return userAnswer === correctIdx; }
    };
}

// ─── Game 8: Pattern Sequence ─────────────────────────────────────────────────
export function patternSequenceGame() {
    // Pattern: 3-item rotating sequence A B C A B C — user picks what comes 7th
    const shapeKeys = Object.keys(SVG_ICONS);
    const [shapeA, shapeB, shapeC] = shuffle(shapeKeys).slice(0, 3);
    const [colA, colB, colC]       = shuffle(SHAPE_COLORS).slice(0, 3);

    // Sequence shown: A B C A B C — answer is A (7th = 1st in cycle)
    const sequence = [
        { shape: shapeA, color: colA },
        { shape: shapeB, color: colB },
        { shape: shapeC, color: colC },
        { shape: shapeA, color: colA },
        { shape: shapeB, color: colB },
    ];
    const answer = { shape: shapeC, color: colC }; // 6th item

    // 3 wrong options: use correct shape but wrong color, or wrong shape same color
    const wrongs = shuffle([
        { shape: shapeC, color: rnd(SHAPE_COLORS.filter(c => c.hex !== colC.hex)) }, // right shape, wrong color
        { shape: rnd(shapeKeys.filter(k => k !== shapeC)), color: colC },            // wrong shape, right color
        { shape: rnd(shapeKeys.filter(k => k !== shapeC)), color: rnd(SHAPE_COLORS.filter(c => c.hex !== colC.hex)) },
    ]);
    const options = shuffle([answer, ...wrongs]);
    const correctIdx = options.findIndex(o => o.shape === answer.shape && o.color.hex === answer.color.hex);
    let userAnswer = null;

    const renderIcon = (item, size = 36) =>
        `<span style="color:${item.color.hex};display:flex;align-items:center;justify-content:center;">
            ${SVG_ICONS[item.shape].replace('width="48" height="48"', `width="${size}" height="${size}"`)}
        </span>`;

    return {
        title: 'What comes next in the sequence? (A B C A B ...?)',
        render(container) {
            container.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;gap:1.2rem;width:100%;">
                    <div style="display:flex;align-items:center;gap:0.6rem;background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);border-radius:14px;padding:0.8rem 1.2rem;">
                        ${sequence.map(s => renderIcon(s, 40)).join(
                            '<span style="color:rgba(255,255,255,0.25);font-size:1.2rem;font-weight:700;">›</span>'
                        )}
                        <span style="color:rgba(255,255,255,0.25);font-size:1.2rem;font-weight:700;">›</span>
                        <span style="
                            width:44px;height:44px;
                            border:2px dashed rgba(99,102,241,0.5);
                            border-radius:8px;
                            display:flex;align-items:center;justify-content:center;
                            color:rgba(99,102,241,0.5);
                            font-size:1.4rem;font-weight:700;
                        ">?</span>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;width:100%;">
                        ${options.map((opt, i) => `
                            <button class="cg-pat-opt" data-idx="${i}" style="
                                display:flex;align-items:center;justify-content:center;
                                padding:0.8rem;
                                border-radius:12px;
                                background:rgba(255,255,255,0.05);
                                border:1.5px solid rgba(255,255,255,0.1);
                                cursor:pointer;
                                transition:all 0.2s;
                            ">${renderIcon(opt, 36)}</button>
                        `).join('')}
                    </div>
                </div>
            `;
            container.querySelectorAll('.cg-pat-opt').forEach(btn => {
                btn.onmouseover = () => { if (!btn.classList.contains('selected')) btn.style.background = 'rgba(99,102,241,0.15)'; };
                btn.onmouseout  = () => { if (!btn.classList.contains('selected')) btn.style.background = 'rgba(255,255,255,0.05)'; };
                btn.onclick = () => {
                    container.querySelectorAll('.cg-pat-opt').forEach(b => {
                        b.classList.remove('selected');
                        b.style.background = 'rgba(255,255,255,0.05)';
                        b.style.borderColor = 'rgba(255,255,255,0.1)';
                    });
                    btn.classList.add('selected');
                    btn.style.background = 'rgba(99,102,241,0.3)';
                    btn.style.borderColor = '#818cf8';
                    userAnswer = parseInt(btn.dataset.idx);
                };
            });
        },
        verify() { return userAnswer === correctIdx; }
    };
}

// ─── Game 9: Arrow Direction Memory ──────────────────────────────────────────
export function arrowDirectionGame() {
    const directions = [
        { key: 'arrow_r', label: 'Right' },
        { key: 'arrow_l', label: 'Left'  },
        { key: 'arrow_u', label: 'Up'    },
        { key: 'arrow_d', label: 'Down'  },
    ];
    // Show 4 arrows in sequence, user picks the direction of the 3rd arrow
    const sequence = Array.from({ length: 4 }, () => rnd(directions));
    const questionIdx = 2; // ask about the 3rd arrow (0-indexed)
    const correctLabel = sequence[questionIdx].label;
    const options = shuffle(directions.map(d => d.label));
    const correctIdx = options.indexOf(correctLabel);
    let userAnswer = null;
    let showFull = true;

    return {
        title: 'What direction was the 3rd arrow pointing?',
        render(container) {
            const color = rnd(SHAPE_COLORS);
            container.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;gap:1.2rem;width:100%;">
                    <div id="arrow-seq-display" style="display:flex;align-items:center;gap:0.5rem;background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);border-radius:14px;padding:0.8rem;">
                        ${sequence.map((d, i) => `
                            <div style="
                                color:${color.hex};
                                display:flex;align-items:center;justify-content:center;
                                padding:4px;
                                border-radius:6px;
                                ${i === questionIdx ? 'background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);' : ''}
                            ">${SVG_ICONS[d.key].replace('width="48" height="48"', 'width="38" height="38"')}</div>
                        `).join('')}
                    </div>
                    <div style="font-size:0.72rem;color:rgba(99,102,241,0.8);font-weight:600;">Arrow 3 is highlighted above</div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;width:100%;">
                        ${options.map((label, i) => `
                            <button class="cg-arrow-opt" data-idx="${i}" style="
                                padding:0.7rem;
                                border-radius:12px;
                                background:rgba(255,255,255,0.05);
                                border:1.5px solid rgba(255,255,255,0.1);
                                color:rgba(255,255,255,0.8);
                                font-family:'Outfit',sans-serif;
                                font-weight:700;
                                font-size:0.9rem;
                                cursor:pointer;
                                transition:all 0.2s;
                            ">${label}</button>
                        `).join('')}
                    </div>
                </div>
            `;
            // Arrows disappear after 2s (was 3s)
            setTimeout(() => {
                const display = container.querySelector('#arrow-seq-display');
                if (display) {
                    display.innerHTML = sequence.map((d, i) => `
                        <div style="
                            width:38px;height:38px;
                            border-radius:6px;
                            background:rgba(255,255,255,0.06);
                            border:1px solid rgba(255,255,255,0.08);
                            ${i === questionIdx ? 'border-color:rgba(99,102,241,0.4);background:rgba(99,102,241,0.1);' : ''}
                        "></div>
                    `).join('');
                }
            }, 2000);

            container.querySelectorAll('.cg-arrow-opt').forEach(btn => {
                btn.onmouseover = () => { if (!btn.classList.contains('selected')) btn.style.background = 'rgba(99,102,241,0.15)'; };
                btn.onmouseout  = () => { if (!btn.classList.contains('selected')) btn.style.background = 'rgba(255,255,255,0.05)'; };
                btn.onclick = () => {
                    container.querySelectorAll('.cg-arrow-opt').forEach(b => {
                        b.classList.remove('selected');
                        b.style.background = 'rgba(255,255,255,0.05)';
                        b.style.borderColor = 'rgba(255,255,255,0.1)';
                    });
                    btn.classList.add('selected');
                    btn.style.background = 'rgba(99,102,241,0.3)';
                    btn.style.borderColor = '#818cf8';
                    userAnswer = parseInt(btn.dataset.idx);
                };
            });
        },
        verify() { return userAnswer === correctIdx; }
    };
}

// ─── Game 10: Shape Math ──────────────────────────────────────────────────────
export function shapeMathGame() {
    const shapeKeys = ['circle','square','triangle','diamond','star'];
    const shapeKey  = rnd(shapeKeys);
    const color     = rnd(SHAPE_COLORS);

    // Larger values for harder counting
    const useAdd = Math.random() > 0.5;
    const a = Math.floor(Math.random() * 5) + 4;  // 4–8 (was 2-6)
    const b = useAdd
        ? Math.floor(Math.random() * 5) + 2        // 2–6 (was 1-4)
        : Math.floor(Math.random() * (a - 2)) + 2; // 2..(a-2)
    const result = useAdd ? a + b : a - b;

    const wrongs = shuffle([
        result + 1, result - 1, result + 2, result - 2
    ].filter(v => v > 0 && v !== result)).slice(0, 3);
    const options = shuffle([result, ...wrongs]);
    const correctIdx = options.indexOf(result);
    let userAnswer = null;

    const makeIcons = (count, clr) =>
        Array.from({ length: count }, () =>
            `<span style="color:${clr};display:inline-flex;">${SVG_ICONS[shapeKey].replace('width="48" height="48"', 'width="28" height="28"')}</span>`
        ).join('');

    return {
        title: useAdd
            ? `How many shapes are there in total?`
            : `How many shapes remain after removing some?`,
        render(container) {
            container.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;width:100%;">
                    <div style="
                        background:rgba(255,255,255,0.04);
                        border:1.5px solid rgba(255,255,255,0.1);
                        border-radius:14px;
                        padding:1rem;
                        width:100%;
                        box-sizing:border-box;
                    ">
                        <div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;align-items:center;margin-bottom:0.6rem;">
                            ${makeIcons(a, color.hex)}
                        </div>
                        <div style="text-align:center;font-size:1.4rem;font-weight:800;color:rgba(255,255,255,0.5);line-height:1;">
                            ${useAdd ? '+' : '−'}
                        </div>
                        <div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;align-items:center;margin-top:0.6rem;">
                            ${makeIcons(b, useAdd ? color.hex : '#ef4444')}
                        </div>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;width:100%;">
                        ${options.map((v, i) => `
                            <button class="cg-num-btn cg-math-opt" data-idx="${i}" style="min-width:unset;font-size:1.3rem;padding:0.7rem;">${v}</button>
                        `).join('')}
                    </div>
                </div>
            `;
            container.querySelectorAll('.cg-math-opt').forEach(btn => {
                btn.onclick = () => {
                    container.querySelectorAll('.cg-math-opt').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    userAnswer = parseInt(btn.dataset.idx);
                };
            });
        },
        verify() { return userAnswer === correctIdx; }
    };
}

// ─── Game 11: Size Comparison ─────────────────────────────────────────────────
// Three SVG shapes at different sizes — pick the largest
export function sizeComparisonGame() {
    const shapeKey = rnd(['circle','square','diamond','star','hexagon','shield','heart']);
    const color    = rnd(SHAPE_COLORS);
    const sizes    = shuffle([36, 50, 66]); // closer sizes — harder to distinguish (was 32,52,72)
    const labels   = ['Left', 'Middle', 'Right'];
    // Randomly ask for LARGEST or SMALLEST
    const askSmallest = Math.random() > 0.5;
    const targetSize  = askSmallest ? Math.min(...sizes) : Math.max(...sizes);
    const biggestIdx  = sizes.indexOf(targetSize);
    let userAnswer = null;

    const icon = (sz) =>
        `<div style="color:${color.hex};display:flex;align-items:center;justify-content:center;
            filter:drop-shadow(0 0 6px ${color.hex}55);">
            ${SVG_ICONS[shapeKey].replace('width="48" height="48"', `width="${sz}" height="${sz}"`)}
        </div>`;

    return {
        title: askSmallest ? 'Click the SMALLEST shape' : 'Click the LARGEST shape',
        render(container) {
            container.innerHTML = `
                <div style="display:flex;align-items:flex-end;justify-content:center;gap:1.5rem;
                    background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);
                    border-radius:14px;padding:1rem 0.5rem;width:100%;box-sizing:border-box;">
                    ${sizes.map((sz, i) => `
                        <button class="cg-size-btn" data-idx="${i}" style="
                            display:flex;flex-direction:column;align-items:center;gap:0.4rem;
                            background:none;border:1.5px solid transparent;
                            border-radius:10px;padding:0.5rem;cursor:pointer;transition:all 0.2s;">
                            ${icon(sz)}
                            <span style="font-size:0.7rem;color:rgba(255,255,255,0.4);font-weight:600;">${labels[i]}</span>
                        </button>`).join('')}
                </div>`;
            container.querySelectorAll('.cg-size-btn').forEach(btn => {
                btn.onmouseover = () => { if (!btn.classList.contains('selected')) btn.style.borderColor='rgba(99,102,241,0.4)'; };
                btn.onmouseout  = () => { if (!btn.classList.contains('selected')) btn.style.borderColor='transparent'; };
                btn.onclick = () => {
                    container.querySelectorAll('.cg-size-btn').forEach(b => {
                        b.classList.remove('selected'); b.style.borderColor='transparent'; b.style.background='none';
                    });
                    btn.classList.add('selected');
                    btn.style.borderColor='#818cf8'; btn.style.background='rgba(99,102,241,0.15)';
                    userAnswer = parseInt(btn.dataset.idx);
                };
            });
        },
        verify() { return userAnswer === biggestIdx; }
    };
}

// ─── Game 12: Rotation Match ──────────────────────────────────────────────────
// A shape is shown rotated — pick the option with the same rotation
export function rotationMatchGame() {
    const shapeKey = rnd(['arrow_r','play','lightning','crescent','shield','star']);
    const color    = rnd(SHAPE_COLORS);
    const angles   = [0, 90, 180, 270];
    const targetAngle = rnd(angles);
    // 3 wrong rotations
    const wrongAngles = shuffle(angles.filter(a => a !== targetAngle)).slice(0, 3);
    const options  = shuffle([targetAngle, ...wrongAngles]);
    const correctIdx = options.indexOf(targetAngle);
    let userAnswer = null;

    const icon = (angle, sz=48) =>
        `<div style="color:${color.hex};display:flex;align-items:center;justify-content:center;
            transform:rotate(${angle}deg);transition:transform 0.3s;
            filter:drop-shadow(0 0 8px ${color.hex}55);">
            ${SVG_ICONS[shapeKey].replace('width="48" height="48"', `width="${sz}" height="${sz}"`)}
        </div>`;

    return {
        title: 'Pick the option rotated the same way as the target',
        render(container) {
            container.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;gap:1.2rem;width:100%;">
                    <div style="padding:1.2rem;background:rgba(255,255,255,0.05);border:1.5px solid rgba(99,102,241,0.3);
                        border-radius:14px;">${icon(targetAngle, 60)}</div>
                    <div style="font-size:0.7rem;color:rgba(255,255,255,0.35);letter-spacing:1px;text-transform:uppercase;">match this rotation</div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;width:100%;">
                        ${options.map((angle, i) => `
                            <button class="cg-rot-btn" data-idx="${i}" style="
                                display:flex;align-items:center;justify-content:center;
                                padding:0.8rem;border-radius:12px;
                                background:rgba(255,255,255,0.05);
                                border:1.5px solid rgba(255,255,255,0.1);
                                cursor:pointer;transition:all 0.2s;">
                                ${icon(angle, 40)}
                            </button>`).join('')}
                    </div>
                </div>`;
            container.querySelectorAll('.cg-rot-btn').forEach(btn => {
                btn.onmouseover = () => { if (!btn.classList.contains('selected')) btn.style.background='rgba(99,102,241,0.15)'; };
                btn.onmouseout  = () => { if (!btn.classList.contains('selected')) btn.style.background='rgba(255,255,255,0.05)'; };
                btn.onclick = () => {
                    container.querySelectorAll('.cg-rot-btn').forEach(b => {
                        b.classList.remove('selected'); b.style.background='rgba(255,255,255,0.05)'; b.style.borderColor='rgba(255,255,255,0.1)';
                    });
                    btn.classList.add('selected');
                    btn.style.background='rgba(99,102,241,0.3)'; btn.style.borderColor='#818cf8';
                    userAnswer = parseInt(btn.dataset.idx);
                };
            });
        },
        verify() { return userAnswer === correctIdx; }
    };
}

// ─── Game 13: Shape Symmetry ──────────────────────────────────────────────────
// Is this shape left-right symmetric? Yes / No
export function shapeSymmetryGame() {
    const symmetric    = ['circle','square','diamond','star','hexagon','cross','ring','target','triangle','heart'];
    const asymmetric   = ['crescent','lightning','play','spiral','arrow_r','arrow_l','arrow_u','arrow_d'];
    const isSymmetric  = Math.random() > 0.5;
    const pool         = isSymmetric ? symmetric : asymmetric;
    const shapeKey     = rnd(pool);
    const color        = rnd(SHAPE_COLORS);
    let userAnswer     = null;

    return {
        title: 'Is this shape left-right symmetric?',
        render(container) {
            container.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;gap:1.2rem;">
                    <div style="padding:1.4rem;background:rgba(255,255,255,0.05);
                        border:1.5px solid rgba(255,255,255,0.1);border-radius:16px;
                        color:${color.hex};filter:drop-shadow(0 0 10px ${color.hex}66);">
                        ${SVG_ICONS[shapeKey].replace('width="48" height="48"','width="70" height="70"')}
                    </div>
                    <div style="display:flex;gap:0.8rem;">
                        <div style="display:flex;flex-direction:column;align-items:center;gap:0.3rem;">
                            <div style="width:1px;height:60px;background:rgba(99,102,241,0.5);margin-bottom:4px;"></div>
                            <span style="font-size:0.65rem;color:rgba(99,102,241,0.6);letter-spacing:1px;">AXIS</span>
                        </div>
                    </div>
                    <div class="cg-btn-row">
                        <button class="cg-choice-btn" data-val="yes">Yes — Symmetric</button>
                        <button class="cg-choice-btn" data-val="no">No — Asymmetric</button>
                    </div>
                </div>`;
            container.querySelectorAll('.cg-choice-btn').forEach(btn => {
                btn.onclick = () => {
                    container.querySelectorAll('.cg-choice-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    userAnswer = btn.dataset.val;
                };
            });
        },
        verify() {
            if (!userAnswer) return false;
            return isSymmetric ? userAnswer === 'yes' : userAnswer === 'no';
        }
    };
}

// ─── Game 14: Count by Shape Type ────────────────────────────────────────────
// Mixed SVG shapes shown — count only the TARGET shape type
export function countByShapeGame() {
    const allKeys  = ['circle','square','triangle','diamond','star','hexagon','shield','heart'];
    const targetKey= rnd(allKeys);
    const others   = shuffle(allKeys.filter(k => k !== targetKey)).slice(0, 2);
    const color    = rnd(SHAPE_COLORS);

    // All shapes same color — target shapes NOT highlighted
    // User must count by shape type only, not by color cue
    const targetCount = Math.floor(Math.random() * 4) + 3; // 3-6
    const totalShapes = targetCount + Math.floor(Math.random() * 5) + 3; // extra 3-7 distractors
    const positions   = [];
    for (let i = 0; i < totalShapes; i++) {
        positions.push({
            key: i < targetCount ? targetKey : rnd(others),
            x: 5 + Math.random() * 80,
            y: 5 + Math.random() * 80,
            rot: Math.floor(Math.random() * 4) * 90
        });
    }
    const shuffledPos = shuffle(positions);

    const wrongs = shuffle([-1,1,-2,2].map(o=>targetCount+o).filter(v=>v>0&&v!==targetCount)).slice(0,3);
    const options = shuffle([targetCount, ...wrongs]);
    const correctIdx = options.indexOf(targetCount);
    let userAnswer = null;

    return {
        title: `Count only the <span style="color:${color.hex};font-weight:800;">${targetKey}</span> shapes`,
        render(container) {
            container.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;width:100%;">
                    <div style="font-size:0.8rem;color:rgba(255,255,255,0.6);">Count only:
                        <span style="color:${color.hex};font-weight:700;margin-left:4px;">${targetKey.toUpperCase()}</span>
                        <span style="color:${color.hex};display:inline-flex;vertical-align:middle;margin-left:4px;">
                            ${SVG_ICONS[targetKey].replace('width="48" height="48"','width="18" height="18"')}
                        </span>
                    </div>
                    <div style="position:relative;width:100%;max-width:220px;height:140px;
                        background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);
                        border-radius:14px;overflow:hidden;">
                        ${shuffledPos.map(p => `
                            <div style="position:absolute;left:${p.x}%;top:${p.y}%;
                                transform:translate(-50%,-50%) rotate(${p.rot}deg);
                                color:${color.hex};
                                display:flex;opacity:0.9;">
                                ${SVG_ICONS[p.key].replace('width="48" height="48"','width="20" height="20"')}
                            </div>`).join('')}
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;width:100%;">
                        ${options.map((v,i)=>`
                            <button class="cg-num-btn cg-cnt-opt" data-idx="${i}"
                                style="min-width:unset;font-size:1.2rem;padding:0.7rem;">${v}</button>`).join('')}
                    </div>
                </div>`;
            container.querySelectorAll('.cg-cnt-opt').forEach(btn => {
                btn.onclick = () => {
                    container.querySelectorAll('.cg-cnt-opt').forEach(b=>b.classList.remove('selected'));
                    btn.classList.add('selected');
                    userAnswer = parseInt(btn.dataset.idx);
                };
            });
        },
        verify() { return userAnswer === correctIdx; }
    };
}

// ─── Game 15: Color Swatch Match ──────────────────────────────────────────────
// A shape name is shown in a specific COLOR — pick the matching solid swatch
export function colorSwatchGame() {
    const swatches = [
        { name:'Indigo',  hex:'#6366f1' }, { name:'Rose',   hex:'#f43f5e' },
        { name:'Emerald', hex:'#10b981' }, { name:'Amber',  hex:'#f59e0b' },
        { name:'Cyan',    hex:'#06b6d4' }, { name:'Violet', hex:'#8b5cf6' },
        { name:'Lime',    hex:'#84cc16' }, { name:'Sky',    hex:'#38bdf8' },
    ];
    const target = rnd(swatches);
    const others = shuffle(swatches.filter(s=>s.hex!==target.hex)).slice(0,3);
    const options = shuffle([target, ...others]);
    const correctIdx = options.findIndex(s=>s.hex===target.hex);
    let userAnswer = null;

    const shapeName = rnd(Object.keys(SVG_ICONS));

    return {
        title: 'Pick the color swatch that matches the highlighted shape',
        render(container) {
            container.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;gap:1.2rem;width:100%;">
                    <div style="display:flex;align-items:center;gap:0.8rem;
                        background:rgba(255,255,255,0.04);border:1.5px solid rgba(255,255,255,0.1);
                        border-radius:14px;padding:1rem 1.4rem;">
                        <div style="color:${target.hex};filter:drop-shadow(0 0 10px ${target.hex}88);">
                            ${SVG_ICONS[shapeName].replace('width="48" height="48"','width="48" height="48"')}
                        </div>
                        <span style="font-family:'Outfit';font-weight:700;font-size:0.9rem;
                            color:${target.hex};letter-spacing:0.5px;">${target.name}</span>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;width:100%;">
                        ${options.map((s,i) => `
                            <button class="cg-swatch-btn" data-idx="${i}" style="
                                height:52px;border-radius:12px;
                                background:${s.hex};
                                border:2.5px solid transparent;
                                cursor:pointer;transition:all 0.2s;
                                box-shadow:0 4px 12px ${s.hex}44;"></button>`).join('')}
                    </div>
                </div>`;
            container.querySelectorAll('.cg-swatch-btn').forEach(btn => {
                btn.onmouseover = () => { if (!btn.classList.contains('selected')) btn.style.transform='scale(1.04)'; };
                btn.onmouseout  = () => { if (!btn.classList.contains('selected')) btn.style.transform='scale(1)'; };
                btn.onclick = () => {
                    container.querySelectorAll('.cg-swatch-btn').forEach(b => {
                        b.classList.remove('selected'); b.style.borderColor='transparent'; b.style.transform='scale(1)';
                    });
                    btn.classList.add('selected');
                    btn.style.borderColor='white'; btn.style.transform='scale(1.06)';
                    userAnswer = parseInt(btn.dataset.idx);
                };
            });
        },
        verify() { return userAnswer === correctIdx; }
    };
}

// ─── Game Selector ────────────────────────────────────────────────────────────
export function getRandomGame() {
    const games = [
        imageEqualityGame,
        colorWordGame,
        numberComparisonGame,
        visualMemoryGame,
        oddOneOutGame,
        shapeSilhouetteGame,
        dotCounterGame,
        patternSequenceGame,
        arrowDirectionGame,
        shapeMathGame,
        sizeComparisonGame,
        rotationMatchGame,
        shapeSymmetryGame,
        countByShapeGame,
        colorSwatchGame,
    ];
    return rnd(games)();
}
