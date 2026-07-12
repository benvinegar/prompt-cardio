import { useState } from 'react';
import type { GamePhase } from '@/game/types';
import { isMuted, setMuted } from '@/lib/audio';
import { formatTokensCompact } from '@/lib/format';
import { BrailleSpinner } from '@/components/braille-spinner';

const LOW_TIME_THRESHOLD_MS = 10_000;

/** Streak length required before the combo segment appears at all. */
const COMBO_TIER_1_STREAK = 30;
/** Streak length that upgrades the combo segment to its accent-colored "hot" tier. */
const COMBO_TIER_2_STREAK = 60;

/**
 * Joke $/1M-token rate used for the fake bill, duplicated locally from the results card since
 * `src/lib` is off-limits for this presentation-only pass — keep this in sync with the constant
 * of the same name in `results-modal.tsx` and `lib/share.ts`.
 */
const FAKE_DOLLARS_PER_MILLION_TOKENS = 23.7;

function fakeBill(tokens: number): string {
    const dollars = (tokens / 1_000_000) * FAKE_DOLLARS_PER_MILLION_TOKENS;
    return `$${dollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** Formats milliseconds as "S.Ds" (one decimal place), e.g. 42734 -> "42.7s". */
function formatClock(ms: number): string {
    const seconds = Math.max(0, ms) / 1000;
    return `${seconds.toFixed(1)}s`;
}

interface ComboTier {
    label: string;
    colorClass: string;
}

/** Below 30 there is no segment at all; the label turns accent-colored past the "hot" tier. */
function getComboTier(streak: number): ComboTier | null {
    if (streak < COMBO_TIER_1_STREAK) {
        return null;
    }
    const label = `${streak}x clean`;
    return { label, colorClass: streak < COMBO_TIER_2_STREAK ? 'text-success' : 'text-accent' };
}

/** Plain bracketed text toggle for the synthesized sound effects. Persisted via `@/lib/audio`, unmuted by default. */
function MuteToggle() {
    const [muted, setMutedState] = useState(() => isMuted());

    const toggle = () => {
        const next = !muted;
        setMuted(next);
        setMutedState(next);
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-pressed={muted}
            aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
            className="shrink-0 whitespace-nowrap text-ink-dim transition-colors hover:text-ink-bright"
        >
            [sound: {muted ? 'off' : 'on'}]
        </button>
    );
}

export interface HudProps {
    remainingMs: number;
    /** True once the run's wall clock has been armed by the first keystroke. */
    clockStarted: boolean;
    wpm: number;
    accuracy: number;
    tokensBurned: number;
    subagentCount: number;
    /** Current streak of consecutive correct keystrokes; drives the combo segment. */
    streak: number;
    phase: GamePhase;
}

/**
 * Bottom status bar: a static route-flavored label plus keybind hints on the left, and on the
 * right a comedic fake-bill/token-burn readout, a clean-streak segment, a subagent-count
 * segment, live WPM/accuracy, the countdown clock, and the sound toggle.
 */
export function Hud({
    remainingMs,
    clockStarted,
    wpm,
    accuracy,
    tokensBurned,
    subagentCount,
    streak,
    phase,
}: HudProps) {
    const isLow = clockStarted && remainingMs < LOW_TIME_THRESHOLD_MS;
    const showArmingHint = phase !== 'idle' && !clockStarted;
    const comboTier = getComboTier(streak);

    return (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2 font-mono text-[12px] text-ink-dim">
            <span className="whitespace-normal">
                /vibe-screen <span className="text-ink-faint">· wrong keys don't advance · last key sends</span>
                {showArmingHint && <span className="text-ink-faint"> · [clock starts when you type]</span>}
            </span>
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {comboTier && (
                    <span className={`tabular-nums whitespace-nowrap ${comboTier.colorClass}`}>
                        {comboTier.label}
                    </span>
                )}
                {subagentCount > 0 && (
                    <span className="flex items-center gap-1.5 whitespace-nowrap text-accent">
                        <BrailleSpinner />
                        <span className="tabular-nums">{subagentCount} agents</span>
                    </span>
                )}
                <span className="font-bold whitespace-nowrap text-accent tabular-nums">
                    {fakeBill(tokensBurned)} · {formatTokensCompact(tokensBurned)} tok burned
                </span>
                <span className="tabular-nums whitespace-nowrap">{wpm} wpm</span>
                <span className="tabular-nums whitespace-nowrap">{accuracy}%</span>
                <span
                    className={`tabular-nums whitespace-nowrap font-bold ${
                        isLow ? 'animate-pulse-danger text-danger' : 'text-ink-bright'
                    }`}
                >
                    ⏱ {formatClock(remainingMs)}
                </span>
                <MuteToggle />
            </span>
        </div>
    );
}
