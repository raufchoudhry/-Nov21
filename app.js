/* ── BookQuest — gamified book learning ─────────────────────
   State machine: home → book → (quiz | flashcards | match | tf) → results
   Progress persists in localStorage. No dependencies, no build step. */

const STORAGE_KEY = "bookquest-v1";
const XP_PER_LEVEL = 100;
const MASTERY_MAX = 3;

const ACHIEVEMENTS = [
  { id: "first-game", icon: "🎮", name: "First Steps", desc: "Finish your first game" },
  { id: "perfect-quiz", icon: "💯", name: "Perfectionist", desc: "Score 100% on a quiz" },
  { id: "speed-match", icon: "⚡", name: "Lightning Match", desc: "Clear a match round in under 30s" },
  { id: "streak-3", icon: "🔥", name: "On Fire", desc: "Play 3 days in a row" },
  { id: "streak-7", icon: "☄️", name: "Unstoppable", desc: "Play 7 days in a row" },
  { id: "book-master", icon: "📕", name: "Bookworm", desc: "Fully master every insight in a book" },
  { id: "level-5", icon: "🎓", name: "Scholar", desc: "Reach level 5" },
  { id: "level-10", icon: "🧙", name: "Sage", desc: "Reach level 10" },
  { id: "all-books", icon: "🏛️", name: "Librarian", desc: "Play a game in every book" },
];

/* ── Persistent state ───────────────────────────────────── */
function defaultState() {
  return {
    xp: 0,
    mastery: {},          // insightId -> 0..3
    achievements: [],     // achievement ids
    booksPlayed: [],      // book ids
    gamesFinished: 0,
    lastPlayed: null,     // "YYYY-MM-DD"
    streak: 0,
  };
}

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState(), ...JSON.parse(raw) };
  } catch (e) { /* corrupted or unavailable storage — start fresh */ }
  return defaultState();
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
}

/* ── Derived helpers ────────────────────────────────────── */
const level = () => Math.floor(state.xp / XP_PER_LEVEL) + 1;
const xpIntoLevel = () => state.xp % XP_PER_LEVEL;
const getBook = (id) => BOOKS.find((b) => b.id === id);

function bookProgress(book) {
  const total = book.insights.length * MASTERY_MAX;
  const got = book.insights.reduce((s, i) => s + (state.mastery[i.id] || 0), 0);
  return Math.round((got / total) * 100);
}

function bumpMastery(insightId, delta) {
  const cur = state.mastery[insightId] || 0;
  state.mastery[insightId] = Math.max(0, Math.min(MASTERY_MAX, cur + delta));
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function touchStreak() {
  const today = todayStr();
  if (state.lastPlayed === today) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  state.streak = state.lastPlayed === yesterday ? state.streak + 1 : 1;
  state.lastPlayed = today;
}

/* ── Achievements ───────────────────────────────────────── */
function unlock(id) {
  if (state.achievements.includes(id)) return;
  state.achievements.push(id);
  const a = ACHIEVEMENTS.find((x) => x.id === id);
  toast(`${a.icon} Achievement unlocked: ${a.name}!`);
  confetti(40);
}

function checkAchievements(ctx = {}) {
  if (state.gamesFinished >= 1) unlock("first-game");
  if (ctx.perfectQuiz) unlock("perfect-quiz");
  if (ctx.fastMatch) unlock("speed-match");
  if (state.streak >= 3) unlock("streak-3");
  if (state.streak >= 7) unlock("streak-7");
  if (level() >= 5) unlock("level-5");
  if (level() >= 10) unlock("level-10");
  if (BOOKS.every((b) => state.booksPlayed.includes(b.id))) unlock("all-books");
  if (BOOKS.some((b) => b.insights.every((i) => (state.mastery[i.id] || 0) >= MASTERY_MAX))) {
    unlock("book-master");
  }
}

/* ── Tiny UI utilities ──────────────────────────────────── */
const app = document.getElementById("app");

function h(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

let toastTimer = null;
function toast(msg) {
  document.querySelector(".toast")?.remove();
  const el = h(`<div class="toast">${esc(msg)}</div>`);
  document.body.appendChild(el);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), 2600);
}

function confetti(n) {
  const colors = ["#e8590c", "#f5a623", "#2f9e44", "#1971c2", "#9c36b5", "#e03131"];
  for (let i = 0; i < n; i++) {
    const p = h(`<div class="confetti-piece"></div>`);
    p.style.left = Math.random() * 100 + "vw";
    p.style.background = colors[i % colors.length];
    p.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    p.style.animationDuration = 1.6 + Math.random() * 1.6 + "s";
    p.style.animationDelay = Math.random() * 0.4 + "s";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 3800);
  }
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function header() {
  return `
    <div class="topbar">
      <div class="brand" onclick="go('home')">Book<span>Quest</span> 📚</div>
      <div class="stat-chips">
        <button class="chip" onclick="go('badges')" title="Achievements"><span class="icon">🏆</span>${state.achievements.length}/${ACHIEVEMENTS.length}</button>
        <span class="chip" title="Daily streak"><span class="icon">🔥</span>${state.streak}</span>
        <span class="chip" title="Level"><span class="icon">⭐</span>Lv ${level()}</span>
      </div>
    </div>
    <div class="xp-bar-wrap">
      <div class="xp-bar-label"><span>Level ${level()}</span><span>${xpIntoLevel()} / ${XP_PER_LEVEL} XP</span></div>
      <div class="xp-bar"><div class="xp-bar-fill" style="width:${xpIntoLevel()}%"></div></div>
    </div>`;
}

function masteryStars(insightId) {
  const m = state.mastery[insightId] || 0;
  let s = "";
  for (let i = 0; i < MASTERY_MAX; i++) s += `<span class="${i < m ? "on" : "off"}">★</span>`;
  return `<span class="mastery" title="Mastery ${m}/${MASTERY_MAX}">${s}</span>`;
}

/* ── Views ──────────────────────────────────────────────── */
function go(view, arg) {
  window.scrollTo(0, 0);
  if (view === "home") renderHome();
  else if (view === "book") renderBook(arg);
  else if (view === "badges") renderBadges();
  else if (view === "quiz") startQuiz(arg);
  else if (view === "flash") startFlashcards(arg);
  else if (view === "match") startMatch(arg);
  else if (view === "tf") startTrueFalse(arg);
}
window.go = go;

function renderHome() {
  app.innerHTML = `
    ${header()}
    <div class="section-title">Your library</div>
    <div class="book-grid">
      ${BOOKS.map((b) => {
        const pct = bookProgress(b);
        return `
        <button class="card book-card" onclick="go('book','${b.id}')">
          <div class="book-emoji" style="background:${b.color}22">${b.emoji}</div>
          <div class="book-meta">
            <div class="book-title">${esc(b.title)}</div>
            <div class="book-author">${esc(b.author)}</div>
            <div class="book-progress"><div class="book-progress-fill" style="width:${pct}%;background:${b.color}"></div></div>
            <div class="book-pct">${pct}% mastered</div>
          </div>
        </button>`;
      }).join("")}
    </div>`;
}

function renderBook(bookId) {
  const book = getBook(bookId);
  app.innerHTML = `
    ${header()}
    <button class="back-btn" onclick="go('home')">← Library</button>
    <div class="book-hero">
      <div class="book-emoji" style="background:${book.color}22">${book.emoji}</div>
      <div>
        <h1>${esc(book.title)}</h1>
        <div class="tagline">${esc(book.author)} · ${esc(book.tagline)}</div>
      </div>
    </div>
    <div class="section-title">Play to learn</div>
    <div class="mode-grid">
      <button class="card mode-btn" onclick="go('quiz','${book.id}')">
        <span class="mode-icon">❓</span><span class="mode-name">Quiz Battle</span>
        <span class="mode-desc">Multiple choice + combo bonus</span>
      </button>
      <button class="card mode-btn" onclick="go('flash','${book.id}')">
        <span class="mode-icon">🃏</span><span class="mode-name">Flashcards</span>
        <span class="mode-desc">Flip, recall, self-grade</span>
      </button>
      <button class="card mode-btn" onclick="go('match','${book.id}')">
        <span class="mode-icon">🧩</span><span class="mode-name">Match Up</span>
        <span class="mode-desc">Pair ideas with meanings</span>
      </button>
      <button class="card mode-btn" onclick="go('tf','${book.id}')">
        <span class="mode-icon">⚖️</span><span class="mode-name">True or False</span>
        <span class="mode-desc">Rapid-fire judgment calls</span>
      </button>
    </div>
    <div class="section-title">Key takeaways · earn ★★★ on each</div>
    <div class="card" style="padding: 6px 16px;">
      ${book.insights.map((i) => `
        <div class="insight-row">
          <div class="insight-body">
            <div class="insight-name">${esc(i.title)}</div>
            <div class="insight-def">${esc(i.def)}</div>
          </div>
          ${masteryStars(i.id)}
        </div>`).join("")}
    </div>`;
}

function renderBadges() {
  app.innerHTML = `
    ${header()}
    <button class="back-btn" onclick="go('home')">← Library</button>
    <div class="section-title">Achievements</div>
    <div class="badge-grid">
      ${ACHIEVEMENTS.map((a) => {
        const got = state.achievements.includes(a.id);
        return `
        <div class="card badge ${got ? "" : "locked"}">
          <span class="badge-icon">${a.icon}</span>
          <span class="badge-name">${esc(a.name)}</span>
          <span class="badge-desc">${esc(a.desc)}</span>
        </div>`;
      }).join("")}
    </div>`;
}

/* ── Game shell helpers ─────────────────────────────────── */
function gameHeader(book, index, total) {
  return `
    <div class="game-head">
      <button class="quit-btn" onclick="go('book','${book.id}')" title="Quit">✕</button>
      <div class="game-progress"><div class="game-progress-fill" style="width:${(index / total) * 100}%"></div></div>
      <span class="game-count">${index + 1}/${total}</span>
    </div>`;
}

function finishGame(book, summary, ctx = {}) {
  touchStreak();
  state.gamesFinished += 1;
  if (!state.booksPlayed.includes(book.id)) state.booksPlayed.push(book.id);
  state.xp += summary.xp;
  checkAchievements(ctx);
  saveState();
  if (summary.great) confetti(60);
  app.innerHTML = `
    ${header()}
    <div class="card result-hero">
      <div class="result-emoji">${summary.emoji}</div>
      <div class="result-title">${esc(summary.title)}</div>
      <div class="result-sub">${esc(summary.sub)}</div>
      <div class="result-stats">
        ${summary.stats.map((s) => `
          <div class="result-stat"><div class="num">${esc(s.num)}</div><div class="lbl">${esc(s.lbl)}</div></div>
        `).join("")}
      </div>
      <button class="primary-btn" onclick="go('${summary.replayMode}','${book.id}')">Play again</button>
      <button class="ghost-btn" onclick="go('book','${book.id}')">Back to ${esc(book.title)}</button>
    </div>`;
}

/* ── Quiz Battle ────────────────────────────────────────── */
function startQuiz(bookId) {
  const book = getBook(bookId);
  const questions = shuffle(book.insights);
  const run = { i: 0, correct: 0, combo: 0, bestCombo: 0, xp: 0 };
  renderQuizQ(book, questions, run);
}

function renderQuizQ(book, questions, run) {
  const insight = questions[run.i];
  const opts = shuffle(insight.quiz.options.map((text, idx) => ({ text, isRight: idx === insight.quiz.answer })));
  app.innerHTML = `
    ${gameHeader(book, run.i, questions.length)}
    <div class="card">
      <div class="question-text">${esc(insight.quiz.q)}</div>
      <div class="option-list">
        ${opts.map((o, i) => `<button class="option-btn" data-i="${i}">${esc(o.text)}</button>`).join("")}
      </div>
      <div id="after"></div>
    </div>`;

  const buttons = [...app.querySelectorAll(".option-btn")];
  buttons.forEach((btn) => btn.addEventListener("click", () => {
    buttons.forEach((b) => (b.disabled = true));
    const picked = opts[+btn.dataset.i];
    const rightBtn = buttons[opts.findIndex((o) => o.isRight)];
    rightBtn.classList.add("correct");

    let fb;
    if (picked.isRight) {
      run.correct++; run.combo++;
      run.bestCombo = Math.max(run.bestCombo, run.combo);
      const bonus = Math.min(run.combo - 1, 5) * 2;   // combo bonus caps at +10
      run.xp += 10 + bonus;
      bumpMastery(insight.id, 1);
      fb = `<div class="feedback good"><strong>✅ Correct! +${10 + bonus} XP${run.combo > 1 ? ` · ${run.combo}x combo` : ""}</strong>${esc(insight.summary)}</div>`;
    } else {
      run.combo = 0;
      btn.classList.add("wrong");
      bumpMastery(insight.id, -1);
      fb = `<div class="feedback bad"><strong>❌ Not quite — the takeaway:</strong>${esc(insight.summary)}</div>`;
    }
    const last = run.i === questions.length - 1;
    app.querySelector("#after").innerHTML =
      fb + `<button class="next-btn">${last ? "See results" : "Next question →"}</button>`;
    app.querySelector(".next-btn").addEventListener("click", () => {
      run.i++;
      if (run.i < questions.length) renderQuizQ(book, questions, run);
      else {
        const perfect = run.correct === questions.length;
        if (perfect) run.xp += 25;
        finishGame(book, {
          emoji: perfect ? "🏆" : run.correct >= questions.length / 2 ? "🎉" : "📖",
          title: perfect ? "Flawless victory!" : run.correct >= questions.length / 2 ? "Nice work!" : "Keep at it!",
          sub: perfect ? "Perfect score — +25 bonus XP" : `You got ${run.correct} of ${questions.length}`,
          great: perfect,
          xp: run.xp,
          replayMode: "quiz",
          stats: [
            { num: `${run.correct}/${questions.length}`, lbl: "Correct" },
            { num: `${run.bestCombo}x`, lbl: "Best combo" },
            { num: `+${run.xp}`, lbl: "XP earned" },
          ],
        }, { perfectQuiz: perfect });
      }
    });
    app.querySelector(".next-btn").focus();
  }));
}

/* ── Flashcards ─────────────────────────────────────────── */
function startFlashcards(bookId) {
  const book = getBook(bookId);
  const cards = shuffle(book.insights);
  const run = { i: 0, known: 0, xp: 0 };
  renderFlashcard(book, cards, run);
}

function renderFlashcard(book, cards, run) {
  const insight = cards[run.i];
  app.innerHTML = `
    ${gameHeader(book, run.i, cards.length)}
    <div class="flash-scene">
      <div class="flash-card" id="flash">
        <div class="flash-face">
          <div class="hint">Tap to reveal</div>
          <div class="front-title">${esc(insight.title)}</div>
        </div>
        <div class="flash-face back">
          <div class="hint">${esc(book.title)}</div>
          <div class="back-text">${esc(insight.summary)}</div>
        </div>
      </div>
    </div>
    <div class="flash-actions" id="actions" style="visibility:hidden">
      <button class="again">🔁 Still learning</button>
      <button class="got-it">✅ Got it</button>
    </div>`;

  const card = app.querySelector("#flash");
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
    app.querySelector("#actions").style.visibility = "visible";
  });

  const advance = (knew) => {
    if (knew) { run.known++; run.xp += 8; bumpMastery(insight.id, 1); }
    else { run.xp += 2; }   // showing up still counts
    run.i++;
    if (run.i < cards.length) renderFlashcard(book, cards, run);
    else finishGame(book, {
      emoji: run.known === cards.length ? "🧠" : "🃏",
      title: run.known === cards.length ? "Total recall!" : "Session complete",
      sub: `You knew ${run.known} of ${cards.length} cards`,
      great: run.known === cards.length,
      xp: run.xp,
      replayMode: "flash",
      stats: [
        { num: `${run.known}/${cards.length}`, lbl: "Known" },
        { num: `+${run.xp}`, lbl: "XP earned" },
      ],
    });
  };
  app.querySelector(".again").addEventListener("click", () => advance(false));
  app.querySelector(".got-it").addEventListener("click", () => advance(true));
}

/* ── Match Up ───────────────────────────────────────────── */
function startMatch(bookId) {
  const book = getBook(bookId);
  const pairs = shuffle(book.insights).slice(0, 5);
  const tiles = shuffle([
    ...pairs.map((p) => ({ pairId: p.id, kind: "concept", text: p.title })),
    ...pairs.map((p) => ({ pairId: p.id, kind: "def", text: p.def })),
  ]);
  const run = { matched: 0, misses: 0, start: Date.now(), selected: null, timer: null };

  app.innerHTML = `
    ${gameHeader(book, 0, 1).replace('0/1', '')}
    <div class="match-timer" id="timer">⏱ 0.0s</div>
    <div class="match-grid">
      ${tiles.map((t, i) => `<button class="match-tile ${t.kind}" data-i="${i}">${esc(t.text)}</button>`).join("")}
    </div>`;
  app.querySelector(".game-count").textContent = `${run.matched}/${pairs.length}`;

  const timerEl = app.querySelector("#timer");
  run.timer = setInterval(() => {
    if (!document.body.contains(timerEl)) { clearInterval(run.timer); return; }
    timerEl.textContent = `⏱ ${((Date.now() - run.start) / 1000).toFixed(1)}s`;
  }, 100);

  const els = [...app.querySelectorAll(".match-tile")];
  els.forEach((el) => el.addEventListener("click", () => {
    if (el.classList.contains("matched") || el.classList.contains("selected")) return;
    const tile = tiles[+el.dataset.i];

    if (!run.selected) {
      run.selected = { el, tile };
      el.classList.add("selected");
      return;
    }
    const prev = run.selected;
    run.selected = null;
    prev.el.classList.remove("selected");

    if (prev.tile.pairId === tile.pairId && prev.tile.kind !== tile.kind) {
      prev.el.classList.add("matched");
      el.classList.add("matched");
      bumpMastery(tile.pairId, 1);
      run.matched++;
      app.querySelector(".game-count").textContent = `${run.matched}/${pairs.length}`;
      app.querySelector(".game-progress-fill").style.width = `${(run.matched / pairs.length) * 100}%`;
      if (run.matched === pairs.length) {
        clearInterval(run.timer);
        const secs = (Date.now() - run.start) / 1000;
        const fast = secs < 30;
        const xp = Math.max(15, 50 - run.misses * 5) + (fast ? 15 : 0);
        setTimeout(() => finishGame(book, {
          emoji: fast ? "⚡" : "🧩",
          title: fast ? "Blazing fast!" : "All matched!",
          sub: fast ? "Under 30 seconds — +15 speed bonus" : "Every idea found its meaning",
          great: fast || run.misses === 0,
          xp,
          replayMode: "match",
          stats: [
            { num: `${secs.toFixed(1)}s`, lbl: "Time" },
            { num: `${run.misses}`, lbl: "Misses" },
            { num: `+${xp}`, lbl: "XP earned" },
          ],
        }, { fastMatch: fast }), 500);
      }
    } else {
      run.misses++;
      [prev.el, el].forEach((x) => {
        x.classList.add("shake");
        setTimeout(() => x.classList.remove("shake"), 380);
      });
    }
  }));
}

/* ── True or False ──────────────────────────────────────── */
function startTrueFalse(bookId) {
  const book = getBook(bookId);
  const questions = shuffle(book.insights);
  const run = { i: 0, correct: 0, xp: 0 };
  renderTF(book, questions, run);
}

function renderTF(book, questions, run) {
  const insight = questions[run.i];
  app.innerHTML = `
    ${gameHeader(book, run.i, questions.length)}
    <div class="card">
      <div class="question-text">${esc(insight.tf.statement)}</div>
      <div class="tf-row">
        <button class="option-btn" data-v="true">✅ True</button>
        <button class="option-btn" data-v="false">❌ False</button>
      </div>
      <div id="after"></div>
    </div>`;

  [...app.querySelectorAll(".option-btn")].forEach((btn) => btn.addEventListener("click", () => {
    const picked = btn.dataset.v === "true";
    const right = picked === insight.tf.answer;
    [...app.querySelectorAll(".option-btn")].forEach((b) => {
      b.disabled = true;
      if ((b.dataset.v === "true") === insight.tf.answer) b.classList.add("correct");
    });
    let fb;
    if (right) {
      run.correct++; run.xp += 8;
      bumpMastery(insight.id, 1);
      fb = `<div class="feedback good"><strong>✅ Correct! +8 XP</strong>${esc(insight.summary)}</div>`;
    } else {
      btn.classList.add("wrong");
      bumpMastery(insight.id, -1);
      fb = `<div class="feedback bad"><strong>❌ It's ${insight.tf.answer ? "true" : "false"} — here's why:</strong>${esc(insight.summary)}</div>`;
    }
    const last = run.i === questions.length - 1;
    app.querySelector("#after").innerHTML =
      fb + `<button class="next-btn">${last ? "See results" : "Next →"}</button>`;
    app.querySelector(".next-btn").addEventListener("click", () => {
      run.i++;
      if (run.i < questions.length) renderTF(book, questions, run);
      else {
        const perfect = run.correct === questions.length;
        if (perfect) run.xp += 15;
        finishGame(book, {
          emoji: perfect ? "⚖️" : "🎯",
          title: perfect ? "Sharp judgment!" : "Round complete",
          sub: `You called ${run.correct} of ${questions.length} correctly`,
          great: perfect,
          xp: run.xp,
          replayMode: "tf",
          stats: [
            { num: `${run.correct}/${questions.length}`, lbl: "Correct" },
            { num: `+${run.xp}`, lbl: "XP earned" },
          ],
        });
      }
    });
    app.querySelector(".next-btn").focus();
  }));
}

/* ── Boot ───────────────────────────────────────────────── */
renderHome();
