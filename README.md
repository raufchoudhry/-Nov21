# 📚 BookQuest

A gamified learning app that turns the key insights of great books into games, so the main takeaways actually stick.

## How to run

No build step, no dependencies — just open the app in a browser:

```bash
open index.html        # macOS
# or
python3 -m http.server # then visit http://localhost:8000
```

## What's inside

**Library of 5 books**, each distilled into 6 key takeaways:

- ⚛️ *Atomic Habits* — James Clear
- 🧠 *Deep Work* — Cal Newport
- 💰 *The Psychology of Money* — Morgan Housel
- 🐢 *Thinking, Fast and Slow* — Daniel Kahneman
- 🤝 *How to Win Friends and Influence People* — Dale Carnegie

**4 game modes** per book:

| Mode | How it works |
|---|---|
| ❓ Quiz Battle | Multiple choice with combo multipliers for consecutive correct answers |
| 🃏 Flashcards | Flip cards, test your recall, self-grade |
| 🧩 Match Up | Race the clock pairing concepts with their meanings |
| ⚖️ True or False | Rapid-fire judgment calls on statements from the book |

**Gamification loop:**

- ⭐ **XP & levels** — every game earns XP; level up every 100 XP
- ★★★ **Mastery** — each takeaway has a 3-star mastery meter; correct answers fill it, mistakes drain it
- 🔥 **Daily streaks** — play every day to keep the flame alive
- 🏆 **9 achievements** — from *First Steps* to *Sage*, including perfect quizzes and sub-30s match rounds
- Wrong answers always show the takeaway summary, so every mistake is a learning moment

All progress is saved locally in your browser (`localStorage`) — no account, no server.

## Project structure

```
index.html   # entry point
styles.css   # design system (light + dark mode)
data.js      # book/insight content: quizzes, statements, definitions
app.js       # game logic, XP/streak/achievement engine, rendering
```

## Adding a book

Append an object to `BOOKS` in `data.js`. Each insight needs a `title`, `def`, `summary`, a `quiz` (question, 4 options, answer index), and a `tf` statement — all four game modes are generated from that automatically.
