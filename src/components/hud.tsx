import type { GamePhase } from '@/game/types';

const LOW_TIME_THRESHOLD_MS = 10_000;

export interface HudProps {
    remainingMs: number;
    wpm: number;
    accuracy: number;
    phase: GamePhase;
}

/** Formats milliseconds as "S.Ds" (one decimal place), e.g. 42734 -> "42.7s". */
function formatClock(ms: number): string {
    const seconds = Math.max(0, ms) / 1000;
    return `${seconds.toFixed(1)}s`;
}

/** Top HUD bar: countdown clock, live WPM/accuracy, and a "clock frozen" hint while not typing. */
export function Hud({ remainingMs, wpm, accuracy, phase }: HudProps) {
    const isLow = phase === 'typing' && remainingMs < LOW_TIME_THRESHOLD_MS;
    const isFrozen = phase === 'streaming' || phase === 'thinking';

    return (
        <div className="flex items-center justify-between gap-3 border-b border-border bg-bg-elevated/80 px-4 py-3 backdrop-blur-sm sm:px-6">
            <div className="flex items-center gap-2">
                <span
                    className={`font-mono text-2xl font-semibold tabular-nums transition-colors sm:text-3xl ${
                        isLow ? 'animate-pulse-danger text-danger' : 'text-ink'
                    }`}
                >
                    {formatClock(remainingMs)}
                </span>
                {isFrozen && (
                    <span className="flex items-center gap-1 rounded-full border border-border bg-bg-panel px-2 py-0.5 text-[11px] font-medium text-ink-dim">
                        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden="true">
                            <path
                                d="M12 2v20M4.5 6.5 19.5 17.5M19.5 6.5 4.5 17.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                        clock frozen
                    </span>
                )}
            </div>
            <div className="flex items-center gap-4 font-mono text-xs text-ink-dim sm:text-sm">
                <span>
                    <span className="text-ink">{wpm}</span> wpm
                </span>
                <span>
                    <span className="text-ink">{accuracy}</span>% acc
                </span>
            </div>
        </div>
    );
}
