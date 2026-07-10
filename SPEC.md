# Prompt Faster — Build Spec

A 100% client-side viral typing game: a fake AI chat where the *player* is the one being tested.
Vite + React 19 + TanStack Router + Tailwind CSS 4. No server, no persistence beyond localStorage.

## Game loop

1. Start screen ("idle"). Big title, one-line pitch, START button. Explain: 60 seconds on the clock,
   the clock only runs while YOU type.
2. The fake agent streams a short setup message char-by-char (phase `streaming`, clock frozen).
3. A ghost prompt appears in the chat input area, greyed out (like Nitrotype's upcoming text).
   Phase `typing`, clock counting down. The player must type it exactly:
   - Correct keystroke → advances one char (rendered filled-in / highlighted).
   - Wrong keystroke → does NOT advance; recorded as an error; brief shake/red flash.
   - No backspace needed (you never advance on error). Ignore modifier keys.
4. When fully typed, hitting Enter submits: the prompt posts to the transcript as a user bubble,
   phase `thinking` (spinner, clock frozen, ~600-900ms), then the agent streams its canned funny
   response (phase `streaming`, fast ~2s), then the next scenario's ghost prompt appears → `typing`.
5. When the 60s of active typing time is exhausted (may happen mid-prompt), phase `finished`:
   show the results modal.

## Scoring

- WPM = (correctChars / 5) / (activeTypingMs / 60000)
- accuracy = correctKeystrokes / totalKeystrokes * 100 (100 if none)
- tokens/sec = (correctChars / 4) / (activeTypingMs / 1000)
- Title: one of 10 ranks selected by WPM bands (see `src/data/titles.ts`).

## Module contracts (source of truth: `src/game/types.ts` — already written, do not modify)

### `src/data/` (content module)
- `scenarios.ts`: `export const SCENARIOS: Scenario[]` — at least 18 entries.
  Prompts are the text players type: plain ASCII only (no smart quotes/em dashes/unicode),
  60-140 chars, humorous "things people actually ask AI" energy.
- `titles.ts`: `export const RANK_TITLES: RankTitle[]` — exactly 10, sorted ascending by minWpm,
  first entry minWpm 0; and `export function getRankForWpm(wpm: number): RankTitle`.
- `greetings.ts`: `export const OPENING_MESSAGES: string[]` — 5+ short streamed intro lines the
  agent opens the game with (e.g. welcoming the player to their typing evaluation).

### `src/game/` (engine module)
- `scoring.ts`: pure `computeStats(input): GameStats` helpers.
- `use-game.ts`: `export function useGame(): UseGameReturn` where:

```ts
interface UseGameReturn {
    snapshot: GameSnapshot;            // see types.ts
    start(): void;                     // idle/finished -> begins a fresh run
    reset(): void;                     // back to idle
    handleKey(key: string): void;      // raw KeyboardEvent.key during 'typing'
    onAgentStreamDone(): void;         // UI calls when the streaming agent bubble finishes revealing
}
```

Engine owns: shuffled scenario queue, transcript messages, per-key advance/error logic, Enter
submission, the frozen-while-streaming countdown, phase transitions, and final stats. The UI owns
the char-by-char reveal animation of agent messages and reports completion via `onAgentStreamDone()`.
Timer must only decrement in `typing` phase (use an interval ~50-100ms; clamp at 0 → `finished`).

### `src/components/` (UI module)
- `game-screen.tsx`: `export function GameScreen()` — the single route component; composes
  everything, wires keyboard events (window keydown during typing) to `useGame`.
- Chat transcript with agent/user bubbles, streaming reveal for agent messages, thinking spinner,
  the ghost-prompt typing input, HUD (countdown + live WPM), start screen, results modal
  (WPM, accuracy, tokens/sec, prompts completed, rank title + emoji + blurb, share button that
  copies a share text via navigator.clipboard, play again button).
- Aesthetic: dark, modern AI-chat look (think Claude/ChatGPT), one accent color, monospace for
  the typed prompt. Tailwind 4 (`src/styles.css` uses `@import 'tailwindcss'`; add `@theme`
  tokens/keyframes there as needed).

## Conventions

- Path alias `@/` → `src/`. TypeScript strict; no `any`. 4-space indent, single quotes.
- Everything must pass `pnpm typecheck` and `pnpm build`.
