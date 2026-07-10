function SparkIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-accent-bright" aria-hidden="true">
            <path
                d="M12 2.5 14 9.5 21 12 14 14.5 12 21.5 10 14.5 3 12 10 9.5 12 2.5Z"
                fill="currentColor"
            />
        </svg>
    );
}

/** A "..." typing indicator bubble shown while the fake agent is "thinking" before it replies. */
export function ThinkingIndicator() {
    return (
        <div className="flex w-full animate-fade-up items-start gap-2.5">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-bg-elevated">
                <SparkIcon />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-border bg-bg-panel px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-dim [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-dim [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-dim" />
            </div>
        </div>
    );
}
