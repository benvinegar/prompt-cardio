# Prompt Faster

**How fast can you prompt?** — the typing test for the AI age.

A fake AI chat where *you* are the model under evaluation. The agent streams you a setup, a ghost
prompt appears in the composer, and you type it against the clock. Wrong keys don't advance — they
just cost you. Hit Enter to "send", enjoy the canned wisdom, repeat. You get **60 seconds of active
typing time** (the clock freezes while the AI streams), then a results card: WPM, accuracy,
estimated output speed in tokens/sec, and one of ten ranks from **Captcha Failure** to
**AGI Whisperer**.

100% client-side. No server, no accounts, no telemetry.

## Stack

Vite · React 19 · TanStack Router · Tailwind CSS 4 · TypeScript (strict)

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm typecheck
pnpm build      # static output in dist/
```

## Layout

- `src/game/types.ts` — shared contracts (phases, scenarios, stats)
- `src/game/` — engine: state machine, active-typing clock, scoring
- `src/data/` — scenarios (the funny prompts + replies), rank titles, greetings
- `src/components/` — chat UI, streaming reveal, ghost-prompt composer, results modal

See `SPEC.md` for the full design.
