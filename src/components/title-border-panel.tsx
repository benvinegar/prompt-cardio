import type { ReactNode } from 'react';

export interface TitleBorderPanelProps {
    /** Label rendered inline with the top border, like a terminal window title. */
    title: string;
    className?: string;
    children: ReactNode;
}

/**
 * A bordered panel with its title cut into the top border line, mimicking a labeled terminal
 * frame (e.g. `─ session summary ─`). Used for the start screen banner and the results card.
 */
export function TitleBorderPanel({ title, className, children }: TitleBorderPanelProps) {
    return (
        <div className={`relative rounded-[6px] border border-accent/30 px-4 py-5 sm:px-6 ${className ?? ''}`}>
            <span className="absolute -top-[0.7em] left-4 bg-bg px-2 text-xs font-bold text-accent">{title}</span>
            {children}
        </div>
    );
}
