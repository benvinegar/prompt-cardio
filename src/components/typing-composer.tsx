export interface TypingComposerProps {
    prompt: string | null;
    typedCount: number;
    lastKeyWasError: boolean;
}

/**
 * The terminal-styled composer: a full-width strip between two hairline rules with an accent
 * `>` caret prefix. Typed characters render bright, the current character renders as a blinking
 * block cursor (accent, flipping to error-red on a wrong keystroke), and untyped characters
 * render faint. Reserves a fixed height so the composer never resizes as prompts change. The
 * last correct keystroke auto-submits.
 */
export function TypingComposer({ prompt, typedCount, lastKeyWasError }: TypingComposerProps) {
    if (prompt === null) {
        return (
            <div className="border-t border-b border-border py-3 font-mono text-base sm:text-lg">
                <p className="min-h-[4.5em] leading-relaxed text-ink-faint">
                    <span className="text-accent">&gt;</span> waiting for your next task...
                </p>
            </div>
        );
    }

    const typed = prompt.slice(0, typedCount);
    const current = prompt.slice(typedCount, typedCount + 1);
    const rest = prompt.slice(typedCount + 1);

    return (
        <div
            key={lastKeyWasError ? `error-${typedCount}` : undefined}
            className={`border-t border-b border-border py-3 font-mono text-base sm:text-lg ${
                lastKeyWasError ? 'animate-shake' : ''
            }`}
        >
            <p className="min-h-[4.5em] break-words whitespace-pre-wrap leading-relaxed">
                <span className="text-accent">&gt;</span> <span className="text-ink-bright">{typed}</span>
                {current && (
                    <span className="relative inline-block">
                        <span className="text-ink-faint">{current}</span>
                        <span
                            aria-hidden="true"
                            className={`absolute inset-0 flex animate-caret-blink items-center justify-center ${
                                lastKeyWasError ? 'bg-danger text-bg' : 'bg-accent text-bg'
                            }`}
                        >
                            {current}
                        </span>
                    </span>
                )}
                <span className="text-ink-faint">{rest}</span>
            </p>
        </div>
    );
}
