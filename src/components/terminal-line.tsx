import type { ReactNode } from 'react';

export interface AgentBulletLineProps {
    children: ReactNode;
}

/**
 * A `⏺ ` prefixed line for plain agent text — the flat terminal-transcript equivalent of an
 * agent chat bubble. Shared by plain agent messages and the final `text` beat of a beat sequence
 * so both read identically in the transcript.
 */
export function AgentBulletLine({ children }: AgentBulletLineProps) {
    return (
        <div className="flex animate-fade-up gap-2 text-[15px] leading-relaxed break-words">
            <span className="shrink-0 text-accent">⏺</span>
            <span className="min-w-0 break-words text-ink">{children}</span>
        </div>
    );
}
