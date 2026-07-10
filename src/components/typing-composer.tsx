export interface TypingComposerProps {
    prompt: string | null;
    typedCount: number;
    lastKeyWasError: boolean;
}

/**
 * The chat-composer-styled ghost prompt: typed characters render bright, the current character
 * is dim with an accent highlight + blinking caret, and untyped characters render faint.
 * Flashes red and shakes briefly on a wrong keystroke. Reserves room for ~4 lines of text so
 * the composer never resizes as prompts change. The last correct keystroke auto-submits.
 */
export function TypingComposer({ prompt, typedCount, lastKeyWasError }: TypingComposerProps) {
    if (prompt === null) {
        return (
            <div className="rounded-2xl border border-border bg-bg-panel px-4 py-4 font-mono text-base sm:px-5 sm:text-lg">
                <p className="min-h-[6.5em] leading-relaxed text-ink-faint">waiting for your next task...</p>
            </div>
        );
    }

    const typed = prompt.slice(0, typedCount);
    const current = prompt.slice(typedCount, typedCount + 1);
    const rest = prompt.slice(typedCount + 1);

    return (
        <div
            key={lastKeyWasError ? `error-${typedCount}` : undefined}
            className={`relative overflow-hidden rounded-2xl border px-4 py-4 font-mono text-base transition-shadow sm:px-5 sm:text-lg ${
                lastKeyWasError ? 'animate-shake border-danger bg-danger-soft' : 'border-border bg-bg-panel'
            }`}
        >
            <p className="min-h-[6.5em] break-words whitespace-pre-wrap leading-relaxed">
                <span className="text-ink">{typed}</span>
                {current && (
                    <span
                        className={`relative rounded-[2px] underline decoration-2 underline-offset-4 ${
                            lastKeyWasError
                                ? 'bg-danger text-white decoration-danger'
                                : 'bg-accent/15 text-ink-dim decoration-accent-bright'
                        }`}
                    >
                        <span
                            aria-hidden="true"
                            className="animate-caret-blink absolute inset-y-0 -left-px w-0.5 rounded-full bg-accent-bright"
                        />
                        {current}
                    </span>
                )}
                <span className="text-ink-faint">{rest}</span>
            </p>
        </div>
    );
}
